const Command = require("../../base/Command.js");

class Unmute extends Command {

	constructor (client) {
		super(client, {
			name: "unmute",
			dirname: __dirname,
			enabled: true,
			guildOnly: true,
			aliases: [],
			memberPermissions: [ "MANAGE_MESSAGES" ],
			botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS", "MANAGE_CHANNELS" ],
			nsfw: false,
			ownerOnly: false,
			cooldown: 3000
		});
	}

	async run (message, args) {

		const member = await this.client.resolveMember(args[0], message.guild);
		if(!member){
			return message.success("moderation/unmute:MISSING_MEMBER");
		}

		const memberPosition = member.roles.highest.position;
		const moderationPosition = message.member.roles.highest.position;
		if(message.member.ownerID !== message.author.id && !(moderationPosition > memberPosition)){
			return message.error("moderation/ban:SUPERIOR");
		}

		const memberData = await this.client.findOrCreateMember({ id: member.id, guildID: message.guild.id });

		if(memberData.mute.muted){
			memberData.mute.endDate = Date.now();
			memberData.markModified("mute");
			memberData.save();
			message.success("moderation/unmute:SUCCESS", {
				username: member.user.tag
			});
		} else {
			message.error("moderation/unmute:NOT_MUTED", {
				username: member.user.tag
			});
		}
        

	}

}

module.exports = Unmute;