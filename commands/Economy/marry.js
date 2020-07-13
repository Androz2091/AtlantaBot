const Command = require("../../base/Command.js"),
	Discord = require("discord.js");

// An object to store pending requests
const pendings = {};

class Marry extends Command {

	constructor (client) {
		super(client, {
			name: "marry",
			dirname: __dirname,
			enabled: true,
			guildOnly: true,
			aliases: [ "mariage" ],
			memberPermissions: [],
			botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],
			nsfw: false,
			ownerOnly: false,
			cooldown: 10000
		});
	}

	async run (message, args, data) {
        
		// if the message author is already wedded
		if(data.userData.lover){
			return message.error("economy/marry:ALREADY_MARRIED", {
				prefix: data.guild.prefix
			});
		}

		// Gets the first mentionned member
		const member = await this.client.resolveMember(args[0], message.guild);
		if(!member){
			return message.error("economy/marry:INVALID_MEMBER");
		}

		const userData = await this.client.findOrCreateUser({ id: member.id });
		// if the member is already wedded
		if(userData.lover){
			return message.error("economy/marry:ALREADY_MARRIED_USER", {
				username: member.user.tag
			});
		}

		if(member.user.bot){
			return message.error("economy/marry:BOT_USER");
		}

		if(member.id === message.author.id){
			return message.error("economy/marry:YOURSELF");
		}

		for(const requester in pendings){
			const receiver = pendings[requester];
			// If the member already sent a request to someone
			if(requester === message.author.id){
				const user =  this.client.users.cache.get(receiver) || await this.client.users.fetch(receiver);
				return message.error("economy/marry:REQUEST_AUTHOR_TO_AMEMBER", {
					username: user.tag
				});
			} else if (receiver === message.author.id){ // If there is a pending request for this member
				const user =  this.client.users.cache.get(requester) || await this.client.users.fetch(requester);
				return message.error("economy/marry:REQUEST_AMEMBER_TO_AUTHOR", {
					username: user.tag
				});
			} else if(requester === member.id){ // If the asked member has sent pending request
				const user = this.client.users.cache.get(receiver) || await this.client.users.fetch(receiver);
				return message.error("economy/marry:REQUEST_AMEMBER_TO_MEMBER", {
					firstUsername: member.user.tag,
					secondUsername: user.tag
				});
			} else if (receiver === member.id){ // If there is a pending request for the asked member
				const user = this.client.users.cache.get(requester) || await this.client.users.fetch(requester);
				return message.error("economy/marry:REQUEST_MEMBER_TO_AMEMBER", {
					firstUsername: member.user.tag,
					secondUsername: user.tag
				});
			}
		}

		// Update pending requests
		pendings[message.author.id] = member.id;

		message.sendT("economy/marry:REQUEST", {
			from: message.author.toString(),
			to: member.user.toString()
		});

		const collector = new Discord.MessageCollector(message.channel, (m) => m.author.id === member.id, {
			time: 120000
		});
        
		collector.on("collect", (msg) => {
			if(msg.content.toLowerCase() === message.translate("common:YES").toLowerCase()){
				return collector.stop(true);
			}
			if(msg.content.toLowerCase() === message.translate("common:NO").toLowerCase()){
				return collector.stop(false);
			} else {
				return message.error("misc:INVALID_YES_NO");
			}
		});

		collector.on("end", async (_collected, reason) => {
			// Delete pending request 
			delete pendings[message.author.id];
			if(reason === "time"){
				return message.error("economy/marry:TIMEOUT", {
					username: member.user.toString()
				});
			}
			if(reason){
				data.userData.lover = member.id;
				await data.userData.save();
				userData.lover = message.author.id;
				await userData.save();
				const messageOptions = {
					content: `${member.toString()} :heart: ${message.author.toString()}`,
					files: [
						{
							name: "unlocked.png",
							attachment: "./assets/img/achievements/achievement_unlocked3.png"
						}
					]
				};
				let sent = false;
				if(!userData.achievements.married.achieved){
					message.channel.send(messageOptions);
					sent = true;
					userData.achievements.married.achieved = true;
					userData.achievements.married.progress.now = 1;
					userData.markModified("achievements.married");
					userData.save();
				}
				if(!data.userData.achievements.married.achieved){
					if(!sent) message.channel.send(messageOptions);
					data.userData.achievements.married.achieved = true;
					data.userData.achievements.married.progress.now = 1;
					data.userData.markModified("achievements.married");
					data.userData.save();
				}
				return message.success("economy/marry:SUCCESS", {
					creator: message.author.toString(),
					partner: member.user.toString()
				});
			} else {
				return message.success("economy/marry:DENIED", {
					creator: message.author.toString(),
					partner: member.user.toString()
				});
			}

		});
	}

}

module.exports = Marry;