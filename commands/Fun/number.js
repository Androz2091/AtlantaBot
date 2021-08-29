const Command = require("../../base/Command.js"),
	Discord = require("discord.js");

const currentGames = {};

module.exports = class extends Command {

	constructor (client) {
		super(client, {
			name: "number",
			dirname: __dirname,
			enabled: true,
			guildOnly: true,
			,
			memberPermissions: [],
			botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],
			nsfw: false,
			ownerOnly: false,
			cooldown: 5000
		});
	}

	async run (message) {

		if (currentGames[interaction.guild.id]) {
			return interaction.reply({
				content: translate("fun/number:GAME_RUNNING"),
				ephemeral: true
			});
		}

		const participants = [];
		const number = Math.floor(Math.random() * 3000);

		await interaction.reply({
			content: translate("fun/number:GAME_START")
		});

		// Store the date wich the game has started
		const gameCreatedAt = Date.now();

		const collector = new Discord.MessageCollector(
			message.channel,
			m => !m.author.bot,
			{
				time: 480000 // 8 minutes
			}
		);
		currentGames[interaction.guild.id] = true;

		collector.on("collect", async msg => {
			if (!participants.includes(msg.author.id)) {
				participants.push(msg.author.id);
			}

			// if it's not a number, return
			if (isNaN(msg.content)) {
				return;
			}

			const parsedNumber = parseInt(msg.content, 10);

			if (parsedNumber === number) {
				const time = this.client.functions.convertTime(message.guild, Date.now()-gameCreatedAt);
				message.sendT("fun/number:GAME_STATS", {
					winner: msg.author.toString(),
					number,
					time,
					participantCount: participants.length,
					participants: participants.map(p => `<@${p}>`).join("\n")
				});
				message.sendT("fun/number:WON", {
					winner: msg.author.toString()
				});
				const userdata = await this.client.findOrCreateMember({ id: msg.author.id, guildID: interaction.guild.id });
				userdata.money = userdata.money + 10;
				userdata.save();
				collector.stop(msg.author.username);
			}
			if (parseInt(msg.content) < number) {
				message.error("fun/number:BIG", {
					user: msg.author.toString(),
					number: parsedNumber
				});
			}
			if (parseInt(msg.content) > number) {
				message.error("fun/number:SMALL", {
					user: msg.author.toString(),
					number: parsedNumber
				});
			}
		});

		collector.on("end", (_collected, reason) => {
			delete currentGames[interaction.guild.id];
			if (reason === "time") {
				return interaction.reply({
					content: translate("fun/number:DEFEAT", { number }),
					ephemeral: true
				});
			}
		});
	}

};
