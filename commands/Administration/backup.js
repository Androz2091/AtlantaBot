const Command = require("../../base/Command.js"),
Discord = require("discord.js"),
backup = require("discord-backup"),
moment = require("moment");

class Backup extends Command {

    constructor (client) {
        super(client, {
            name: "backup",
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
            return message.error("administration/backup:MISSING_STATUS");
        }

        if(status === "create"){
            backup.create(message.guild).then((backupID) => {
                message.success("administration/backup:SUCCESS_PUBLIC");
                message.author.send(message.translate("administration/backup:SUCCESS_PRVATE", {
                    backupID
                }));
            }).catch((err) => {
                return message.error("misc:ERR_OCCURRED");
            });
        } else if (status === "load"){
            let backupID = args[1];
            if(!backupID){
                return message.error("administration/backup:MISSING_BACKUP_ID");
            }
            backup.fetch(backupID).then(async () => {
                message.sendT("administration/backup:CONFIRMATION");
                await message.channel.awaitMessages(m => (m.author.id === message.author.id) && (m.content === "-confirm"), {
                    max: 1,
                    time: 20000,
                    errors: ["time"]
                }).catch((err) => {
                    // if the author of the commands does not confirm the backup loading
                    return message.error("administration/backup:TIMES_UP");
                });
                // When the author of the command has confirmed that he wants to load the backup on his server
                message.author.send(message.translate("administration/backup:START_LOADING"));
                // Load the backup
                backup.load(backupID, message.guild).then(() => {
                    // When the backup is loaded, delete them from the server
                    backup.remove(backupID);
                    message.author.send(message.translate("administration/backup:LOAD_SUCCESS"));
                }).catch((err) => {
                    // If an error occurenced
                    return message.error("misc:ERR_OCCURRED");
                });
            }).catch((err) => {
                // if the backup wasn't found
                return message.error("administration/backup:NO_BACKUP_FOUND", {
                    backupID
                });
            });
        } else if (status === "infos"){
            let backupID = args[1];
            if(!backupID){
                return message.error("administration/backup:MISSING_BACKUP_ID");
            }
            backup.fetch(backupID).then(async (backupInfos) => {
                let embed = new Discord.MessageEmbed()
                    .setAuthor(message.translate("administration/backup:TITLE_INFOS"))
                    // Display the backup ID
                    .addField(message.translate("administration/backup:TITLE_ID"), backupInfos.id, true)
                    // Displays the server from which this backup comes
                    .addField(message.translate("administration/backup:TITLE_SERVER_ID"), backupInfos.data.guildID, true)
                    // Display the size (in mb) of the backup
                    .addField(message.translate("administration/backup:TITLE_SIZE"), backupInfos.size+" mb", true)
                    // Display when the backup was created
                    .addField(message.translate("administration/backup:TITLE_CREATED_AT"), message.printDate(new Date(backupInfos.data.createdTimestamp)), true)
                    .setColor(data.config.embed.color)
                    .setFooter(data.config.embed.footer);
                message.channel.send(embed);
            }).catch((err) => {
                // if the backup wasn't found
                return message.error("administration/backup:NO_BACKUP_FOUND", {
                    backupID
                });
            });
        } else {
            return message.error("administration/backup:MISSING_STATUS");
        }
        
    }

}

module.exports = Backup;