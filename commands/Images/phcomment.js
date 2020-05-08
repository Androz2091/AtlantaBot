const Command = require("../../base/Command.js"),
Discord = require("discord.js"),
fetch = require("node-fetch");

class Phcomment extends Command {
    constructor (client) {
        super(client, {
            name: "phcomment",
            dirname: __dirname,
            enabled: true,
            guildOnly: false,
            aliases: [],
            memberPermissions: [],
            botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS", "ATTACH_FILES" ],
            nsfw: false,
            ownerOnly: false,
            cooldown: 5000
        });
    }

    async run (message, args, data) {

        let user = await this.client.resolveUser(args[0]);
        let text = args.join(" ");

        if(user){
            text = args.slice(1).join(" ");
        } else {
            user = message.author;
        }

        if(!text){
            return message.error("images/phcomment:MISSING_TEXT");
        }

        let m = await message.sendT("misc:PLEASE_WAIT", null, false, false, "loading");
        try {
            let res = await fetch(encodeURI(`https://nekobot.xyz/api/imagegen?type=phcomment&username=${user.username}&image=${user.displayAvatarURL({ format: "png", size: 512 })}&text=${text}`));
            let json = await res.json();
            let attachment = new Discord.MessageAttachment(json.message, "phcomment.png");
            message.channel.send(attachment);
            m.delete();
        } catch(e){
            console.log(e);
            m.error("misc:ERROR_OCCURRED", null, true);
        }

    }

}

module.exports = Phcomment;