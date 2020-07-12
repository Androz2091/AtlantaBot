const Command = require("../../base/Command.js");

class Automod extends Command {

	constructor (client) {
		super(client, {
			name: "automod",
			dirname: __dirname,
			enabled: true,
			guildOnly: true,
			aliases: [],
			memberPermissions: [ "MANAGE_GUILD" ],
			botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],
			nsfw: false,
			ownerOnly: false,
			cooldown: 5000
		});
	}

	async run (message, args,data) {

		const status = args[0];
		if(!status || (status !== "on" && status !== "off")){
			return message.error("administration/automod:MISSING_STATUS");
		}

		if(status === "on"){
			data.guild.plugins.automod = { enabled: true, ignored: [] };
			data.guild.markModified("plugins.automod");
			data.guild.save();
			message.success("administration/automod:ENABLED", {
				prefix: data.guild.prefix
			});
		} else if (status === "off"){
			if(message.mentions.channels.filter((ch) => ch.type === "text" && ch.guild.id === message.guild.id).first()){
				const channel = message.mentions.channels.first();
				data.guild.plugins.automod.ignored.push(channel);
				data.guild.markModified("plugins.automod");
				data.guild.save();
				message.success("administration/automod:DISABLED_CHANNEL", {
					channel: channel.toString()
				});
			} else {
				data.guild.plugins.automod = { enabled: false, ignored: [] };
				data.guild.markModified("plugins.automod");
				data.guild.save();
				message.success("administration/automod:DISABLED");
			}
		}
	}

}

module.exports = Automod;