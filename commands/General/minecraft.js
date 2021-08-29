const Command = require("../../base/Command.js"),
	Discord = require("discord.js"),
	fetch = require("node-fetch"),
	gamedig = require("gamedig"),
	Sentry = require("@sentry/node");

module.exports = class extends Command {

	constructor (client) {
		super(client, {
			name: "minecraft",
			dirname: __dirname,
			enabled: true,
			guildOnly: false,
			
			memberPermissions: [],
			botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],
			nsfw: false,
			ownerOnly: false,
			cooldown: 3000
		});
	}

	async run (interaction, translate, data) {

		const ip = args[0];
		if(!ip){
			return interaction.reply({
				content: translate("general/minecraft:MISSING_IP"),
				ephemeral: true
			});
		}

		const favicon = `https://eu.mc-api.net/v3/server/favicon/${ip}`;
		let options = {
			type: "minecraft",
			host: ip
		};

		if(ip.split(":").length > 1){
			options = {
				type: "minecraft",
				host: ip.split(":")[0],
				port: ip.split(":")[1]
			};
		}

		const m = await message.sendT("misc:PLEASE_WAIT", null, {
			prefixEmoji: "loading"
		});

		let json = null;
        
		await gamedig.query(options).then((res) => {
			json = res;
		}).catch((err) => {
			Sentry.captureException(err);
		});

		if(!json){
			options.type = "minecraftpe";
			await gamedig.query(options).then((res) => {
				json = res;
			}).catch((err) => {
				Sentry.captureException(err);
			});
		}

		if(!json){
			return m.error("general/minecraft:FAILED", null, {
				edit: true
			});
		}

		const imgRes = await fetch("https://www.minecraftskinstealer.com/achievement/a.php?i=2&h=Success&t="+ip);
		const imgAttachment = new Discord.MessageAttachment(await imgRes.buffer(), "success.png");

		const mcEmbed = new Discord.MessageEmbed()
			.setAuthor(translate("general/minecraft:FIELD_NAME", {
				ip: json.name
			}))
			.addField(translate("general/minecraft:FIELD_VERSION"),
				json.raw.vanilla.raw.version.name
			)
			.addField(translate("general/minecraft:FIELD_CONNECTED"),
				translate("general/minecraft:PLAYERS", {
					count: (json.raw.players ? json.raw.players.online : json.players.length)
				})
			)
			.addField(translate("general/minecraft:FIELD_MAX"),
				translate("general/minecraft:PLAYERS", {
					count: (json.raw.players ? json.raw.players.max : json.maxplayers)
				})
			)
			.addField(translate("general/minecraft:FIELD_STATUS"), translate("general/minecraft:ONLINE"))
			.addField(translate("general/minecraft:FIELD_IP"), json.connect)
			.setColor(data.config.embed.color)
			.setThumbnail(favicon)
			.setFooter(data.config.embed.footer);

		m.edit({ embeds: [mcEmbed], files: [imgAttachment] });

	}

};
