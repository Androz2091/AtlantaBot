// The MESSAGE event runs anytime a message is received
// Note that due to the binding of client to every event, every event
// goes `client, other, args` when this function is run.

const xpCooldown = {},
	cmdCooldown = {};

module.exports = class {
	constructor (client) {
		this.client = client;
	}

	async run (message) {

		const data = {};

		// If the messagr author is a bot
		if(message.author.bot){
			return;
		}

		// If the member on a guild is invisible or not cached, fetch them.
		if(message.guild && !message.member){
			await message.guild.members.fetch(message.author.id);
		}

		const client = this.client;
		data.config = client.config;
    
		if(message.guild){
			// Gets guild data
			const guild = await client.findOrCreateGuild({ id: message.guild.id });
			message.guild.data = data.guild = guild;
		}

		// Check if the bot was mentionned
		if(message.content.match(new RegExp(`^<@!?${client.user.id}>( |)$`))){
			if(message.guild){
				return message.sendT("misc:HELLO_SERVER", {
					username: message.author.username,
					prefix: data.guild.prefix
				});
			} else {
				return message.sendT("misc:HELLO_DM", {
					username: message.author.username
				});
			}
		}

		if(message.content === "@someone" && message.guild){
			return client.commands.get("someone").run(message, null, data);
		}

		if(message.guild){
			// Gets the data of the member
			const memberData = await client.findOrCreateMember({ id: message.author.id, guildID: message.guild.id });
			data.memberData = memberData;
		}

		const userData = await client.findOrCreateUser({ id: message.author.id });
		data.userData = userData;

		if(message.guild){

			await updateXp(message, data);

			if(!message.channel.permissionsFor(message.member).has("MANAGE_MESSAGES") && !message.editedAt){
				const channelSlowmode = data.guild.slowmode.channels.find((ch) => ch.id === message.channel.id);
				if(channelSlowmode){
					const uSlowmode = data.guild.slowmode.users.find((d) => d.id === (message.author.id+message.channel.id));
					if(uSlowmode){
						if(uSlowmode.time > Date.now()){
							message.delete();
							const delay = message.convertTime(Math.ceil((uSlowmode.time - Date.now())), "to");
							return message.author.send(message.translate("administration/slowmode:PLEASE_WAIT", {
								time: delay,
								channel: message.channel.toString()
							}));
						} else {
							uSlowmode.time = channelSlowmode.time+Date.now();
						}
					} else {
						data.guild.slowmode.users.push({
							id: message.author.id+message.channel.id,
							time: channelSlowmode.time+Date.now()
						});
					}
					data.guild.markModified("slowmode.users");
					await data.guild.save();
				}
			}

			if(data.guild.plugins.automod.enabled && !data.guild.plugins.automod.ignored.includes(message.channel.id)){
				if(/(discord\.(gg|io|me|li)\/.+|discordapp\.com\/invite\/.+)/i.test(message.content)){
					if(!message.channel.permissionsFor(message.member).has("MANAGE_MESSAGES")){
						message.delete();
						message.author.send("```"+message.content+"```");
						return message.error("administration/automod:DELETED", {
							username: message.author.tag
						});
					}
				}
			}

			const afkReason = data.userData.afk;
			if(afkReason){
				data.userData.afk = null;
				await data.userData.save();
				message.sendT("general/setafk:DELETED", {
					username: message.author.username
				});
			}

			message.mentions.users.forEach(async (u) => {
				const userData = await client.findOrCreateUser({ id: u.id });
				if(userData.afk){
					message.error("general/setafk:IS_AFK", {
						username: u.tag,
						reason: userData.afk
					});
				}
			});

		}

		// Gets the prefix
		const prefix = client.functions.getPrefix(message, data);
		if(!prefix){
			return;
		}

		const args = message.content.slice((typeof prefix === "string" ? prefix.length : 0)).trim().split(/ +/g);
		const command = args.shift().toLowerCase();
		const cmd = client.commands.get(command) || client.commands.get(client.aliases.get(command));
        
		if(!cmd){
			if(message.guild){
				const customCommand = data.guild.customCommands.find((c) => c.name === command);
				if(customCommand){
					message.channel.send(customCommand.answer);
				}
				return;
			} else {
				return message.sendT("misc:HELLO_DM", {
					username: message.author.username
				});
			}
		}

		if(cmd.conf.guildOnly && !message.guild){
			return message.error("misc:GUILD_ONLY");
		}

		if(message.guild){
			let neededPermission = [];
			if(!cmd.conf.botPermissions.includes("EMBED_LINKS")){
				cmd.conf.botPermissions.push("EMBED_LINKS");
			}
			cmd.conf.botPermissions.forEach((perm) => {
				if(!message.channel.permissionsFor(message.guild.me).has(perm)){
					neededPermission.push(perm);
				}
			});
			if(neededPermission.length > 0){
				return message.error("misc:MISSING_BOT_PERMS", {
					list: neededPermission.map((p) => `\`${p}\``).join(", ")
				});
			}
			neededPermission = [];
			cmd.conf.memberPermissions.forEach((perm) => {
				if(!message.channel.permissionsFor(message.member).has(perm)){
					neededPermission.push(perm);
				}
			});
			if(neededPermission.length > 0){
				return message.error("misc:MISSING_MEMBER_PERMS", {
					list: neededPermission.map((p) => `\`${p}\``).join(", ")
				});
			}
			if(data.guild.ignoredChannels.includes(message.channel.id) && !message.member.hasPermission("MANAGE_MESSAGES")){
				message.delete();
				message.author.send(message.translate("misc:RESTRICTED_CHANNEL", {
					channel: message.channel.toString()
				}));
				return;
			}

			if(!message.channel.permissionsFor(message.member).has("MENTION_EVERYONE") && (message.content.includes("@everyone") || message.content.includes("@here"))){
				return message.error("misc:EVERYONE_MENTION");
			}
			if(!message.channel.nsfw && cmd.conf.nsfw){
				return message.error("misc:NSFW_COMMAND");
			}
		}

		if(!cmd.conf.enabled){
			return message.error("misc:COMMAND_DISABLED");
		}

		if(cmd.conf.ownerOnly && message.author.id !== client.config.owner.id){
			return message.error("misc:OWNER_ONLY");
		}

		let uCooldown = cmdCooldown[message.author.id];
		if(!uCooldown){
			cmdCooldown[message.author.id] = {};
			uCooldown = cmdCooldown[message.author.id];
			uCooldown[cmd.help.name] = {};
		}
		const time = uCooldown[cmd.help.name].time || 0;
		if(time && (time > Date.now())){
			return message.error("misc:COOLDOWNED", {
				seconds: Math.ceil((time-Date.now())/1000)
			});
		}
		cmdCooldown[message.author.id][cmd.help.name].time = Date.now() + cmd.conf.cooldown;

		// implement timout for automatly remove cache and better manage RAM
		cmdCooldown[message.author.id][cmd.help.name].timeout = setTimeout(() => {
			delete cmdCooldown[message.author.id][cmd.help.name];
			if (Object.keys(cmdCooldown[message.author.id]) < 1) {
				delete cmdCooldown[message.author.id];
			}
		}, cmd.conf.cooldown);

		client.logger.log(`${message.author.username} (${message.author.id}) ran command ${cmd.help.name}`, "cmd");

		const log = new this.client.logs({
			commandName: cmd.help.name,
			author: { username: message.author.username, discriminator: message.author.discriminator, id: message.author.id },
			guild: { name: message.guild ? message.guild.name : "dm", id: message.guild ? message.guild.id : "dm" }
		});
		log.save();

		if(!data.userData.achievements.firstCommand.achieved){
			data.userData.achievements.firstCommand.progress.now = 1;
			data.userData.achievements.firstCommand.achieved = true;
			data.userData.markModified("achievements.firstCommand");
			await data.userData.save();
			await message.channel.send({ files: [
				{
					name: "unlocked.png",
					attachment: "./assets/img/achievements/achievement_unlocked2.png"
				}
			]});
		}

		try {
			cmd.run(message, args, data);
			if(cmd.help.category === "Moderation" && data.guild.autoDeleteModCommands){
				message.delete();
			}
		} catch(e){
			console.error(e);
			return message.error("misc:ERR_OCCURRED");
		}
	}
};

/**
 * xp
 * This function update userdata by adding xp
*/

async function updateXp(msg, data){

	// Gets the user informations
	const points = parseInt(data.memberData.exp);
	const level = parseInt(data.memberData.level);

	// if the member is already in the cooldown db
	const isInCooldown = xpCooldown[msg.author.id];
	if(isInCooldown){
		if(isInCooldown > Date.now()){
			return;
		}
	}
	// Records in the database the time when the member will be able to win xp again (3min)
	const toWait = Date.now()+60000;
	xpCooldown[msg.author.id] = toWait;
    
	// Gets a random number between 10 and 5 
	const won = Math.floor(Math.random() * ( Math.floor(10) - Math.ceil(5))) + Math.ceil(5);
    
	const newXp = parseInt(points+won, 10);

	// calculation how many xp it takes for the next new one
	const neededXp = 5 * (level * level) + 80 * level + 100;

	// check if the member up to the next level
	if(newXp > neededXp){
		data.memberData.level = parseInt(level+1, 10);
	}

	// Update user data
	data.memberData.exp = parseInt(newXp, 10);
	await data.memberData.save();
}
