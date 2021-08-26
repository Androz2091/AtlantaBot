const Command = require("../../base/Command.js"),
	Discord = require("discord.js");

module.exports = class extends Command {

	constructor (client) {
		super(client, {
			name: "announcement",
			dirname: __dirname,
			enabled: true,
			guildOnly: true,
			aliases: [],
			memberPermissions: [ "MENTION_EVERYONE" ],
			botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],
			nsfw: false,
			ownerOnly: false,
			cooldown: 3000
		});
	}

	async run (interaction, translate, data) {
        
		const text = args.join(" ");
		if(!text){
			return interaction.reply({
				content: translate("moderation/announcement:MISSING_TEXT"),
				ephemeral: true
			});
		}
		if(text.length > 1030){
			return interaction.reply({
				content: translate("moderation/announcement:TOO_LONG"),
				ephemeral: true
			});
		}

		message.delete().catch(() => {});

		let mention = "";
            
		const msg = await interaction.reply({
			content: translate("moderation/announcement:MENTION_PROMPT")
		});

		const collector = new Discord.MessageCollector(message.channel, (m) => m.author.id === interaction.user.id, { time: 240000 });
            
		collector.on("collect", async (tmsg) => {
    
			if(tmsg.content.toLowerCase() === translate("common:NO").toLowerCase()){
				tmsg.delete();
				msg.delete();
				collector.stop(true);
			}
            
			if(tmsg.content.toLowerCase() === translate("common:YES").toLowerCase()){
				tmsg.delete();
				msg.delete();
				const tmsg1 = await interaction.reply({
					content: translate("moderation/announcement:MENTION_TYPE_PROMPT")
				});
				const c = new Discord.MessageCollector(message.channel, (m) => m.author.id === interaction.user.id, { time: 60000 });
				c.on("collect", (m) => {
					if(m.content.toLowerCase() === "here"){
						mention = "@here";
						tmsg1.delete();
						m.delete();
						collector.stop(true);
						c.stop(true);
					} else if(m.content.toLowerCase() === "every"){
						mention = "@everyone";
						tmsg1.delete();
						m.delete();
						collector.stop(true);
						c.stop(true);
					}
				});
				c.on("end", (collected, reason) => {
					if(reason === "time"){
						return interaction.reply({
							content: translate("misc:TIMES_UP"),
							ephemeral: true
						});
					}
				});
			}
		});
    
		collector.on("end", (collected, reason) => {
    
			if(reason === "time"){
				return interaction.reply({
					content: translate("misc:TIMES_UP"),
					ephemeral: true
				});
			}

			const embed = new Discord.MessageEmbed()
				.setAuthor(translate("moderation/announcement:TITLE"))
				.setColor(data.config.embed.color)
				.setFooter(interaction.user.tag)
				.setTimestamp()
				.setDescription(text);
            
			message.channel.send({
				content: mention,
				embeds: [embed],
				allowedMentions: {
					parse: ["users", "everyone", "roles"]
				}
			});
		});

	}

};

