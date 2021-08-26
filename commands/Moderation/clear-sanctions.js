const Command = require("../../base/Command.js");

module.exports = class extends Command {

	constructor (client) {
		super(client, {
			name: "clear-sanctions",
			dirname: __dirname,
			enabled: true,
			guildOnly: true,
			,
			memberPermissions: [ "MANAGE_MESSAGES" ],
			botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],
			nsfw: false,
			ownerOnly: false,
			cooldown: 3000
		});
	}

	async run (interaction, translate) {
        
		const member = await this.client.resolveMember(args[0], message.guild);
		if(!member){
			return interaction.reply({
				content: translate("moderation/clear-sanctions:MISSING_MEMBER"),
				ephemeral: true
			});
		}
		const memberData = await this.client.findOrCreateMember({ id: member.id, guildID: interaction.guild.id });
		memberData.sanctions = [];
		memberData.save();
		message.success("moderation/clear-sanctions:SUCCESS", {
			username: member.user.tag
		});
	}

};
