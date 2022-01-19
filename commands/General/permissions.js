const Command = require("../../base/Command.js"),
	Discord = require("discord.js");
const permissions = Object.keys(Discord.Permissions.FLAGS);
 
class Permissions extends Command {
	constructor (client) {
		super(client, {
			name: "permissions",
			dirname: __dirname,
			enabled: true,
			guildOnly: true,
			aliases: [ "perms" ],
			memberPermissions: [],
			botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],
			nsfw: false,
			ownerOnly: false,
			cooldown: 500
		});
	}
 
	async run (message) {
		const member = message.mentions.members.first() || message.member;
		let text = "```\n"+message.translate("general/permissions:TITLE", {
			user: member.user.username,
			channel: message.channel.name
		})+"\n\n";
		const mPermissions = message.channel.permissionsFor(member);
		const total = {
			denied: 0,
			allowed: 0
		};
		permissions.forEach((perm) => {
			if(!mPermissions.has(perm)){
				text += `${perm} ❌\n`;
				total.denied++;
			} else {
				text += `${perm} ✅\n`;
				total.allowed++;
			}
		});
		text += `\n${total.allowed} ✅ | ${total.denied} ❌`+"\n```";
		message.channel.send(text);
	}
}

module.exports = Permissions;
