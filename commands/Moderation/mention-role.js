const Command = require("../../base/Command.js"),
Discord = require("discord.js");

class MentionRole extends Command {

    constructor (client) {
        super(client, {
            name: "mention-role",
            description: (language) => language.get("MENTIONROLE_DESCRIPTION"),
            usage: (language) => language.get("MENTIONROLE_USAGE"),
            examples: (language) => language.get("MENTIONROLE_EXAMPLES"),
            dirname: __dirname,
            enabled: true,
            guildOnly: true,
            aliases: [ "ml" ],
            memberPermissions: [ "MENTION_EVERYONE" ],
            botPermissions: [ "MANAGE_ROLES" ],
            nsfw: false,
            ownerOnly: false,
            cooldown: 3000
        });
    }

    async run (message, args, data) {

        if(!args[0]){
            return message.channel.send(message.language.get("MENTIONROLE_NOT_FOUND"));
        }
        
        const role = await this.client.resolveRole(args.join(" "), message.guild);
        if(!role){
            return message.channel.send(message.language.get("ERR_ROLE_NOT_FOUND", args.join(" ")));
        }

        await role.setMentionable(true);
        await message.delete();
        await message.channel.send(role.toString());
        await role.setMentionable(false);

    }

}

module.exports = MentionRole;
