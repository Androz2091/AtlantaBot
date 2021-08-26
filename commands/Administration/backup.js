const Command = require("../../base/Command.js"),
	Discord = require("discord.js"),
	backup = require("discord-backup"),
	Sentry = require("@sentry/node");

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

	async run (interaction, translate, data) {

		const status = args[0];
		if(!status){
			return interaction.reply({
				content: translate("administration/backup:MISSING_STATUS"),
				ephemeral: true
			});
		}

		if(status === "create"){
			const m = await message.sendT("misc:PLEASE_WAIT", null, {
				prefixEmoji: "loading"
			});
			backup.create(message.guild).then((backup) => {
				m.delete();
				interaction.reply({
					content: translate("administration/backup:SUCCESS_PUBLIC")
				});
				interaction.user.send(translate("administration/backup:SUCCESS_PRIVATE", {
					backupID: backup.id
				})).catch(() => {
					backup.remove(backup.id);
					interaction.reply({
						content: translate("misc:CANNOT_DM"),
						ephemeral: true
					});
				});
			}).catch((err) => {
				Sentry.captureException(err);
				return interaction.reply({
					content: translate("misc:ERR_OCCURRED"),
					ephemeral: true
				});
			});
		} else if (status === "load"){
			const backupID = args[1];
			if(!backupID){
				return interaction.reply({
					content: translate("administration/backup:MISSING_BACKUP_ID"),
					ephemeral: true
				});
			}
			backup.fetch(backupID).then(async () => {
				interaction.reply({
					content: translate("administration/backup:CONFIRMATION")
				});
				await message.channel.awaitMessages(m => (m.author.id === interaction.user.id) && (m.content === "-confirm"), {
					max: 1,
					time: 20000,
					errors: ["time"]
				}).catch(() => {
					// if the author of the commands does not confirm the backup loading
					return interaction.reply({
						content: translate("administration/backup:TIMES_UP"),
						ephemeral: true
					});
				});
				// When the author of the command has confirmed that he wants to load the backup on his server
				interaction.user.send(translate("administration/backup:START_LOADING"));
				// Load the backup
				backup.load(backupID, message.guild).then(() => {
					// When the backup is loaded, delete them from the server
					backup.remove(backupID);
					interaction.user.send(translate("administration/backup:LOAD_SUCCESS"));
				}).catch((err) => {
					Sentry.captureException(err);
					// If an error occurenced
					return interaction.reply({
						content: translate("misc:ERR_OCCURRED"),
						ephemeral: true
					});
				});
			}).catch(() => {
				// if the backup wasn't found
				return message.error("administration/backup:NO_BACKUP_FOUND", {
					backupID
				});
			});
		} else if (status === "info"){
			const backupID = args[1];
			if(!backupID){
				return interaction.reply({
					content: translate("administration/backup:MISSING_BACKUP_ID"),
					ephemeral: true
				});
			}
			backup.fetch(backupID).then(async (backupInfos) => {
				const embed = new Discord.MessageEmbed()
					.setAuthor(translate("administration/backup:TITLE_INFOS"))
					// Display the backup ID
					.addField(translate("administration/backup:TITLE_ID"), backupInfos.id, true)
					// Displays the server from which this backup comes
					.addField(translate("administration/backup:TITLE_SERVER_ID"), backupInfos.data.guildID, true)
					// Display the size (in mb) of the backup
					.addField(translate("administration/backup:TITLE_SIZE"), backupInfos.size+" mb", true)
					// Display when the backup was created
					.addField(translate("administration/backup:TITLE_CREATED_AT"), message.printDate(new Date(backupInfos.data.createdTimestamp)), true)
					.setColor(data.config.embed.color)
					.setFooter(data.config.embed.footer);
				message.channel.send({ embeds: [embed] });
			}).catch(() => {
				// if the backup wasn't found
				return message.error("administration/backup:NO_BACKUP_FOUND", {
					backupID
				});
			});
		} else {
			return interaction.reply({
				content: translate("administration/backup:MISSING_STATUS"),
				ephemeral: true
			});
		}
        
	}

}

module.exports = Backup;