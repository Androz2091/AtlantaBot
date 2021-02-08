const Command = require("../../base/Command.js"),
	Discord = require("discord.js");

class AddrustRole extends Command {

	constructor (client) {
		super(client, {
			name: "addrustrole",
			dirname: __dirname,
			enabled: true,
			guildOnly: true,
			aliases: ["addrust", "rustclanadd"],
			memberPermissions: [ "MANAGE_MESSAGES" ],
			botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS", "MANAGE_ROLES" ],
			nsfw: false,
			ownerOnly: false,
			cooldown: 3000
		});
	}

	async run (message, args, data) {
		
		
		const member = await this.client.resolveMember(args[0], message.guild);
		if(!member){
			return message.error("moderation/addrole:MISSING_MEMBER");
		}
		
		if(member.user.bot){
			return message.error("misc:BOT_USER");
		}
		
		if(member.id === message.author.id){
			return message.error("moderation/addrole:YOURSELF");
		}

		const memberPosition = member.roles.highest.position;
		const moderationPosition = message.member.roles.highest.position;
		if(message.member.ownerID !== message.author.id && !(moderationPosition > memberPosition)){
			return message.error("moderation/addrole:SUPERIOR");
		}
		
		const memberData = await this.client.findOrCreateMember({ id: member.id, guildID: message.guild.id });
		
		const userRoles = args.slice(1).join(" ");
		
		if(!userRoles){
			return message.error("moderation/addrole:MISSING_ROLE");
		}
		
		let role = message.guild.roles.cache.find(val => val.name === userRoles);
		
		if(!role) return message.reply(`<:error_sickgaming:722216796408512544> **Error:** ${userRoles} isn't a role on this server!`);
		
		let rustGeneral = ("Rust-General");
		if(message.member.roles.cache.has(rustGeneral)) {
			return message.channel.send(
			`${message.member}, isn't a Rust-General!`
			);
		}
		if(member.roles.cache.has(role.id)) {
			return message.channel.send(
			`${message.mentions.users.first().username}, already has this role!`
			);
		}
		const rolesArray = ["Rust-Enlisted", "Rust-Officer", "Rust-Major"];
		
		const exists = rolesArray.includes(userRoles);		// Includes checks array for items
		
		if(exists) {
			await member.roles.add(role.id).catch((e) => console.log(e));	// Adds the user to the role
				message.channel.send(
				`The role ${role.name} has been added to ${message.mentions.users.first().username}.`
			);	
				// Send a success message in the current channel
			member.send(message.translate("moderation/addrole:ADDROLE_DM", {
				username: member.user.username,
				server: message.guild.name,
				moderator: message.author.tag,
				userRoles
			}));

			data.guild.casesCount++;
			data.guild.save();

			const caseInfo = {
				channel: message.channel.id,
				moderator: message.author.id,
				date: Date.now(),
				type: "addrustrole",
				case: data.guild.casesCount
			};
            
			memberData.sanctions.push(caseInfo);
			memberData.save();
            
			if(data.guild.plugins.modlogs){
				const channel = message.guild.channels.cache.get(data.guild.plugins.modlogs);
				if(!channel) return;
				const embed = new Discord.MessageEmbed()
					.setAuthor(message.translate("moderation/addrustrole:CASE", {
						count: data.guild.casesCount
					}))
					.addField(message.translate("common:USER"), `\`${member.user.tag}\` (${member.user.toString()})`, true)
					.addField(message.translate("common:MODERATOR"), `\`${message.author.tag}\` (${message.author.toString()})`, true)
					.setColor("#e88709");
				channel.send(embed);
			}
			} else {
				return message.channel.send(
				`${message.mentions.users.first().username}, did you type a valid rust role?`
				)
			}
			
		
		message.channel.send(`<a:RainbowBlobGoingCrazy:756735402664132628> **${message.author.username}**, I've added the **${userRoles}** role to **${message.mentions.users.first().username}**.`);
		
		
	}

}

module.exports = AddrustRole;
