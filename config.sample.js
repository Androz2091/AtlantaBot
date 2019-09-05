module.exports = {
	/* The token of your Discord Bot */
	token: "XXXXXXXXXXX",
	/* For the support server */
	support: {
		id: "XXXXXXXXXXX", // The ID of the support server
		logs: "XXXXXXXXXXX", // And the ID of the logs channel of your server (new servers for example)
	},
	/* Dashboard configuration */
	dashboard: {
		enabled: false, // whether the dashboard is enabled or not
		secret: "XXXXXXXXXXX", // Your discord client secret
		baseURL: "https://dashboard.atlanta-bot.fr", // The base URl of the dashboard
		logs: "XXXXXXXXXXX", // The channel ID of logs
		port: 8080, // Dashboard port
		expressSessionPassword: "XXXXXXXXXXX", // Express session password (it can be what you want)
		failureURL: "https://www.atlanta-bot.fr" // url on which users will be redirected if they click the cancel button (discord authentication)
	},
	mongoDB: "mongodb://localhost:27017/AtlantaBot", // The URl of the mongodb database
	prefix: "*", // The default prefix for the bot
	/* For the embeds (embeded messages) */
	embed: {
		color: "#0091fc", // The default color for the embeds
		footer: "Atlanta | Open Source" // And the default footer for the embeds
	},
	defaultLanguage: "english", // The default language for the new servers
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
		// FORTNITE TRN: https://fortnitetracker.com/site-api
		fortniteTRN: "XXXXXXXXXXX",
		// FORTNITE FNBR: https://fnbr.co/api/docs
		fortniteFNBR: "XXXXXXXXXXX",
		// DBL: https://discordbots.org/api/docs#mybots
		dbl: "XXXXXXXXXXX",
		// SIMPLE YOUTUBE API: https://console.developers.google.com/
		simpleYoutube: "XXXXXXXXXXX",
		// ANIDIOTS: https://discord.gg/PgCR8Rg
		anidiots: "XXXXXXXXXXX"
	},
	/* The emojis that are required for certain commands */
	emojis: {
		error: "XXXXXXXXXXX",
		// RE: https://cdn.discordapp.com/emojis/565212755804684318.png
		success: "XXXXXXXXXXX",
		// RE: https://cdn.discordapp.com/emojis/565212709591973896.png
		loading: "XXXXXXXXXXX",
		// RE: https://cdn.discordapp.com/emojis/565214530121105418.gif
		stats: "XXXXXXXXXXX",
		// RE: https://img.icons8.com/flat_round/64/000000/bar-chart-isometric.png
		ram: "XXXXXXXXXXX",
		// RE: https://img.icons8.com/color/96/000000/processor.png
		version: "XXXXXXXXXXX",
		// RE: https://img.icons8.com/color/96/000000/installing-updates.png
		link: "XXXXXXXXXXX",
		// RE: https://img.icons8.com/color/96/000000/link.png
		voice: "XXXXXXXXXXX",
		// RE: https://img.icons8.com/color/96/000000/speaker.png
		add: "XXXXXXXXXXX",
		// RE: https://img.icons8.com/flat_round/64/000000/plus.png
		vote: "XXXXXXXXXXX",
		// RE: https://img.icons8.com/flat_round/96/vote-button.png 
		help: "XXXXXXXXXXX",
		// RE: https://img.icons8.com/color/96/000000/help.png
		warn: "XXXXXXXXXXX",
		// RE: https://img.icons8.com/flat_round/64/000000/error--v1.png
		games: "XXXXXXXXXXX",
		// RE: https://img.icons8.com/color/96/000000/computer.png
		crown: "XXXXXXXXXXX",
		// RE: https://img.icons8.com/flat_round/96/000000/crown.png
		discriminator: "XXXXXXXXXXX",
		// RE: https://img.icons8.com/color/96/000000/hashtag-2.png
		bot: "XXXXXXXXXXX",
		// RE: https://img.icons8.com/color/96/000000/bot.png
		avatar: "XXXXXXXXXXX",
		// RE: https://img.icons8.com/color/96/000000/picture.png
		calendar: "XXXXXXXXXXX",
		// RE: https://img.icons8.com/color/96/000000/calendar.png
		calendar2: "XXXXXXXXXXX",
		// RE: https://img.icons8.com/color/96/000000/calendar-2.png
		up: "XXXXXXXXXXX",
		// RE: https://img.icons8.com/cotton/64/000000/circled-up--v2.png
		pencil: "XXXXXXXXXXX",
		// RE: https://img.icons8.com/color/96/000000/pencil.png
		roles: "XXXXXXXXXXX",
		// RE: https://img.icons8.com/color/96/000000/admin-settings-male.png
		color: "XXXXXXXXXXX",
		// RE: https://img.icons8.com/color/96/000000/color-palette.png
		minecraft: "XXXXXXXXXXX",
		// RE: https://img.icons8.com/color/96/000000/minecraft-sword.png 
		users: "XXXXXXXXXXX",
		// RE: https://img.icons8.com/color/96/000000/group.png
		title: "XXXXXXXXXXX",
		// RE: https://img.icons8.com/color/96/000000/tag-window.png
		singer: "XXXXXXXXXXX",
		// RE: https://img.icons8.com/ios-filled/96/000000/rap.png
		time: "XXXXXXXXXXX",
		// RE: https://img.icons8.com/color/96/000000/future.png
		search: "XXXXXXXXXXX",
		// RE: https://img.icons8.com/cotton/96/000000/search--v2.png
		desc: "XXXXXXXXXXX",
		// RE: https://img.icons8.com/color/96/000000/text-box.png
		playlist: "XXXXXXXXXXX",
		// RE: https://img.icons8.com/color/96/000000/smart-playlist.png
		channels: "XXXXXXXXXXX",
		// RE: https://img.icons8.com/color/96/000000/filled-chat.png
		afk: "XXXXXXXXXXX",
		// RE: https://img.icons8.com/color/96/000000/no-microphone.png
		id: "XXXXXXXXXXX",
		// RE: https://img.icons8.com/color/96/000000/id-verified.png
		ip: "XXXXXXXXXXX",
		// RE: https://img.icons8.com/color/96/000000/ip-address.png
		folder: "XXXXXXXXXXX",
		// RE: https://img.icons8.com/color/344/opened-folder.png
		desc2: "XXXXXXXXXXX",
		// RE: https://img.icons8.com/color/344/edit-property.png
		patreon: "XXXXXXXXXXX",
		// RE: https://cdn6.aptoide.com/imgs/2/8/e/28e759bcb1e00ad978afdf443e60c11e_icon.png
		server: "XXXXXXXXXXX",
		// RE: https://img.icons8.com/color/96/000000/root-server.png
		status: {
			idle: "XXXXXXXXXXX",
			// RE: https://i.goopics.net/bRVWW.png
			dnd: "XXXXXXXXXXX",
			// RE: https://i.goopics.net/lWN3A.png
			offline: "XXXXXXXXXXX",
			// RE: https://i.goopics.net/WRPWl.png
			online: "XXXXXXXXXXX"
			// RE: https://i.goopics.net/QdGW0.png
		},
		letters: {
			a: "XXXXXXXXXXX",
			// RE: https://i.goopics.net/RNemO.png
			w: "XXXXXXXXXXX",
			// RE: https://i.goopics.net/AyKOA.png
			r: "XXXXXXXXXXX",
			// RE: https://i.goopics.net/7PKen.png
			d: "XXXXXXXXXXX"
			// RE: https://i.goopics.net/vAgj7.png
		},
		categories: {
			administration: "XXXXXXXXXXX",
			// RE: https://img.icons8.com/color/96/000000/horizontal-settings-mixer.png
			economy: "XXXXXXXXXXX",
			// RE: https://img.icons8.com/color/96/000000/banknotes.png
			fun: "XXXXXXXXXXX",
			// RE: https://img.icons8.com/color/96/000000/smiling.png
			general: "XXXXXXXXXXX",
			// RE: https://i.goopics.net/3X5oq.png
			images: "XXXXXXXXXXX",
			// RE: https://img.icons8.com/color/96/000000/picture.png
			moderation: "XXXXXXXXXXX",
			// RE: https://img.icons8.com/color/96/000000/police-badge.png
			music: "XXXXXXXXXXX",
			// RE: https://img.icons8.com/color/96/000000/musically.png
			owner: "XXXXXXXXXXX",
			// RE: https://img.icons8.com/color/96/000000/queen-uk.png
			custom: "XXXXXXXXXXX"
			// RE: https://img.icons8.com/color/96/000000/request-service.png
		}
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
