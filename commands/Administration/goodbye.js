const Command = require("../../base/Command.js"),
	Resolvers = require("../../helpers/resolvers");

class Goodbye extends Command {

	constructor (client) {
		super(client, {
			name: "goodbye",
			dirname: __dirname,
			enabled: true,
			guildOnly: true,
			aliases: [ "au-revoir" ],
			memberPermissions: [ "MANAGE_GUILD" ],
			botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],
			nsfw: false,
			ownerOnly: false,
			cooldown: 3000
		});
	}

	async run (message, args, data) {

		if (
			args[0] === "test" &&
            data.guild.plugins.goodbye.enabled
		) {
			this.client.emit("guildMemberRemove", message.member);
			return message.success("administration/goodbye:TEST_SUCCESS");
		}

		if (
			(!args[0] || !["edit", "off"].includes(args[0])) &&
            data.guild.plugins.goodbye.enabled
		)
			return message.error("administration/goodbye:MISSING_STATUS");

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
				author: message.author.toString()
			});
			const collector = message.channel.createMessageCollector(
				m => m.author.id === message.author.id,
				{
					time: 120000 // 2 minutes
				}
			);

			collector.on("collect", async msg => {
				// If the message is filled, it means the user sent yes or no for the image
				if (goodbye.message) {
					if (
						msg.content.toLowerCase() ===
                        message.translate("common:YES").toLowerCase()
					) {
						goodbye.withImage = true;
					} else if (
						msg.content.toLowerCase() ===
                        message.translate("common:NO").toLowerCase()
					) {
						goodbye.withImage = false;
					} else {
						return message.error("misc:INVALID_YES_NO");
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
						return message.sendT("administration/goodbye:FORM_3");
					}
					return message.error("administration/goodbye:MAX_CHARACT");
				}

				// If the channel is not filled, it means the user sent it
				if (!goodbye.channel) {
					const channel = await Resolvers.resolveChannel({
						message: msg,
						channelType: "text"
					});
					if (!channel) {
						return message.error("misc:INVALID_CHANNEL");
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
					return message.error("misc:TIMEOUT");
				}
			});
		}
	}

}

module.exports = Goodbye;
