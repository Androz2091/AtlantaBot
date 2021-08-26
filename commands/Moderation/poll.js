const Command = require("../../base/Command.js"),
	Discord = require("discord.js");

class Poll extends Command {

	constructor (client) {
		super(client, {
			name: "poll",
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
        
		const question = args.join(" ");
		if(!question){
			return interaction.reply({
				content: translate("moderation/poll:MISSING_QUESTION"),
				ephemeral: true
			});
		}

		message.delete().catch(() => {});

		let mention = "";
            
		const msg = await interaction.reply({
			content: translate("moderation/announcement:MENTION_PROMPT")
		});

		const collector = new Discord.MessageCollector(message.channel, (m) => m.author.id === message.author.id, { time: 240000 });
            
		collector.on("collect", async (tmsg) => {
    
			if(tmsg.content.toLowerCase() === message.translate("common:NO").toLowerCase()){
				tmsg.delete();
				msg.delete();
				collector.stop(true);
			}
            
			if(tmsg.content.toLowerCase() === message.translate("common:YES").toLowerCase()){
				tmsg.delete();
				msg.delete();
				const tmsg1 = await interaction.reply({
					content: translate("moderation/announcement:MENTION_TYPE_PROMPT")
				});
				const c = new Discord.MessageCollector(message.channel, (m) => m.author.id === message.author.id, { time: 60000 });
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
    
			const success = this.client.customEmojis.success.split(":")[1];
			const error = this.client.customEmojis.error.split(":")[1];

			const emojis = [
				this.client.emojis.cache.find((e) => e.name === success),
				this.client.emojis.cache.find((e) => e.name === error)
			];

			const embed = new Discord.MessageEmbed()
				.setAuthor(message.translate("moderation/poll:TITLE"))
				.setColor(data.config.embed.color)
				.addField(question, message.translate("moderation/poll:REACT", {
					success: emojis[0].toString(),
					error: emojis[1].toString()
				}));
            
			message.channel.send({ content: mention, embeds: [embed] }).then(async (m) => {
				await m.react(emojis[0]);
				await m.react(emojis[1]);
			});
		});

	}

}

module.exports = Poll;