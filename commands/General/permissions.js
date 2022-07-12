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
			memberPermissions: [],
			botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],
			nsfw: false,
			ownerOnly: false,
			cooldown: 500,
			options: [
				{
					name: "member",
					description: "the member you want to check the permissions",
					type: "USER",
					required: true
				}
			]
		});
	}
 
	async run (interaction) {
		const member = interaction.options.getMember("member")
		let text = "```\n"+interaction.translate("general/permissions:TITLE", {
			user: member.user.username,
			channel: interaction.channel.name
		})+"\n\n";
		const mPermissions = interaction.channel.permissionsFor(member);
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
		interaction.reply(text);
	}
}

module.exports = Permissions;
