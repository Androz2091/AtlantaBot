const Command = require("../../base/Command.js"),
Discord = require("discord.js");
 
class Permissions extends Command {
    constructor (client) {
        super(client, {
            name: "permissions",
            description: (language) => language.get("PERMISSIONS_DESCRIPTION"),
            usage: (language) => language.get("PERMISSIONS_USAGE"),
            examples: (language) => language.get("PERMISSIONS_EXAMPLES"),
            dirname: __dirname,
            enabled: true,
            guildOnly: true,
            aliases: [ "perms" ],
            memberPermissions: [],
            botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],
            nsfw: false,
            ownerOnly: false,
            cooldown: 500
        });
    }
 
    async run (message, args, data) {
        let member = message.mentions.members.first() || message.member;
        let permissions = ["ADMINISTRATOR","CREATE_INSTANT_INVITE","KICK_MEMBERS","BAN_MEMBERS","MANAGE_CHANNELS","MANAGE_GUILD","ADD_REACTIONS","VIEW_AUDIT_LOG","PRIORITY_SPEAKER","STREAM","VIEW_CHANNEL","SEND_MESSAGES","SEND_TTS_MESSAGES","MANAGE_MESSAGES","EMBED_LINKS","ATTACH_FILES","READ_MESSAGE_HISTORY","MENTION_EVERYONE","USE_EXTERNAL_EMOJIS","CONNECT","SPEAK","MUTE_MEMBERS","DEAFEN_MEMBERS","MOVE_MEMBERS","USE_VAD","CHANGE_NICKNAME","MANAGE_NICKNAMES","MANAGE_ROLES","MANAGE_WEBHOOKS","MANAGE_EMOJIS"];
        let text = "```\n"+message.language.get("PERMISSIONS_TITLE", member.user.username, message.channel.name)+"\n\n";
        let mPermissions = message.channel.permissionsFor(member);
        let total = {
            denied: 0,
            allowed: 0
        };
        permissions.forEach((perm) => {
            if(!mPermissions.has(perm)){
                text += `${perm} ❌\n`;
                total.denied++;
            } else {
                text += `${perm} ✅\n`;
                total.allowed++;
            }
        });
        text += `\n${total.allowed} ✅ | ${total.denied} ❌`+"\n```";
        message.channel.send(text);
    }
}

module.exports = Permissions;
