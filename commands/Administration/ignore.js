const Command = require("../../base/Command.js");

class Ignore extends Command {

	constructor (client) {
		super(client, {
			name: "ignore",
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

	async run (interaction, data) {

		const channel = interaction.mentions.channels.filter((ch) => ch.type === "text" && ch.guild.id === interaction.guild.id).first();
		if(!channel){
			return interaction.error("misc:INVALID_CHANNEL");
		}

		const ignored = data.guild.ignoredChannels.includes(channel.id);

		if(ignored){
			data.guild.ignoredChannels = data.guild.ignoredChannels.filter((ch) => ch !== channel.id);
			data.guild.save();
			return interaction.success("administration/ignore:ALLOWED", {
				channel: channel.toString()
			});
		} else if(!ignored){
			data.guild.ignoredChannels.push(channel.id);
			data.guild.save();
			return interaction.success("administration/ignore:IGNORED", {
				channel: channel.toString()
			});
		}
        
	}

}

module.exports = Ignore;