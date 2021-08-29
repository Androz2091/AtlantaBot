const Command = require("../../base/Command.js"),
	Resolvers = require("../../helpers/resolvers");

module.exports = class extends Command {

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
			cooldown: 3000
		});
	}

	async run (interaction, translate, data) {

		if (
			args[0] === "test" &&
            data.guildData.plugins.welcome.enabled
		) {
			this.client.emit("guildMemberAdd", message.member);
			return interaction.reply({
				content: translate("administration/welcome:TEST_SUCCESS")
			});
		}

		if (
			(!args[0] || !["edit", "off"].includes(args[0])) &&
            data.guildData.plugins.welcome.enabled
		)
			return interaction.reply({
				content: translate("administration/welcome:MISSING_STATUS"),
				ephemeral: true
			});

		if (args[0] === "off") {
			data.guildData.plugins.welcome = {
				enabled: false,
				message: null,
				channelID: null,
				withImage: null
			};
			data.guildData.markModified("plugins.welcome");
			data.guildData.save();
			return message.error("administration/welcome:DISABLED", {
				prefix: data.guildData.prefix
			});
		} else {
			const welcome = {
				enabled: true,
				channel: null,
				message: null,
				withImage: null,
			};

			message.sendT("administration/welcome:FORM_1", {
				author: interaction.user.toString()
			});
			const collector = message.channel.createMessageCollector(
				m => m.author.id === interaction.user.id,
				{
					time: 120000 // 2 minutes
				}
			);

			collector.on("collect", async msg => {
				// If the message is filled, it means the user sent yes or no for the image
				if (welcome.message) {
					if (
						msg.content.toLowerCase() ===
                        translate("common:YES").toLowerCase()
					) {
						welcome.withImage = true;
					} else if (
						msg.content.toLowerCase() ===
                        translate("common:NO").toLowerCase()
					) {
						welcome.withImage = false;
					} else {
						return interaction.reply({
							content: translate("misc:INVALID_YES_NO"),
							ephemeral: true
						});
					}
					data.guildData.plugins.welcome = welcome;
					data.guildData.markModified("plugins.welcome");
					await data.guildData.save();
					message.sendT("administration/welcome:FORM_SUCCESS", {
						prefix: data.guildData.prefix,
						channel: `<#${welcome.channel}>`
					});
					return collector.stop();
				}

				// If the channel is filled and the message is not, it means the user sent the message
				if (welcome.channel && !welcome.message) {
					if (msg.content.length < 1800) {
						welcome.message = msg.content;
						return interaction.reply({
							content: translate("administration/welcome:FORM_3")
						});
					}
					return interaction.reply({
						content: translate("administration/goodbye:MAX_CHARACT"),
						ephemeral: true
					});
				}

				// If the channel is not filled, it means the user sent it
				if (!welcome.channel) {
					const channel = await Resolvers.resolveChannel({
						message: msg,
						channelType: "text"
					});
					if (!channel) {
						return interaction.reply({
							content: translate("misc:INVALID_CHANNEL"),
							ephemeral: true
						});
					}
					welcome.channel = channel.id;
					message.sendT("administration/welcome:FORM_2", {
						guildName: message.guild.name,
						author: msg.author.tag,
						memberCount: msg.guild.memberCount
					});
				}
			});

			collector.on("end", (_, reason) => {
				if (reason === "time") {
					return interaction.reply({
						content: translate("misc:TIMEOUT"),
						ephemeral: true
					});
				}
			});
		}
	}

};
