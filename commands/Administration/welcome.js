const Command = require("../../base/Command.js"),
	Resolvers = require("../../helpers/resolvers");

class Welcome extends Command {

	constructor (client) {
		super(client, {
			name: "welcome",
			dirname: __dirname,
			enabled: true,
			guildOnly: true,
			aliases: [ "bienvenue" ],
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
            data.guild.plugins.welcome.enabled
		) {
			this.client.emit("guildMemberAdd", message.member);
			return message.success("administration/welcome:TEST_SUCCESS");
		}

		if (
			(!args[0] || !["edit", "off"].includes(args[0])) &&
            data.guild.plugins.welcome.enabled
		)
			return message.error("administration/welcome:MISSING_STATUS");

		if (args[0] === "off") {
			data.guild.plugins.welcome = {
				enabled: false,
				message: null,
				channelID: null,
				withImage: null
			};
			data.guild.markModified("plugins.welcome");
			data.guild.save();
			return message.error("administration/welcome:DISABLED", {
				prefix: data.guild.prefix
			});
		} else {
			const welcome = {
				enabled: true,
				channel: null,
				message: null,
				withImage: null,
			};

			message.sendT("administration/welcome:FORM_1", {
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
				if (welcome.message) {
					if (
						msg.content.toLowerCase() ===
                        message.translate("common:YES").toLowerCase()
					) {
						welcome.withImage = true;
					} else if (
						msg.content.toLowerCase() ===
                        message.translate("common:NO").toLowerCase()
					) {
						welcome.withImage = false;
					} else {
						return message.error("misc:INVALID_YES_NO");
					}
					data.guild.plugins.welcome = welcome;
					data.guild.markModified("plugins.welcome");
					await data.guild.save();
					message.sendT("administration/welcome:FORM_SUCCESS", {
						prefix: data.guild.prefix,
						channel: `<#${welcome.channel}>`
					});
					return collector.stop();
				}

				// If the channel is filled and the message is not, it means the user sent the message
				if (welcome.channel && !welcome.message) {
					if (msg.content.length < 1800) {
						welcome.message = msg.content;
						return message.sendT("administration/welcome:FORM_3");
					}
					return message.error("administration/goodbye:MAX_CHARACT");
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
					message.sendT("administration/welcome:FORM_2", {
						guildName: message.guild.name,
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

module.exports = Welcome;
