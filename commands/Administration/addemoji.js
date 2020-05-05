const Command = require("../../base/Command.js"),
Discord = require("discord.js");

class Addemote extends Command {

    constructor (client) {
        super(client, {
            name: "addemote",
            description: (language) => language.get("ADDEMOTE_DESCRIPTION"),
            usage: (language) => language.get("ADDEMOTE_USAGE"),
            examples: (language) => language.get("ADDEMOTE_EXAMPLES"),
            dirname: __dirname,
            enabled: true,
            guildOnly: true,
            aliases: [],
            memberPermissions: [ "MANAGE_GUILD" ],
            botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],
            nsfw: false,
            ownerOnly: false,
            cooldown: 5000
        });
    }

    async run (message, args, data) {

        const URL = args[0];
        if (!URL) {
            return message.error("administration/addemoji:MISSING_URL");
        }

        const name = args[1].replace(/[^a-z0-9]/gi, "");
        if (!name) {
            return message.error("administration/addemoji:MISSING_NAME");
        }

        message.guild.emojis
            .create(URL, name)
            .then(emoji => {
                message.success("administration/addemoji:SUCCESS", {
                    emojiName: emoji.name,
                    emojiString: emoji.toString()
                });
            })
            .catch(() => {
                message.error("administration/addemoji:ERROR");
            });
    }

}

module.exports = Addemote;