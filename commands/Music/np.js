const Command = require("../../base/Command.js"),
	Discord = require("discord.js");

class Np extends Command {

	constructor (client) {
		super(client, {
			name: "np",
			dirname: __dirname,
			enabled: true,
			guildOnly: true,
			memberPermissions: [],
			botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],
			nsfw: false,
			ownerOnly: false,
			cooldown: 5000
		});
	}

	async run (interaction, data) {

		const queue = this.client.player.getQueue(interaction);

		const voice = interaction.member.voice.channel;
		if (!voice){
			return interaction.error("music/play:NO_VOICE_CHANNEL");
		}

		if(!queue){
			return interaction.error("music/play:NOT_PLAYING");
		}

		// Gets the current song
		const track = await this.client.player.nowPlaying(interaction);

		// Generate discord embed to display song informations
		const embed = new Discord.MessageEmbed()
			.setAuthor(interaction.translate("music/np:CURRENTLY_PLAYING"))
			.setThumbnail(track.thumbnail)
			.addField(interaction.translate("music/np:T_TITLE"), track.title, true)
			.addField(interaction.translate("music/np:T_CHANNEL"), track.author, true)
			.addField(interaction.translate("music/np:T_DURATION"), interaction.convertTime(Date.now()+track.durationMS, "to", true), true)
			.addField(interaction.translate("music/np:T_DESCRIPTION"),
				track.description ?
					(track.description.substring(0, 150)+"\n"+(interaction.translate("common:AND_MORE").toLowerCase())) : interaction.translate("music/np:NO_DESCRIPTION"), true)
			.addField("\u200B", this.client.player.createProgressBar(interaction, { timecodes: true }))
			.setTimestamp()
			.setColor(data.config.embed.color)
			.setFooter(data.config.embed.footer);
        
		// Send the embed in the current channel
		interaction.reply({ embeds: [embed] });
        
	}

}

module.exports = Np;