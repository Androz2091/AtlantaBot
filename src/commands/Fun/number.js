const Command = require("../../structures/Command"),
    Constants = require("../../utility/Constants"),
    Discord = require("discord.js");

let currentGames = {};

module.exports = class extends Command {
    constructor(...args) {
        super(
            {
                permission: Constants.PermissionsLevels.SERVER_MEMBER
            },
            ...args
        );
    }

    async execute(message) {
        if (currentGames[message.guild.id]) {
            return message.error("fun/number:GAME_RUNNING");
        }

        const participants = [];
        const number = Math.floor(Math.random() * 3000);

        await message.sendT("fun/number:GAME_START");

        // Store the date wich the game has started
        const gameCreatedAt = Date.now();

        const collector = new Discord.MessageCollector(
            message.channel,
            m => !m.author.bot,
            {
                time: 480000 // 8 minutes
            }
        );
        currentGames[message.author.id] = message.author.id;

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
                const time = this.client.helpers.convertTime.execute(
                    message.guild,
                    Date.now() - gameCreatedAt
                );
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
                //const winnerData = await this.client.handlers.database.getMember();
                //userdata.money = userdata.money + 10;
                //userdata.save();
                collector.stop(msg.author.username);
            }
            if (parseInt(msg.content) < number) {
                message.error("fun/number:BIG", {
                    user: message.author,
                    number: parsedNumber
                });
            }
            if (parseInt(msg.content) > number) {
                message.error("fun/number:SMALL", {
                    user: message.author,
                    number: parsedNumber
                });
            }
        });

        collector.on("end", (_collected, reason) => {
            delete currentGames[message.guild.id];
            if (reason === "time") {
                return message.error("fun/number:DEFEAT", { number });
            }
        });
    }
};
