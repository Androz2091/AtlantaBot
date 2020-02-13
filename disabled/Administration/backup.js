const Command = require("../../base/Command.js"),
Discord = require("discord.js"),
backup = require("discord-backup");

class Backup extends Command {

    constructor (client) {
        super(client, {
            name: "backup",
            description: (language) => language.get("BACKUP_DESCRIPTION"),
            usage: (language) => language.get("BACKUP_USAGE"),
            examples: (language) => language.get("BACKUP_EXAMPLES"),
            dirname: __dirname,
            enabled: true,
            guildOnly: true,
            aliases: [ "sauvegarde" ],
            memberPermissions: [ "MANAGE_GUILD" ],
            botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS", "ADMINISTRATOR" ],
            nsfw: false,
            ownerOnly: false,
            cooldown: 30000
        });
    }

    async run (message, args, data) {

        let status = args[0];
        if(!status){
            return message.channel.send(message.language.get("BACKUP_ERR_STATUS"));
        }

        if(status === "create"){
            backup.create(message.guild).then((backupID) => {
                message.channel.send(message.language.get("BACKUP_CREATE_SUCCESS"));
                message.author.send(message.language.get("BACKUP_CREATE_SUCCESS_ID", backupID))
            }).catch((err) => {
                return message.channel.send(message.language.get("ERR_OCCURENCED"));
            });
        } else if (status === "load"){
            let backupID = args[1];
            if(!backupID){
                return message.channel.send(message.language.get("BACKUP_ERR_ID"));
            }
            backup.fetch(backupID).then(async () => {
                message.channel.send(message.language.get("BACKUP_CONFIRMATION"));
                await message.channel.awaitMessages(m => (m.author.id === message.author.id) && (m.content === "-confirm"), {
                    max: 1,
                    time: 20000,
                    errors: ["time"]
                }).catch((err) => {
                    // if the author of the commands does not confirm the backup loading
                    return message.channel.send(message.language.get("BACKUP_ERR_TIMEOUT"));
                });
                // When the author of the command has confirmed that he wants to load the backup on his server
                message.author.send(message.language.get("BACKUP_START_SAVING"));
                // Load the backup
                backup.load(backupID, message.guild).then(() => {
                    // When the backup is loaded, delete them from the server
                    backup.remove(backupID);
                    message.author.send(message.language.get("BACKUP_LOAD_SUCCESS"));
                }).catch((err) => {
                    // If an error occurenced
                    return message.author.send(message.language.get("ERR_OCCURENCED"));
                });
            }).catch((err) => {
                // if the backup wasn't found
                return message.channel.send(message.language.get("BACKUP_ERR_NOT_FOUND", backupID));
            });
        } else if (status === "infos"){
            let backupID = args[1];
            if(!backupID){
                return message.channel.send(message.language.get("BACKUP_ERR_ID"));
            }
            backup.fetch(backupID).then(async (backupInfos) => {
                let embed = new Discord.MessageEmbed()
                    .setAuthor(message.language.get("BACKUP_HEADINGS")[0])
                    // Display the backup ID
                    .addField(message.language.get("BACKUP_HEADINGS")[1], backupInfos.id, true)
                    // Displays the server from which this backup comes
                    .addField(message.language.get("BACKUP_HEADINGS")[2], backupInfos.data.guildID, true)
                    // Display the size (in mb) of the backup
                    .addField(message.language.get("BACKUP_HEADINGS")[3], backupInfos.size+" mb", true)
                    // Display when the backup was created
                    .addField(message.language.get("BACKUP_HEADINGS")[4], message.language.printDate(new Date(backupInfos.data.createdTimestamp)), true)
                    .setColor(data.config.embed.color)
                    .setFooter(data.config.embed.footer);
                message.channel.send(embed);
            }).catch((err) => {
                // if the backup wasn't found
                return message.channel.send(message.language.get("BACKUP_ERR_NOT_FOUND", backupID));
            });
        } else {
            return message.channel.send(message.language.get("BACKUP_ERR_STATUS"));
        }
        
    }

}

module.exports = Backup;