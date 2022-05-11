const xpCooldown = {};

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

		data.config = this.client.config;
    
		if(message.guild){
			// Gets guild data
			const guild = await this.client.database.findOrCreateGuild({ id: message.guild.id });
			message.guild.data = data.guild = guild;
		}

		// Check if the bot was mentionned
		if(message.content.match(new RegExp(`^<@!?${this.client.user.id}>( |)$`))){
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
			data.memberData = await this.client.database.findOrCreateMember({id: message.author.id, guildID: message.guild.id});
		}

		data.userData = await this.client.database.findOrCreateUser({id: message.author.id});

		if(message.guild){

			await this.updateXp(message, data);

			if(!message.channel.permissionsFor(message.member).has("MANAGE_MESSAGES") && !message.editedAt){
				const channelSlowmode = data.guild.slowmode.channels.find((ch) => ch.id === message.channel.id);
				if(channelSlowmode){
					const uSlowmode = data.guild.slowmode.users.find((d) => d.id === (message.author.id+message.channel.id));
					if(uSlowmode){
						if(uSlowmode.time > Date.now()){
							message.delete();
							const delay = message.convertTime(uSlowmode.time, "to", true);
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

			message.mentions.users.forEach((u) => {
				this.client.database.findOrCreateUser({ id: u.id }).then((userData => {
					if(userData.afk){
						message.error("general/setafk:IS_AFK", {
							user: u.tag,
							reason: userData.afk
						});
					}
				}));
			});
		}
	}
	async updateXp(msg, data) {

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
		// Records in the database the time when the member will be able to win xp again (1min)
		xpCooldown[msg.author.id] = Date.now() + 6e4;

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
};