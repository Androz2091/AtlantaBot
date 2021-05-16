const { MessageEmbed, Util, Client, Collection, Intents } = require("discord.js");
const { GiveawaysManager } = require("discord-giveaways");
const { Player } = require("discord-player");
const { Client: Joker } = require("blague.xyz");

const util = require("util"),
	AmeClient = require("amethyste-api"),
	path = require("path"),
	moment = require("moment");

moment.relativeTimeThreshold("s", 60);
moment.relativeTimeThreshold("ss", 5);
moment.relativeTimeThreshold("m", 60);
moment.relativeTimeThreshold("h", 60);
moment.relativeTimeThreshold("d", 24);
moment.relativeTimeThreshold("M", 12);

// Creates Atlanta class
class Atlanta extends Client {

	constructor () {
		super({
			intents: [
				Intents.FLAGS.GUILDS,
				Intents.FLAGS.GUILD_MEMBERS,
				Intents.FLAGS.GUILD_MESSAGES,
				Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
				Intents.FLAGS.DIRECT_MESSAGES
			],
			allowedMentions: {
				parse: ["users"]
			}
		});
		this.config = require("../config"); // Load the config file
		this.customEmojis = require("../emojis.json"); // load the bot's emojis
		this.languages = require("../languages/language-meta.json"); // Load the bot's languages
		this.commands = new Collection(); // Creates new commands collection
		this.aliases = new Collection(); // Creates new command aliases collection
		this.logger = require("../helpers/logger"); // Load the logger file
		this.wait = util.promisify(setTimeout); // client.wait(1000) - Wait 1 second
		this.functions = require("../helpers/functions"); // Load the functions file
		this.guildsData = require("../base/Guild"); // Guild mongoose model
		this.usersData = require("../base/User"); // User mongoose model
		this.membersData = require("../base/Member"); // Member mongoose model
		this.logs = require("../base/Log"); // Log mongoose model
		this.dashboard = require("../dashboard/app"); // Dashboard app
		this.queues = new Collection(); // This collection will be used for the music
		this.states = {}; // Used for the dashboard
		this.knownGuilds = [];

		this.databaseCache = {};
		this.databaseCache.users = new Collection();
		this.databaseCache.guilds = new Collection();
		this.databaseCache.members = new Collection();

		this.databaseCache.usersReminds = new Collection(); // members with active reminds
		this.databaseCache.mutedUsers = new Collection(); // members who are currently muted

		if(this.config.apiKeys.amethyste){
			this.AmeAPI = new AmeClient(this.config.apiKeys.amethyste);
		}

		if(this.config.apiKeys.blagueXYZ){
			this.joker = new Joker(this.config.apiKeys.blagueXYZ, {
				defaultLanguage: "en"
			});
		}

		this.player = new Player(this, {
			leaveOnEmpty: false,
			enableLive: true
		});
		this.player
			.on("trackStart", (message, track) => {
				message.success("music/play:NOW_PLAYING", {
					songName: track.title
				});
			})
			.on("playlistStart", (message, queue, playlist, track) => {
				message.channel.send(this.customEmojis.success+" | "+message.translate("music/play:PLAYING_PLAYLIST", {
					playlistTitle: playlist.title,
					playlistEmoji: this.customEmojis.playlist,
					songName: track.title
				}));
			})
			.on("searchResults", (message, query, tracks) => {
				if (tracks.length > 10) tracks = tracks.slice(0, 10);
				const embed = new MessageEmbed()
					.setDescription(Util.escapeSpoiler(tracks.map((t, i) => `**${++i} -** ${t.title}`).join("\n")))
					.setFooter(message.translate("music/play:RESULTS_FOOTER"))
					.setColor(this.config.embed.color);
				message.channel.send(embed);
			})
			.on("searchInvalidResponse", (message, query, tracks, content, collector) => {
				if (content === "cancel") {
					collector.stop();
					return message.success("music/play:RESULTS_CANCEL");
				}
				message.error("misc:INVALID_NUMBER_RANGE", {
					min: 1,
					max: tracks.length
				});
			})
			.on("searchCancel", (message) => {
				message.error("misc:TIMES_UP");
			})
			.on("botDisconnect", (message) => {
				message.error("music/play:STOP_DISCONNECTED");
			})
			.on("noResults", (message) => {
				message.error("music/play:NO_RESULT");
			})
			.on("queueEnd", (message) => {
				message.success("music/play:QUEUE_ENDED");
			})
			.on("playlistAdd", (message, queue, playlist) => {
				message.success("music/play:ADDED_QUEUE_COUNT", {
					songCount: playlist.items.length
				});
			})
			.on("trackAdd", (message, queue, track) => {
				message.success("music/play:ADDED_QUEUE", {
					songName: track.title
				});
			})
			.on("channelEmpty", () => {
				// do nothing, leaveOnEmpty is not enabled
			})
			.on("error", (error, message) => {
				switch (error) {
					case "NotConnected":
						message.error("music/play:NO_VOICE_CHANNEL");
						break;
					case "UnableToJoin":
						message.error("music/play:VOICE_CHANNEL_CONNECT");
						break;
					case "NotPlaying":
						message.error("music/play:NOT_PLAYING");
						break;
					case "LiveVideo":
						message.error("music/play:LIVE_VIDEO");
						break;
					default:
						message.error("music/play:ERR_OCCURRED", {
							error
						});
						break;
				}
			});


		this.giveawaysManager = new GiveawaysManager(this, {
			storage: "./giveaways.json",
			updateCountdownEvery: 10000,
			default: {
				botsCanWin: false,
				exemptPermissions: [ "MANAGE_MESSAGES", "ADMINISTRATOR" ],
				embedColor: "#FF0000",
				reaction: "🎉"
			}
		});
	}

	get defaultLanguage(){
		return this.languages.find((language) => language.default).name;
	}

	translate(key, args, locale){
		if(!locale) locale = this.defaultLanguage;
		const language = this.translations.get(locale);
		if (!language) throw "Invalid language set in data.";
		return language(key, args);
	}

	printDate(date, format, locale){
		if(!locale) locale = this.defaultLanguage;
		const languageData = this.languages.find((language) => language.name === locale || language.aliases.includes(locale));
		if(!format) format = languageData.defaultMomentFormat;
		return moment(new Date(date))
			.locale(languageData.moment)
			.format(format);
	}

	convertTime(time, type, noPrefix, locale){
		if(!type) time = "to";
		if(!locale) locale = this.defaultLanguage;
		const languageData = this.languages.find((language) => language.name === locale || language.aliases.includes(locale));
		const m = moment(time)
			.locale(languageData.moment);
		return (type === "to" ? m.toNow(noPrefix) : m.fromNow(noPrefix));
	}

	// This function is used to load a command and add it to the collection
	loadCommand (commandPath, commandName) {
		try {
			const props = new (require(`.${commandPath}${path.sep}${commandName}`))(this);
			this.logger.log(`Loading Command: ${props.help.name}. 👌`, "log");
			props.conf.location = commandPath;
			if (props.init){
				props.init(this);
			}
			this.commands.set(props.help.name, props);
			props.help.aliases.forEach((alias) => {
				this.aliases.set(alias, props.help.name);
			});
			return false;
		} catch (e) {
			return `Unable to load command ${commandName}: ${e}`;
		}
	}

	// This function is used to unload a command (you need to load them again)
	async unloadCommand (commandPath, commandName) {
		let command;
		if(this.commands.has(commandName)) {
			command = this.commands.get(commandName);
		} else if(this.aliases.has(commandName)){
			command = this.commands.get(this.aliases.get(commandName));
		}
		if(!command){
			return `The command \`${commandName}\` doesn't seem to exist, nor is it an alias. Try again!`;
		}
		if(command.shutdown){
			await command.shutdown(this);
		}
		delete require.cache[require.resolve(`.${commandPath}${path.sep}${commandName}.js`)];
		return false;
	}

	// This function is used to find a user data or create it
	async findOrCreateUser({ id: userID }, isLean){
		if(this.databaseCache.users.get(userID)){
			return isLean ? this.databaseCache.users.get(userID).toJSON() : this.databaseCache.users.get(userID);
		} else {
			let userData = (isLean ? await this.usersData.findOne({ id: userID }).lean() : await this.usersData.findOne({ id: userID }));
			if(userData){
				if(!isLean) this.databaseCache.users.set(userID, userData);
				return userData;
			} else {
				userData = new this.usersData({ id: userID });
				await userData.save();
				this.databaseCache.users.set(userID, userData);
				return isLean ? userData.toJSON() : userData;
			}
		}
	}

	// This function is used to find a member data or create it
	async findOrCreateMember({ id: memberID, guildID }, isLean){
		if(this.databaseCache.members.get(`${memberID}${guildID}`)){
			return isLean ? this.databaseCache.members.get(`${memberID}${guildID}`).toJSON() : this.databaseCache.members.get(`${memberID}${guildID}`);
		} else {
			let memberData = (isLean ? await this.membersData.findOne({ guildID, id: memberID }).lean() : await this.membersData.findOne({ guildID, id: memberID }));
			if(memberData){
				if(!isLean) this.databaseCache.members.set(`${memberID}${guildID}`, memberData);
				return memberData;
			} else {
				memberData = new this.membersData({ id: memberID, guildID: guildID });
				await memberData.save();
				const guild = await this.findOrCreateGuild({ id: guildID });
				if(guild){
					guild.members.push(memberData._id);
					await guild.save();
				}
				this.databaseCache.members.set(`${memberID}${guildID}`, memberData);
				return isLean ? memberData.toJSON() : memberData;
			}
		}
	}

	// This function is used to find a guild data or create it
	async findOrCreateGuild({ id: guildID }, isLean){
		if(this.databaseCache.guilds.get(guildID)){
			return isLean ? this.databaseCache.guilds.get(guildID).toJSON() : this.databaseCache.guilds.get(guildID);
		} else {
			let guildData = (isLean ? await this.guildsData.findOne({ id: guildID }).populate("members").lean() : await this.guildsData.findOne({ id: guildID }).populate("members"));
			if(guildData){
				if(!isLean) this.databaseCache.guilds.set(guildID, guildData);
				return guildData;
			} else {
				guildData = new this.guildsData({ id: guildID });
				await guildData.save();
				this.databaseCache.guilds.set(guildID, guildData);
				return isLean ? guildData.toJSON() : guildData;
			}
		}
	}

    
	// This function is used to resolve a user from a string
	async resolveUser(search){
		let user = null;
		if(!search || typeof search !== "string") return;
		// Try ID search
		if(search.match(/^<@!?(\d+)>$/)){
			const id = search.match(/^<@!?(\d+)>$/)[1];
			user = this.users.fetch(id).catch(() => {});
			if(user) return user;
		}
		// Try username search
		if(search.match(/^!?(\w+)#(\d+)$/)){
			const username = search.match(/^!?(\w+)#(\d+)$/)[0];
			const discriminator = search.match(/^!?(\w+)#(\d+)$/)[1];
			user = this.users.find((u) => u.username === username && u.discriminator === discriminator);
			if(user) return user;
		}
		user = await this.users.fetch(search).catch(() => {});
		return user;
	}

	async resolveMember(search, guild){
		let member = null;
		if(!search || typeof search !== "string") return;
		// Try ID search
		if(search.match(/^<@!?(\d+)>$/)){
			const id = search.match(/^<@!?(\d+)>$/)[1];
			member = await guild.members.fetch(id).catch(() => {});
			if(member) return member;
		}
		// Try username search
		if(search.match(/^!?(\w+)#(\d+)$/)){
			guild = await guild.fetch();
			member = guild.members.cache.find((m) => m.user.tag === search);
			if(member) return member;
		}
		member = await guild.members.fetch(search).catch(() => {});
		return member;
	}

	async resolveRole(search, guild){
		let role = null;
		if(!search || typeof search !== "string") return;
		// Try ID search
		if(search.match(/^<@&!?(\d+)>$/)){
			const id = search.match(/^<@&!?(\d+)>$/)[1];
			role = guild.roles.cache.get(id);
			if(role) return role;
		}
		// Try name search
		role = guild.roles.cache.find((r) => search === r.name);
		if(role) return role;
		role = guild.roles.cache.get(search);
		return role;
	}

}

module.exports = Atlanta;
