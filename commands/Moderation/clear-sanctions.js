const Command = require("../../base/Command.js");

class Clearsanctions extends Command {

	constructor (client) {
		super(client, {
			name: "clear-sanctions",
			dirname: __dirname,
			enabled: true,
			guildOnly: true,
			memberPermissions: [ "MANAGE_MESSAGES" ],
			botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],
			nsfw: false,
			ownerOnly: false,
			cooldown: 3000,
			options: [
				{
					name: "member",
					description: "the target member",
					type: "USER",
					required: true

				}
			]
		});
	}

	async run (interaction) {
        
		const member = interaction.options.getMember("member")
		const memberData = await this.client.database.findOrCreateMember({ id: member.id, guildID: interaction.guild.id });
		memberData.sanctions = [];
		memberData.save();
		interaction.success("moderation/clear-sanctions:SUCCESS", {
			username: member.user.tag
		});
	}

}

module.exports = Clearsanctions;