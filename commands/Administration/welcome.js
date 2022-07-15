const Command = require("../../base/Command.js"),
	Resolvers = require("../../helpers/resolvers");

class Welcome extends Command {

	constructor (client) {
		super(client, {
			name: "welcome",
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
		const status = interaction.options.getString("status")
		if (
			status === "test" &&
            data.guild.plugins.welcome.enabled
		) {
			this.client.emit("guildMemberAdd", interaction.member);
			return interaction.success("administration/welcome:TEST_SUCCESS");
		}

		if (
			(!status || !["edit", "off"].includes(status)) &&
            data.guild.plugins.welcome.enabled
		)
			return interaction.error("administration/welcome:MISSING_STATUS");

		if (status === "off") {
			data.guild.plugins.welcome = {
				enabled: false,
				message: null,
				channelID: null,
				withImage: null
			};
			data.guild.markModified("plugins.welcome");
			data.guild.save();
			return interaction.error("administration/welcome:DISABLED", {
				prefix: data.guild.prefix
			});
		} else {
			const welcome = {
				enabled: true,
				channel: null,
				message: null,
				withImage: null,
			};

			interaction.replyT("administration/welcome:FORM_1", {
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
				if (welcome.message) {
					if (
						msg.content.toLowerCase() ===
                        interaction.translate("common:YES").toLowerCase()
					) {
						welcome.withImage = true;
					} else if (
						msg.content.toLowerCase() ===
                        interaction.translate("common:NO").toLowerCase()
					) {
						welcome.withImage = false;
					} else {
						return interaction.error("misc:INVALID_YES_NO");
					}
					data.guild.plugins.welcome = welcome;
					data.guild.markModified("plugins.welcome");
					await data.guild.save();
					interaction.replyT("administration/welcome:FORM_SUCCESS", {
						prefix: data.guild.prefix,
						channel: `<#${welcome.channel}>`
					});
					return collector.stop();
				}

				// If the channel is filled and the message is not, it means the user sent the message
				if (welcome.channel && !welcome.message) {
					if (msg.content.length < 1800) {
						welcome.message = msg.content;
						return interaction.replyT("administration/welcome:FORM_3");
					}
					return interaction.error("administration/goodbye:MAX_CHARACT");
				}

				// If the channel is not filled, it means the user sent it
				if (!welcome.channel) {
					const channel = await Resolvers.resolveChannel({
						message: msg,
						channelType: "text"
					});
					if (!channel) {
						return message.error("misc:INVALID_CHANNEL");
					}
					welcome.channel = channel.id;
					interaction.replyT("administration/welcome:FORM_2", {
						guildName: interaction.guild.name,
						author: interaction.member.user.tag,
						memberCount: interaction.guild.memberCount
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

module.exports = Welcome;
