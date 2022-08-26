const { Client, Collection, Intents } = require("discord.js");
const { GiveawaysManager } = require("discord-giveaways");
// const { Client: Joker } = require("blague.xyz");
const { readdir } = require("fs/promises");

const util = require("util"),
	// AmeClient = require("amethyste-api"),
	path = require("path"),
	moment = require("moment");
const {sep} = require("path");
const mongoose = require("mongoose");
const languages = require("../helpers/languages");

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
				Intents.FLAGS.GUILD_VOICE_STATES,
				Intents.FLAGS.DIRECT_MESSAGES
			],
			allowedMentions: {
				parse: ["users"]
			},
			partials: [
				"CHANNEL"
			],
		});
		this.config = require("../config"); // Load the config file
		this.customEmojis = require("../emojis.json"); // load the bot's emojis
		this.languages = require("../languages/language-meta.json"); // Load the bot's languages
		this.commands = new Collection(); // Creates new commands collection
		this.logger = require("../helpers/logger"); // Load the logger file
		this.wait = util.promisify(setTimeout); // client.wait(1000) - Wait 1 second
		this.functions = require("../helpers/functions"); // Load the functions file
		this.logs = require("../base/Log"); // Log mongoose model
		this.dashboard = require("../dashboard/app"); // Dashboard app
		// this.queues = new Collection(); // This collection will be used for the music
		this.states = {}; // Used for the dashboard
		this.knownGuilds = [];
		this.database = new (require("./database"))(this); // Load the database file
		this.cmdCooldown = new Map(); // Used for the command cooldown


		/* if(this.config.apiKeys.amethyste) {
			this.AmeAPI = new AmeClient(this.config.apiKeys.amethyste);
		}

		if(this.config.apiKeys.blagueXYZ) {
			this.joker = new Joker(this.config.apiKeys.blagueXYZ, {
				defaultLanguage: "en"
			});
		} */

		/* this.player = new Player(this, {
			leaveOnEmpty: false,
			enableLive: true
		});
		this.player
			.on("trackStart", (interaction, track) => {
				interaction.success("music/play:NOW_PLAYING", {
					songName: track.title
				});
			})
			.on("playlistStart", (interaction, playlist, track) => {
				interaction.reply(this.customEmojis.success+" | "+interaction.translate("music/play:PLAYING_PLAYLIST", {
					playlistTitle: playlist.title,
					playlistEmoji: this.customEmojis.playlist,
					songName: track.title
				}));
			})
			.on("searchResults", (interaction, tracks) => {
				if (tracks.length > 10) tracks = tracks.slice(0, 10);
				const embed = new MessageEmbed()
					.setDescription(Util.escapeSpoiler(tracks.map((t, i) => `**${++i} -** ${t.title}`).join("\n")))
					.setFooter(interaction.translate("music/play:RESULTS_FOOTER"))
					.setColor(this.config.embed.color);
				interaction.reply({ embeds: [embed] });
			})
			.on("searchInvalidResponse", (interaction, tracks, content, collector) => {
				if (content === "cancel") {
					collector.stop();
					return interaction.success("music/play:RESULTS_CANCEL");
				}
				interaction.error("misc:INVALID_NUMBER_RANGE", {
					min: 1,
					max: tracks.length
				});
			})
			.on("searchCancel", (interaction) => {
				interaction.error("misc:TIMES_UP");
			})
			.on("botDisconnect", (interaction) => {
				interaction.error("music/play:STOP_DISCONNECTED");
			})
			.on("noResults", (interaction) => {
				interaction.error("music/play:NO_RESULT");
			})
			.on("queueEnd", (interaction) => {
				interaction.success("music/play:QUEUE_ENDED");
			})
			.on("playlistAdd", (interaction, playlist) => {
				interaction.success("music/play:ADDED_QUEUE_COUNT", {
					songCount: playlist.items.length
				});
			})
			.on("trackAdd", (interaction, track) => {
				interaction.success("music/play:ADDED_QUEUE", {
					songName: track.title
				});
			})
			.on("channelEmpty", () => {
				// do nothing, leaveOnEmpty is not enabled
			})
			.on("error", (error, interaction) => {
				switch (error) {
					case "NotConnected":
						interaction.error("music/play:NO_VOICE_CHANNEL");
						break;
					case "UnableToJoin":
						interaction.error("music/play:VOICE_CHANNEL_CONNECT");
						break;
					case "NotPlaying":
						interaction.error("music/play:NOT_PLAYING");
						break;
					case "LiveVideo":
						interaction.error("music/play:LIVE_VIDEO");
						break;
					default:
						interaction.error("music/play:ERR_OCCURRED", {
							error
						});
						break;
				}
			}); */


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

	async init() {
		await this.loadCommands();
		await this.loadEvents();
		await this.login(this.config.token);
		mongoose.connect(this.config.mongoDB,(err) => {
			if (err) {
				this.logger.log("Unable to connect to the Mongodb database. Error:"+err, "error");
			}
			else {
				this.logger.log("Connected to the Mongodb database.", "log");

			}
		});
		this.translations = await languages();
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
	async loadCommands () {
		const content = await readdir("./commands/").catch(console.error);
		if (!content || !content.length) return console.error("Please create folder in \"commands\" folder.");
		const groups = [];
		content.forEach(element => {
			if (!element.includes(".")) groups.push(element);
		});
		for (const folder of groups) {
			const files = await readdir(`./commands/${folder}`).catch(console.error);
			if (!files || !files.length) return console.error(`Please create files in "${folder}" folder.`);
			files.filter((file) => file.split(".").pop() === "js").forEach(element => {
				try {
					const command = new (require(`../commands/${folder}${sep}${element}`))(this);
					this.logger.log(`Loading Command: ${command.help.name}. 👌`, "log");
					if (command.init) {
						command.init(this);
					}
					this.commands.set(command.help.name, command);
				} catch (e) {
					console.error(`Unable to load command ${element}: ${e}`);
				}
			});
		}
	}

	// This function is used to load an event and add it to the collection
	async loadEvents () {
		const folders = await readdir("./events/").catch(console.error);
		if (!folders || !folders.length) return console.error("Please create folder in \"commands\" folder.");
		const groups = [];
		folders.forEach(element => {
			if (!element.includes(".")) groups.push(element);
		});
		for (const directory of groups) {
			const files = await readdir(`./events/${directory}`).catch(console.error);
			files.filter((file) => file.split(".").pop() === "js").forEach(file => {
				try {
					const event = new (require(`../events/${directory}/${file}`))(this);
					this.logger.log(`Loading Event: ${file.split(".")[0]}`, "log");
					this.on(file.split(".")[0], (...args) => event.run(...args));
				} catch (e) {
					console.error(`Unable to load event ${file.split(".")[0]}: ${e}`);
				}
			});
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
			user = this.users.cache.find((u) => u.username === username && u.discriminator === discriminator);
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
