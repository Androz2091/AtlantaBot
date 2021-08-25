module.exports = class {
	constructor (client) {
		this.client = client;
	}

	async run (interaction) {

		if (!interaction.isCommand()) return;
    
		let translate = this.client.translations.get("en-US");
		let guildData;
		let memberData;
		if(interaction.guild){
			// Gets guild data
			guildData = await this.client.findOrCreateGuild({ id: interaction.guild.id });
			memberData = await this.client.findOrCreateMember({ id: interaction.user.id, guildID: interaction.guild.id });
			translate = this.client.translations.get(guildData.language);
		}

		const userData = await this.client.findOrCreateUser({ id: interaction.user.id });

		const command = this.client.commands.get(interaction.commandName);
		if (!command) return;

		// TODO: add support for custom slash commands

		if(interaction.guild && guildData.ignoredChannels.includes(interaction.channel.id) && !interaction.member.permissions.has("MANAGE_MESSAGES")){
			interaction.reply({
				content: translate("misc:RESTRICTED_CHANNEL", {
					channel: interaction.channel.toString()
				}),
				ephemeral: true
			});
			return;
		}

		if(command.conf.guildOnly && !interaction.guild){
			return interaction.reply({
				content: translate("misc:GUILD_ONLY"),
				ephemeral: true
			});
		}

		if(interaction.guild){
			let neededPermissions = [];
			if(!command.conf.botPermissions.includes("EMBED_LINKS")){
				command.conf.botPermissions.push("EMBED_LINKS");
			}
			command.conf.botPermissions.forEach((perm) => {
				if(!interaction.channel.permissionsFor(interaction.guild.me).has(perm)){
					neededPermissions.push(perm);
				}
			});
			if(neededPermissions.length > 0){
				return interaction.reply({
					content: translate("misc:MISSING_BOT_PERMS", {
						list: neededPermissions.map((p) => `\`${p}\``).join(", "),
					}),
					ephemeral: true
				});
			}
			neededPermissions = [];
			command.conf.memberPermissions.forEach((perm) => {
				if(!interaction.channel.permissionsFor(interaction.member).has(perm)){
					neededPermissions.push(perm);
				}
			});
			if(neededPermissions.length > 0){
				return interaction.reply({
					content: translate("misc:MISSING_MEMBER_PERMS", {
						list: neededPermissions.map((p) => `\`${p}\``).join(", ")
					}),
					ephemeral: true
				});
			}
			if(!interaction.channel.nsfw && command.conf.nsfw){
				return interaction.reply({
					content: translate("misc:NSFW_COMMAND")
				});
			}
		}

		if(!command.conf.enabled){
			return interaction.reply({
				content: "misc:COMMAND_DISABLED",
				ephemeral: true
			});
		}

		if(command.conf.ownerOnly && interaction.user.id !== this.client.config.owner.id){
			return interaction.reply({
				content: translate("misc:OWNER_ONLY"),
				ephemeral: true
			});
		}

		this.client.logger.log(`${interaction.user.username} (${interaction.user.id}) ran slash command ${command.help.name}`, "cmd");

		const log = new this.client.logs({
			commandName: command.help.name,
			author: { username: interaction.user.username, discriminator: interaction.user.discriminator, id: interaction.user.id },
			guild: { name: interaction.guild ? interaction.guild.name : "dm", id: interaction.guild ? interaction.guild.id : "dm" }
		});
		log.save();

		if(!userData.achievements.firstCommand.achieved){
			userData.achievements.firstCommand.progress.now = 1;
			userData.achievements.firstCommand.achieved = true;
			userData.markModified("achievements.firstCommand");
			await userData.save();
			await interaction.channel.send({ files: [
				{
					name: "unlocked.png",
					attachment: "./assets/img/achievements/achievement_unlocked2.png"
				}
			]});
		}

		try {
			command.run(interaction, translate, { guildData, userData, memberData });
		} catch(e){
			console.error(e);
			return interaction.reply({
				content: translate("misc:ERR_OCCURRED")
			});
		}
	}
};
