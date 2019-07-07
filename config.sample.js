module.exports = {
	/* The token of your Discord Bot */
	token: "XXXXXXXXXXX",
	/* For the support server */
	support: {
		id: "XXXXXXXXXXX", // The ID of the support server
		logs: "XXXXXXXXXXX", // And the ID of the logs channel of your server (new servers for example)
	},
	mongoDB: "mongodb://localhost:27017/AtlantaBot", // The URl of the mongodb database
	prefix: "*", // The default prefix for the bot
	/* For the embeds (embeded messages) */
	embed: {
		color: "#0091fc", // The default color for the embeds
		footer: "Atlanta | Open Source" // And the default footer for the embeds
	},
	defaultLanguage: "en", // The default language for the new servers
	botname: "Atlanta", // The name of the bot
	/* Bot's owner informations */
	owner: {
		id: "XXXXXXXXXXX", // The ID of the bot's owner
		name: "Androz#2091" // And the name of the bot's owner
	},
	/* DBL votes webhook (optional) */
	votes: {
		port: 5000, // The port for the server
		password: "XXXXXXXXXXX", // The webhook auth that you have defined on discordbots.org
		channel: "XXXXXXXXXXX" // The ID of the channel that in you want the votes logs
	},
	/* The API keys that are required for certain commands */
	apiKeys: {
		// FORTNITE: https://fortnitetracker.com/site-api 
		fortnite: "XXXXXXXXXXX",
		// DBL: https://discordbots.org/api/docs#mybots
		dbl: "XXXXXXXXXXX",
		// SIMPLE YOUTUBE API: https://console.developers.google.com/
		simpleYoutube: "XXXXXXXXXXX",
		// ANIDIOTS: https://discord.gg/PgCR8Rg
		anidiots: "XXXXXXXXXXX"
	},
	/* The emojis that are required for certain commands */
	emojis: {
		stats: "XXXXXXXXXXX",
		ram: "XXXXXXXXXXX",
		version: "XXXXXXXXXXX",
		online: "XXXXXXXXXXX",
		link: "XXXXXXXXXXX",
		voice: "XXXXXXXXXXX",
		add: "XXXXXXXXXXX",
		vote: "XXXXXXXXXXX",
		help: "XXXXXXXXXXX",
		warn: "XXXXXXXXXXX",
		error: "XXXXXXXXXXX",
		success: "XXXXXXXXXXX",
		loading: "XXXXXXXXXXX",
		score: "XXXXXXXXXXX",
		games: "XXXXXXXXXXX",
		kills: "XXXXXXXXXXX",
		crown: "XXXXXXXXXXX",
		discriminator: "XXXXXXXXXXX",
		bot: "XXXXXXXXXXX",
		avatar: "XXXXXXXXXXX",
		calendar: "XXXXXXXXXXX",
		calendar2: "XXXXXXXXXXX",
		up: "XXXXXXXXXXX",
		pencil: "XXXXXXXXXXX",
		roles: "XXXXXXXXXXX",
		color: "XXXXXXXXXXX",
		minecraft: "XXXXXXXXXXX",
		users: "XXXXXXXXXXX",
		title: "XXXXXXXXXXX",
		singer: "XXXXXXXXXXX",
		time: "XXXXXXXXXXX",
		search: "XXXXXXXXXXX",
		desc: "XXXXXXXXXXX",
		playlist: "XXXXXXXXXXX",
		channels: "<:channels:568121595227406337>",
		afk: "<:afk:568121945477087232>",
		id: "<:id:568122139291680789>"
	},
	/* The others utils links */
	others: {
		github: "https://github.com/Androz2091", // Founder's github account
		donate: "https://patreon.com/Androz2091" // Donate link
	},
	/* The badges for the badges command */
	badges: {
		games: [
			{ name: "Minecraft", emoji: "XXXXXXXXXXX", price: 1200 },
			{ name: "GTA", emoji: "XXXXXXXXXXX", price: 1200 },
			{ name: "Fortnite", emoji: "XXXXXXXXXXX", price: 1200 },
			{ name: "Mario", emoji: "XXXXXXXXXXX", price: 1200 },
			{ name: "LOL", emoji: "XXXXXXXXXXX", price: 1200 }
		],
		flags: [
			{ name: "France", emoji: "XXXXXXXXXXX", price: 1500 },
			{ name: "Canada", emoji: "XXXXXXXXXXX", price: 1500 },
			{ name: "Swiss", emoji: "XXXXXXXXXXX", price: 1500 },
			{ name: "Great Britain", emoji: "XXXXXXXXXXX", price: 1500 },
			{ name: "USA", emoji: "XXXXXXXXXXX", price: 1500 }
		],
		others: [
			{ name:"Rich", emoji: "XXXXXXXXXXX", price: 18000 },
			{ name:"Troll", emoji: "XXXXXXXXXXX", price: 3000 },
			{ name:"Atlanta", emoji: "XXXXXXXXXXX", price: 1200 },
			{ name:"IAMABOT", emoji: "XXXXXXXXXXX", price: 1000 },
			{ name:"Discordien", emoji: "XXXXXXXXXXX", price: 500 }
		]
	},
	/* The Bot status */
	status: [
		{
			name: "@Atlanta help on {serversCount} servers",
			type: "LISTENING"
		},
		{
			name: "my website : atlanta-bot.fr",
			type: "PLAYING"
		}
	]
}
