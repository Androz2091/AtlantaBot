let lang = "english";

let c = require("../config.js");
let e = c.emojis;

// This class is used to store languages strings

module.exports = class {
    constructor(...args) {
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
				CUSTOM: "Custom"
			},
			

			// ERROR MESSAGES

			ERR_COMMAND_DISABLED: `${e.error} | This command is currently disabled!`,
			ERR_OWNER_ONLY: `${e.error} | Only ${c.owner.name} can do these commands!`,
			ERR_INVALID_CHANNEL: `${e.error} | Please mention a valid channel!`,
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
			ERR_CHANNEL_NOT_FOUND: (channel) => `${e.error} | No channel found with \`${channel}\``,
			ERR_YES_NO: `${e.error} | You must answer "yes" or "no"!`,
			ERR_EVERYONE: `${e.error} | You are not allowed to mention everyone or here in the commands.`,
			ERR_BOT_USER: `${e.error} | This user is a bot!`,
			ERR_GAME_ALREADY_LAUNCHED: `${e.error} | A game is already running on this server!`,
			ERR_A_GAME_ALREADY_LAUNCHED: `${e.error} | Because of the lags and bugs due to the findwords and the number, it is impossible to run two games at the same time, even if they are on two different servers. There is a game currently running on another server, so please wait a few minutes and then try again. We are sorry, but people were abusing this command by spamming it on lots of servers.`,
			ERR_OCCURENCED: `${e.error} | An error has occurred, please try again in a few minutes.`,
			ERR_CMD_COOLDOWN: (seconds) => `${e.error} | You must wait **${seconds}** second(s) to be able to run this command again!`,
			
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
			HELP_REMINDER: (prefix) => `To get help on an command type \`${prefix}help <commande>\` !`,
			HELP_TITLE:(nb) => `List of commands - (${nb})`,
			HELP_NO_ALIASES: "No aliases.",
			// Headings
			HELP_HEADINGS: [
				"Help :",
				"Usage :",
				"Examples :",
				"Group :",
				"Description :",
				"Alias :",
				"Permissions :"
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
			HASTEBIN_TEXT: `${e.error} | You must enter a text!`,
			// Content
			HASTEBIN_SUCCESS: (url) => `${e.success} | Your text has been uploaded on hastebin! Here is your link: ${url}`,

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
				`${e.online} Status`,
				`${e.up} Role`,
				`${e.calendar2} Arrival`,
				`${e.pencil} Nickname`,
				`${e.roles} Roles`,
				`${e.color} Color`
			],
			USERINFO_NO_GAME: "No game",
			USERINFO_NO_ROLE: "No role",
			USERINFO_MORE_ROLES: (nb) => ` and ${nb} others roles`,
			USERINFO_NO_NICKNAME: "No nickname",

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
			MINECRAFT_ERR_IP: `${e.error} | Please enter an IP!`,
			MINECRAFT_ERR_OFFLINE: `${e.error} | This server is offline or blocking access. Reminder: MCPE servers are not supported!`,
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
				`${e.online} Status`
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
			EIGHTBALL_USAGE: `${e.error} | Please enter a valid question!`,
			EIGHTBALL_EXAMPLES: "$8ball Is Atlanta the best Discord bot?",
			// Errors
			EIGHTBALL_ERR_QUESTION: `${e.error} | You have to enter a question to ask me!`,
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
				[ "Automoderation", "Automoderation disabled" ]
			],
			CONFIGURATION_AUTOROLE: (roleID) => `Role : <@&${roleID}>`,
			CONFIGURATION_WELCOME: (withImage, channelID) => `Channel : <#${channelID}>\nImage : ${withImage ? "Yes" : "No"}`,
			CONFIGURATION_GOODBYE: (withImage, channelID) => `Channel : <#${channelID}>\nImage : ${withImage ? "Yes" : "No"}`,
			CONFIGURATION_MODLOGS: (channelID) => `Logs : ${channelID ? `<#${channelID}>` : "Not defined"}`,
			CONFIGURATION_SUGGESTIONS: (channelID) => `Suggestions : ${channelID ? `<#${channelID}>` : "Not defined" }`,
			CONFIGURATION_AUTOMOD: (ignoredChannels) => `${ignoredChannels.length > 0 ? `Salon ignorés : ${ignoredChannels.map((ch) => `<#${ch}>`)}` : "Aucun salon ignoré."}`,
			CONFIGURATION_WARNS: (kick, ban) => `${kick ? `**Expulsion**: after **${kick}** warnings.` : "**Expulsion**: Not defined."}\n${ban ? `**Banishment**: after **${ban}** warnings.` : "**Banishment**: Not defined."}`,

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
			SETPREFIX_ERR_CARACT: `${e.error} | The prefix must not exceed 5 characters!`,
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
			WELCOME_FORM_SUCCESS: (channel, prefix) => `${e.success} | Welcome messages enabled in <#${channel}> ! Type \`${prefix}welcome test\` to test the welcome message!`,
			WELCOME_IMG: (name) => `Welcome in ${name} !`,
			// Errors
			WELCOME_ERR_TIMEOUT: `${e.error} | Time's up! Please retype the command!`,
			WELCOME_ERR_CARACT: `${e.error} | Your message must not exceed 1500 characters!`,

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
			GOODBYE_FORM_SUCCESS: (channel, prefix) => `${e.success} | Goodbye messages enabled in <#${channel}> ! Type \`${prefix}goodbye test\` to test the goodbye message!`,
			GOODBYE_IMG: (name) => `Leaving from ${name}`,
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
				MONEY:"💰 Money",
				REP: "🎩 Reputation",
				REGISTERED_AT: "📅 Registered",
				LEVEL:"📊 Level",
				EXP: "🔮 Experience",
				BIRTHDATE: "🎂 Birthdate",
				MARRIED: "❤️ Married",
				INVITER: "🤵 Invitor",
				PSEUDO: "📝 Pseudo",
				BADGES: "🔥 Badges",
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
			BADGE_EXAMPLES: "badge\nbadge France",
			// Content
			BADGE_TITLE: `Badges ${c.botname}`,
			BADGE_DESCRIPTION: (prefix) => `To buy a badge, type \`${prefix}badge [name-of-the-badge]\``,
			BADGE_FORMAT: (badge) => `Badge: ${badge.emoji}\Name: ${badge.name}\Price: ${badge.price} credits\n--------\n`,
			BADGE_FORMAT_BOUGHT: (badge) => `Badge: ${badge.emoji}\nName: ${badge.name}\nAlready purchased (${badge.price} credits)\n--------\n`,
			BADGE_SUCCESS: (badge) => `${e.success} | You just bought the badge ${badge.name} (${badge.emoji}) for ${badge.price} credits!`,
			// Errors
			BADGE_ERR_NOT_FOUND: (text) => `${e.error} | No badges found for \`${text}\``,
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
			STATS_CREDITS: "Thanks to \`https://icones8.fr/icons/\`, all the emojis (or almost) come from this site!",
			STATS_LINKS: (url, id) => `[Github](${c.others.github}) | [Invite ${c.botname}](https://discordapp.com/oauth2/authorize?client_id=${id}&scope=bot&permissions=2146958847) | [Support](${url}) | [Don](${c.others.donate})`,
			// Headings
			STATS_HEADINGS:[
				`Stats`,
				`${e.stats} • __Statistics__`,
				`${e.ram} • __RAM__`,
				`${e.version} • __Version__`,
				`${e.online} • __Online__`,
				`${e.links} • __Links__`,
				`${e.voice} • __Music__`,
				":heart: • __Acknowledgements & credits__",
			],

			/* TRANSLATE COMMAND  */

			// Utils
			TRANSLATE_DESCRIPTION: "I'm translating your text!",
			TRANSLATE_USAGE: "translate [languages] [message]",
			TRANSLATE_EXAMPLES: "$translate en-fr How are you ?",
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

			/* KICK COMMAND */

			// Utils
			KICK_DESCRIPTION: "Kick out the mentioned member!",
			KICK_USAGE: "kick [@user] (reason)",
			KICK_EXAMPLES: "$kick @Androz#2091 Spam",
			// Errors
			KICK_ERR_PERMISSIONS: `${e.error} | An error has occurred... check that I have the permission to kick this member out and try again!`,
			KICK_SUCCESS_DM: (user, msg, reason) => `${e.error} | Hello <@${user.id}>,\nYou have just been kicked out from **${msg.guild.name}** by **${msg.author.tag}** for **${reason}** !`,
			KICK_SUCCESS_CHANNEL: (user, msg, reason) => `${e.success} | **${user.username}** has just been kicked out from **${msg.guild.name}** by **${msg.author.tag}** for **${reason}** !`,

			/* CHECKINVITES COMMAND */

			// Utils
			CHECKINVITES_DESCRIPTION: "Check if members do not have an ad for their Discord server in their presence!",
			CHECKINVITES_USAGE: "checkinvites",
			CHECKINVITES_EXAMPLES: "$checkinvites",
			// Content
			CHECKINVITES_NOT_FOUND: `${e.success} | No member advertises in his game!`,

			/* CLEAR COMMAND */

			// Utils
			CLEAR_DESCRIPTION: "Deletes messages very quickly!",
			CLEAR_USAGE: "clear[number-of-messages] (@member)",
			CLEAR_EXAMPLES: "$clear 10\n$clear 10 @Androz#2091",
			// Errors
			CLEAR_ERR_AMOUNT: `${e.error} | You must specify a number of messages to delete!`,
			// Content
			CLEAR_SUCCESS: (amount) => `${e.success} | **${amount}** messages deleted!`,
			CLEAR_SUCCESS_USER: (amount, user) => `${e.success} | **${amount}** messages of **${user.tag}** deleted !`,

			/* MUTE COMMAND */

			// Utils
			MUTE_DESCRIPTION: "Prevents the member from sending messages and connecting by voice for a period of time!",
			MUTE_USAGE: "mute [@member] [time]",
			MUTE_EXAMPLES: "$mute @Androz#2091 Spam",
			// Content
			MUTE_SUCCESS: (member, time, reason) => `${e.success} | **${member.user.tag} is now muted for **${time}** for **${reason}** !`,
			MUTE_SUCCESS_DM: (message, time, reason) => `${e.error} | You are muted in **${message.guild.name}** for **${time}** for **${reason}** !`,

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
			SETWARNS_SUCCESS_KICK: (prefix, number) => `${e.success} | Configuration saved! When a member has reached the ${number} warns, he will be kicked out. Type \`${prefix}configuration\` to see your new configuration!`,
			SETWARNS_SUCCESS_BAN: (prefix, number) => `${e.success} | Configuration enregistrée ! Lorsqu'un membre aura atteint les ${number} warns, il sera banned. Tapez \`${prefix}configuration\` pour voir votre nouvelle configuration !`,
			SETWARNS_SUCCESS_RESET_KICK: (prefix, number) => `${e.success} | Configuration saved! The kick sanction is no longer automatic! Type \`${prefix}configuration\` to see your new configuration!`,
			SETWARNS_SUCCESS_RESET_BAN: (prefix, number) => `${e.success} | Configuration saved! The ban sanction is no longer automatic! Type \`${prefix}configuration\` to see your new configuration!`,

			/* POLL COMMAND */

			// Utils
			POLL_DESCRIPTION: "Launch a survey in the current channel!",
			POLL_USAGE: "poll [question]",
			POLL_EXAMPLES: "$poll Do you want a new channel?",
			// Errors
			POLL_ERR_QUESTION: `${e.error} | You must enter a question!`,
			POLL_ERR_TIMEOUT: `${e.error} | Time's up! Please retype the command!`,
			// Content
			POLL_FORM_MENTION: `Would you like to add a mention to your message? Answer "yes" or "no"!`,
			POLL_FORM_MENTION_HE: "Type one of the following answers: \`every\` (for a mention @ everyone) or \`here\` (for a mention @ here)!",
			POLL_REACT: `React with ${e.success} or ${e.error}!`,
			POLL_HEADING: "📊 Survey:",

			/* MODOGS EMBEDS */
			MODLOGS_TYPES: {
				BAN: `Ban | Case #{case}`,
				KICK: `Kick | Case #{case}`,
				UNBAN: `Unban | Case #{case}`,
				WARN: `Warn | Case #{case}`,
				MUTE: `Mute | Case #{case}`,
				UNMUTE: `Unmute | Case #{case}`,
			},
			MODLOGS_HEADINGS: [
				"User",
				"Moderator",
				"Reason",
				"Time"
			],

			/* SETLOGS COMMAND */

			// Utils
			SETLOGS_DESCRIPTION: "Define the log channel!",
			SETLOGS_USAGE: "setlogs (#channel)",
			SETLOGS_EXAMPLES: "$setlogs #modlogs\n$setlogs",
			// Content
			SETLOGS_SUCCESS: (id) => `${e.success} | Logs channel defined on <#${id}> !`,

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
			ADDEMOTE_ERR_URL: `${e.error} | Please indicate the url of the emoji!`,
			ADDEMOTE_ERROR: `${e.error} | The URL to the image is invalid or you have no more space on your Discord!`,
			// Content
			ADDEMOTE_SUCCESS: (emote) => `${e.success} | Emoji ${emote.name} added to the server!`,
			
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
			AUTOMOD_SUCCESS_DISABLED: `${e.success} | All right! Auto moderation is no longer effective on this server!`,
			AUTOMOD_MSG: (msg) => `${msg.author} | Your message contained a Discord invitation, so it has been deleted. If it was unintentional, you can edit your message again, it was sent to you as a private message!`,

			/* SETLANG COMMAND */

			// Utils
			SETLANG_DESCRIPTION: "Change the server language!",
			SETLANG_USAGE: "setlang [french/english]",
			SETLANG_EXAMPLES: "$setlang french\n$setlang english",
			// Errors
			SETLANG_ERR_LANG: `${e.error} | Please enter a valid language (\`french\` ou \`english\`) !`,
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
			FORTNITE_ERR_USERNAME: `${e.error} | Enter a valid pseudo epic games!`,
			FORTNITE_ERR_NOT_FOUND: (platform, username) => `${e.error} | Player \`${username}\` not found on the platform \`${platform}\`!`,
			// Content
			FORTNITE_DESC: (platform, username) => `${username} plays on ${platform} !`,
			FORTNITE_SOLO_STATS: (data) => `${e.score} K/D: ${data.stats.solo.kd}\n${e.games} Games: ${data.stats.solo.matches}\n${e.kills} Kills : ${data.stats.solo.kills}\n${e.crown} Victories : ${data.stats.solo.wins}`,
			FORTNITE_DUO_STATS: (data) => `${e.score} K/D: ${data.stats.duo.kd}\n${e.games} Games : ${data.stats.duo.matches}\n${e.kills} Kills : ${data.stats.duo.kills}\n${e.crown} Victories : ${data.stats.duo.wins}`,
			FORTNITE_SQUAD_STATS: (data) => `${e.score} K/D: ${data.stats.squad.kd}\n${e.games} Games : ${data.stats.squad.matches}\n${e.kills} Kills : ${data.stats.squad.kills}\n${e.crown} Victories : ${data.stats.squad.wins}`,
			FORTNITE_LIFETIME_STATS: (data) => `${e.score}	K/D: ${data.stats.lifetime.kd}\n${e.games} Games : ${data.stats.lifetime.matches}\n${e.kills} Kills : ${data.stats.lifetime.kills}\n${e.crown} Victories : ${data.stats.lifetime.wins}`,

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
			PURGE_SUCCESS: (members) => `${e.success} | ${members} membres kicked !`,

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
	
	convertMs(ms){
		var d, h, m, s;
		s = Math.floor(ms / 1000);
		m = Math.floor(s / 60);
		s = s % 60;
		h = Math.floor(m / 60);
		m = m % 60;
		d = Math.floor(h / 24);
		h = h % 24;
		h += d * 24;
		return h + " hour(s) " + m + " minute(s) " + s + " second(s)";
	}

}