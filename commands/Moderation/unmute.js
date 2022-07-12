const Command = require("../../base/Command.js");

class Unmute extends Command {

	constructor (client) {
		super(client, {
			name: "unmute",
			dirname: __dirname,
			enabled: true,
			guildOnly: true,
			memberPermissions: [ "MANAGE_MESSAGES" ],
			botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS", "MANAGE_CHANNELS" ],
			nsfw: false,
			ownerOnly: false,
			cooldown: 3000,
			options: [
				{
					name: "member",
					description: "the member you want to unmute",
					type: "USER",
					required: true
				}
			]
		});
	}

	async run (interaction) {

		const member = await interaction.options.getMember("member")

		const memberPosition = member.roles.highest.position;
		const moderationPosition = interaction.member.roles.highest.position;
		if(!(moderationPosition > memberPosition)){
			return interaction.error("moderation/ban:SUPERIOR");
		}

		const memberData = await this.client.database.findOrCreateMember({ id: member.id, guildID: interaction.guild.id });

		if(memberData.mute.muted){
			memberData.mute.endDate = Date.now();
			memberData.markModified("mute");
			memberData.save();
			interaction.success("moderation/unmute:SUCCESS", {
				username: member.user.tag
			});
		} else {
			interaction.error("moderation/unmute:NOT_MUTED", {
				username: member.user.tag
			});
		}
        

	}

}

module.exports = Unmute;