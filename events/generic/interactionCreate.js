module.exports = class {
	constructor (client) {
		this.client = client;
	}

	async run (interaction) {
		const data = {};
		//Gets User data
		if (interaction.user) {
			interaction.user.data = data.user = await this.client.database.findOrCreateUser({id: interaction.user.id});
		}

		if(interaction.guild){
			// Gets guild data
			interaction.guild.data = data.guild = await this.client.database.findOrCreateGuild({ id: interaction.guild.id });

			if (interaction.member) {
				// Gets member data
				interaction.member.data = data.member = await this.client.database.findOrCreateMember({ id: interaction.member.id, guildID: interaction.guild.id });
			}
		}



		//If interaction is an application command
		if (interaction.isCommand()) {
			const command = interaction.commandName;

			const cmd = this.client.commands.get(command);

			//If command is run in dm
			if (!interaction.guildId && !interaction.member) {
				if (cmd.conf.guildOnly) {
					return interaction.error("misc:GUILD_ONLY");
				}
			}

			//If command is run in guild
			if (interaction.guildId) {
				const neededPermissions = [];
				if(!cmd.conf.botPermissions.includes("EMBED_LINKS")){
					cmd.conf.botPermissions.push("EMBED_LINKS");
				}
				cmd.conf.botPermissions.forEach((perm) => {
					if(!interaction.channel.permissionsFor(interaction.guild.me).has(perm)){
						neededPermissions.push(perm);
					}
				});
				//console.log(neededPermissions);
				if(neededPermissions.length > 0) {
					return interaction.error("misc:MISSING_BOT_PERMS", {
						list: neededPermissions.map((p) => `\`${p}\``).join(", ")
					});
				}

				if(!interaction.channel.nsfw && cmd.conf.nsfw){
					return interaction.error("misc:NSFW_COMMAND");
				}
			}

			let uCooldown = this.client.cmdCooldown.get(interaction.user.id);
			if(!uCooldown){
				this.client.cmdCooldown.set(interaction.user.id, {});
				uCooldown = this.client.cmdCooldown.get(interaction.user.id);
			}
			const time = uCooldown[cmd.help.name] || 0;
			if(time && (time > Date.now())){
				return interaction.error("misc:COOLDOWNED", {
					seconds: Math.ceil((time-Date.now())/1000)
				});
			}
			uCooldown[cmd.help.name] = Date.now() + cmd.conf.cooldown;
			this.client.cmdCooldown.set(interaction.user.id, uCooldown);

			this.client.logger.log(`${interaction.user.username} (${interaction.user.id}) ran command ${cmd.help.name}`, "cmd");

			if(!data.user.achievements.firstCommand.achieved) {
				data.user.achievements.firstCommand.progress.now = 1;
				data.user.achievements.firstCommand.achieved = true;
				data.user.markModified("achievements.firstCommand");
				await data.user.save();
				await interaction.channel.send({ files: [
					{
						name: "unlocked.png",
						attachment: "./assets/img/achievements/achievement_unlocked2.png"
					}
				]});
			}

			try {
				return cmd.run(interaction, data);
			} catch(e){
				console.error(e);
				return interaction.error("misc:ERR_OCCURRED");
			}
		}
	}
};