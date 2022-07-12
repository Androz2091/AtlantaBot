const Command = require("../../base/Command.js"),
	Discord = require("discord.js");

class Help extends Command {
	constructor (client) {
		super(client, {
			name: "help",
			dirname: __dirname,
			enabled: true,
			guildOnly: false,
			memberPermissions: [],
			botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],
			nsfw: false,
			ownerOnly: false,
			cooldown: 5000,
			options: [
				{
					name: "command",
					description: "the command you want to show",
					type: "STRING"
				}
			]
		});
	}

	async run (interaction, data) {
		let command = interaction.options.getString("command")

		// if a command is provided
		if(command && !command === "undefined" && !command === null && !command === ""){

			const isCustom = (interaction.guild && data.guild.customCommands ? data.guild.customCommands.find((c) => c.name === command) : false);
            
			// if the command doesn't exist, error message
			const cmd = this.client.commands.get(command);
			if(!cmd && isCustom){
				return interaction.error("general/help:CUSTOM", {
					cmd: command
				});
			} else if(!cmd){
				return interaction.error("general/help:NOT_FOUND", {
					search: command
				});
			}

			const description = interaction.translate(`${cmd.help.category.toLowerCase()}/${cmd.help.name}:DESCRIPTION`);
			const usage = interaction.translate(`${cmd.help.category.toLowerCase()}/${cmd.help.name}:USAGE`, {
				prefix: interaction.guild
					? data.guild.prefix
					: ""
			}
			);
			const examples = interaction.translate(`${cmd.help.category.toLowerCase()}/${cmd.help.name}:EXAMPLES`, {
				prefix: interaction.guild
					? data.guild.prefix
					: ""
			}
			);

			// Creates the help embed
			const groupEmbed = new Discord.MessageEmbed()
				.setAuthor(
					interaction.translate("general/help:CMD_TITLE", {
						prefix: interaction.guild
							? data.guild.prefix
							: "",
						cmd: cmd.help.name
					})
				)
				.addField(
					interaction.translate("general/help:FIELD_DESCRIPTION"),
					description
				)
				.addField(interaction.translate("general/help:FIELD_USAGE"), usage)
				.addField(
					interaction.translate("general/help:FIELD_EXAMPLES"),
					examples
				)
				.addField(
					interaction.translate("general/help:FIELD_PERMISSIONS"),
					cmd.conf.memberPermissions.length > 0
						? cmd.conf.memberPermissions.map((p) => "`"+p+"`").join("\n")
						: interaction.translate("general/help:NO_REQUIRED_PERMISSION")
				)
				.setColor(this.client.config.embed.color)
				.setFooter(this.client.config.embed.footer);

			// and send the embed in the current channel
			return interaction.reply({ embeds: [groupEmbed] });
		}

		const categories = [];
		const commands = this.client.commands.filter((c) => c.conf.enabled);

		commands.forEach((command) => {
			if(!categories.includes(command.help.category)){
				if(command.help.category === "Owner" && interaction.member.user.id !== this.client.config.owner.id){
					return;
				}
				categories.push(command.help.category);
			}
		});

		const emojis = this.client.customEmojis;

		const embed = new Discord.MessageEmbed()
			.setDescription(interaction.translate("general/help:INFO", {
				prefix: interaction.guild
					? data.guild.prefix
					: ""
			}))
			.setColor(data.config.embed.color)
			.setFooter(data.config.embed.footer);
		categories.sort().forEach((cat) => {
			const tCommands = commands.filter((cmd) => cmd.help.category === cat);
			embed.addField(emojis.categories[cat.toLowerCase()]+" "+cat+" - ("+tCommands.size+")", tCommands.map((cmd) => "`"+cmd.help.name+"`").join(", "));
		});
		if(interaction.guild){
			if(data.guild.customCommands.length > 0){
				embed.addField(emojis.categories.custom+" "+interaction.guild.name+" | "+interaction.translate("general/help:CUSTOM_COMMANDS")+" - ("+data.guild.customCommands.length+")", data.guild.customCommands.map((cmd) => "`"+cmd.name+"`").join(", "));
			}
		}
        
		embed.addField("\u200B", interaction.translate("misc:STATS_FOOTER", {
			donateLink: "https://patreon.com/Androz2091",
			dashboardLink: "https://dashboard.atlanta-bot.fr",
			inviteLink: await this.client.generateInvite({
				permissions: [Discord.Permissions.FLAGS.ADMINISTRATOR],	
				scope: [applications.commands]
			}),
			githubLink: "https://github.com/Androz2091",
			supportLink: "https://discord.gg/NPkySYKMkN"
		}));
		embed.setAuthor(interaction.translate("general/help:TITLE", {
			name: this.client.user.username
		}), this.client.user.displayAvatarURL({ size: 512, dynamic: true, format: "png" }));
		return interaction.reply({ embeds: [embed] });
	}

}

module.exports = Help;
