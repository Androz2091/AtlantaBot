const Command = require("../../base/Command.js"),
	ms = require("ms");

module.exports = class extends Command {

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
			cooldown: 3000
		});
	}

	async run (interaction, translate, data) {

		const channel = message.mentions.channels.filter((ch) => ch.type === "text" && ch.guild.id === interaction.guild.id).first();
		if(!channel){
			return interaction.reply({
				content: translate("misc:INVALID_CHANNEL"),
				ephemeral: true
			});
		}
		const time = args[1];
		if(!time){
			if(!data.guildData.slowmode.channels.find((ch) => ch.id === channel.id)){
				return interaction.reply({
					content: translate("misc:INVALID_TIME"),
					ephemeral: true
				});
			}
			data.guildData.slowmode.channels = data.guildData.slowmode.channels.filter((ch) => ch.id !== channel.id);
			data.guildData.markModified("slowmode.channels");
			data.guildData.save();
			message.success("administration/slowmode:DISABLED", {
				prefix: data.guildData.prefix,
				channel: `#${channel.name}`
			});
		} else {
			if(isNaN(ms(time))){
				return interaction.reply({
					content: translate("misc:INVALID_TIME"),
					ephemeral: true
				});
			}
			if(data.guildData.slowmode.channels.find((ch) => ch.id === channel.id)){
				data.guildData.slowmode.channels = data.guildData.slowmode.channels.filter((ch) => ch.id !== channel.id);
			}
			data.guildData.slowmode.channels.push({
				id: channel.id,
				time: ms(time)
			});
			data.guildData.markModified("slowmode.channels");
			data.guildData.save();
			message.success("administration/slowmode:ENABLED", {
				prefix: data.guildData.prefix,
				channel: `#${channel.name}`,
				time: this.client.functions.convertTime(message.guild, ms(time))
			});
		}
	}
};
