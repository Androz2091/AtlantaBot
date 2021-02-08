const Command = require("../../base/Command.js"),
	Discord = require("discord.js");

class AddRole extends Command {

	constructor (client) {
		super(client, {
			name: "addrole",
			dirname: __dirname,
			enabled: true,
			guildOnly: true,
			aliases: ["giverole"],
			memberPermissions: [ "MANAGE_MESSAGES", "MANAGE_NICKNAMES" ],
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
		
		const userRoles = args.slice(1).join(" ");
		
		if(!userRoles){
			return message.error("moderation/addrole:MISSING_ROLE");
		}
		
		let role = message.guild.roles.cache.find(val => val.name === userRoles);
		
		if (!role) return message.reply(`<:error_sickgaming:722216796408512544> **Error:** ${userRoles} isn't a role on this server!`);
		
		if (member.roles.cache.has(role.id)) {
			return message.channel.send(
			`${message.mentions.users.first().username}, already has this role!`
			);
			} else {
				await member.roles.add(role.id).catch((e) => console.log(e));	// Adds the user to the role
				message.channel.send(
				`The role ${role.name} has been added to ${message.mentions.users.first().username}.`
				);
			}
		
		/* message.guild.channels.cache.forEach((channel) => {
		channel.updateOverwrite(member.id, {
		SEND_MESSAGES: false,
		ADD_REACTIONS: false,
		CONNECT: false
		}).catch(() => {});
		}); This will add a custom permission under every channel for a user. */

		member.send(message.translate("moderation/addrole:ADDROLE_DM", {
		username: member.user.username,
		server: message.guild.name,
		moderator: message.author.tag,
		userRoles
		}));
		
		
		
		message.channel.send(`<a:RainbowBlobGoingCrazy:756735402664132628> **${message.author.username}**, I've added the **${userRoles}** role to **${message.mentions.users.first().username}**.`);
		
		
		
		
		
	}

}

module.exports = AddRole;
