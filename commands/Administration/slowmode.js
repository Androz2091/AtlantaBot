const Command = require("../../base/Command.js"),
	ms = require("ms");

class Slowmode extends Command {

	constructor (client) {
		super(client, {
			name: "slowmode",
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
					name: "duration",
					required: true,
					description: "the duration of the slowmode",
					type: "STRING"
				}
			]
		});
	}

	async run (interaction, data) {

		const channel = interaction.mentions.channels.filter((ch) => ch.type === "text" && ch.guild.id === interaction.guild.id).first();
		if(!channel){
			return interaction.error("misc:INVALID_CHANNEL");
		}
		const time = interaction.options.getString("duration");
		if(!time){
			if(!data.guild.slowmode.channels.find((ch) => ch.id === channel.id)){
				return interaction.error("misc:INVALID_TIME");
			}
			data.guild.slowmode.channels = data.guild.slowmode.channels.filter((ch) => ch.id !== channel.id);
			data.guild.markModified("slowmode.channels");
			data.guild.save();
			interaction.success("administration/slowmode:DISABLED", {
				prefix: data.guild.prefix,
				channel: `#${channel.name}`
			});
		} else {
			if(isNaN(ms(time))){
				return interaction.error("misc:INVALID_TIME");
			}
			if(data.guild.slowmode.channels.find((ch) => ch.id === channel.id)){
				data.guild.slowmode.channels = data.guild.slowmode.channels.filter((ch) => ch.id !== channel.id);
			}
			data.guild.slowmode.channels.push({
				id: channel.id,
				time: ms(time)
			});
			data.guild.markModified("slowmode.channels");
			data.guild.save();
			interaction.success("administration/slowmode:ENABLED", {
				prefix: data.guild.prefix,
				channel: `#${channel.name}`,
				time: this.client.functions.convertTime(interaction.guild, ms(time))
			});
		}
	}
}

module.exports = Slowmode;
