const Command = require("../../base/Command.js"),
	Discord = require("discord.js");

// An object to store pending requests
const pendings = {};

module.exports = class extends Command {

	constructor (client) {
		super(client, {
			name: "marry",

			options: [
				{
					name: "user",
					type: "USER",
					required: true
				}
			],

			enabled: true,
			guildOnly: true,
			aliases: [ "mariage" ],
			memberPermissions: [],
			botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],
			nsfw: false,
			ownerOnly: false,

			dirname: __dirname
		});
	}

	async run (interaction, translate, data) {
        
		// if the message author is already wedded
		if(data.userData.lover){
			return interaction.reply({
				content: translate("economy/marry:ALREADY_MARRIED", {
					prefix: data.guild.prefix
				}),
				ephemeral: true
			});
		}

		const user = interaction.options.getUser("user");

		const userData = await this.client.findOrCreateUser({ id: user.id });
		// if the member is already wedded
		if(userData.lover){
			return interaction.reply({
				content: translate("economy/marry:ALREADY_MARRIED_USER", {
					username: user.tag
				}),
				ephemeral: true
			});
		}

		if(user.bot){
			return interaction.reply({
				content: translate("economy/marry:BOT_USER"),
				ephemeral: true
			});
		}

		if(user.id === interaction.user.id){
			return interaction.reply({
				content: translate("economy/marry:YOURSELF"),
				ephemeral: true
			});
		}

		for(const requester in pendings){
			const receiver = pendings[requester];
			// If the member already sent a request to someone
			if(requester === interaction.user.id){
				const user =  this.client.users.cache.get(receiver) || await this.client.users.fetch(receiver);
				return interaction.reply({
					content: translate("economy/marry:REQUEST_AUTHOR_TO_AMEMBER", {
						username: user.tag
					}),
					ephemeral: true
				});
			} else if (receiver === interaction.user.id){ // If there is a pending request for this member
				const user = this.client.users.cache.get(requester) || await this.client.users.fetch(requester);
				return interaction.reply({
					content: translate("economy/marry:REQUEST_AMEMBER_TO_AUTHOR", {
						username: user.tag
					}),
					ephemeral: true
				});
			} else if(requester === user.id){ // If the asked member has sent pending request
				const user = this.client.users.cache.get(receiver) || await this.client.users.fetch(receiver);
				return interaction.reply({
					content: translate("economy/marry:REQUEST_AMEMBER_TO_MEMBER", {
						firstUsername: user.tag,
						secondUsername: user.tag
					}),
					ephemeral: true
				});
			} else if (receiver === user.id){ // If there is a pending request for the asked member
				const user = this.client.users.cache.get(requester) || await this.client.users.fetch(requester);
				return interaction.reply({
					content: translate("economy/marry:REQUEST_MEMBER_TO_AMEMBER", {
						firstUsername: user.tag,
						secondUsername: user.tag
					}),
					ephemeral: true
				});
			}
		}

		// Update pending requests
		pendings[interaction.user.id] = user.id;

		interaction.channel.send({
			content: translate("economy/marry:REQUEST", {
				from: interaction.user.toString(),
				to: user.toString()
			})
		});

		const collector = new Discord.MessageCollector(interaction.channel, (m) => m.author.id === user.id, {
			time: 120000
		});
        
		collector.on("collect", (msg) => {
			if(msg.content.toLowerCase() === translate("common:YES").toLowerCase()){
				return collector.stop(true);
			}
			if(msg.content.toLowerCase() === translate("common:NO").toLowerCase()){
				return collector.stop(false);
			} else {
				return interaction.channel.send({
					content: translate("misc:INVALID_YES_NO"),
					ephemeral: true
				});
			}
		});

		collector.on("end", async (_collected, reason) => {
			// Delete pending request 
			delete pendings[interaction.user.id];
			if(reason === "time"){
				return interaction.channel.send({
					content: translate("economy/marry:TIMEOUT", {
						username: user.toString()
					})
				});
			}
			if(reason){
				data.userData.lover = user.id;
				await data.userData.save();
				userData.lover = interaction.user.id;
				await userData.save();
				const messageOptions = {
					content: `${user.toString()} :heart: ${interaction.user.toString()}`,
					files: [
						{
							name: "unlocked.png",
							attachment: "./assets/img/achievements/achievement_unlocked3.png"
						}
					]
				};
				let sent = false;
				if(!userData.achievements.married.achieved){
					interaction.channel.send(messageOptions);
					sent = true;
					userData.achievements.married.achieved = true;
					userData.achievements.married.progress.now = 1;
					userData.markModified("achievements.married");
					userData.save();
				}
				if(!data.userData.achievements.married.achieved){
					if(!sent) interaction.channel.send(messageOptions);
					data.userData.achievements.married.achieved = true;
					data.userData.achievements.married.progress.now = 1;
					data.userData.markModified("achievements.married");
					data.userData.save();
				}
				return interaction.reply({
					content: translate("economy/marry:SUCCESS", {
						creator: interaction.user.toString(),
						partner: user.toString()
					})
				});
			} else {
				return interaction.reply({
					content: translate("economy/marry:DENIED", {
						creator: interaction.user.toString(),
						partner: user.toString()
					})
				});
			}

		});
	}

};
