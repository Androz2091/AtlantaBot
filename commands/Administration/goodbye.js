const Command = require("../../base/Command.js"),
	Resolvers = require("../../helpers/resolvers");

module.exports = class extends Command {

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
			cooldown: 3000
		});
	}

	async run (interaction, translate, data) {

		if (
			args[0] === "test" &&
            data.guild.plugins.goodbye.enabled
		) {
			this.client.emit("guildMemberRemove", message.member);
			return interaction.reply({
				content: translate("administration/goodbye:TEST_SUCCESS")
			});
		}

		if (
			(!args[0] || !["edit", "off"].includes(args[0])) &&
            data.guild.plugins.goodbye.enabled
		)
			return interaction.reply({
				content: translate("administration/goodbye:MISSING_STATUS"),
				ephemeral: true
			});

		if (args[0] === "off") {
			data.guild.plugins.goodbye = {
				enabled: false,
				message: null,
				channelID: null,
				withImage: null
			};
			data.guild.markModified("plugins.goodbye");
			data.guild.save();
			return message.error("administration/goodbye:DISABLED", {
				prefix: data.guild.prefix
			});
		} else {
			const goodbye = {
				enabled: true,
				channel: null,
				message: null,
				withImage: null,
			};

			message.sendT("administration/goodbye:FORM_1", {
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
				if (goodbye.message) {
					if (
						msg.content.toLowerCase() ===
                        translate("common:YES").toLowerCase()
					) {
						goodbye.withImage = true;
					} else if (
						msg.content.toLowerCase() ===
                        translate("common:NO").toLowerCase()
					) {
						goodbye.withImage = false;
					} else {
						return interaction.reply({
							content: translate("misc:INVALID_YES_NO"),
							ephemeral: true
						});
					}
					data.guild.plugins.goodbye = goodbye;
					data.guild.markModified("plugins.goodbye");
					await data.guild.save();
					message.sendT("administration/goodbye:FORM_SUCCESS", {
						prefix: data.guild.prefix,
						channel: `<#${goodbye.channel}>`
					});
					return collector.stop();
				}

				// If the channel is filled and the message is not, it means the user sent the message
				if (goodbye.channel && !goodbye.message) {
					if (msg.content.length < 1800) {
						goodbye.message = msg.content;
						return interaction.reply({
							content: translate("administration/goodbye:FORM_3")
						});
					}
					return interaction.reply({
						content: translate("administration/goodbye:MAX_CHARACT"),
						ephemeral: true
					});
				}

				// If the channel is not filled, it means the user sent it
				if (!goodbye.channel) {
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
					goodbye.channel = channel.id;
					message.sendT("administration/goodbye:FORM_2", {
						channel: channel.toString(),
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
