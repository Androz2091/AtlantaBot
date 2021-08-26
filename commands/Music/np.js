const Command = require("../../base/Command.js"),
	Discord = require("discord.js");

module.exports = class extends Command {

	constructor (client) {
		super(client, {
			name: "np",
			dirname: __dirname,
			enabled: true,
			guildOnly: true,
			aliases: [ "nowplaying", "now-playing" ],
			memberPermissions: [],
			botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],
			nsfw: false,
			ownerOnly: false,
			cooldown: 5000
		});
	}

	async run (interaction, translate, data) {

		const queue = this.client.player.getQueue(message);

		const voice = message.member.voice.channel;
		if (!voice){
			return interaction.reply({
				content: translate("music/play:NO_VOICE_CHANNEL"),
				ephemeral: true
			});
		}

		if(!queue){
			return interaction.reply({
				content: translate("music/play:NOT_PLAYING"),
				ephemeral: true
			});
		}

		// Gets the current song
		const track = await this.client.player.nowPlaying(message);

		// Generate discord embed to display song informations
		const embed = new Discord.MessageEmbed()
			.setAuthor(translate("music/np:CURRENTLY_PLAYING"))
			.setThumbnail(track.thumbnail)
			.addField(translate("music/np:T_TITLE"), track.title, true)
			.addField(translate("music/np:T_CHANNEL"), track.author, true)
			.addField(translate("music/np:T_DURATION"), message.convertTime(Date.now()+track.durationMS, "to", true), true)
			.addField(translate("music/np:T_DESCRIPTION"),
				track.description ?
					(track.description.substring(0, 150)+"\n"+(translate("common:AND_MORE").toLowerCase())) : translate("music/np:NO_DESCRIPTION"), true)
			.addField("\u200B", this.client.player.createProgressBar(message, { timecodes: true }))
			.setTimestamp()
			.setColor(data.config.embed.color)
			.setFooter(data.config.embed.footer);
        
		// Send the embed in the current channel
		message.channel.send({ embeds: [embed] });
        
	}

};
