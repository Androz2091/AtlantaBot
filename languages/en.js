var 
warn = "<:atlanta_warn:565212996565991425>",
error = "<:atlanta_error:565212755804684318>",
success = "<:atlanta_success:565212709591973896>",
loading = "<a:atlanta_loading:565214530121105418>"

var owner = "`Androz#2091`";
yes = 'yes',
no = 'no',
botname = 'Atlanta',
lang = 'en',
stats = [ 
	"<:stats:566982702704754715>",
	"<:ram:566979302076448828>",
	"<:version:566983129370460170>",
	"<:online:566984813278527508>",
	"<:lien:566985712399024131>",
	"<:voice:567393244741107745>",
	":heart:"
],
invite = [
	'<:add:566991586182037525>',
	'<:vote:566991799898472450>',
	'<:help:566993906902761483>'
]

// This class is used to store languages strings

module.exports = class {
    constructor(...args) {
		this.language = {

			// Utils
			PREFIX_INFO: (prefix) => `the prefix of this guild is \`${prefix}\``,
			YES: 'Yes',
			NO : 'No',
			USER: `User`,
			TLEVEL: `Level`,
			TREP: `Reputation`,
			TCREDITS: `Credits`,
			WIN: `Victory`,
			LOOSE: `Lost`,
			PAGE: `Page`,
			TOTAL_SERVERS: `Total guilds`,
			MEMBERS: `Members`,
			STATUS: {
				"dnd":"Do not disturb",
				"idle":"AFK (idle)",
				"offline":"Offline",
				"online":"Online"
			},
			NO_REASON_PROVIDED: `no reason given`,
			UNDEFINED: `Undefined`,

			// ERROR MESSAGE
			INHIBITOR_MISSING_BOT_PERMS: (perms) => `${error} | I need the following permissions to perform this command: \`${perms}\``,
			INHIBITOR_NSFW: `${error} | You must go to a salon that allows the NSFW to type this command!`,
			INHIBITOR_PERMISSIONS:(perm) => `${error} | You do not have the necessary permissions to perform this command (\`${perm}\`)`,
			COMMAND_DISABLED: `${error} | This command is currently disabled!`,
			OWNER_ONLY: `${error} | Only ${owner} can do these commands!`,
			MENTION_CHANNEL: `${error} | Please mention a valid channel!`,
			MENTION_ROLE: `${error} | Please mention a valid role!`,
			MENTION_MEMBER: `${error} | Please mention a valid member!`,
			CHANNEL_IGNORED: (channel) => `${error} | Commands are not allowed in ${channel} !`,
			BAD_PARAMETERS: (cmd, prefix) => `${error} | Please check the commands parameters. Look at the examples by typing \`${prefix}help ${cmd}\` !`,
			ROLE_NOT_FOUND: (role) => `${error} | No role found with \`${role}\` !`,
			YES_OR_NO: `${error} | You must answer "yes" or "no"!`,
			INVALID_TIME: `${error} | You must enter a valid time! Valid units: \`s\`, \`m\`, \`h\`, \`d\`, \`w\`, \`y\``,
			MENTION_EVERYONE: `${error} | You are not allowed to mention everyone or here in the commands.`,
			IS_A_BOT: `${error} | This user is a bot!`,
			NAN: (nan) => `${error} | \`${nan}\` is not a valid number!`,
			INVALID_ID: `${error} | Please enter a valid ID!`,
			PLEASE_WAIT: `${loading} | Please wait...`,
			GAME_ALREADY_LAUNCHED: `${error} | A part is already in progress on this guild!`,
			A_GAME_ALREADY_LAUNCHED: `${error} | Because of the lags and bugs due to the findwords and the number, it is impossible to run two games at the same time, even if they are on two different guilds. There is a game currently running on another guild, so please wait a few minutes and then try again. We are sorry, but people were abusing this command by spamming it on lots of guilds.`,
			AN_ERROR_OCCURENCED: `${error} | An error has occurred, please try again in a few minutes.`,
			NUMBER_1_10: `${error} Please indicate a valid number between 1 and 10!`,
			
			// PING COMMAND
			PING_DESCRIPTION: 'Displays bot latency',
			PING: (ms) => `${success} | Pong! My latency is \`${ms}\`ms !`,

			// HELP COMMAND
			HELP_DESCRIPTION: `Displays the help of commands or the help of a particular command`,
			HELP_COMMAND_NOT_FOUND: (cmd) => `${error} | Command ${cmd} not found!`,
			HELP_DISABLED: `This command is currently disabled`,
			HELP_OWNER_ONLY: `Only ${owner} can do this command!`,
			HELP_REMINDER: (prefix) => `To get help on an command type \`${prefix}help <command>\` !`,
			HELP_HEADING_2:(nb) => `List of commands - (${nb})`,
			HELP_HEADING: `Help :`,
			HELP_USAGE: `Usage :`,
			HELP_EXAMPLES: `Examples :`,
			HELP_GROUP: `Group :`,
			HELP_DESC: `Description :`,
			HELP_ALIASES: `Alias :`,
			HELP_PERMISSIONS: `Permissions :`,
			HELP_CUSTOMIZED: (cmd) => `${error} | The ${cmd} command has no help because it is customized.`,
			HELP_NO_ALIASES: `No aliases.`,

			// Conf command
			CONFIGURATION_DESCRIPTION:'Displays the guild configuration',
			PREFIX: "Prefix",
			IGNORED_CHANNELS: "Ignored channels",
			NO_IGNORED_CHANNELS: "No channel ignored",
			AUTOROLE: 'Autorole',
			WELCOME: 'Welcome',
			CONFIGURATION_AUTOROLE_ENABLED: (data) => `Status : **Enabled**\nRole: <@&${data.role}>`,
			DISABLED_PLUGIN: `Status : **Disabled**`,
			CONFIGURATION_WELCOME_ENABLED: (data) => `Status : **Enabled**\nChannel : <#${data.channel}>\nImage : ${(data.withImage =='true')? "Yes" : "No"}`,
			LEAVE: 'Goodbye',
			CONFIGURATION_LEAVE_ENABLED: (data) => `Statut : **Enabled**\nChannel : <#${data.channel}>\nImage : ${(data.withImage == 'true') ? 'Yes' : 'No'}`,
			SLOWMODE: 'Slowmode',
			NO_SLOWMODE: `No channel with slowmode`,
			CHANNELS: `Channels`,
			CONF_LOGS: (data) => `Logs : ${data.channels.modlogs === 'false' ? 'Undefined' : `<#${data.channels.modlogs}>`}\n`,
			CONF_SUGG: (data) => `Suggestions : ${data.channels.suggestion === 'false' ? 'Undefined' : `<#${data.channels.suggestion}>`}\n`,
			CONF_WARNS: `Warns`,
			CONF_DI: `Auto Moderation`,
			CONF_DI_MSG:(data) => `**Status** : ${data.deleteinvite.status === 'enabled' ? 'Enabled' : 'Disabled'}\n**Ignored channels** :\n${data.deleteinvite.channels.length > 0 ? data.deleteinvite.channels.map(ch => `<#${ch}>`) : `No channel ignored.`}`,

			// Ignore command
			IGNORE_DESCRIPTION: 'Disables or activates commands in the mentioned channel',
			UNIGNORE_SUCESS: (channel) => `${success} | Commands are now allowed in ${channel} !`,
			IGNORE_SUCESS: (channel) => `${warn} | Commands are now prohibited in ${channel} !`,

			// Set prefix 
			SETPREFIX_DESCRIPTION: 'Changes the guild prefix',
			VALID_PREFIX: `${error} | Please enter a valid prefix!`,
			PREFIX_CHARACTERS: `${error} | The prefix must not exceed 5 characters!`,
			PREFIX_SUCCESS: (prefix) => `${success} | The prefix has been changed! Type \`${prefix}help\` to see the list of commands!`,

			// Autorole cmd
			AUTOROLE_ENABLED: (prefix) => `${success} | Autrole correctly activated! To get more information about your guild configuration type \`${prefix}configuration\` !`,
			AUTOROLE_DISABLED: (prefix) => `${warn} | Autrole correctly disabled! To get more information about your guild configuration type \`${prefix}configuration\` !`,

			// Welcome cmd
			WELCOME_DESCRIPTION: `Send a welcome message to a pre-defined channel!`,
			WELCOME_DISABLED: (prefix) => `${success} | Welcome messages have just been disabled! Type \`${prefix}configuration\` to see the current configuration!`,
			WELCOME_TEST: `${success} | Test performed!`,
			WELCOME1: (author) => `Hello ${author} ! In which channel will the welcome message be sent? (mention a channel)`,
			WELCOME2: (channel, msg) => `All right! The messages will therefore be sent in ${channel}. Enter the welcome message below: \n\n\nInfos:\n\n\nMention: {user}\nMembers: {membercount}\nServer: {server}\nFor example, "Welcome {user} to {server} ! Thanks to you, we are {membercount} ! will give "Welcome ${msg.author} to ${msg.guild.name} ! Thanks to you, we are ${msg.guild.memberCount} !".`,
			WELCOME3: `It works! It works! Do you want a great welcome image to be sent at the same time? Answer with "${yes}" or "${no}"!`,
			WELCOME_SUCCESS: (channel, prefix) => `${success} | Welcome messages enabled in <#${channel}> ! Type \`${prefix}welcome test\` to test the welcome message!`,
			WELCOME_TIMEOUT: `${error} | Time's up! Please retype the command!`,
			WELCOME_CARACT: `${error} | Your message must not exceed 1500 characters!`,
			WELCOME_IMG: (name) => `Welcome in ${name} !`,

			// Leave cmd
			LEAVE_DESCRIPTION: `Send a goodbye message to a pre-defined channel!`,
			LEAVE_DISABLED: (prefix) => `${success} | The goodbye messages have just been deactivated! Type \`${prefix}configuration\` to see the current configuration!`,
			LEAVE_TEST: `${success} | Test performed!`,
			LEAVE1: (author) => `Hello ${author} ! In which channel will the goodbye message be sent? (mention a channel)`,
			LEAVE2: (channel, msg) => `All right! The messages will therefore be sent in ${channel}. Enter the goodbye message below: \n\n\nInfos:\\n\n\nMention: {user}\nMembers: {membercount}\nServer: {server}\nFor example, "Goodbye {user} ! It's sad, without you we're only {membercount} on {server} !" will give "Goodbye ${msg.author.username}#${msg.author.discriminator} ! It's sad, without you we're only ${msg.guild.memberCount} on ${msg.guild.name} !".`,
			LEAVE3: `It works! It works! Do you want a great goodbye image to be sent at the same time? Answer with "${yes}" or "${no}"!`,
			LEAVE_SUCCESS: (channel, prefix) => `${success} | Goodbye messages enabled in <#${channel}> ! Type \`${prefix}leave test\` to test the goodbye message!`,
			LEAVE_TIMEOUT: `${error} | Time's up! Please retype the command!`,
			LEAVE_CARACT: `${error} | Your message must not exceed 1500 characters!`,
			LEAVE_IMG: (name) => `Leaving from ${name}`,

			// Slowmode
			SLOWMODE_DESCRIPTION: `Define a cooldown in a channel`,
			SLOWMODE_DISABLED: (channel) => `${success} | The slowmode has been disabled in the channel <#${channel}> !`,
			SLOWMODE_ENABLED: (channel, time) => `${success} | Slowmode enabled in <#${channel}> with a time of ${time} !`,
			SLOWMODE_PLEASE_WAIT: (time, channel) => `${error} | The channel ${channel} is in slowmode! Please wait ${time} to be able to post a new message!`,

			// Add command
			ADDCOMMAND_DESCRIPTION: `Add a custom command to the guild!`,
			ADDCOMMAND_NAME: `${error} | Please enter a name and an answer to the command!`,
			ADDCOMMAND_ALREADY: (name) => `${error} | The command ${name} already exists on ${botname} !`,
			ADDCOMMAND_ANSWER: `${error} | Please enter a response to this command!`,
			ADDCOMMAND_SUCCESS: (cmd) => `${success} | The command ${cmd} has been added to the guild!`,

			// Del command
			DELCOMMAND_DESCRIPTION: `Remove a custom command from the guild!`,
			ADDCOMMAND_NAME: `${error} | Please enter the name of the command you wish to delete!`,
			DELCOMMAND_EXIST: (cmd) => `${error} | The command ${cmd} does not exist!`,
			DELCOMMAND_SUCCESS: (cmd) => `${success} | The ${cmd} command has been removed from the guild!`,

			// ECONOMY
			MONEY: `💰 Money`,
			REP: `🎩 Reputation`,
			REGISTERED_AT: `📅 Registered`,
			LEVEL: `📊 Level`,
			EXP: `🔮 Experience`,
			BIRTHDATE: `🎂 Birthday`,
			COUPLE: `❤️ Married`,
			INVITER: `🤵 Inviter`,
			PSEUDO: `📝 Username`,
			BADGES: `🔥 Badges`,

			// Profile command
			PROFILE_DESCRIPTION: `Displays the profile of the mentioned member (or the author of the message)`,
			PROFILE_HEADING: (username) => `Profile of ${username}`,
			NO_BIO: `No biography recorded`,
			DISPLAY_REP: (points) => `**${points}** point(s)`,
			DISPLAY_CREDITS: (credits) => `**${credits}** credit(s)`,
			NO_PARTNER: `Unmarried`,
			NO_BIRTHDATE: `Undefined`,
			NO_BADGE: `No badge.`,
			
			// work command
			WORK_DESCRIPTION: `Work and earn money!`,
			WORK_COOLDOWN: (delai) => `${error} | You have to wait ${delay} before you can work again!`,
			SALARY_CLAIMED: `Salary`,
			SALARY_CLAIMED2: `200 credits added to your account!`,

			// Eval
			EVAL_DESCRIPTION: `Executes the code`,

			// Get conf command
			GETCONF_DESCRIPTION: `Retrieves the configuration of a guild!`,
			GETCONF_NO_CONF: `${error} | This guild does not have a configuration because it has never added ${botname} !`,

			// Get invite command
			GETINVITE_DESCRIPTION: `Generates an invitation to the guild in question. Make sure you make good use of this command.`,
			GETINVITE_ERROR: `${error} | I can't create invitations on this guild!`,
			GETINVITE_NO_GUILD: `${error} | I'm not on that guild!`,

			// Rep command
			REP_DESCRIPTION: `Give a member a reputation point!`,
			REP_COOLDOWN: (delai) => `${error} | You have to wait ${delay} before you can give a reputation point again!`,
			REP_BOT: `${error} | You can't give a bot a reputation point!`,
			REP_SELF: `${error} | You can't give yourself a reputation point!`,
			REP_SUCCESS: (tag) => `${success} | You did give a reputation point to **${tag}** !`,

			// Setbio command
			SETBIO_DESCRIPTION: `Change the biography that will appear on your profile!`,
			SETBIO_MISSING_DESCRIPTION : `${error} | Please enter a valid biography!`,
			SETBIO_100: `${error} | Your biography must not exceed 100 characters!`,
			SETBIO_SUCCESS: `${success} | Your biography has just been modified!`,

			// credits command
			CREDITS_DESCRIPTION: `Displays your credits`,
			CREDITS_HEADING: (username) => `${username} credits`,
			CREDITS_CONTENT: (credits, username) => `Currently **${credits}** credits on the account of **${username}** !`,

			// leaderboard command
			LEADERBOARD_DESCRIPTION: `Displays users who have the most credits, levels or reputation points!`,
			LEADERBOARD_TYPE: `${error} | Please enter a type of leaderboard! (\`credits\`, \`levels\` ou \`rep\`)`,

			// Pay command
			PAY_DESCRIPTION: `Pay a member with credits!`,
			PAY_SELF: `${error} | You can't pay yourself!`,
			PAY_AMOUNT: (username) => `${error} | You must enter an amount to be paid at **${username}** !`,
			PAY_AMOUNT_TO_HIGH: (amount, username) => `${error} | You don't have enough credits to pay ${amount} credits to ${username} !`,
			PAY_SUCCESS: (amount, username) => `${success} | You paid ${amount} credits to ${username} |!`,

			// Birthdate command
			BIRTHDATE_DESCRIPTION: `Set your birthday date (which will appear on your profile)`,
			BIRTHDATE_VALID_DATE: `${error} | Please enter a valid date! For example 29/12/2000`,
			BIRTHDATE_INVALID_DATE2: `${error} | You have entered an invalid date. Reminder: the date format must be: Day/Month/Year. For example, 01/12/2000 for December 1, 2000.`,
			BIRTHDATE_INVALID_DATE3: `${error} |  You have entered an invalid date (or the indicated date does not exist). Reminder: the date format must be: Day/Month/Year. For example, 01/12/2000 for December 1, 2000.`,
			BIRTHDATE_SUCCESS: (date) => `${success} | Your birthday has been set to ${date} !`,
			BIRTHDATE_TOO_HIGH: `${error} | You can't not have been born yet!`,
			
			// Weegind command
			WEDDING_DESCRIPTION: `Marry the person of your choice!`,
			WEEDING_AUTHOR_ALREADY: (prefix) => `${error} | You are already married! First use \`${prefix}divorce\` to divorce`,
			WEEDING_MEMBER_ALREADY: (username) => `${error} | The place is taken, companion! **${username}** is already married!`,
			WEEDING_AUTHOR_PENDING: (username) => `${error} | You already have a current request to **${username}** !`,
			WEEDING_AUTHOR_PENDING2: (username) => `${error} | **has already sent you a request! Please refuse or accept it (or wait until it expires in a few minutes).`,
			WEEDING_MEMBER_PENDING: (username1, username2) => `${error} | **${username2}** has already sent a request to **${username1}** !`,
			WEEDING_MEMBER_PENDING2: (username1, username2) => `${error} | **has already sent a request to **${username2}** ! Wait until **${username2}** accepts or refuses the request for **${username1}** or until it expires and try again!`,
			WEEDING_REQUEST: (member, author) => `${warn} | ${member}, do you agree to marry ${author}? Answer with "${yes}" or "${no}"!`,
			WEEDING_TIMEOUT: (member) => `${error} | ${member} did not answer.... Wait until he/she is connected and then try again!`,
			WEEDING_SUCCESS: (author, member) => `${success} | ${author}, I have some good news... ${member} has accepted your proposal!`,
			WEEDING_DENIED: (author, member) => `${error} | ${author}, I have some bad news... ${member} refused your proposal.`,
			WEEDING_SELF: `${error} | You can't marry yourself!`,

			// Divorce command
			DIVORCE_DESCRIPTION: `Divorce the person you are currently married to!`,
			DIVORCE_NOT_WEEDED: `${error} | You are not currently married!`,
			DIVORCE_SUCCESS: (username) => `${success} | You just divorced with **${username}** !`,

			// Slots command
			SLOTS_DESCRIPTION: `An equivalent to the Casino!`,
			SLOTS_TOO_HIGH: (credits) => `${error} | You do not have ${credits} credit(s).`,
			SLOTS_LOOSE: (amount, username) => `**${username}** used ${amount} credit(s) and lost everything.`,
			SLOTS_WIN: (text, amount, won, username) => `${text}**${username}** used ${amount} credit(s) and won ${won} credit(s)!`,

			// 8 ball command
			EIGHTBALL_DESCRIPTION: `I'm telling you the truth.`,
			EIGHTBALL_QUESTION: `${error} | Please enter a valid question!`,
			EIGHTBALL_QUESTIONS: [
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

			// ascii command
			ASCII_DESCRIPTION: `Turn your text into ascii characters!`,
			ASCII_TEXT: `${error} | Please enter a valid text (less than 20 characters)!`,

			// badge command
			BADGE_DESCRIPTION: `Buy badges that will appear on your profile!`,
			BADGE_HEADING: `Atlanta Badges`,
			BADGE_DESCRIPTION: (prefix) => `To buy a badge, type \`${prefix}badge[name-of-badge]\``,
			BADGE_FORMAT: (badge) => `Badge: ${badge.str}\nName: ${badge.name}\nPrice: ${badge.price} credits\n------------\n`,
			BADGE_FORMAT_ALREADY: (badge) => `Badge: ${badge.str}\nName: ${badge.name}\nPrice: already buyed (${badge.price} credits)\n------------\n`,
			BADGE_GAMES: `Games`,
			BADGE_FLAGS: `Country`,
			BADGE_OTHERS: `Other`,
			BADGE_404: (text) => `${error} | No badge found for \`${text}\``,
			BADGE_SUCCESS: (badge) => `${success} | You just bought the badge ${badge.name} (${badge.str}) for ${badge.price} credits!`,
			BADGE_PRICE: `${error} | You don't have enough credits to buy this badge!`,
			BADGE_ALREADY: `${error} | You already have this badge!`,

			// findwords command
			FINDWORDS_DESCRIPTION: `Start a game of findwords, a game where you have to find words!`,
			FINDWORDS_TIMER: `${warn} | The game starts in 10 seconds!`,
			FINDWORDS_20S: (word) => `${warn} | 20 seconds to find a word containing "**${word}**"!`,
			FINWORDS_INVALID_WORD: (member) => `${error} | ${member} your word is invalid!`,
			FINDWORDS_NOBODY: `${error} | No one was able to find words!`,
			FINDWORDS_GG: (winner) => `${success} | Well done <@${winner}> ! Your word is valid and you were the fastest!`,
			FINDWORDS_NOBODY2: `${warn} | I can't define any winners because no words have been found from all sides!`,
			FINDWORDS_GG2: (user, games, total_games, time, number, members) => `:tada: | ${user} won the game !\nManche Won : ${games}/${total_games}\n\n\n**Stats of the game :**\n__**Time**__: ${time}\n__**Number of participants**__ : ${number}\n__**Participants**__: \n${members}`,
			FINDWORDS_END: (member) => `${member} wins 15 credits! :tada:`,

			// Lovecalc
			LOVECALC_DESCRIPTION: `How much love is there between two people? *This is a fun command, not to be taken seriously*`,
			LOVECALC_MENTIONS: `${error} | You must mention two members!`,
			LOVECALC_TEXT: (percent, username1, username2) => `There's **${percent}%** of love between **${username1}** and **${username2}** !`,

			// Number command
			NUMBER_DESCRIPTION: `Find the number I chose!`,
			NUMBER_START: `${warn} | Number determined, you can start!`,
			NUMBER_HIGHER: (number, author) => `${author} | The number is more **large** than \`${number}\`!`,
			NUMBER_SMALLER: (number, author) => `${author} | The number is more **small** than \`${number}\` !`,
			NUMBER_GG2: (member) => `<@${member}> has earned 10 credits!`,
			NUMBER_GG1: (user, number, time, nb, members) => `Tada: ${user} found the number! It was __****${number}**__ !\n\n\n**States of the game: **\n__**Time**__: ${time}\n__**Number of participants**__ : ${nb}\n__**Participants**__ : \n${members}`,
			NUMBER_LOOSE: (number) => `${error} | No one could find the number! It was ${number}!`,

			// Random command
			RANDOM_DESCRIPTION: `Randomly send one of the choices you give me!`,
			RANDOM_2_CHOICES: `${error} | You must enter more than two choices!`,
			RANDOM_CHOOSED: `${success} | Here is my choice:`,
			RANDOM_WAIT: `${loading} | Choice in progress....`,
			RANDOM_BLANK: `${error} | One of your choices seems to be empty.... Please try again!`,

			// Lmg command
			LMG_DESCRIPTION: `Returns an lmgtfy link for the specified search!`,
			LMG_SEARCH: `${error} | You must specify a search!`,

			// flip command
			FLIP_DESCRIPTION: `I roll the dice for you!`,
			FLIP_PILE: `:game_die: | It's **pile** !`,
			FLIP_FACE: `:game_die: | It's **face** !`,

			// tweet command
			TWEET_DESCRIPTION: `Generate a tweet of a person of your choice on Twitter thanks to the nekobot api!`,
			TWEET_USERNAME: `${error} | You have to enter someone's twitter nickname!`,
			TWEET_TEXT: `${error} | You must enter a message!`,
			TWEET_TXT: (user) => `New tweet published by ${user} :`,

			// qrcode
			QRCODE_DESCRIPTION: `Displays a QR Code with your word !`,
			QRCODE_TEXT: `${error} | You must enter a text!`,

			// hastebin command
			HASTEBIN_DESCRIPTION: `Upload your text to hastebin !`,
			HASTEBIN_TEXT: `${error} | You must enter a text!`,
			HASTEBIN_SUCCESS: (url) => `${success} | Your text has been uploaded to hastebin! Here's your link: ${url}`,

			// stats command
			STATS_DESCRIPTION: `Display the stats of the bot!`,
			STATS_HEADING: `Stats of ${botname}`,
			STATS_DESC: `${botname} is an open source bot developed by ${owner} !`,
			STATS_HEADERS:[
				`${stats[0]} • __Statistics__`,
				`${stats[1]} • __RAM__`,
				`${stats[2]} • __Version__`,
				`${stats[3]} • __On-line__`,
				`${stats[4]} • __Links__`,
				`${stats[5]} • __Music__`,
				`${stats[6]} • __Acknowledgements & credits__`,
			],
			STATS_STATS: (serv, users) => `\`Guilds : ${serv}\`\n\`Users : ${users}\``,
			STATS_ONLINE: (time) => `From ${time}`,
			STATS_VC: (nb) => `Music in progress on \`${nb}\` guilds`,
			STATS_CREDITS: `Thanks to \`https://icones8.fr/icons/\`, all the emojis (or almost) come from this site!`,
			STATS_LINKS: (url) => `[Github](https://github.com/Androz2091) | [Invite Atlanta](https://discordapp.com/oauth2/authorize?client_id=563420709423153152&scope=bot&permissions=2146958847) | [Support](${url}) | [Donate](https://paypal.me/andr0z)`,

			// invite command
			INVITE_DESCRIPTION: `Displays the links of ${botname} !`,
			INVITE_HEADING: `Main links`,
			INVITE_DESC: (prefix) => `Type \`${prefix}invite copy\` to be able to copy the link!`,
			INVITE_FIELD1: `${invite[0]} Invite ${botname}`,
			INVITE_FIELD2: `${invite[1]} Vote for ${botname}`,
			INVITE_FIELD3: `${invite[2]} Support`,

			// translate command
			TRANSLATE_DESCRIPTION: `I'm translating your text!`,
			TRANSLATE_LANG: (prefix) => `${error} | Please enter a language! To display the list of languages, type \`${prefix}translate langs-list\` !`,
			TRANSLATE_LANG1: (prefix, lang) => `${error} | The language doesn't exist! To display the list of languages, type \`${prefix}translate langs-list\` !`,
			TRANSLATE_LANGS: `${success} | The list of languages has just been sent to you by private messages!`,
			TRANSLATE_MSG: `${error} | Please enter a text to be translated!`,

			// servers list command
			SERVERS_LIST_DESCRIPTION: `Display my guilds!`,

			// userinfo command
			USERINFO_DESCRIPTION: `Displays user information!`,
			USERINFO_ID: (id) => `${error} | No user on Discord has the ID \`${id}\` !`,
			USERINFO_FIELDS: [
				":man: Username",
				"<:discriminator:567017866856103950> Discriminator",
				"<:bdg_IAMABOT:566892351570706432> Robot",
				"<:avatar:567020705728692271> Avatar",
				"<:calendar:567019405767213096> Creation",
				"<:games:567019785620029529> Game",
				"<:online:567020241427890195> Status",
				// member infos
				"<:up:567024250364493933> Role",
				"<:calendar2:567025420508200970> Arrival",
				"<:pencil:567029174955671552> Nickname",
				"<:roles:567028552256454657> Roles",
				"<:color:567030657545404446> Color"
			],
			USERINFO_NO_GAME: `No play`,
			USERINFO_NO_ROLE: `No role`,
			USERINFO_MORE_ROLES: (nb) => ` and ${nb} other roles`,
			USERINFO_NO_NICKNAME: `No nickname`,

			// play command
			PLAY_DESCRIPTION: `Play music!`,
			PLAY_CANT_JOIN: `${error} | I can't go into the voice channel!`,
			PLAY_ADDED_TO_QUEUE: (title) => `<:add:566991586182037525> | ${title} has been added to the queue!`,
			PLAY_NO_SONG: `${error} | No more music in the queue!`,
			PLAY_PLAYING: `Reading in progress`,
			PLAY_UTILS: [
				"<:title:567363421776117778> Title",
				"<:rap:567363851922833409> Singer",
				"<:time:567364870887178261> Duration",
				"<:search:567372154006536193> Resulst",
				"<:calendar:567019405767213096> Creation",
				"<:desc:567390492845801473> Description"
			],
			PLAY_SEARCH: "Please enter a value to select one of the search results from 1 to 10.",
			PLAY_PROVIDE_A_NAME: `${error} | Please enter a video name to search for!`,
			PLAY_VOICE_CHANNEL: `${error} | You must be connected in a voice channel!`,
			PLAY_PERMS: `${error} | An error has occurred. Either I can't connect in your channel or I can't talk in your channel. Check my permissions and try again.`,
			PLAY_TIMEOUT: `${error} | Time's up! Please retype the command!`,
			PLAY_404: `${error} | No results on Youtube!`,
			PLAY_NOT_PLAYING: `${error} | No music in progress!`,

			// stop command
			STOP_DESCRIPTION: `Stop the music in progress!`,
			STOP_SUCCESS: `${success} | I just stopped the music!`,

			// queue command
			QUEUE_DESCRIPTION: `Displays the queue`,
			QUEUE_HEADER: `<:queue:567387470837317662> Playlist`,

			// np command 
			NP_DESCRIPTION: `Displays the current music!`,

			// pause command 
			PAUSE_DESCRIPTION: `Pause your music!`,
			PAUSE_ALREADY: `${error} | The music is already on break!`,
			PAUSE_SUCCESS: (prefix) => `${success} | The music is on pause (uses \`${prefix}resume\` to restart it)`,

			// resume command
			RESUME_DESCRIPTION: `Put your music on play!`,
			RESUME_NOT_PAUSED: `${error} | The music is not on pause!`,
			RESUME_SUCCESS: `${success} | The music is playing again!`,

			// skip command
			SKIP_DESCRIPTION: `Play the next song!`,
			SKIP_SUCCESS: `${success} | I just changed the song!`,

			// ban command
			BAN_DESCRIPTION: `Banished the mentioned member!`,
			BAN_ID: (id) => `${error} | No user on Discord has the ID \`${id}\` !`,
			BAN_ALREADY_BANNED: (user) => `${error} | **${user.username}** is already banned!`,
			BAN_ERROR: `${error} | An error has occurred... check that I have the permissions to ban this member and try again!`,
			BAN_DM: (user, msg, reason) => `${error} | Hello <@${user.id}>,\nYou have just been banned from **${msg.guild.name}** by **${msg.author.tag}** for **${reason}** !`,
			BAN_SUCCESS: (user, msg, reason) => `${success} | **user.username}** has just been banned from **${msg.guild.name}** by **${msg.author.tag}** for **${reason}** !`,

			// mod logs embed
			MODLOGS_HEADERS: (cas) => [
				`Ban | Cas #${cas}`,
				`Kick | Cas #${cas}`,
				`Unban | Cas #${cas}`,
				`Warn | Cas #${cas}`,
				`Mute | Cas #${cas}`,
				`Unmute | Cas #${cas}`
			],
			MODLOGS_UTILS: [
				`Member`,
				`Moderator`,
				`Reason`,
				`Time`
			],

			// setlogs command
			SETLOGS_DESCRIPTION: `Define the log channel!`,
			SETLOGS_SUCCESS: (id) => `${success} | Logs channel set to <#${id}> !`,

			// kick command
			KICK_DESCRIPTION: `Kick the mentioned member!`,
			KICK_ERROR:  `${error} | An error has occurred... check that I have the permission to kick this member and try again!`,
			KICK_DM: (user, msg, reason) => `${error} | Hello <@${user.id}>,\nYou have just been kicked from **${msg.guild.name}** by **${msg.author.tag}** for **${reason}** !`,
			KICK_SUCCESS: (user, msg, reason) => `${success} | **${user.username}** has just been kicked from **${msg.guild.name}** by **${msg.author.tag}** for **${reason}** !`,

			// Unban command
			UNBAN_DESCRIPTION: `Unban the user from de guild!`,
			UNBAN_ID: (id) => `${error} | No user on Discord has the ID \`${id}\` !`,
			UNBAN_NOT_BANNED: (user) => `${error} | **user.username}** is not banned!`,
			UNBAN_SUCCESS: (user, msg) => `${success} | **${user.username}** has just been unbanned from **${msg.guild.name}** !`,

			// clear command
			CLEAR_DESCRIPTION: `Deletes a number of messages very quickly!`,
			CLEAR_AMOUNT: `${error} | You must specify a number of messages to delete!`,
			CLEAR_CLEANED1: (amount, member) => `${success} | **${amount}** messages from **${member.user.tag}** deleted !`,
			CLEAR_CLEANED2: (amount) => `${success} | **${amount}** deleted messages!`,

			// Checkinvites command
			CHECKINVITES_DESCRIPTION: `Check each member's game to see if there is an ad in it!`,
			CHECKINVITES_NOBODY: `After an intense check, no one seems to have any discord invitations in their game!`,

			// setwarns command
			SETWARNS_DESCRIPTION: `Define the sanctions that members will get after a certain number of warns!`,
			SETWARNS_USAGE: (prefix) => `${error} | Use: ${prefix}setwarns 4 kick <= when a member reaches the 4 warns, it will be kick.\n${prefix}setwarns 4 reset <= reset the sanction defined when a member reaches the 4 warns.`,
			SETWARNS_ALREADY_A_SANCTION: (prefix, sanction, number) => `${error} | A sanction (${sanction}) is already defined when a member reaches the ${number} warns. Please type \`${prefix}setwarns ${number}reset\` and try again.`,
			SETWARNS_SUCCESS: (prefix, sanction, number) => `${success} | Configuration saved! When a member has reached the ${number} warns, he will be ${sanction}. Type \`${prefix}configuration\` to see your new configuration!`,
			SETWARNS_SANCTION_ALREADY_USED: (prefix, sanction, number) => `${error} | The sanction ${sanction} is already provided for the ${number} warns. Type \`${prefix}setwarns ${number}reset\` and try again.`,
			SETWARNS_NO_SANCTION: (number) => `No sanctions corresponded to ${number} warns!`,
			SETWARNS_SUCCESS_DELETE: (prefix, sanction, number) => `${success} | The penalty corresponding to ${number} warns (${sanction}) has just been removed! Type \`${prefix}configuration\` to see your new configuration!`,

			// warn command
			WARN_DESCRIPTION: `Warns a member in private messages!`,
			WARN_REASON: `${error} | Please enter a reason!`,
			WARN_AUTOBAN: (member, number) => `${success} | **${member.user.tag}** was automatically banned because he had more than **${number}** warns!`,
			WARN_AUTOKICK: (member, number) => `${success} | **${member.user.tag}** was automatically kicked because he had more than **${number}** warns!`,
			WARN_DM: (msg, reason) => `${error} | You've just been warned on **${msg.guild.name}** by **${msg.author.tag}** for **${reason}** !`,
			WARN_SUCCESS: (member, reason) => `${success} | **${member.user.tag}** has been warned by private messages for **${reason}** !`,

			// seewwarns command
			SEEWARNS_DESCRIPTION: `Displays a member's warnings!`,
			SEEWARNS_NO_WARN: `No warnings recorded.`,
			SEEWARNS_HEADER: (tcase) => `Case #${tcase}`,
			SEEWARNS_MODERATOR: (warn) => `**Moderator** : <@${warn.moderator}>`,
			SEEWARNS_REASON: (warn) => `**Reason** : ${warn.reason}`,

			// mute command
			MUTE_DESCRIPTION: `Prevents the member from speaking for a while!`,
			MUTE_SUCCESS: (member, time, reason) => `${success} | **${member.user.tag}** is muted during **${time}** for **${reason}** !`,
			MUTE_DM: (message, time, reason) => `${error} | You're mute from **${message.guild.name}** during **${time}** for **${reason}** !`,

			// sondage command
			POLL_DESCRIPTION: `Send a poll!`,
			POLL_QUESTION: `${error} | You must enter a question!`,
			POLL_MENTION: `Would you like to add a mention to your message? Answer with "${yes}" or "${no}"!`,
			POLL_MENTION2: `Type one of the following answers: \`every\` (for a mention @ everyone) or \`here\` (for a mention @ here) !`,
			POLL_TIMEOUT: `${error} | Time's up! Please retype the command!`,
			POLL_REACT: `React with ${success} or ${error} !`,
			POLL_HEADING: `📊 Poll :`,

			// setafk command
			SETAFK_DESCRIPTION: `Become an AFK (members who mention you will receive a message)`,
			SETAFK_REASON: `${error} | Please specify the reason for your afk!`,
			SETAFK_SUCCESS: (reason) => `${success} | You passed afk (reason: ${reason})`,
			
			// afk command
			AFK_DELETED: (user) => `${user}, your AFK has just been removed!`,
			AFK_IS_AFK: (member, reason) => `**${member.user.tag}** is currently afk for \`${reason}\``,

			// guildinfo command
			GUILDINFO_DESCRIPTION: `Displays information about the guild!`,
			GUILDINFO_FIELDS:[
				"<:title:567363421776117778> Name",
				"<:calendar:567019405767213096> Creation",
				"<:users:568121122391064606> Members",
				"<:channels:568121595227406337> Channels",
				"<:afk:568121945477087232> AFK Channel",
				"<:id:568122139291680789> ID",
				"<:founder:568122623599443978> Owner"
			],
			GUILDINFO_MEMBERCOUNT: (members) => `${members.filter(m => !m.user.bot).size} members | ${members.filter(m => m.user.bot).size} bots`,
			GUILDINFO_NO_AFK: `No AFK channel`,
			GUILDINFO_CHANNELS: (channels) => `${channels.filter(ch => ch.type === 'voice').size} voices | ${channels.filter(ch => ch.type === 'text').size} textuels | ${channels.filter(ch => ch.type === 'category').size} catégories`,

			// invitations command
			INVITATIONS_DESCRIPTION: `Displays the number of people you have invited to the guild!`,
			INVITATIONS_NOBODY: `${error} | You didn't invite anyone to the guild!`,
			INVITATIONS_CODE: (invite) => `**${invite.code}** (${invite.uses} uses) | ${invite.channel}\n`,
			INVITATIONS_HEADING: (member, msg) => `Information about ${member}'s invitations to ${msg.guild.name}`,
			INVITATIONS_FIELDS: [
				'👥 Invited Persons',
				'🔑 Codes',
				'members'
			],

			// remind me
			REMINDME_DESCRIPTION: `Define a reminder!`,
			REMINDME_MESSAGE: `${error} | You must enter a message that will be sent to you at the end of time!`,
			REMINDME_SAVED: `${success} | Reminder correctly recorded, you will receive a message at the end of the time!`,

			// someone command
			SOMEONE_DESCRIPTION: `Gets a random member on the guild!`,

			// unmute command
			UNMUTE_DESCRIPTION: `Unmute a member!`,
			UNMUTE_SUCCESS: (member) => `${success} | ${member} now has write permissions.`,

			//minimize command
			MINIMIZE_DESCRIPTION: `Shortcut your link!`,
			MINIMIZE_ERROR: `${error} | URL incompatible with the URL shortener.`,
			MINIMIZE_URL: `${error} | Please enter a URL!`,

			// Suggestion command
			SUGGEST_DESCRIPTION: `Send your suggestion to the channel defined for this!`,
			SUGGEST_NO_CHANNEL: `${error} | No suggestion channel defined!`,
			SUGGEST_SUGG: `${error} | Please enter a suggestion!`,
			SUGGEST_HEADER: (user) => `Suggestion - ${user.tag}`,
			SUGGEST_HEADERS: [
				"Author",
				"Date",
				"Content"
			],
			SUGGEST_SUCCESS: (channel) => `${success} | Your suggestion is being voted on in ${channel} !`,

			// setsuggests command
			SETSUGGESTS_DESCRIPTION: `Define the suggestion channel!`,
			SETSUGGESTS_SUCCESS: (channel) => `${success} | The suggestion room is now ${channel} !`,

			// addemote command
			ADDEMOTE_DESCRIPTION: `Add an emoji to the guild!`,
			ADDEMOTE_NAME: `${error} | Please indicate the name of the emoji!`,
			ADDEMOTE_URL: `${error} | Please indicate the url of the emoji!`,
			ADDEMOTE_SUCCESS: (emote) => `${success} | Emoji ${emote.name} added to the guild!`,
			ADDEMOTE_ERROR: `${error} | The URL to the image is invalid or you have no more space on your Discord!`,
			
			// automod command
			AUTOMOD_DESCRIPTION: `Enables or disables automatic deletion of discord invitations`,
			AUTOMOD_STATUS: `${error} | Please enter a valid status!  (\`on\` or \`off\`) !`,
			AUTOMOD_SUCCESS: (prefix) => `${success} | Discord invitations will be automatically deleted! If you want to ignore a salon, just type \`${prefix}automod off #channel\` ! This will disable auto moderation in the mentioned channel!`,
			AUTOMOD_SUCCESS1: (channel) => `${success} | Auto moderation will no longer be performed in the channel ${channel} !`,
			AUTOMOD_SUCCESS2: `${success} | All right! All right! Auto moderation is no longer effective on this guild!`,
            AUTOMOD_MSG: (msg) => `${msg.author} | Your message contained a Discord invitation, so it was deleted. If it was unintentional, you can edit your message again, it was sent to you as a private message!`,

            SETLANG_DESCRIPTION: `Change the guild language!`,
            SETLANG_LANG: `${error} | Please enter a valid language (\`fr\` or \`en\`) !`,
            
            MINECRAFT_DESCRIPTION: `Displays information about the Minecraft server!`,
			MINECRAFT_IP: `${error} | Please enter an IP !`,
			MINECRAFT_ERR1: `${error} | An error occurred during the request to the API...`,
			MINECRAFT_IS_OFFLINE: `${error} | This server is offline or blocking access. Reminder: MCPE servers are not supported!`,
			MINECRAFT_ONLINE: `Online`,
			MINECRAFT_OFFLINE: `Offline`,
			MINECRAFT_UTILS: (ip) => [
				`Information on ${ip}`,
				`<:version:566983129370460170> Version`,
				`<:mc:569057345598914560> Currently connected`,
				`<:users:568121122391064606> Maximum`,
				`<:online:567020241427890195> Status`
			],
            MINECRAFT_PLAYERS: (nb) => `${nb} player(s)`,
            
            FORTNITE_DESCRIPTION: `Displays a player's Fortnite stats!`,
			FORTNITE_PLATFORM: `${error} | Enter a valid platform: \`psn\`, \`pc\` or \`xbl\` !`,
			FORTNITE_USERNAME: `${error} | Enter a valid pseudo epic game!`,
			FORTNITE_404: (platform, username) => `${error} | Player \`${username}\` not found on the platform \`${platform}\` !`,
			FORTNITE_DESC: (platform, username) => `${username} plays on ${platform} !`,
			FORTNITE_SOLO_STATS: (data) => `<:score:569087927783522334> K/D : ${data.stats.solo.kd}
				<:games:567019785620029529> Games : ${data.stats.solo.matches}
				<:mort:569080340145111060> Kills : ${data.stats.solo.kills}
				<:founder:568122623599443978> Win(s) : ${data.stats.solo.wins}
			`,
			FORTNITE_DUO_STATS: (data) => `<:score:569087927783522334> K/D : ${data.stats.duo.kd}
				<:games:567019785620029529> Games : ${data.stats.duo.matches}
				<:mort:569080340145111060> Kills : ${data.stats.duo.kills}
				<:founder:568122623599443978> Win(s) : ${data.stats.duo.wins}
			`,
			FORTNITE_SQUAD_STATS: (data) => `<:score:569087927783522334> K/D : ${data.stats.squad.kd}
				<:games:567019785620029529> Games : ${data.stats.squad.matches}
				<:mort:569080340145111060> Kills : ${data.stats.squad.kills}
				<:founder:568122623599443978> Win(s) : ${data.stats.squad.wins}
			`,
			FORTNITE_LIFETIME_STATS: (data) => `<:score:569087927783522334>	K/D : ${data.stats.lifetime.kd}
				<:games:567019785620029529> Games : ${data.stats.lifetime.matches}
				<:mort:569080340145111060> Kills : ${data.stats.lifetime.kills}
				<:founder:568122623599443978> Win(s) : ${data.stats.lifetime.wins}
			`,

			QUOTE_DESCRIPTION: `Quote a message in the channel`,
			QUOTE_404: `${error} | No message has this ID.`,
			QUOTE_404_1: (channel) => `${error} | No channel found with ${channel}.`,

			JOKE_DESCRIPTION: `Send a random joke !`,

			BLACKLIST_DESC: `Ban a guild or a user from Atlanta!`,
			BLACKLIST_ARGS: `${error} | You must enter a type and an ID!`,
			BLACKLIST_GUILD: (id) => `${success} | The guild ${id} is now blacklist!`,
			BLACKLIST_ID: (id) => `${error} | No user on Discord has the ID \`${id}\` !`,
			BLACKLIST_USER: (id) => `${success} | User **${id}** blacklist!`,
			BLACKLIST_BANNED_USER: (reason) => `${error} | You are blacklisted from Atlanta for the following reason: \`${reason}\``,

			PURGE_DESCRIPTION: `Kick inactive members!`,
			PURGE_DAYS: `${error} | Please specify a number of days!`,
			PURGE_CONFIRMATION: `${warn} | ${members} members will be kicked! To confirm, type \`confirm\`!`,
			PURGE_TIMEOUT: `${error} | Time's up! Please retype the command!`,
			PURGE_SUCCESS: (members) => `${success} | ${members} members kicked!`,

			GITHUB_DESCRIPTION: `Display the Atlanta github information!`,
			GITHUB_DESC: `[Click here to access the Atlanta github](https://github.com/Androz2091/AtlantaBot)`,
			GITHUB_HEADERS: [
				"Stars :star:",
				"Forks :tools:",
				"Language :computer:",
				"Founder :crown:"
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
        var monthNames = [
            "January", "February", "March",
            "April", "May", "June", "July",
            "August", "September", "October",
            "November", "December"
          ];
        
          var day = pdate.getDate();
          var monthIndex = pdate.getMonth();
          var year = pdate.getFullYear();
          var hour = pdate.getHours();
          var minute = pdate.getMinutes();

		var thedate = (isLongDate) ? day + ' ' + monthNames[monthIndex] + ' ' + year + " at " + hour + "h" + minute 
		: thedate = day + ' ' + monthNames[monthIndex] + ' ' + year
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
		return h + ' hour(s) ' + m + ' minute(s) ' + s + ' second(s)';
	}

}