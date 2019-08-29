let lang = "english";

let c = require("../config.js");
let e = c.emojis;

// This class is used to store languages strings

module.exports = class {
    constructor() {
		this.language = {

			// Utils
			PREFIX_INFO: (prefix) => `the prefix of this server is \`${prefix}\``,
			UTILS: {
				YES: "Yes",
				NO: "No",
				USER: "User",
				LEVEL: "Level",
				REP: "Reputation",
				CREDITS: "Credits",
				VICTORY: "Victory",
				DEFEAT: "Defeat",
				PAGE: "Page",
				TOTAL_SERVERS: "Total servers",
				MEMBERS: "Members",
				STATUS: {
					"dnd": "Do not disturb",
					"idle": "AFK (idle)",
					"offline": "Disconnected",
					"online": "Online"
				},
				NO_REASON_PROVIDED: "no reason provided",
				UNDEFINED: "Undefined",
				PLEASE_WAIT: `${e.loading} | Please wait...`,
				PREFIX: "Prefix",
				CUSTOM_COMMANDS: "Custom commands",
				ANDMORE: "**and more...**",
				TITLE: "Titre",
				AUTHOR: "Auteur",
				SIGN_OUT: "Sign out",
				YOUR_PROFILE: "Your profile",
				UPDATE: "Update",
				SERVERS: "Servers",
				MANAGE: "Setup",
				STATS: "Statistics",
				COMMANDS: "Commands",
				HOME: "Accueil",
				SANCTIONS: "Sanctions",
				FRENCH: "French",
				ENGLISH: "English",
				NO_CHANNEL: "No channel",
				PROFILE: "Profile",
				LEADERBOARD: "Ranking",
				GLOBAL_LEADERBOARD: "Global ranking",
				ECONOMY: "Economy",
				KNOW_MORE: "More information",
				SETTINGS: "Settings",
				SERVERS_SETTINGS: "Servers settings",
				GLOBAL_STATS: "Global",
				COMMANDS_USAGE: "Use of commands",
				WEBSITE: "Website",
				DISCONNECT: "Disconnect me"
			},
			
			/* DBL VOTES */

			VOTE_THANKS: (user) => `:arrow_up: Hello ${user.toString()}, thanks for voting !\nYour reward : 40 credits !`,
			VOTE_LOGS: (user) => `:arrow_up: **${user.tag}** (\`${user.id}\`) voted for **Atlanta** and won **40** credits, thank you!\nhttps://discordbots.org/bot/557445719892688897/vote`,

			/* DEFAULT MESSAGES */
			NO_DESCRIPTION_PROVIDED: "No description provided",
			NO_USAGE_PROVIDED: "No usage provided",
			NO_EXAMPLE_PROVIDED: "No example provided",

			// ERROR MESSAGES

			ERR_COMMAND_DISABLED: `${e.error} | This command is currently disabled!`,
			ERR_OWNER_ONLY: `${e.error} | Only ${c.owner.name} can do these commands!`,
			ERR_INVALID_CHANNEL: `${e.error} | Please mention a valid channel!`,
			ERR_INVALID_ROLE: `${e.error} | Please mention a valid role!`,
			ERR_INVALID_MEMBER: `${e.error} | Please mention a valid member!`,
			ERR_INVALID_NUMBER: (nan) => `${e.error} | \`${nan}\` is not a valid number!`,
			ERR_INVALID_NUMBER_MM: (min, max) => `${e.error} Please indicate a valid number between ${min} and ${max}!`,
			ERR_INVALID_TIME: `${e.error} | You must enter a valid time! Valid units: \`s\`, \`m\`, \`h\`, \`d\`, \`w\`, \`y\``,
			ERR_INVALID_ID: `${e.error} | Please enter a valid ID!`,

			ERR_MISSING_BOT_PERMS: (perms) => `${e.error} | I need the following permissions to perform this command: \`${perms}\``,
			ERR_MISSING_MEMBER_PERMS: (perm) => `${e.error} | You do not have the necessary permissions to perform this command (\`${perm}\`)`,
			ERR_NOT_NSFW: `${e.error} | You must go to in a channel that allows the NSFW to type this command!`,
			ERR_GUILDONLY: `${e.error} | This command is only available on a server!`,
			ERR_UNAUTHORIZED_CHANNEL: (channel) => `${e.error} | Commands are forbidden in ${channel} !`,
			ERR_BAD_PARAMETERS: (cmd, prefix) => `${e.error} | Please check the commands parameters. Look at the examples by typing \`${prefix}help ${cmd}\` !`,
			ERR_ROLE_NOT_FOUND: (role) => `${e.error} | No role found with \`${role}\` !`,
			ERR_CHANNEL_NOT_FOUND: (channel) => `${e.error} | No channel found with \`${channel}\``,
			ERR_YES_NO: `${e.error} | You must answer "yes" or "no"!`,
			ERR_EVERYONE: `${e.error} | You are not allowed to mention everyone or here in the commands.`,
			ERR_BOT_USER: `${e.error} | This user is a bot!`,
			ERR_GAME_ALREADY_LAUNCHED: `${e.error} | A game is already running on this server!`,
			ERR_A_GAME_ALREADY_LAUNCHED: `${e.error} | Because of the lags and bugs due to the findwords and the number, it is impossible to run two games at the same time, even if they are on two different servers. There is a game currently running on another server, so please wait a few minutes and then try again. We are sorry, but people were abusing this command by spamming it on lots of servers.`,
			ERR_OCCURENCED: `${e.error} | An error has occurred, please try again in a few minutes.`,
			ERR_CMD_COOLDOWN: (seconds) => `${e.error} | You must wait **${seconds}** second(s) to be able to run this command again!`,
			ERR_SANCTION_YOURSELF: `${e.error} | You can't sanction yourself!`,

			/* PING COMMAND */

			// Utils
			PING_DESCRIPTION: "Displays bot latency",
			PING_USAGE: "ping",
			PING_EXAMPLES: "$ping",
			// Content
			PING: (ms) => `${e.success} | Pong! My latency is \`${ms}\` ms !`,

			/* HELP COMMAND */

			// Utils
			HELP_DESCRIPTION: "Displays the help of commands or the help of a particular command",
			HELP_USAGE: "help (command)",
			HELP_EXAMPLES: "$help\n$help ping",
			// Errors
			HELP_ERR_NOT_FOUND: (cmd) => `${e.error} | Unable to find command \`${cmd}\`!`,
			HELP_ERR_CMD_CUSTOMIZED: (cmd) => `${e.error} | The \`${cmd}\` command has no help because it is customized.`,
			// Content
			HELP_EDESCRIPTION: (prefix) => `● To get help on an command type \`${prefix}help <commande>\`!`,
			HELP_TITLE: `${c.botname} | Commands`,
			HELP_NO_ALIASES: "No aliases.",
			// Headings
			HELP_HEADINGS: [
				"Help :",
				`${e.help} Usage :`,
				`${e.search} Examples :`,
				`${e.folder} Group :`,
				`${e.desc2} Description :`,
				`${e.add} Alias :`,
				`${e.crown} Permissions :`
			],

			/* GITHUB COMMAND */

			// Utils
			GITHUB_DESCRIPTION: `Displays the information from the ${c.botname} github!`,
			GITHUB_USAGE: "github",
			GITHUB_EXAMPLES: "$github",
			// Content
			GITHUB_DESC: `[Click here to access the github of ${c.botname}](https://github.com/Androz2091/AtlantaBot)`,
			// Headings
			GITHUB_HEADERS: [
				"Stars :star:",
				"Forks :tools:",
				"Language :computer:",
				"Founder :crown:"
			],

			/* HASTEBIN COMMAND */

			// Utils
			HASTEBIN_DESCRIPTION: "Upload your text on hastebin !",
			HASTEBIN_USAGE: "hastebin [text]",
			HASTEBIN_EXAMPLES: "$hastebin Hello World!",
			// Errors
			HASTEBIN_ERR_TEXT: `${e.error} | You must enter a text!`,
			// Content
			HASTEBIN_TITLE: `Upload complete!`,

			/* ASCII COMMAND */

			// Utils
			ASCII_DESCRIPTION: "Turn your text into ascii characters!",
			ASCII_USAGE: "ascii [text]",
			ASCII_EXAMPLES: "$ascii Hey !",
			// Errors
			ASCII_ERR_TEXT: `${e.error} | Please enter a valid text (less than 20 characters)!`,

			/* FINDWORDS COMMAND */

			// Utils
			FINDWORDS_DESCRIPTION: "Start a game of findwords, a game where you have to find words!",
			FINDWORDS_USAGE: "findwords",
			FINDWORDS_EXAMPLES: "$findwords",
			// Errors
			FINDWORDS_ERR_INVALID_WORD: (member) => `${e.error} | ${member} your word is invalid!`,
			FINDWORDS_ERR_NO_WINNER: `${e.warn} | I can't define any winners because no words have been found from all sides!`,
			FINDWORDS_ERR_NO_WINNER_GAME: `${e.error} | No one was able to find words!`,
			// Content
			FINDWORDS_TIMER: `${e.warn} | The game starts in 10 seconds!`,
			FINDWORDS_QUESTION: (word) => `${e.warn} | 20 seconds to find a word containing "**${word}**" !`,
			FINDWORDS_CONGRATS: (winner) => `${e.success} | Well done <@${winner}> ! Your word is valid and you were the fastest!`,
			FINDWORDS_STATS: (username, games, time, number, members) => `:tada: | ${username} won the game !\n\n**Stats of the game: **\n__**Time**__: ${time}\n__**Number of participants**__ : ${number}\n__**Participants**__ : \n${members}`,
			FINDWORDS_MONEY: (member) => `${member} wins 15 credits! :tada:`,

			/* NUMBER COMMAND */

			// Utils
			NUMBER_DESCRIPTION: "Find the number I chose!",
			NUMBER_USAGE: "number",
			NUMBER_EXAMPLES: "$number",
			// Content
			NUMBER_START: `${e.warn} | Number determined, you can start!`,
			NUMBER_HIGHER: (number, author) => `${author} | The number is more **large** than \`${number}\` !`,
			NUMBER_SMALLER: (number, author) => `${author} | The number is more **small** thane \`${number}\` !`,
			NUMBER_CONGRATS: (member) => `<@${member}> has won 10 credits!`,
			NUMBER_STATS: (user, number, time, nb, members) => `:tada: | ${user} found the number! It was __**${number}**__ !\n\n\n**States of the game: **\n__**Time**__: ${time}\n__** Number of participants**__ : ${nb}\n__**Participants**__ : \n${members}`,
			// Errors
			NUMBER_DEFEAT: (number) => `${e.error} | No one could find the number! It was ${number} !`,

			/* RANDOM COMMAND */

			// Utils
			RANDOM_DESCRIPTION: "Randomly pick one of the choices you give me!",
			RANDOM_USAGE: "random [choice1/choice2/etc...]",
			RANDOM_EXAMPLES: "$random Fire/Wind/Water",
			// Errors
			RANDOM_ERR_CHOICES: `${e.error} | You must enter more than two choices!`,
			RANDOM_ERR_BLANK: `${e.error} | One of your choices seems to be empty.... Please try again!`,
			// Content
			RANDOM_CHOOSED: `${e.success} | Here is my choice:`,
			RANDOM_WAIT: `${e.loading} | Choice in progress...`,

			/* QUOTE COMMAND */

			// Utils
			QUOTE_DESCRIPTION: "Quote a message in the channel!",
			QUOTE_USAGE: "quote [messageID] [channel]",
			QUOTE_EXAMPLES: "$quote 596018101921906698\n$quote 596018101921906698 573508780520898581\n$quote 596018101921906698 #blabla",
			// Errors
			QUOTE_ERR_NOT_FOUND: `${e.error} | No message has this ID.`,
			QUOTE_ERR_NOT_FOUND_CHANNEL: (channel) => `${e.error} | No channel found with ID ${channel} !`,

			/* INVITATIONS COMMAND */

			// Utils
			INVITATIONS_DESCRIPTION: "Displays the number of people you have invited to the server!",
			INVITATIONS_USAGE: "invitations (@member)",
			INVITATIONS_EXAMPLES: "$invitations\n$invitations @Androz#2091",
			// Errors
			INVITATIONS_ERR_NO_INVITE: (member) => `${e.error} | ${member ? member.user.username : "You"} didn't invite anyone to the server!`,
			// Content
			INVITATIONS_CODE: (invite) => `**${invite.code}** (${invite.uses} uses) | ${invite.channel}`,
			// Headings
			INVITATIONS_TITLE: (member, msg) => `Information on the invitations to ${member} on ${msg.guild.name}`,
			INVITATIONS_FIELDS: (total) => [
				"👥 Invited Persons",
				"🔑 Codes",
				`${total} members`
			],

			/* SETAFK COMMAND */

			// Utils
			SETAFK_DESCRIPTION: "Become an AFK (members who mention you will receive a message)",
			SETAFK_USAGE: "setafk [reason]",
			SETAFK_EXAMPLES: "$setafk I'm taking my exams!",
			// Errors
			SETAFK_ERR_REASON: `${e.error} | Please specify the reason for your afk!`,
			// Content
			SETAFK_SUCCESS: (reason) => `${e.success} | You passed afk (reason: ${reason})`,
			// Others
			AFK_DELETED: `${e.warn} | Your AFK has just been deleted!`,
			AFK_MEMBER: (user, reason) => `${e.warn} | **${user.tag}** is currently AFK for:\n\`\`\`${reason}\`\`\``,

			/* REMINDME COMMAND */

			// Utils
			REMINDME_DESCRIPTION: "Define a reminder!",
			REMINDME_USAGE: "remindme [reason]",
			REMINDME_EXAMPLES: "$remindme 24h Work command\n$remindme 3m Take the pasta out of the pan!",
			// Errors
			REMINDME_ERR_MESSAGE: `${e.error} | You must enter a message that will be sent to you at the end of time!`,
			// Content
			REMINDME_SAVED: `${e.success} | Reminder correctly recorded, you will receive a message at the end of the time!`,
			REMINDME_TITLE: `${c.botname} Reminder`,
			REMINDME_FIELDS: [
				"Created",
				"Message"
			],

			/* USERINFO COMMAND */

			// Utils
			USERINFO_DESCRIPTION: "Displays user information!",
			USERINFO_USAGE: "userinfo (@user/userID)",
			USERINFO_EXAMPLES: "$userinfo\n$userinfo @Androz#2091\n$userinfo 422820341791064085",
			// Errors
			USERINFO_ERR_ID: (id) => `${e.error} | No user on Discord has the ID \`${id}\` !`,
			// Content
			USERINFO_FIELDS: [
				":man: Pseudo",
				`${e.discriminator} Discriminator`,
				`${e.bot} Robot`,
				`${e.avatar} Avatar`,
				`${e.calendar} Creation`,
				`${e.games} Game`,
				`${e.status.online} Status`,
				`${e.up} Role`,
				`${e.calendar2} Arrival`,
				`${e.pencil} Nickname`,
				`${e.roles} Roles`,
				`${e.color} Color`,
				`${e.desc} Description`,
				`${e.stats} Stats`,
				`${e.link} Links`
			],
			USERINFO_NO_GAME: "No game",
			USERINFO_NO_ROLE: "No role",
			USERINFO_MORE_ROLES: (nb) => ` and ${nb} others roles`,
			USERINFO_NO_NICKNAME: "No nickname",
			USERINFO_LINKS: (discord, invite, github, website) => `${discord ? `[Support](https://discord.gg/${discord})\n` : ""}[Invitation](${invite})\n${github ? `[Github](${github})\n` : ""}${website ? `[Website](${website})` : ""}`,
			USERINFO_STATS: (votes, servers, shards, lib) => `**${votes}** votes (Discordbots.org)\n**${servers}** servers\n**${shards.length === 0 ? "No" : shards.length}** shards\nMade with **${lib}**`,

			/* SERVERINFO COMMAND */

			// Utils
			SERVERINFO_DESCRIPTION: "Displays information about the server!",
			SERVERINFO_USAGE: "serverinfo [ID/Name]",
			SERVERINFO_EXAMPLES: "$serverinfo Atlanta\n$serverinfo",
			// Content
			// Headings
			SERVERINFO_HEADINGS:[
				`${e.title} Name`,
				`${e.calendar} Creation`,
				`${e.users} Members`,
				`${e.channels} Channels`,
				`${e.afk} AFK channel`,
				`${e.id} ID`,
				`${e.crown} Founder`
			],
			SERVERINFO_MEMBERCOUNT: (members) => `${members.filter((m) => !m.user.bot).size} members | ${members.filter((m) => m.user.bot).size} bots`,
			SERVERINFO_NO_AFK: "No AFK channel",
			SERVERINFO_CHANNELS: (channels) => `${channels.filter((ch) => ch.type === "voice").size} voice | ${channels.filter((ch) => ch.type === "text").size} textual | ${channels.filter((ch) => ch.type === "category").size} categories`,

			/* UNBAN COMMAND */

			// Utils
			UNBAN_DESCRIPTION: "Unban the user from the server!",
			UNBAN_USAGE: "unban [userID/user#0000]",
			UNBAN_EXAMPLES: "$unban 422820341791064085\n$unban Androz#2091",
			// Errors
			UNBAN_ERR_ID: (id) => `${e.error} | No user on Discord has the ID \`${id}\` !`,
			UNBAN_ERR_NOT_BANNED: (user) => `${e.error} | **${user.username}** is not banned!`,
			// Content
			UNBAN_SUCCESS: (user, msg) => `${e.success} | **${user.username}** has just been unbanned from **${msg.guild.name}** !`,
			
			/* EVAL COMMAND */

			// Utils
			EVAL_DESCRIPTION: "Executes the code",
			EVAL_USAGE: "eval [code]",
			EVAL_EXAMPLES: "$eval message.channel.send('Hey');",

			/* GETINVITE COMMAND */

			// Utils
			GETINVITE_DESCRIPTION: "Generates an invitation to the server in question. Make sure you make good use of this command.",
			GETINVITE_USAGE: "getinvite [ID/Name]",
			GETINVITE_EXAMPLES: "$getinvite Atlanta\n$getinvite 565048515357835264",
			// Errors
			GETINVITE_ERR_NO_GUILD: (search) => `${e.error} | No server found (search: ${search})`,

			/* SUGGEST COMMAND */

			// Utils
			SUGGEST_DESCRIPTION: "Send your suggestion to the channel defined for this!",
			SUGGEST_USAGE: "suggest [message]",
			SUGGEST_EXAMPLES: "$suggest A new channel #spam !",
			// Errors
			SUGGEST_ERR_NO_CHANNEL: `${e.error} | No suggestion channel defined!`,
			SUGGEST_ERR_NO_SUGG: `${e.error} | Please enter a suggestion!`,
			// Headings
			SUGGEST_HEADINGS: [
				"Author",
				"Date",
				"Content"
			],
			// Content
			SUGGEST_TITLE: (user) => `Suggestion - ${user.tag}`,
			SUGGEST_SUCCESS: (channel) => `${e.success} | Your suggestion is being voted on in ${channel} !`,
			

			/* INVITE COMMAND */

			// Utils
			INVITE_DESCRIPTION: `Displays the links of ${c.botname}!`,
			INVITE_USAGE: "invite (copy)",
			INVITE_EXAMPLES: "$invite\n$invite copy",
			// Content
			INVITE_TITLE: "Main links",
			INVITE_DESC: (prefix) => `Type \`${prefix}invite copy\` to be able to copy the link!`,
			INVITE_HEADINGS: [
				`${e.add} Invite ${c.botname}`,
				`${e.vote} Vote for ${c.botname}`,
				`${e.help} Support`
			],

			/* MINIMIZE COMMAND */

			// Utils
			MINIMIZE_DESCRIPTION: "Shorten your link!",
			MINIMIZE_USAGE: "minimize [url]",
			MINIMIZE_EXAMPLES: "$minimize https://google.fr",
			// Errors
			MINIMIZE_ERR_INVALID_URL: `${e.error} | Please enter a valid URL!`,

			/* MINECRAFT COMMAND */

			// Utils
			MINECRAFT_DESCRIPTION: "Displays information about the Minecraft server!",
			MINECRAFT_USAGE: "minecraft [ip]",
			MINECRAFT_EXAMPLES: "$minecraft mc.hypixel.net",
			// Errors
			MINECRAFT_ERR_IP: `${e.error} | Please enter an IP!`,
			MINECRAFT_ERR_OFFLINE: `${e.error} | This server is offline or blocking access!`,
			// Content
			MINECRAFT_ONLINE: "Online",
			MINECRAFT_OFFLINE: "Offline",
			MINECRAFT_PLAYERS: (nb) => `${nb} player(s)`,
			// Headings
			MINECRAFT_HEADINGS: (ip) => [
				`Informations on ${ip}`,
				`${e.version} Version`,
				`${e.minecraft} Currently connected`,
				`${e.users} Maximum`,
				`${e.status.online} Status`,
				`${e.ip} Full IP`
			],

			/* JOKE COMMAND */

			// Utils
			JOKE_DESCRIPTION: "Displays a joke in French",
			JOKE_USAGE: "joke",
			JOKE_EXAMPLES: "$joke",
			// Content
			JOKE_FOOTER: "blague.xyz | By Skiz#0001",

			/* 8BALL COMMAND */

			// Utils
			EIGHTBALL_DESCRIPTION: "I'm telling you the truth!",
			EIGHTBALL_USAGE: "8ball [question]",
			EIGHTBALL_EXAMPLES: "$8ball Is Atlanta the best Discord bot?",
			// Errors
			EIGHTBALL_ERR_QUESTION: `${e.error} | You have to enter a question to ask me!`,
			// Content
			EIGHTBALL_ANSWERS: [
				"I'm sure of it.",
				"it's definitely safe.",
				"undoubtedly...",
				"Yes, I'm sure and certain!",
				"probably...",
				"Yes!",
				"No!",
				"signs make me say yes...",
				"ask again later...",
				"it's better not to tell you now...",
				"I can't predict now...",
				"Concentrate and ask again!",
				"don't count on it.",
				"my answer is no.",
				"my sources say no...",
				"oh.... I doubt it!",
			],

			/* QRCODE */

			// Utils
			QRCODE_DESCRIPTION: "Generates a QR Code with your text!",
			QRCODE_USAGE: "qrcode [text]",
			QRCODE_EXAMPLES: "$qrcode Hey !",
			// Errors
			QRCODE_ERR_TEXT: `${e.error} | You must enter a text!`,

			/* FLIP COMMAND */

			// Utils
			FLIP_DESCRIPTION: "I roll the dice for you!",
			FLIP_USAGE: "flip",
			FLIP_EXAMPLES: "$flip",
			// Content
			FLIP_PILE: ":game_die: | It's **pile** !",
			FLIP_FACE: ":game_die: | It's **face** !",

			/* LMG COMMAND */

			// Utils
			LMG_DESCRIPTION: "Returns a link to lmgtfy.com",
			LMG_USAGE: "lmg [question]",
			LMG_EXAMPLES: "$lmg How to create your Discord bot?",
			// Errors
			LMG_ERR_QUESTION: `${e.error} | You must specify a search!`,

			/* LOVECALC COMMAND */

			// Utils
			LOVECALC_DESCRIPTION: "How much love is there between two people? *This is a fun command, not to be taken seriously*",
			LOVECALC_USAGE: "lovecalc [@member1] (@member2)",
			LOVECALC_EXAMPLES: "$lovecalc @Androz#2091\n$lovecalc @Androz#2091 @Atlanta#6770",
			// Errors
			LOVECALC_ERR_MENTIONS: `${e.error} | You must mention two members!`,
			// Content
			LOVECALC_CONTENT: (percent, username1, username2) => `There's **${percent}%** of love between **${username1}** and **${username2}** !`,

			/* BACKUP COMMAND */

			// Utils
			BACKUP_DESCRIPTION: "Manage your server backups in an ergonomic and efficient way!",
			BACKUP_USAGE: "backup [create/load/infos]",
			BACKUP_EXAMPLES: "$backup create\n$backup load 92N1x\n$backup infos 92N1x",
			// Errors
			BACKUP_ERR_STATUS: `${e.error} | You must specify \`create\`, \`load\` or \`infos\`!`,
			BACKUP_ERR_NOT_FOUND: (backupID) => `${e.error} | No backup found for \`${backupID}\``,
			BACKUP_ERR_ID: `${e.error} | Please enter a backup ID!`,
			BACKUP_ERR_TIMEOUT: `${e.error} | Time's up! Cancelled backup loading!`,
			// Content
			BACKUP_CREATE_SUCCESS: `${e.success} | Successfully created backup! The backup ID has been sent to you in private messages!`,
			BACKUP_CREATE_SUCCESS_ID: (backupID) => `${e.success} | Here is the ID of your backup: \`\`\`${backupID}\`\`\``,
			BACKUP_CONFIRMATION: `${e.warn} | :warning: | When the backup is loaded, all the channels, roles, etc. will be replaced! Type \`-confirm\` to confirm!`,
			BACKUP_START_SAVING: `${e.success} | Start loading the backup!`,
			BACKUP_LOAD_SUCCESS: `${e.success} | Backup successfully loaded!`,
			// Headings
			BACKUP_HEADINGS: [
				"Backup Informations",
				"ID",
				"Server ID",
				"Size",
				"Created At"
			],

			/* GETCONF COMMAND */

			// Utils
			GETCONF_DESCRIPTION: "Displays the configuration of a server",
			GETCONF_USAGE: "getconf [server ID]",
			GETCONF_EXAMPLES: "$getconf 565048515357835264",
			// Errors
			GETCONF_ERR_ID: `${e.error} | Please enter a valid ID!`,
			GETCONF_ERR_GUILD_NOT_FOUND: `${e.error} | No server found!`,

			/* PERMISSIONS COMMAND */

			// Utils
			PERMISSIONS_DESCRIPTION: "Displays the member's permissions in the channel",
			PERMISSIONS_USAGE: "permissions (@member)",
			PERMISSIONS_EXAMPLES: "$permissions\n$permissions @Androz#2091",
			// Content
			PERMISSIONS_TITLE: (username, channel) => `Permissions of ${username} in #${channel}`,

			/* PARTNERS COMMAND */

			// Utils
			PARTNERS_DESCRIPTION: "Displays Atlanta partners",
			PARTNERS_USAGE: "partners",
			PARTNERS_EXAMPLES: "$partners",
			// Content
			PARTNERS_TITLE: `${c.botname} Partners`,

			/* SERVERSLIST COMMAND */

			SERVERSLIST_DESCRIPTION: "Displays the list of the servers of the bot!",
			SERVERSLIST_USAGE: "servers-list",
			SERVERSLIST_EXAMPLES: "$servers-list",

			/* TWEET COMMAND */

			// Utils
			TWEET_DESCRIPTION: "Generate a tweet of a person of your choice on Twitter!",
			TWEET_USAGE: "tweet [@twitter] [text]",
			TWEET_EXAMPLES: "$tweet EmmanuelMacron Hello France!",
			// Errors
			TWEET_ERR_USERNAME: `${e.error} | You have to enter someone's twitter nickname!`,
			TWEET_ERR_TEXT: `${e.error} | You must enter a message!`,
			// Content
			TWEET_CONTENT: (user) => `New tweet published by ${user}:`,

			/* PLAY COMMAND */

			// Utils
			PLAY_DESCRIPTION: "Play music!",
			PLAY_USAGE: "play [title]",
			PLAY_EXAMPLES: "$play Despacito",
			// Errors
			PLAY_ERR_CANT_JOIN: `${e.error} | I can't go into the voice channel!`,
			PLAY_ERR_NO_SONG: `${e.error} | No more music in the queue!`,
			// Content
			PLAY_ADDED_TO_QUEUE: (title) => `${e.add} | ${title} has been added to the queue!`,
			PLAY_SEARCH: "Please enter a value to select one of the search results from 1 to 10.",
			PLAY_ERR_NO_NAME: `${e.error} | Please enter a video name to search for!`,
			PLAY_ERR_VOICE_CHANNEL: `${e.error} | You must be connected in a voice channel!`,
			PLAY_ERR_PERMS: `${e.error} | An error has occurred. Either I can't connect in your living room or I can't talk in your living room. Check my permissions and try again.`,
			PLAY_ERR_TIMEOUT: `${e.error} | Time's up! Please retype the command!`,
			PLAY_ERR_NOT_FOUND: `${e.error} | No results on Youtube!`,
			PLAY_ERR_NOT_PLAYING: `${e.error} | No music in progress!`,
			// Headings
			PLAY_PLAYING_TITLE: "Playing in progress",
			PLAY_HEADINGS: [
				`${e.title} Title`,
				`${e.singer} Singer`,
				`${e.time} Duration`,
				`${e.search} Search`,
				`${e.calendar} Creation`,
				`${e.desc} Description`,
				`${e.time} Duration`
			],

			/* STOP COMMAND */

			// Utils
			STOP_DESCRIPTION: "Stop the music in progress!",
			STOP_USAGE: "stop",
			STOP_EXAMPLES: "$stop",
			// Content
			STOP_TITLE: `Stop the music`,
			STOP_CONTENT: (voteCount, requiredCount) => `Stop the music\nVote: ${voteCount}/${requiredCount}\nReact with 👍 to stop the music!`,
			STOP_CONTENT_COMPLETE: "Music correctly stopped!",

			/* SKIP COMMAND */

			// Utils
			SKIP_DESCRIPTION: "Play the next song!",
			SKIP_USAGE: "skip",
			SKIP_EXAMPLES: "$skip",
			// Content
			SKIP_TITLE: "Skip to next song",
			SKIP_CONTENT: (title, voteCount, requiredCount) => `Next song: ${title}\nVote: ${voteCount}/${requiredCount}\nReact with 👍 to play the next song!`,
			SKIP_CONTENT_COMPLETE: (title) => `Song passed ! Now: ${title}`,
			SKIP_SUCCESS: `${e.success} | I just changed the song!`,
			// Errors
			SKIP_ERR_NO_SONG: `${e.error} | No next song!`,

			/* NP COMMAND */

			// Utils
			NP_DESCRIPTION: "Displays information about the current song!",
			NP_USAGE: "np",
			NP_EXAMPLES: "$np",
			// Errors
			NP_ERR_NO_DESC: "**No description**",

			/* QUEUE COMMAND */

			// Utils
			QUEUE_DESCRIPTION: "Displays the queue",
			QUEUE_USAGE: "queue",
			QUEUE_EXAMPLES: "$queue",
			// Content
			QUEUE_TITLE: `${e.playlist} Playlist`,

			/* CONFIGURATION COMMAND */

			// Utils
			CONFIGURATION_DESCRIPTION: "Displays the server configuration",
			CONFIGURATION_USAGE: "configuration",
			CONFIGURATION_EXAMPLES: "$configuration",
			// Headings
			CONFIGURATION_HEADINGS: [
				[ "Channel(s) ignored", "No channel ignored" ],
				[ "Autorole", "Autorole disabled" ],
				[ "Welcome", "Welcome messages disabled" ],
				[ "Goodbye", "Goodbye messages disabled" ],
				[ "Slowmode", "No channel with slowmode" ],
				[ "Channels" ],
				[ "Warns" ],
				[ "Automoderation", "Automoderation disabled" ],
				[ "Auto-delete commands", "Auto-deletion of moderation commands disabled" ],
				[ "Edit your configuration", `[Clic here to go on the dashboard!](${c.dashboard.baseURL})`]
			],
			CONFIGURATION_AUTOROLE: (roleID) => `Role : <@&${roleID}>`,
			CONFIGURATION_WELCOME: (withImage, channelID) => `Channel : <#${channelID}>\nImage : ${withImage ? "Yes" : "No"}`,
			CONFIGURATION_GOODBYE: (withImage, channelID) => `Channel : <#${channelID}>\nImage : ${withImage ? "Yes" : "No"}`,
			CONFIGURATION_MODLOGS: (channelID) => `Moderation logs : ${channelID ? `<#${channelID}>` : "Not defined"}`,
			CONFIGURATION_SUGGESTIONS: (channelID) => `Suggestions : ${channelID ? `<#${channelID}>` : "Not defined" }`,
			CONFIGURATION_FORTNITESHOP: (channelID) => `Fortnite Shop : ${channelID ? `<#${channelID}>` : "Not defined" }`,
			CONFIGURATION_AUTOMOD: (ignoredChannels) => `${ignoredChannels.length > 0 ? `Salon ignorés : ${ignoredChannels.map((ch) => `<#${ch}>`)}` : "Aucun salon ignoré."}`,
			CONFIGURATION_WARNS: (kick, ban) => `${kick ? `**Expulsion**: after **${kick}** warnings.` : "**Expulsion**: Not defined."}\n${ban ? `**Banishment**: after **${ban}** warnings.` : "**Banishment**: Not defined."}`,
			CONFIGURATION_AUTODELETEMOD: "Auto-deletion of moderation commands enabled",

			/* IGNORE COMMAND */

			// Utils
			IGNORE_DESCRIPTION: "Disables or activates commands in the mentioned channel",
			IGNORE_USAGE: "ignore [#channel]",
			IGNORE_EXAMPLES: "$ignore #general",
			// Content
			IGNORE_SUCCESS_DISABLED: (channel) => `${e.success} | Commands are now allowed in ${channel} !`,
			IGNORE_SUCCESS_ENABLED: (channel) => `${e.warn} | Commands are now forbidden in ${channel} !`,

			/* SETPREFIX COMMAND */

			// Utils
			SETPREFIX_DESCRIPTION: "Changes the server prefix",
			SETPREFIX_USAGE: "setprefix [prefix]",
			SETPREFIX_EXAMPLES: "$setprefix !",
			// Errors
			SETPREFIX_ERR_PREFIX: `${e.error} | Please enter a valid prefix!`,
			SETPREFIX_ERR_CARACT: `${e.error} | The prefix must not exceed 5 characters!`,
			// Content
			SETPREFIX_SUCCESS: (prefix) => `${e.success} | The prefix has been changed! Type in \`${prefix}help\` to see the list of commands!`,

			/* AUTOROLE COMMAND */

			// Utils
			AUTOROLE_DESCRIPTION: "Enable or disable the autorole on the server!",
			AUTOROLE_USAGE: "autorole [on/off] (role)",
			AUTOROLE_EXAMPLES: "$autorole on Members\n$autorole off",
			// Errors
			AUTOROLE_ERR_STATUS: `${e.error} | Please indicate \`on\` or \`off\` and a role name!`,
			// Content
			AUTOROLE_ENABLED: (prefix) => `${e.success} | Autrole correctly activated! To have more information about the configuration of your server type \`${prefix}configuration\` !`,
			AUTOROLE_DISABLED: (prefix) => `${e.warn} | Autrole correctly deactivated! To have more information about the configuration of your server type \`${prefix}configuration\` !`,

			/* WELCOME COMMAND */

			// Utils
			WELCOME_DESCRIPTION: `Send a welcome message to a pre-defined channel!`,
			WELCOME_USAGE: "welcome",
			WELCOME_EXAMPLES: "$welcome",
			// Content
			WELCOME_TEST_SUCCESS: `${e.success} | Test performed!`,
			WELCOME_DISABLED: (prefix) => `${e.success} | Welcome messages have just been disabled! Type \`${prefix}configuration\` to see the current configuration!`,
			WELCOME_FORM_CHANNEL: (author) => `Hello ${author} ! In which channel will the welcome messages be sent? (mention a channel)`,
			WELCOME_FORM_MESSAGE: (channel, msg) => `All right! The messages will therefore be sent in ${channel}. Enter the welcome message below: \n\n\nInfos:\n\n\nMention: {user}\nMembers: {membercount}\nServer: {server}\nFor example, "Welcome {user} to {server} ! Thanks to you, we are {membercount} ! will give "Welcome ${msg.author} to ${msg.guild.name} ! Thanks to you, we are ${msg.guild.memberCount} !".`,
			WELCOME_FORM_IMAGE: `It works! Do you want a great welcome image to be sent at the same time? Answer with "yes" or "no"!`,
			WELCOME_FORM_SUCCESS: (channel, prefix) => `${e.success} | Welcome messages enabled in <#${channel}> ! Type \`${prefix}welcome test\` to test the welcome message!`,
			WELCOME_IMG_MSG: (name) => `Welcome in ${name} !`,
			WELCOME_IMG_NUMBER: (memberCount) => `- ${memberCount}th member !`,
			WELCOME_IMG_TITLE: "WELCOME",
			WELCOME_DEFAULT_MESSAGE: "Welcome {user} to {server} ! Thanks to you, we are {membercount} !",
			// Errors
			WELCOME_ERR_TIMEOUT: `${e.error} | Time's up! Please retype the command!`,
			WELCOME_ERR_CARACT: `${e.error} | Your message must not exceed 1500 characters!`,

			/* GIVEAWAY COMMAND */

			// Utils
			GIVEAWAY_DESCRIPTION: "Manage your giveaways simply!",
			GIVEAWAY_USAGE: "giveaway [create/reroll/delete/end] (time) (winners count) (prize)",
			GIVEAWAY_EXAMPLES: "$giveaway create 10m 2 5$ PayPal !\n$giveaway reroll 597812898022031374",
			// Errors
			GIVEAWAY_ERR_STATUS: `${e.error} | You must specify \`create\`, \`reroll\` ou \`delete\`!`,
			GIVEAWAY_ERR_CREATE: (prefix) => `${e.error} | You must enter the information in this format: \n\n\`${prefix}giveaway create [time] [winners count] [prize]\``,
			GIVEAWAY_ERR_REROLL: `${e.error} | You must enter the ID of the giveaway message a re-rolled!`,
			GIVEAWAY_ERR_DELETE: `${e.error} | You must enter the ID of the giveaway message to be deleted!`,
			GIVEAWAY_ERR_END: `${e.error} | You must enter the ID of the giveaway message to be ended!`,
			GIVEAWAY_ERR_REROLL_MSG_ENDED: (messageID) => `${e.error} | No giveaway **ended** found with message ID \`${messageID}\``,
			GIVEAWAY_ERR_MESSAGE_NOT_FOUND: (messageID) => `${e.error} | No giveaway found with message ID \`${messageID}\``,
			GIVEAWAY_ERR_15_DAYS: `${e.error} | The maximum length of a giveaway is 15 days.`,
			GIVEAWAY_ERR_MAX: `${e.error} | A maximum of 4 Giveaways can be launched on the same server.`,
			// Content
			GIVEAWAY_CREATED: `${e.success} | Giveaway launched!`,
			GIVEAWAY_REROLLED: `${e.success} | New draw done!`,
			GIVEAWAY_DELETED: `${e.success} | Giveaway deleted!`,
			GIVEAWAY_ENDED: `${e.success} | Giveaway in stop mode (-15 seconds)!`,
			// Messages
			GIVEAWAY_CREATE_MESSAGES: {
				giveaway: "🎉🎉 **GIVEAWAY** 🎉🎉",
				giveawayEnded: "🎉🎉 **GIVEAWAY ENDED** 🎉🎉",
				timeRemaining: "Time remaining: **{duration}** !",
				inviteToParticipate: "React with 🎉 to participate!",
				winMessage: "Congratulations, {winners} ! You won **{prize}** !",
				embedFooter: "Giveaways",
				noWinner: "Giveaway cancelled, no valid participation.",
				winners: "winner(s)",
				endedAt: "End at",
				units: { seconds: "seconds", minutes: "minutes", hours: "hours", days: "days" }		
			},
			GIVEAWAY_REROLL_MESSAGES: {
				congrat: ":tada: New winner(s) : {winners}! Congratulations!",
				error: "No valid entries, no winners can be chosen!"
			},

			/* GOODBYE COMMAND */

			// Utils
			GOODBYE_DESCRIPTION: "Send a goodbye message to a pre-defined channel!",
			GOODBYE_USAGE: "goodbye",
			GOODBYE_EXAMPLES: "$goodbye",
			// Content
			GOODBYE_DISABLED: (prefix) => `${e.success} | The goodbye messages have just been deactivated! Type \`${prefix}configuration\` to see the current configuration!`,
			GOODBYE_TEST_SUCCESS: `${e.success} | Test effectué !`,
			GOODBYE_FORM_CHANNEL: (author) => `Hello ${author} ! In which channel will the goodbye messages be sent? (mention a channel)`,
			GOODBYE_FORM_MESSAGE: (channel, msg) => `All right! The messages will therefore be sent in ${channel}. Enter the goodbye message below: \n\n\nInfos:\\n\n\nMention: {user}\nMembers: {membercount}\nServer: {server}\nFor example, "Goodbye {user} ! It's sad, without you we're only {membercount} on {server} !" will give "Goodbye ${msg.author.username}#${msg.author.discriminator} ! It's sad, without you we're only ${msg.guild.memberCount} on ${msg.guild.name} !".`,
			GOODBYE_FORM_IMAGE: `It works! Do you want a great welcome image to be sent at the same time? Answer with "yes" or "no"!`,
			GOODBYE_FORM_SUCCESS: (channel, prefix) => `${e.success} | Goodbye messages enabled in <#${channel}> ! Type \`${prefix}goodbye test\` to test the goodbye message!`,
			GOODBYE_IMG_MSG: (name) => `Leaving from ${name}`,
			GOODBYE_IMG_NUMBER: (memberCount) => `- ${memberCount}th member !`,
			GOODBYE_IMG_TITLE: "GOODBYE",
			GOODBYE_DEFAULT_MESSAGE: "Goodbye {user} ! It's sad, without you we're only {membercount} on {server} !",
			// Errors
			GOODBYE_ERR_TIMEOUT: `${e.error} | Time's up! Please retype the command!`,
			GOODBYE_ERR_CARACT: `${e.error} | Your message must not exceed 1500 characters!`,

			/* SLOWMODE COMMAND */

			// Utils
			SLOWMODE_DESCRIPTION: "Define a cooldown in a channel",
			SLOWMODE_USAGE: "slowmode [#channel] (time)",
			SLOWMODE_EXAMPELS: "$slowmode #general 10m\n$slowmode #general",
			// Errors
			SLOWMODE_PLEASE_WAIT: (time, channel) => `${e.error} | The channel ${channel} is in slowmode! Please wait ${time} to be able to post a new message!`,
			// Content
			SLOWMODE_DISABLED: (channel) => `${e.success} | The slowmode has been disabled in the channel <#${channel}> !`,
			SLOWMODE_ENABLED: (channel, time) => `${e.success} | Slowmode enabled in <#${channel}> with a time of ${time} !`,

			/* ADDCOMMAND COMMAND */

			// Utils
			ADDCOMMAND_DESCRIPTION: "Add a custom command to the server!",
			ADDCOMMAND_USAGE: "addcommand [name] [answer]",
			ADDCOMMAND_EXAMPLES: "$addcommand hey hi!",
			// Errors
			ADDCOMMAND_ERR_NAME: `${e.error} | Please enter a name and an answer to the command!`,
			ADDCOMMAND_ERR_EXISTS: (name) => `${e.error} | The command ${name} already exists!`,
			ADDCOMMAND_ERR_ANSWER: `${e.error} | Please enter an answer to this command!`,
			// Content
			ADDCOMMAND_SUCCESS: (cmd) => `${e.success} | The command ${cmd} has been added to the server!`,

			/* DELCOMMAND COMMAND */

			// Utils
			DELCOMMAND_DESCRIPTION: "Remove a custom command from the server!",
			DELCOMMAND_USAGE: "delcommand [name-of-the-command]",
			DELCOMMAND_EXAMPLES: "$delcommand hey",
			// Errors
			DELCOMMAND_ERR_NAME: `${e.error} | Please enter the name of the command you wish to delete!`,
			DELCOMMAND_ERR_EXISTS: (cmd) => `${e.error} | The command ${cmd} does not exist!`,
			// Content
			DELCOMMAND_SUCCESS: (cmd) => `${e.success} | The ${cmd} command has been removed from the server!`,

			/* RELOAD COMMAND */

			// Utils
			RELOAD_DESCRIPTION: "Reload a bot command!",
			RELOAD_USAGE: "reload [name-of-the-command]",
			RELOAD_EXAMPLES: "$reload ping",
			// Errors
			RELOAD_ERR_CMD: `${e.error} | Please enter the name of the command you want to reload!`,
			RELOAD_ERR_NOT_FOUND: (cmd) => `${e.error} | No command found for \`${cmd}\` !`,
			// Content
			RELOAD_SUCCESS: (cmd) => `${e.success} | The command ${cmd} has been reloaded!`,

			/* PROFILE COMMAND */

			// Utils
			PROFILE_DESCRIPTION: "Displays the profile of the mentioned user (or the author of the message)",
			PROFILE_USAGE: "profile (@user#0000)",
			PROFILE_EXAMPLES: "$profile\n$profile @Androz#2091",
			// Content
			NO_BIO: "No biography available",
			DISPLAY_REP: (points) => `**${points}** point(s)`,
			DISPLAY_MONEY: (money) => `**${money}** credit(s)`,
			NO_PARTNER: "Single",
			NO_BIRTHDATE: "Not available.",
			NO_BADGE: "No badge.",
			// Headings
			PROFILE_TITLE: (username) => `Profile of ${username}`,
			PROFILE_HEADINGS:{
				MONEY:"💰 Local money",
				GLOBAL_MONEY:"🌍 Total money",
				BANK: "💳 Bank",
				REP: "🎩 Reputation",
				REGISTERED_AT: "📅 Registered",
				LEVEL:"📊 Level",
				EXP: "🔮 Experience",
				BIRTHDATE: "🎂 Birthdate",
				MARRIED: "❤️ Married",
				INVITER: "🤵 Invitor",
				PSEUDO: "📝 Pseudo",
				BADGES: "🔥 Badges",
				BIO: "🔖 Biography"
			},
			
			/* WORK COMMAND */

			// Utils
			WORK_DESCRIPTION: "Work and earn money!",
			WORK_USAGE: "work",
			WORK_EXAMPLES: "$work",
			// Content
			WORK_CLAIMED_TITLE: "Salary",
			WORK_CLAIMED_CONTENT: "200 credits added to your account!",
			// Errors
			WORK_ERR_COOLDOWN: (delay) => `${e.error} | You have to wait ${delay} before you can work again!`,

			/* REP COMMAND */

			// Utils
			REP_DESCRIPTION: "Give a member a reputation point!",
			REP_USAGE: "rep [@user#0000]",
			REP_EXAMPLES: "$rep @Androz#2091",
			// Errors
			REP_ERR_COOLDOWN: (delay) => `${e.error} | You have to wait ${delay} before you can give a reputation point again!`,
			REP_ERR_YOURSELF: `${e.error} | You can't give yourself a reputation point!`,
			// Content
			REP_SUCCESS: (tag) => `${e.success} | You did give a reputation point to **${tag}** !`,

			/* SETBIO COMMAND */

			// Utils
			SETBIO_DESCRIPTION: "Change the biography that will appear on your profile!",
			SETBIO_USAGE: "setbio [description]",
			SETBIO_EXAMPLES: "$setbio Developer for 5 years in Swift",
			// Errors
			SETBIO_ERR_NO_BIO : `${e.error} | Please enter a valid biography!`,
			SETBIO_ERR_CARACT: `${e.error} | Your biography must not exceed 100 characters!`,
			// Content
			SETBIO_SUCCESS: `${e.success} | Your biography has just been modified!`,

			/* MONEY COMMAND */

			// Utils
			MONEY_DESCRIPTION: "Displays your credits",
			MONEY_USAGE: "money (@member)",
			MONEY_EXAMPLES: "$money\n$money @user#0000",
			// Content
			CREDITS_TITLE: (username) => `Credits de ${username}`,
			CREDITS_CONTENT: (credits, username) => `Currently **${credits}** credits on the account of **${username}** !`,

			/* LEADERBOARD COMMAND */

			// Utils
			LEADERBOARD_DESCRIPTION: "Displays users who have the most credits, levels or reputation points!",
			LEADERBOARD_USAGE: "leaderboard [rep/levels/credits]",
			LEADERBOARD_EXAMPLES: "$leaderboard credits\n$leaderboard levels",
			// Errors
			LEADERBOARD_ERR_TYPE: `${e.error} | Please enter a type of leaderboard! (\`credits\`, \`level\` ou \`rep\`)`,
			LEADERBOARD_ERR_MOBILE: `:confused: We have detected that you are using a phone.... The leaderboard is not yet available directly on Discord for mobiles but you can still access it on the dashboard: <${c.dashboard.baseURL}>`,

			/* STEAL COMMAND */

			// Utils
			STEAL_DESCRIPTION: "Try stealing a member!",
			STEAL_USAGE: "steal [@membre] [amount]",
			STEAL_EXAMPLES: "$steal @Androz#2091 100",
			// Errors
			STEAL_ERR_YOURSELF: `${e.error} | You can't robbed yourself!`,
			STEAL_ERR_AMOUNT: (member) => `${e.error} | Please enter a valid amount to be robbed to **${member.user.tag}** !`,
			STEAL_ERR_AMOUNT_MEMBER: (member, money) => `${e.error} | **${member.user.username}** does not have **${money}** credits !`,
			STEAL_ERR_NO_MONEY: (needed) => `${e.error} | You must have more than **${needed}** credits to attempt this robbery!`,
			STEAL_ERR_CLDWN: (member) => `:spy: **${member.user.username}** is on guard.... Wait a while and try again!`,
			// Content
			STEAL_WON: (stealed, member) => [
				`:tada: | Congratulations! The police weren't fast enough to stop you from stealing **${stealed}** credits to **${member.user.username}** !`,
				`:confused: | **${member.user.username}** ? Bad news. You just got robbed **${stealed}** credits!`,
			],
			STEAL_LOSE: (lose, member, won) => [
				`:oncoming_police_car: | The police caught you in the act, impossible to deny, your fine is **${lose}** credits. **${won}** offset credits will be paid to **${member.user.username}**.`,
				`:police_car: | Bad news.... **${member.user.username}** called the police in time. Your fine is **${lose}** credits and **${won}** offset credits will be paid to **${member.user.username}**.`
			],

			/* DEPOSIT COMMAND */

			// Utils
			DEPOSIT_DESCRIPTION: "Deposit your money at the bank",
			DEPOSIT_USAGE: "deposit [amount]",
			DEPOSIT_EXAMPLES: "$deposit 400",
			// Errors
			DEPOSIT_ERR_AMOUNT: `${e.error} | Please specify an amount to be deposited at the bank!`,
			DEPOSIT_ERR_AMOUNT_TOO_HIGH: (money) => `${e.error} | You don't have \`${money}\` credits!`,
			// Content
			DEPOSIT_SUCCESS: (money) => `${e.success} | **${money}** credits deposited in the bank!`,

			/* PAY COMMAND */

			// Utils
			PAY_DESCRIPTION: "Pay a member with credits!",
			PAY_USAGE: "pay [@user#0000] [amount]",
			PAY_EXAMPLES: "$pay @Androz#2091 400",
			// Errors
			PAY_ERR_YOURSELF: `${e.error} | You can't pay yourself!`,
			PAY_ERR_INVALID_AMOUNT: (username) => `${e.error} | You must enter an amount to be paid to **${username}** !`,
			PAY_ERR_AMOUNT_TOO_HIGH: (amount, username) => `${e.error} | You don't have enough credits to pay ${amount} credits to ${username} !`,
			// Content
			PAY_SUCCESS: (amount, username) => `${e.success} | You paid ${amount} credits to ${username} !`,

			/* WITHDRAW COMMAND */

			// Utils
			WITHDRAW_DESCRIPTION: "Withdraw money!",
			WITHDRAW_USAGE: "withdraw [amount]",
			WITHDRAW_EXAMPLES: "$withdraw 400",
			// Errors
			WITHDRAW_ERR_AMOUNT: `${e.error} | Please specify an amount to be withdrawn!`,
			WITHDRAW_ERR_AMOUNT_TOO_HIGH: (money) => `${e.error} | You do not have \`${money}\` credits at the bank!`,
			// Content
			WITHDRAW_SUCCESS: (money) => `${e.success} | **${money}** credits withdrawn!`,

			/* BIRTHDATE COMMAND */

			// Utils
			BIRTHDATE_DESCRIPTION: "Set your birthday date (which will appear on your profile)",
			BIRTHDATE_USAGE: "birthdate (date)",
			BIRTHDATE_EXAMPLES: "$birthdate 01/12/2000",
			// Errors
			BIRTHDATE_ERR_DATE: `${e.error} | Please enter a valid date! For example,  01/12/2000`,
			BIRTHDATE_ERR_DATE_FORMAT: `${e.error} | You have entered an invalid date. Reminder: the date format must be: Day/Month/Year. For example, 01/12/2000 for December 1, 2000.`,
			BIRTHDATE_ERR_INVALID_DATE_FORMAT: `${e.error} | You have entered an invalid date (or the indicated date does not exist). Reminder: the date format must be: Day/Month/Year. For example, 01/12/2000 for December 1, 2000.`,
			BIRTHDATE_ERR_TOO_HIGH: `${e.error} | You can't not have been born yet!`,
			BIRTHDATE_ERR_TOO_LOW: `${e.error} | More than 80 years old? :eyes:`,
			// Content
			BIRTHDATE_SUCCESS: (date) => `${e.success} | Your birthday has been set on the ${date} !`,
			
			
			/* WEDDING COMMAND */

			// Utils
			WEDDING_DESCRIPTION: "Marry the person of your choice!",
			WEDDING_USAGE: "wedding [@user#0000]",
			WEDDING_EXAMPLES: "$wedding @Androz#2091",
			// Errors
			WEDDING_ERR_AUTHOR_MARRIED: (prefix) => `${e.error} | You are already married! First use \`${prefix}divorce\` to divorce`,
			WEDDING_ERR_MEMBER_MARRIED: (username) => `${e.error} | The place is taken, companion! **${username}** is already married!`,
			WEDDING_ERR_AUTHOR_PENDING_REQUESTER: (username) => `${e.error} | You already have a current request to **${username}** !`,
			WEDDING_ERR_AUTHOR_PENDING_RECEIVER: (username) => `${e.error} | **${username}** has already sent you a request! Please refuse or accept it (or wait until it expires in a few minutes).`,
			WEDDING_ERR_MEMBER_PENDING_REQUESTER: (username1, username2) => `${e.error} | **${username2}** has already sent a request to **${username1}** !`,
			WEDDING_ERR_MEMBER_PENDING_RECEIVER: (username1, username2) => `${e.error} | **has already sent a request to **${username2}** ! Wait until **${username2}** accepts or refuses the request for **${username1}** or until it expires and try again!`,
			WEDDING_ERR_TIMEOUT: (member) => `${e.error} | ${member} did not answer.... Wait until he/she is connected and then try again!`,
			WEDDING_ERR_DENIED: (author, member) => `${e.error} | ${author}, I have some bad news... ${member} refused your proposal.`,
			WEDDING_ERR_YOURSELF: `${e.error} | You can't marry yourself!`,
			// Content
			WEDDING_REQUEST: (member, author) => `${e.warn} | ${member}, do you agree to marry ${author}? Answer with "yes" or "no"!`,
			WEDDING_SUCCESS: (author, member) => `${e.success} | ${author}, I have some good news... ${member} has accepted your proposal!`,

			/* DIVORCE COMMAND */

			// Utils
			DIVORCE_DESCRIPTION: "Divorce the person you are currently married to!",
			DIVORCE_USAGE: "divorce",
			DIVORCE_EXAMPLES: "divorce",
			// Errors
			DIVORCE_ERR_NOT_WEDDED: `${e.error} | You are not currently married!`,
			// Content
			DIVORCE_SUCCESS: (username) => `${e.success} | You just divorced with **${username}** !`,

			/* SLOTS COMMAND */

			// Utils
			SLOTS_DESCRIPTION: "An equivalent to the Casino!",
			SLOTS_USAGE: "slots [amount]",
			SLOTS_EXAMPLES: "$slots\n$slots 10",
			// Content
			SLOTS_DEFEAT: (amount, username) => `**${username}** used ${amount} credit(s) and lost everything.`,
			SLOTS_VICTORY: (text, amount, won, username) => `${text}**${username}** used ${amount} credit(s) and won ${won} credit(s)!`,
			// Errors
			SLOTS_ERR_TOO_HIGH: (money) => `${e.error} | You do not have ${money} credit(s).`,

			/* BADGE COMMAND */

			// Utils
			BADGE_DESCRIPTION: "Buy badges that will appear on your profile!",
			BADGE_USAGE: "badge (name-of-the-badge)",
			BADGE_EXAMPLES: "$badge\n$badge France",
			// Content
			BADGE_EMBED_TITLE: `Badges ${c.botname}`,
			BADGE_EMBED_DESCRIPTION: (prefix) => `To buy a badge, type \`${prefix}badge [name-of-the-badge]\``,
			BADGE_FORMAT: (badge) => `Badge: ${badge.emoji}\nName: ${badge.name}\nPrice: ${badge.price} credits\n--------\n`,
			BADGE_FORMAT_BOUGHT: (badge) => `Badge: ${badge.emoji}\nName: ${badge.name}\nAlready purchased (${badge.price} credits)\n--------\n`,
			BADGE_SUCCESS: (badge) => `${e.success} | You just bought the badge ${badge.name} (${badge.emoji}) for ${badge.price} credits!`,
			// Errors
			BADGE_ERR_NOT_FOUND: (text) => `${e.error} | No badges found for \`${text}\``,
			BADGE_ERR_PRICE: `${e.error} | You don't have enough credits to buy this badge!`,
			BADGE_ERR_BOUGHT: `${e.error} | You already have this badge!`,
			// Headings
			BADGE_HEADINGS: {
				flags: "Flags",
				games: "Games",
				others: "Others"
			},

			/* STATS COMMAND */

			// Utils
			STATS_DESCRIPTION: "Display the stats of the bot!",
			STATS_USAGE: "stats",
			STATS_EXAMPLES: "$stats",
			// Content
			STATS: (serv, users) => `\`Servers : ${serv}\`\n\`Users : ${users}\``,
			STATS_DESC: `${c.botname} is an open source bot developed by ${c.owner.name} !`,
			STATS_ONLINE: (time) => `From ${time}`,
			STATS_VC: (nb) => `Music in progress on \`${nb}\` servers`,
			STATS_CREDITS: "Thanks to `https://icones8.fr/icons/`, all the emojis (or almost) come from this site!\n__**Donators**__:\n- `xixi52#0001` **GOD**\n- `Marty#3994` **GOD**\n- `🍮_Lucas_🍮#6171` **SUPPORTER**",
			STATS_LINKS: (url, id) => `[Donate](${c.others.donate}) ● [Invite](https://discordapp.com/oauth2/authorize?client_id=${id}&scope=bot&permissions=2146958847) ● [Server](${url}) ● [Github](${c.others.github})`,
			// Headings
			STATS_HEADINGS:[
				`Stats`,
				`${e.stats} • __Statistics__`,
				`${e.version} • __Version__`,
				`${e.ram} • __RAM__`,
				`${e.status.online} • __Online__`,
				`${e.voice} • __Music__`,
				":heart: • __Acknowledgements & credits__",
				`${e.link} • __Links__`,
			],

			/* FACEPALM COMMAND */

			// Utils
			FACEPALM_DESCRIPTION: "Generates a \"facepalm\" image using the Anidiots API",
			FACEPALM_USAGE: "facepalm (@member)",
			FACEPALM_EXAMPLES: "$facepalm\n$facepalm @Androz#2091",

			/* HATES COMMAND */

			// Utils
			HATES_DESCRIPTION: "Generates a \"hates\" image using the Anidiots API",
			HATES_USAGE: "hates (@member)",
			HATES_EXAMPLES: "$hates\n$hates @Androz#2091",

			/* GARBAGE COMMAND */

			// Utils
			GARBAGE_DESCRIPTION: "Generates a \"garbage\" image using the Anidiots API",
			GARBAGE_USAGE: "garbage (@member)",
			GARBAGE_EXAMPLES: "$garbage\n$garbage @Androz#2091",

			/* RESPECT COMMAND */

			// Utils
			RESPECT_DESCRIPTION: "Generates a \"respect\" image using the Anidiots API",
			RESPECT_USAGE: "respect (@member)",
			RESPECT_EXAMPLES: "$respect\n$respect @Androz#2091",

			/* SHIT COMMAND */

			// Utils
			SHIT_DESCRIPTION: "Generates a \"respect\" image using the Anidiots API",
			SHIT_USAGE: "shit (@member)",
			SHIT_EXAMPLES: "$shit\n$shit @Androz#2091",

			/* TRIGGERED COMMAND */

			// Utils
			TRIGGERED_DESCRIPTION: "Generates a \"triggered\" image using the Anidiots API",
			TRIGGERED_USAGE: "triggered (@member)",
			TRIGGERED_EXAMPLES: "$triggered\n$triggered @Androz#2091",

			/* CAPTCHA COMMAND */

			// Utils
			CAPTCHA_DESCRIPTION: "Generates a \"triggered\" image using the Nekobot API",
			CAPTCHA_USAGE: "captcha (@member)",
			CAPTCHA_EXAMPLES: "$captcha\n$captcha @Androz#2091",

			/* PHCOMMENT COMMAND */

			// Utils
			PHCOMMENT_DESCRIPTION: "Generates a \"phcomment\" image using the Nekobot API",
			PHCOMMENT_USAGE: "phcomment (@member) (text)",
			PHCOMMENT_EXAMPLES: "$phcomment\n$phcomment @Androz#2091",
			// Errors
			PHCOMMENT_ERR_TEXT: `${e.error} | You must enter the text of the comment!`,

			/* AVATAR COMMAND */

			// Utils
			AVATAR_DESCRIPTION: "Displays the avatar of the mentionned member",
			AVATAR_USAGE: "avatar (@member)",
			AVATAR_EXAMPLES: "$avatar\n$avatar @Androz#2091",

			/* LOVE COMMAND */

			// Utils
			LOVE_DESCRIPTION: "Generates a \"love\" image using the Nekobot API",
			LOVE_USAGE: "love [@user1] (@user2)",
			LOVE_EXAMPLES: "$love @Androz#2091\n$love @Androz#2091 @Clyde#0000",

			/* CLYDE COMMAND */

			// Utils
			CLYDE_DESCRIPTION: "Generates a \"clyde\" image using the Nekobot API",
			CLYDE_USAGE: "clyde [text]",
			CLYDE_EXAMPLES: "$clyde Discord will close on November 11, 2019. Goodbye.",
			// Errors
			CLYDE_ERR_TEXT: `${e.error} | Please enter a text!`,

			/* TRANSLATE COMMAND  */

			// Utils
			TRANSLATE_DESCRIPTION: "I'm translating your text!",
			TRANSLATE_USAGE: "translate [language] [message]",
			TRANSLATE_EXAMPLES: "$translate fr How are you ?",
			// Content
			TRANSLATE_LANGS: `${e.success} | The list of languages has just been sent to you by private messages!`,
			// Errors
			TRANSLATE_ERR_LANG: (prefix) => `${e.error} | Please enter a language! To display the list of languages, type \`${prefix}translate langs-list\` !`,
			TRANSLATE_ERR_NOT_FOUND: (prefix, lang) => `${e.error} | The language \`${lang}\` does not exist! To display the list of languages, type \`${prefix}translate langs-list\` !`,
			TRANSLATE_ERR_MSG: `${e.error} | Please enter a text to be translated!`,

			/* BAN COMMAND */

			// Utils
			BAN_DESCRIPTION: "Banished the mentioned member!",
			BAN_USAGE: "ban [@user] (reason)",
			BAN_EXAMPLES: "$ban @Androz#2091 Spam",
			// Errors
			BAN_ERR_BANNED: (user) => `${e.error} | **${user.username}** is already banned!`,
			BAN_ERR_PERMISSIONS: `${e.error} | An error has occurred... check that I have the permissions to ban this member and try again!`,
			BAN_SUCCESS_DM: (user, msg, reason) => `${e.error} | Hello <@${user.id}>,\nYou have just been banned from **${msg.guild.name}** by **${msg.author.tag}** for **${reason}** !`,
			BAN_SUCCESS_CHANNEL: (user, msg, reason) => `${e.success} | **${user.username}** has just been banned from **${msg.guild.name}** by **${msg.author.tag}** for **${reason}** !`,
			BAN_TITLE_LOGS: (caseNumber) => `Ban | Case #${caseNumber}`,

			/* KICK COMMAND */

			// Utils
			KICK_DESCRIPTION: "Kick out the mentioned member!",
			KICK_USAGE: "kick [@user] (reason)",
			KICK_EXAMPLES: "$kick @Androz#2091 Spam",
			// Errors
			KICK_ERR_PERMISSIONS: `${e.error} | An error has occurred... check that I have the permission to kick this member out and try again!`,
			KICK_SUCCESS_DM: (user, msg, reason) => `${e.error} | Hello <@${user.id}>,\nYou have just been kicked out from **${msg.guild.name}** by **${msg.author.tag}** for **${reason}** !`,
			KICK_SUCCESS_CHANNEL: (user, msg, reason) => `${e.success} | **${user.username}** has just been kicked out from **${msg.guild.name}** by **${msg.author.tag}** for **${reason}** !`,
			KICK_TITLE_LOGS: (caseNumber) => `Kick | Case #${caseNumber}`,

			/* CHECKINVITES COMMAND */

			// Utils
			CHECKINVITES_DESCRIPTION: "Check if members do not have an ad for their Discord server in their presence!",
			CHECKINVITES_USAGE: "checkinvites",
			CHECKINVITES_EXAMPLES: "$checkinvites",
			// Content
			CHECKINVITES_NOT_FOUND: `${e.success} | No member advertises in his game!`,

			/* CLEAR COMMAND */

			// Utils
			CLEAR_DESCRIPTION: "Deletes messages very quickly!",
			CLEAR_USAGE: "clear[number-of-messages] (@member)",
			CLEAR_EXAMPLES: "$clear 10\n$clear 10 @Androz#2091",
			// Errors
			CLEAR_ERR_AMOUNT: `${e.error} | You must specify a number of messages to delete!`,
			CLEAR_ERR_TIMEOUT: `${e.error} | Time's up! Please retype the command!`,
			// Content
			CLEAR_CLONE: `${e.warn} | All messages of the channel will be deleted! To confirm type \`-confirm\``,
			CLEAR_DELETED: `${e.success} | Salon reinitialized!`,
			CLEAR_SUCCESS: (amount) => `${e.success} | **${amount}** messages deleted!`,
			CLEAR_SUCCESS_USER: (amount, user) => `${e.success} | **${amount}** messages of **${user.tag}** deleted !`,

			/* MUTE COMMAND */

			// Utils
			MUTE_DESCRIPTION: "Prevents the member from sending messages and connecting by voice for a period of time!",
			MUTE_USAGE: "mute [@member] [time]",
			MUTE_EXAMPLES: "$mute @Androz#2091 Spam",
			// Content
			MUTE_SUCCESS: (member, time, reason) => `${e.success} | **${member.user.tag}** is now muted for **${time}** for **${reason}** !`,
			MUTE_SUCCESS_DM: (message, time, reason) => `${e.error} | You are muted in **${message.guild.name}** for **${time}** for **${reason}** !`,
			MUTE_TITLE_LOGS: (caseNumber) => `Mute | Case #${caseNumber}`,

			/* UNMUTE COMMAND */

			// Utils
			UNMUTE_DESCRIPTION: "Unmute the mentioned member!",
			UNMUTE_USAGE: "unmute [@member]",
			UNMUTE_EXAMPLES: "$unmute @Androz#2091",
			// Errors
			UNMUTE_ERR_NOT_MUTED: `${e.error} | This member is not muted to this server!`,
			// Content
			UNMUTE_SUCCESS: (userID, caseNumber) => `<@${userID}> has just been unmuted! (case of mute: #${caseNumber})`,
			UNMUTE_SUCCESS_USER: (user) => `${e.success} | ${user.tag} has just been unmuted!`,

			/* SANCTIONS COMMAND */
			
			// Utils
			SANCTIONS_DESCRIPTION: "Displays the list of infractions committed by a member!",
			SANCTIONS_USAGE: "sanctions [@member]",
			SANCTIONS_EXAMPLE: "$sanctions @Androz#2091",
			// Errors
			SANCTIONS_ERR_NOTHING: "This member has not committed any infractions.",
			PRINT_SANCTION: (sData) => `Moderator: <@${sData.moderator}>\nReason: ${sData.reason}`,

			/* DELETEMOD COMMAND */

			// Utils
			DELETEMOD_DESCRIPTION: "Enables or disables the auto deletion of moderation commands!",
			DELETEMOD_USAGE: "deletemod [on/off]",
			DELETEMOD_EXAMPLE: "$deletemod on",
			// Errors
			DELETEMOD_ERR_STATUS: `${e.error} | You must specify \`on\` or \`off\` !`,
			// Content
			DELETEMOD_SUCCESS_ENABLED: `${e.success} | Moderation commands will be automatically deleted!`,
			DELETEMOD_SUCCESS_DISABLED: `${e.success} | Moderation commands will no longer be automatically deleted!`,

			/* WARN COMMAND */

			// Utils
			WARN_DESCRIPTION: "Warn a member in private messages",
			WARN_USAGE: "warn [@member] [reason]",
			WARN_EXAMPLES: "$warn @Androz#2091 Spam",
			// Errors
			WARN_ERR_REASON: `${e.error} | Please enter a reason!`,
			// Content
			WARN_AUTOBAN: (member, number) => `${e.success} | **${member.user.tag}** was automatically banned because it had more than **${number}** warns !`,
			WARN_AUTOKICK: (member, number) => `${e.success} | **${member.user.tag}** was automatically kicked out because he had more than **${number}** warns !`,
			WARN_SUCCESS_DM: (msg, reason) => `${e.warn} | You've just been warned on **${msg.guild.name}** by **${msg.author.tag}** for **${reason}** !`,
			WARN_SUCCESS: (member, reason) => `${e.success} | **${member.user.tag}** has been warned by private messages for **${reason}** !`,

			/* SETWARNS COMMAND */

			// Utils
			SETWARNS_DESCRIPTION: "Define the sanctions that members will get after a certain number of warns!",
			SETWARNS_USAGE: "setwarns [kick/ban] [number/reset]",
			SETWARNS_EXAMPLES: "$setwarns kick 10\n$setwarns ban 10\n$setwarns ban reset",
			// Errors
			SETWARNS_ERR_SANCTION: `${e.error} | Please indicate a valid sanction type! (\`kick\`, \`ban\`)`,
			// Content
			SETWARNS_SUCCESS_KICK: (prefix, number) => `${e.success} | Configuration saved! When a member has reached the ${number} warns, he will be kicked out. Type \`${prefix}configuration\` to see your new configuration!`,
			SETWARNS_SUCCESS_BAN: (prefix, number) => `${e.success} | Configuration saved! When a member has reached the ${number} warns, he will be banned. Type \`${prefix}configuration\` to see your new configuration!`,
			SETWARNS_SUCCESS_RESET_KICK: (prefix) => `${e.success} | Configuration saved! The kick sanction is no longer automatic! Type \`${prefix}configuration\` to see your new configuration!`,
			SETWARNS_SUCCESS_RESET_BAN: (prefix) => `${e.success} | Configuration saved! The ban sanction is no longer automatic! Type \`${prefix}configuration\` to see your new configuration!`,

			/* POLL COMMAND */

			// Utils
			POLL_DESCRIPTION: "Launch a survey in the current channel!",
			POLL_USAGE: "poll [question]",
			POLL_EXAMPLES: "$poll Do you want a new channel?",
			// Errors
			POLL_ERR_QUESTION: `${e.error} | You must enter a question!`,
			POLL_ERR_TIMEOUT: `${e.error} | Time's up! Please retype the command!`,
			// Content
			POLL_FORM_MENTION: "Would you like to add a mention to your message? Answer \"yes\" or \"no\"!",
			POLL_FORM_MENTION_HE: "Type one of the following answers: `every` (for a mention @ everyone) or `here` (for a mention @ here)!",
			POLL_REACT: `React with ${e.success} or ${e.error}!`,
			POLL_HEADING: "📊 Survey:",

			/* ANNOUNCEMENT COMMAND */

			// Utils
			ANNOUNCEMENT_DESCRIPTION: "Send an announcement in the current channel!",
			ANNOUNCEMENT_USAGE: "announcement [text]",
			ANNOUNCEMENT_EXAMPLES: "$announcement A new #spam channel!",
			// Errors
			ANNOUNCEMENT_ERR_TEXT: `${e.error} | You must enter the text of the announcement!`,
			ANNOUNCEMENT_ERR_TEXT_LENGTH: `${e.error} | Please enter a text of less than 1030 characters!`,
			ANNOUNCEMENT_ERR_TIMEOUT: `${e.error} | Time's up! Please retype the command!`,
			// Content
			ANNOUNCEMENT_FORM_MENTION: "Would you like to add a mention to your message? Answer \"yes\" or \"no\"!",
			ANNOUNCEMENT_FORM_MENTION_HE: "Type one of the following answers: `every` (for a mention @ everyone) or `here` (for a mention @ here)!",
			ANNOUNCEMENT_HEADING: "📢 Announcement :",

			/* MODOGS EMBEDS */
			MODLOGS_HEADINGS: {
				USER: "User",
				MODERATOR: "Moderator",
				REASON: "Reason",
				TIME: "Time",
				EXPIRATION: "Expiration"
			},

			/* SETMODLOGS COMMAND */

			// Utils
			SETMODLOGS_DESCRIPTION: "Define the log channel!",
			SETMODLOGS_USAGE: "setmodlogs (#channel)",
			SETMODLOGS_EXAMPLES: "$setmodlogs #modlogs\n$setmodlogs",
			// Content
			SETMODLOGS_SUCCESS: (id) => `${e.success} | Moderation logs channel defined on <#${id}> !`,

			/* SOMEONE COMMAND */

			// Utils
			SOMEONE_DESCRIPTION: "Pick a random member on the server!",
			SOMEONE_USAGE: "someone",
			SOMEONE_EXAMPLES: "$someone\n@someone",
			// Headings
			SOMEONE_HEADINGS: [
				"Pseudo",
				"Discriminator",
				"ID"
			],

			/* SETSUGGESTS COMMAND */

			// Utils
			SETSUGGESTS_DESCRIPTION: "Define the suggestion channel!",
			SETSUGGESTS_USAGE: "setsuggests (#channel)",
			SETSUGGESTS_EXAMPLES: "$setsuggests #general\n$setsuggests",
			// Content
			SETSUGGESTS_SUCCESS: (channel) => `${e.success} | The suggestions channel is now ${channel} !`,

			/* ADDEMOTE COMMAND */

			// Utils
			ADDEMOTE_DESCRIPTION: "Add an emoji to the server!",
			ADDEMOTE_USAGE: "addemote [URL] [name]",
			ADDEMOTE_EXAMPLES: "$addemote https://an-image-of.com/butterfly.png butterfly",
			// Errors
			ADDEMOTE_ERR_NAME: `${e.error} | Please indicate the name of the emoji!`,
			ADDEMOTE_ERR_URL: `${e.error} | Please indicate the url of the emoji!`,
			ADDEMOTE_ERROR: `${e.error} | The URL to the image is invalid or you have no more space on your Discord!`,
			// Content
			ADDEMOTE_SUCCESS: (emote) => `${e.success} | Emoji ${emote.name} added to the server! String: \`${emote.toString()}\``,
			
			/* AUTOMOD COMMAND */

			// Utils
			AUTOMOD_DESCRIPTION: "Enables or disables automatic deletion of discord invitations",
			AUTOMOD_USAGE: "automod [on/off] (#channel)",
			AUTOMOD_EXAMPLES: "$automod on\n$automod off #general\n$automod off",
			// Errors
			AUTOMOD_ERR_STATUS: `${e.error} | Please enter a valid status! (\`on\` ou \`off\`) !`,
			// Content
			AUTOMOD_SUCCESS_ENABLED: (prefix) => `${e.success} | Discord invitations will be automatically deleted! If you want to ignore a channel, just type \`${prefix}automod off #channel\` ! This will disable auto moderation in the mentioned channel!`,
			AUTOMOD_SUCCESS_DISABLED_CHANNEL: (channel) => `${e.success} | Automoderation will no longer be performed in the channel ${channel} !`,
			AUTOMOD_SUCCESS_DISABLED: `${e.success} | All right! Auto moderation is no longer effective on this server!`,
			AUTOMOD_MSG: (msg) => `${msg.author} | Your message contained a Discord invitation, so it has been deleted. If it was unintentional, you can edit your message again, it was sent to you as a private message!`,

			/* SETLANG COMMAND */

			// Utils
			SETLANG_DESCRIPTION: "Change the server language!",
			SETLANG_USAGE: "setlang [french/english]",
			SETLANG_EXAMPLES: "$setlang french\n$setlang english",
			// Errors
			SETLANG_ERR_LANG: `${e.error} | Please enter a valid language (\`french\` or \`english\`) !`,
			// Content
			SETLANG_LANGS:[
				":flag_fr: | La langue de ce serveur est maintenant le Français !",
				":flag_gb: | The language of this server is now English!"
			],

			/* FORTNITE COMMAND */
			
			// Utils
			FORTNITE_DESCRIPTION: "Displays a player's Fortnite stats!",
			FORTNITE_USAGE: "fortnite [psn/xbl/pc] [pseudo]",
			FORTNITE_EXAMPLES: "$fortnite pc Ninja",
			// Errors
			FORTNITE_ERR_PLATFORM: `${e.error} | Enter a valid platform: \`psn\`, \`pc\` ou \`xbl\` !`,
			FORTNITE_ERR_USERNAME: `${e.error} | Enter a valid pseudo epic games!`,
			FORTNITE_ERR_NOT_FOUND: (platform, username) => `${e.error} | Player \`${username}\` not found on the platform \`${platform}\`!`,
			// Content
			FORTNITE_TITLE: (username, link) => `[${username}](${link})'s Fortnite Stats`,
			FORTNITE_STATS_RIGHT: (kd, percent) => `${kd} K/D - ${percent} WIN%`,
			FORTNITE_AVERAGE_KILLS: "KILLS/MATCH",
			FORTNITE_AVERAGE_KILL: "KILL/MATCH",
			FORTNITE_W_PERCENT: "V%",
			FORTNITE_KD: "K/D",
			FORTNITE_WINS : "WINS",
			FORTNITE_WIN : "WIN",
			FORTNITE_KILLS : "KILLS",
			FORTNITE_KILL : "KILL",
			FORTNITE_WINS_PERCENT : "WIN%",
			FORTNITE_MATCHES : "MATCHES",
			FORTNITE_MATCH : "MATCH",

			/* FORTNITESHOP COMMAND */
			
			// Utils
			FORTNITESHOP_DESCRIPTION: "Displays the fortnite items shop!",
			FORTNITESHOP_USAGE: "fortniteshop",
			FORTNITESHOP_EXAMPLES: "$fortniteshop",
			// Content
			FORTNITESHOP_HEADER: "FORTNITE ITEMS SHOP",
			FORTNITESHOP_DAILY: "DAILY",
			FORTNITESHOP_FEATURED: "FEATURED",
			FORTNITESHOP_TITLE: (date) => `Fortnite shop of ${date}`,

			/* SETFORTNITESHOP COMMAND */
			
			// Utils
			SETFORTNITESHOP_DESCRIPTION: "Define the daily Fortnite shop channel!",
			SETFORTNITESHOP_USAGE: "setfortniteshop (#channel)",
			SETFORTNITESHOP_EXAMPLES: "$setfortniteshop #shop\n$setfortniteshop",
			// Content
			SETFORTNITESHOP_DISABLED: `${e.success} | Daily Fortnite shop disabled!`,
			SETFORTNITESHOP_ENABLED: (id) => `${e.success} | Fortnite shop channel defined on <#${id}> !`,

			/* CALC COMMAND */
			
			// Utils
			CALC_DESCRIPTION: "A calculator capable of solving complex operations and converting units!",
			CALC_USAGE: "calc [calculation]",
			CALC_EXAMPLES: "$calc 10*5+sin(3)\n$calc 10cm to m",
			// Errors
			CALC_EMPTY: `${e.error} | Enter a calculation!`,
			CALC_ERROR: `${e.error} | Enter a valid calculation!`,
			// Content
			CALC_TITLE: "Calculator",
			CALC_OPERATION: "Operation",
			CALC_RESULT: "Result",
						
			/* PURGE COMMAND */

			// Utils
			PURGE_DESCRIPTION: "Kick out inactive members!",
			PURGE_USAGE: "purge [days]",
			PURGE_EXAMPLES: "$purge 10",
			// Errors
			PURGE_ERR_DAYS: `${e.error} | Please specify a number of days!`,
			PURGE_ERR_TIMEOUT: `${e.error} | Time's up! Please retype the command!`,
			// Content
			PURGE_CONFIRMATION: (members) => `${e.warn} | ${members} members will be kicked out! To confirm, type \`confirm\`!`,
			PURGE_SUCCESS: (members) => `${e.success} | ${members} membres kicked !`,

			/* DASHBOARD */

			FIRST_LOGIN: (username) => `${username} connected for the first time to the dashboard! :tada:`,
			REGISTERED_FROM: (date) => `Member since ${(date ? date : "")}`,
			HELLO: (username) => `Hello, ${username}`,
			SEARCH_SERVERS: "Search servers....",
			SERVERS_LIST: "Servers list",
			SELECTOR: "Selector",
			SERVERS_MANAGEMENT: "SERVER MANAGEMENT",
			ERR_NOT_FOUND: "Oops! Page not found.",
			ERR_NOT_FOUND_CONTENT: "We did not find the page you were looking for. In the meantime, you can go back to the dashboard or try using the search form.",
			ERR_SOMETING_WENT_WRONG: "Oops! Something went wrong.",
			ERR_SOMETING_WENT_WRONG_CONTENT: "We will try to remedy this immediately. In the meantime, you can go back to the dashboard or try using the search form.",
			ERR_NO_SERVER_FOUND: "No server found",
			ERR_NO_SERVER_FOUND_CONTENT: "No server to display. Make sure you are logged in with the right account and try again.",
			SERVER_CONF: "Configuration",
			CONFIG_HEADINGS: {
				BASIC: "📝 Basic configuration",
				WELCOME: "👋 Welcome messages",
				GOODBYE: "😢 Goodbye messages",
				CHANNELS: "🌀 Special channels",
				AUTOROLE: "🎖️ Autorole"
			},
			CONFIG_FIELDS: {
				PREFIX: "Prefix",
				LANG: "Language",
				CHANNEL: "Channel",
				MESSAGE: "Message",
				ROLE: "Role",
				WITHIMAGE_WELCOME: "Include a great welcome image",
				WITHIMAGE_GOODBYE: "Include a great goodbye image",
				SUGGESTIONS: "Suggestions",
				MODLOGS: "Moderation logs",
				FORTNITESHOP: "Fortnite shop"
			},
			ENABLE_MESSAGES: "Enable messages",
			DISABLE_MESSAGES: "Disable messages",
			ENABLE_AUTOROLE: "Enable autorole",
			DISABLE_AUTOROLE: "Disable autorole",
			SWITCH_LANG: "Switch to French 🇫🇷",
			FIRST_LEAD_MONEY: "1st of the ranking \"Credits\"",
			FIRST_LEAD_LEVEL: "1st of the ranking \"Level\"",
			FIRST_LEAD_REP: "1st of the ranking \"Reputation\"",
			VIEW_PUB_PROFILE: "View my public profile",
			SETTINGS_HEADINGS: [
				"🇬🇧 Language",
				"Logout"
			]

        }
    }

    /**
	 * The method to get language strings
	 * @param {string} term The string or function to look up
	 * @param {...*} args Any arguments to pass to the lookup
	 * @returns {string|Function}
	 */
	get(term, ...args) {
		//if (!this.enabled && this !== this.store.default) return this.store.default.get(term, ...args);
		const value = this.language[term];
		/* eslint-disable new-cap */
		switch (typeof value) {
			case 'function': return value(...args);
			default: return value;
		}
	}

	getLang(){
		return lang;
	}

	printDate(pdate, isLongDate){
        let monthNames = [
            "January", "February", "March",
            "April", "May", "June", "July",
            "August", "September", "October",
            "November", "December"
          ];
        
        let day = pdate.getDate();
        let monthIndex = pdate.getMonth();
        let year = pdate.getFullYear();
        let hour = pdate.getHours();
        let minute = pdate.getMinutes();

        let thedate = (isLongDate) ? day + " " + monthNames[monthIndex] + " " + year + " at " + hour + "h" + minute 
        : day + " " + monthNames[monthIndex] + " " + year
        return thedate;
	}
	
	/**
	 * Parse ms and returns a string
	 * @param {number} milliseconds The amount of milliseconds
	 * @returns The parsed milliseconds
	 */
	convertMs(milliseconds){
		let roundTowardsZero = milliseconds > 0 ? Math.floor : Math.ceil;
		let days = roundTowardsZero(milliseconds / 86400000),
		hours = roundTowardsZero(milliseconds / 3600000) % 24,
		minutes = roundTowardsZero(milliseconds / 60000) % 60,
		seconds = roundTowardsZero(milliseconds / 1000) % 60;
		if(seconds === 0){
			seconds++;
		}
		let isDays = days > 0,
		isHours = hours > 0,
		isMinutes = minutes > 0;
		let pattern = 
		(!isDays ? "" : (isMinutes || isHours) ? "{days} days, " : "{days} days and ")+
		(!isHours ? "" : (isMinutes) ? "{hours} hours, " : "{hours} hours and ")+
		(!isMinutes ? "" : "{minutes} minutes and ")+
		("{seconds} seconds");
		let sentence = pattern
			.replace("{duration}", pattern)
			.replace("{days}", days)
			.replace("{hours}", hours)
			.replace("{minutes}", minutes)
			.replace("{seconds}", seconds);
		return sentence;
	}

}
