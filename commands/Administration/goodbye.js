const Command = require("../../base/Command.js"),
	Resolvers = require("../../helpers/resolvers");

class Goodbye extends Command {

	constructor (client) {
		super(client, {
			name: "goodbye",
			dirname: __dirname,
			enabled: true,
			guildOnly: true,
			memberPermissions: [ "MANAGE_GUILD" ],
			botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],
			nsfw: false,
			ownerOnly: false,
			cooldown: 3000,
			options: [
				{
					name: "status",
					required: true,
					description: "the status (test/edit/off)",
					type: "STRING"
				}
			]
		});
	}

	async run (interaction, data) {
		let status = interaction.options.getString("status")
		if (
			status === "test" &&
            data.guild.plugins.goodbye.enabled
		) {
			this.client.emit("guildMemberRemove", interaction.member);
			return interaction.success("administration/goodbye:TEST_SUCCESS");
		}

		if (
			(!status || !["edit", "off"].includes(status)) &&
            data.guild.plugins.goodbye.enabled
		)
			return interaction.error("administration/goodbye:MISSING_STATUS");

		if (status === "off") {
			data.guild.plugins.goodbye = {
				enabled: false,
				message: null,
				channelID: null,
				withImage: null
			};
			data.guild.markModified("plugins.goodbye");
			data.guild.save();
			return interaction.error("administration/goodbye:DISABLED", {
				prefix: data.guild.prefix
			});
		} else {
			const goodbye = {
				enabled: true,
				channel: null,
				message: null,
				withImage: null,
			};

			interaction.replyT("administration/goodbye:FORM_1", {
				author: interaction.member.user.toString()
			});
			const collector = interaction.channel.createMessageCollector(
				m => m.author.id === interaction.member.user.id,
				{
					time: 120000 // 2 minutes
				}
			);

			collector.on("collect", async msg => {
				// If the message is filled, it means the user sent yes or no for the image
				if (goodbye.message) {
					if (
						msg.content.toLowerCase() ===
                        interaction.translate("common:YES").toLowerCase()
					) {
						goodbye.withImage = true;
					} else if (
						msg.content.toLowerCase() ===
                        interaction.translate("common:NO").toLowerCase()
					) {
						goodbye.withImage = false;
					} else {
						return interaction.error("misc:INVALID_YES_NO");
					}
					data.guild.plugins.goodbye = goodbye;
					data.guild.markModified("plugins.goodbye");
					await data.guild.save();
					interaction.replyT("administration/goodbye:FORM_SUCCESS", {
						prefix: data.guild.prefix,
						channel: `<#${goodbye.channel}>`
					});
					return collector.stop();
				}

				// If the channel is filled and the message is not, it means the user sent the message
				if (goodbye.channel && !goodbye.message) {
					if (msg.content.length < 1800) {
						goodbye.message = msg.content;
						return interaction.replyT("administration/goodbye:FORM_3");
					}
					return interaction.error("administration/goodbye:MAX_CHARACT");
				}

				// If the channel is not filled, it means the user sent it
				if (!goodbye.channel) {
					const channel = await Resolvers.resolveChannel({
						message: msg,
						channelType: "text"
					});
					if (!channel) {
						return interaction.error("misc:INVALID_CHANNEL");
					}
					goodbye.channel = channel.id;
					interaction.replyT("administration/goodbye:FORM_2", {
						channel: channel.toString(),
						author: msg.author.tag,
						memberCount: msg.guild.memberCount
					});
				}
			});

			collector.on("end", (_, reason) => {
				if (reason === "time") {
					return interaction.error("misc:TIMEOUT");
				}
			});
		}
	}

}

module.exports = Goodbye;
