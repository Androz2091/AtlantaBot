const Command = require("../../base/Command.js"),
	Discord = require("discord.js"),
	// Sentry = require("@sentry/node"),
	backup = require("discord-backup");

class Backup extends Command {

	constructor (client) {
		super(client, {
			name: "backup",
			dirname: __dirname,
			enabled: true,
			guildOnly: true,
			memberPermissions: [ "MANAGE_GUILD" ],
			botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS", "ADMINISTRATOR" ],
			nsfw: false,
			ownerOnly: false,
			cooldown: 30000,
			options: [
				{
					name: "status",
					required: true,
					description: "the status (create/load/info)",
					type: "STRING"
				},
				{
					name: "id",
					description: "the id of a backup (info/load)",
					type: "STRING"
				}
			]
		});
	}

	async run (interaction, data) {

		const status = interaction.options.getString("status");
		if(!status){
			return interaction.error("administration/backup:MISSING_STATUS");
		}

		if(status === "create"){
			const m = await interaction.replyT("misc:PLEASE_WAIT", null, {
				prefixEmoji: "loading"
			});
			backup.create(interaction.guild).then((backup) => {
				m.deleteReply();
				interaction.success("administration/backup:SUCCESS_PUBLIC");
				interaction.reply(interaction.translate("administration/backup:SUCCESS_PRIVATE", {
					backupID: backup.id
				})).catch(() => {
					backup.remove(backup.id);
					interaction.error("misc:CANNOT_DM");
				});
			}).catch((err) => {
				// Sentry.captureException(err);
				console.error(err);
				return interaction.error("misc:ERR_OCCURRED");
			});
		} else if (status === "load"){
			const backupID = interaction.options.getString("id");
			if(!backupID){
				return interaction.error("administration/backup:MISSING_BACKUP_ID");
			}
			backup.fetch(backupID).then(async () => {
				interaction.replyT("administration/backup:CONFIRMATION");
				await interaction.channel.awaitMessages(m => (m.author.id === interaction.member.user.id) && (m.content === "-confirm"), {
					max: 1,
					time: 20000,
					errors: ["time"]
				}).catch(() => {
					// if the author of the commands does not confirm the backup loading
					return interaction.error("administration/backup:TIMES_UP");
				});
				// When the author of the command has confirmed that he wants to load the backup on his server
				interaction.reply(interaction.translate("administration/backup:START_LOADING"));
				// Load the backup
				backup.load(backupID, interaction.guild).then(() => {
					// When the backup is loaded, delete them from the server
					backup.remove(backupID);
					interaction.reply(interaction.translate("administration/backup:LOAD_SUCCESS"));
				}).catch((err) => {
					// Sentry.captureException(err);
					// If an error occurenced
					console.error(err);
					return interaction.error("misc:ERR_OCCURRED");
				});
			}).catch(() => {
				// if the backup wasn't found
				return interaction.error("administration/backup:NO_BACKUP_FOUND", {
					backupID
				});
			});
		} else if (status === "info"){
			const backupID = interaction.options.getString("id");
			if(!backupID){
				return interaction.error("administration/backup:MISSING_BACKUP_ID");
			}
			backup.fetch(backupID).then(async (backupInfos) => {
				const embed = new Discord.MessageEmbed()
					.setAuthor(interaction.translate("administration/backup:TITLE_INFOS"))
					// Display the backup ID
					.addField(interaction.translate("administration/backup:TITLE_ID"), backupInfos.id, true)
					// Displays the server from which this backup comes
					.addField(interaction.translate("administration/backup:TITLE_SERVER_ID"), backupInfos.data.guildID, true)
					// Display the size (in mb) of the backup
					.addField(interaction.translate("administration/backup:TITLE_SIZE"), backupInfos.size+" mb", true)
					// Display when the backup was created
					.addField(interaction.translate("administration/backup:TITLE_CREATED_AT"), interaction.printDate(new Date(backupInfos.data.createdTimestamp)), true)
					.setColor(data.config.embed.color)
					.setFooter(data.config.embed.footer);
				interaction.reply({ embeds: [embed] });
			}).catch(() => {
				// if the backup wasn't found
				return interaction.error("administration/backup:NO_BACKUP_FOUND", {
					backupID
				});
			});
		} else {
			return interaction.error("administration/backup:MISSING_STATUS");
		}
        
	}

}

module.exports = Backup;