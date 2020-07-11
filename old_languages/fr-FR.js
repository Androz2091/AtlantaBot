let lang = "french";

let c = require("../config.js");
let e = c.emojis;

// This class is used to store languages strings

module.exports = class {
    constructor() {
		this.language = {

			// Utils
			PREFIX_INFO: (prefix) => `le préfixe de ce serveur est \`${prefix}\``,
			UTILS: {
				YES: "Oui",
				NO: "Non",
				USER: "Utilisateur",
				LEVEL: "Niveau",
				REP: "Réputation",
				CREDITS: "Crédits",
				VICTORY: "Victoire",
				DEFEAT: "Défaite",
				PAGE: "Page",
				TOTAL_SERVERS: "Total serveurs",
				MEMBERS: "Membres",
				STATUS: {
					"dnd": "Ne pas déranger",
					"idle": "AFK (idle)",
					"offline": "Déconnecté",
					"online": "En ligne"
				},
				NO_REASON_PROVIDED: "pas de raison donnée",
				UNDEFINED: "Indéfini",
				PLEASE_WAIT: `${e.loading} | Veuillez patienter...`,
				PREFIX: "Préfixe",
				CUSTOM_COMMANDS: "Commandes personnalisées",
				ANDMORE: "**et plus...**",
				TITLE: "Titre",
				AUTHOR: "Auteur",
				SIGN_OUT: "Déconnexion",
				YOUR_PROFILE: "Votre profil",
				UPDATE: "Mettre à jour",
				SERVERS: "Serveurs",
				MANAGE: "Paramétrer",
				STATS: "Statistiques",
				COMMANDS: "Commandes",
				HOME: "Accueil",
				SANCTIONS: "Sanctions",
				FRENCH: "Français",
				ENGLISH: "Anglais",
				NO_CHANNEL: "Aucun salon",
				PROFILE: "Profil",
				GLOBAL_LEADERBOARD: "Classement global",
				ECONOMY: "Économie",
				KNOW_MORE: "En savoir plus",
				SETTINGS: "Paramètres",
				SERVERS_SETTINGS: "Paramètres des serveurs",
				GLOBAL_STATS: "Globales",
				LEADERBOARD: "Classement",
				COMMANDS_USAGE: "Utilisation des commandes",
				WEBSITE: "Site",
				DISCONNECT: "Me déconnecter"
			},
			
			/* DBL VOTES */
			VOTE_THANKS: (user) => `:arrow_up: Bonjour ${user.toString()}, merci de voter !\nVotre récompense : 40 crédits !`,
			VOTE_LOGS: (user) => `:arrow_up: **${user.tag}** (\`${user.id}\`) a voté pour **Atlanta** et a gagné **40** crédits, merci !\nhttps://discordbots.org/bot/557445719892688897/vote`,

			/* DEFAULT MESSAGES */
			NO_DESCRIPTION_PROVIDED: "Aucune description donnée",
			NO_USAGE_PROVIDED: "Aucune utilisation donnée",
			NO_EXAMPLE_PROVIDED: "Aucun exemple donné",

			// ERROR MESSAGES

			ERR_COMMAND_DISABLED: `${e.error} | Cette commande est actuellement désactivée !`,
			ERR_OWNER_ONLY: `${e.error} | Seul ${c.owner.name} peut effectuer ces commandes !`,
			ERR_INVALID_CHANNEL: `${e.error} | Veuillez mentionner un salon valide !`,
			ERR_INVALID_ROLE: `${e.error} | Veuillez mentionner un rôle valide !`,
			ERR_INVALID_MEMBER: `${e.error} | Veuillez mentionner un membre valide !`,
			ERR_INVALID_NUMBER: (nan) => `${e.error} | \`${nan}\` n'est pas un nombre valide !`,
			ERR_INVALID_NUMBER_MM: (min, max) => `${e.error} Veuillez indiquer un nombre valide entre ${min} et ${max} !`,
			ERR_INVALID_TIME: `${e.error} | Vous devez entrer un temps valide ! Unités valides : \`s\`, \`m\`, \`h\`, \`d\`, \`w\`, \`y\``,
			ERR_INVALID_ID: `${e.error} | Veuillez entrer une ID valide !`,

			ERR_MISSING_BOT_PERMS: (perms) => `${e.error} | J'ai besoin des permissions suivantes pour effectuer cette commande : \`${perms}\``,
			ERR_MISSING_MEMBER_PERMS: (perm) => `${e.error} | Vous n'avez pas les permissions nécessaires pour effectuer cette commande (\`${perm}\`)`,
			ERR_NOT_NSFW: `${e.error} | Vous devez vous rendre dans un salon qui autorise le NSFW pour taper cette commande !`,
			ERR_GUILDONLY: `${e.error} | Cette commande est uniquement disponible sur un serveur !`,
			ERR_UNAUTHORIZED_CHANNEL: (channel) => `${e.error} | Les commandes sont interdites dans ${channel} !`,
			ERR_BAD_PARAMETERS: (cmd, prefix) => `${e.error} | Veuillez vérifier les paramètres de la commande. Regardez les exemples en tapant \`${prefix}help ${cmd}\` !`,
			ERR_ROLE_NOT_FOUND: (role) => `${e.error} | Aucun rôle trouvé avec \`${role}\` !`,
			ERR_CHANNEL_NOT_FOUND: (channel) => `${e.error} | Aucun salon trouvé avec \`${channel}\``,
			ERR_YES_NO: `${e.error} | Vous devez répondre par "oui" ou par "non" !`,
			ERR_EVERYONE: `${e.error} | Vous n'avez pas l'autorisation de mentionner everyone ou here dans les commandes.`,
			ERR_BOT_USER: `${e.error} | Cet utilisateur est un bot !`,
			ERR_GAME_ALREADY_LAUNCHED: `${e.error} | Une partie est déjà en cours sur ce serveur !`,
			ERR_A_GAME_ALREADY_LAUNCHED: `${e.error} | A cause des lags et bugs dus au findwords et au number, il est impossible de lancer deux parties en même temps, même si elles sont sur deux serveurs différents.\nIl y a une partie actuellement en cours sur un autre serveur, veuillez donc patientez quelques minutes puis réessayer.\nNous sommes désolés, mais des personnes abusaient de cette commande en la spammant sur pleins de serveurs.`,
			ERR_OCCURENCED: `${e.error} | Une erreur est survenue, veuillez réessayez dans quelques minutes.`,
			ERR_CMD_COOLDOWN: (seconds) => `${e.error} | Vous devez attendre **${seconds}** seconde(s) pour pouvoir de nouveau effectuer cette commande !`,
			ERR_SANCTION_YOURSELF: `${e.error} | Vous ne pouvez pas vous sanctionner vous-même !`,

			/* PING COMMAND */

			// Utils
			PING_DESCRIPTION: "Affiche la latence du bot",
			PING_USAGE: "ping",
			PING_EXAMPLES: "$ping",
			// Content
			PING: (ms) => `${e.success} | Pong ! Ma latence est de \`${ms}\` ms !`,

			/* HELP COMMAND */

			// Utils
			HELP_DESCRIPTION: "Affiche l'aide des commandes ou l'aide d'une commande en particulier",
			HELP_USAGE: "help (commande)",
			HELP_EXAMPLES: "$help\n$help ping",
			// Errors
			HELP_ERR_NOT_FOUND: (cmd) => `${e.error} | Commande \`${cmd}\` introuvable !`,
			HELP_ERR_CMD_CUSTOMIZED: (cmd) => `${e.error} | La commande ${cmd} ne dispose pas d'aide car elle est personnalisée.`,
			// Content
			HELP_EDESCRIPTION: (prefix) => `● Pour avoir de l'aide sur une commande tapez \`${prefix}help <commande>\` !`,
			HELP_TITLE: `${c.botname} | Commandes`,
			HELP_NO_ALIASES: "Aucun alias.",
			// Headings
			HELP_HEADINGS: [
				"Aide :",
				`${e.help} Utilisation :`,
				`${e.search} Exemples :`,
				`${e.folder} Groupe :`,
				`${e.desc2} Description :`,
				`${e.add} Alias :`,
				`${e.crown} Permissions :`
			],

			/* GITHUB COMMAND */

			// Utils
			GITHUB_DESCRIPTION: `Affiche les informations du github d'${c.botname} !`,
			GITHUB_USAGE: "github",
			GITHUB_EXAMPLES: "$github",
			// Content
			GITHUB_DESC: `[Cliquez ici pour accéder au github d'${c.botname}](https://github.com/Androz2091/AtlantaBot)`,
			// Headings
			GITHUB_HEADERS: [
				"Stars :star:",
				"Forks :tools:",
				"Language :computer:",
				"Fondateur :crown:"
			],

			/* HASTEBIN COMMAND */

			// Utils
			HASTEBIN_DESCRIPTION: "Upload votre texte sur hastebin !",
			HASTEBIN_USAGE: "hastebin [texte]",
			HASTEBIN_EXAMPLES: "$hastebin Hello World !",
			// Errors
			HASTEBIN_ERR_TEXT: `${e.error} | Vous devez entrer un texte !`,
			// Content
			HASTEBIN_TITLE: `Upload terminé !`,

			/* ASCII COMMAND */

			// Utils
			ASCII_DESCRIPTION: "Transforme votre texte en caractères ascii !",
			ASCII_USAGE: "ascii [texte]",
			ASCII_EXAMPLES: "$ascii Coucou !",
			// Errors
			ASCII_ERR_TEXT: `${e.error} | Veuillez entrer un texte valide (inférieur à 20 caractères) !`,

			/* FINDWORDS COMMAND */

			// Utils
			FINDWORDS_DESCRIPTION: "Lance une partie de findwords, un jeu ou vous devez trouver des mots !",
			FINDWORDS_USAGE: "findwords",
			FINDWORDS_EXAMPLES: "$findwords",
			// Errors
			FINDWORDS_ERR_INVALID_WORD: (member) => `${e.error} | ${member} ton mot est invalide !`,
			FINDWORDS_ERR_NO_WINNER_GAME: `${e.warn} | Je ne peux définir aucun gagnant car aucun mot n'a été trouvé de toutes les parties !`,
			FINDWORDS_ERR_NO_WINNER: `${e.error} | Personne n'a réussi à trouver de mots !`,
			// Content
			FINDWORDS_TIMER: `${e.warn} | La partie commence dans 10 secondes !`,
			FINDWORDS_QUESTION: (word) => `${e.warn} | 20 secondes pour trouver un mot contenant "**${word}**" !`,
			FINDWORDS_CONGRATS: (winner) => `${e.success} | Bravo <@${winner}> ! Ton mot est valide et tu as été le plus rapide !`,
			FINDWORDS_STATS: (username, games, time, number, members) => `:tada: | ${username} a gagné la partie !\n\n**Stats de la partie :**\n__**Temps**__: ${time}\n__**Nombre de participants**__ : ${number}\n__**Participants**__ : \n${members}`,
			FINDWORDS_MONEY: (member) => `${member} gagne 15 crédits ! :tada:`,

			/* NUMBER COMMAND */

			// Utils
			NUMBER_DESCRIPTION: "Trouvez le nombre que j'ai choisi !",
			NUMBER_USAGE: "number",
			NUMBER_EXAMPLES: "$number",
			// Content
			NUMBER_START: `${e.warn} | Nombre déterminé, vous pouvez commencer !`,
			NUMBER_HIGHER: (number, author) => `${author} | Le nombre est plus **grand** que \`${number}\` !`,
			NUMBER_SMALLER: (number, author) => `${author} | Le nombre est plus **petit** que \`${number}\` !`,
			NUMBER_CONGRATS: (member) => `<@${member}> a gagné 10 crédits !`,
			NUMBER_STATS: (user, number, time, nb, members) => `:tada: | ${user} a trouvé le nombre ! C'était __**${number}**__ !\n\n**Stats de la partie :**\n__**Temps**__: ${time}\n__**Nombre de participants**__ : ${nb}\n__**Participants**__ : \n${members}`,
			// Errors
			NUMBER_DEFEAT: (number) => `${e.error} | Personne n'a réussi à trouver le nombre ! C'était ${number} !`,

			/* RANDOM COMMAND */

			// Utils
			RANDOM_DESCRIPTION: "Tire aléatoirement un des choix que vous me donner !",
			RANDOM_USAGE: "random [choix1/choix2/etc...]",
			RANDOM_EXAMPLES: "$random Feu/Vent/Eau",
			// Errors
			RANDOM_ERR_CHOICES: `${e.error} | Vous devez entrer plus de deux choix !`,
			RANDOM_ERR_BLANK: `${e.error} | Un de vos choix semble être vide... Veuillez réessayer !`,
			// Content
			RANDOM_CHOOSED: `${e.success} | Voici mon choix :`,
			RANDOM_WAIT: `${e.loading} | Choix en cours...`,

			/* QUOTE COMMAND */

			// Utils
			QUOTE_DESCRIPTION: "Citez un message dans le salon !",
			QUOTE_USAGE: "quote [messageID] [salon]",
			QUOTE_EXAMPLES: "$quote 596018101921906698\n$quote 596018101921906698 573508780520898581\n$quote 596018101921906698 #blabla",
			// Errors
			QUOTE_ERR_NOT_FOUND: `${e.error} | Aucun message ne possède cet ID.`,
			QUOTE_ERR_NOT_FOUND_CHANNEL: (channel) => `${e.error} | Aucun salon trouvé avec l'ID ${channel} !`,

			/* INVITATIONS COMMAND */

			// Utils
			INVITATIONS_DESCRIPTION: "Affiche le nombre de personnes que vous avez invitées sur le serveur !",
			INVITATIONS_USAGE: "invitations (@membre)",
			INVITATIONS_EXAMPLES: "$invitations\n$invitations @Androz#2091",
			// Errors
			INVITATIONS_ERR_NO_INVITE: (member) => `${e.error} | ${member ? member.user.username + " n'a" : "Vous n'avez"} invité personne sur le serveur !`,
			// Content
			INVITATIONS_CODE: (invite) => `**${invite.code}** (${invite.uses} utilisations) | ${invite.channel}`,
			// Headings
			INVITATIONS_TITLE: (member, msg) => `Informations sur les invitations de ${member} sur ${msg.guild.name}`,
			INVITATIONS_FIELDS: (total) => [
				"👥 Personnes Invitées",
				"🔑 Codes",
				`${total} membres`
			],

			/* ACHIEVEMENTS COMMAND */
			
			// Utils
			ACHIEVEMENTS_DESCRIPTION: "Affiche la liste de toutes les réalisations !",
			ACHIEVEMENTS_USAGE: "achievements",
			ACHIEVEMENTS_EXAMPLES: "$achievements",
			// Content
			ACHIEVEMENTS_DESC: [
				"Ecrivez votre première commande !",
				"Réclamez 10 fois votre salaire !",
				"Trouvez votre moitié et mariez-vous !",
				"Gagnez 3 fois de suite aux machines à sous !",
				"Maintenez Atlanta en vie en laissant un pourboire!",
				"Atteignez 20 points de réputation !",
				"Invitez Atlanta sur votre serveur !"
			],
			ACHIEVEMENTS_TITLE: "🔥 Réalisations",
			ACHIEVEMENTS_PROGRESS: (progressData) => `Progression : ${progressData.now}/${progressData.total} (${Math.round(100 * (progressData.now/progressData.total))}%)`,
			
			/* TCL COMMAND */

			// Utils
			TCL_DESCRIPTION: "Affiche le dernier tweet de @lesjoiesducode !",
			TCL_USAGE: "tcl",
			TCL_EXAMPLES: "$tcl",
			// Content
			TCL_TITLE: "🔥 Dernier tweet de @lesjoiesducode !",

			/* SETAFK COMMAND */

			// Utils
			SETAFK_DESCRIPTION: "Devenez AFK (les membres qui vous mentionneront recevront un message)",
			SETAFK_USAGE: "setafk [raison]",
			SETAFK_EXAMPLES: "$setafk Je passe mes examens !",
			// Errors
			SETAFK_ERR_REASON: `${e.error} | Veuillez préciser la raison de votre afk !`,
			// Content
			SETAFK_SUCCESS: (reason) => `${e.success} | Vous êtes passé afk (raison : ${reason})`,
			// Others
			AFK_DELETED: `${e.warn} | Votre AFK vient d'être supprimé !`,
			AFK_MEMBER: (user, reason) => `${e.warn} | **${user.tag}** est actuellement AFK pour :\n\`\`\`${reason}\`\`\``,

			/* REMINDME COMMAND */

			// Utils
			REMINDME_DESCRIPTION: "Définissez un rappel !",
			REMINDME_USAGE: "remindme [raison]",
			REMINDME_EXAMPLES: "$remindme 24h Commande de work\n$remindme 3m Sortir les pâtes de la casserole !",
			// Errors
			REMINDME_ERR_MESSAGE: `${e.error} | Vous devez entrer un message qui vous sera envoyé à la fin du temps !`,
			// Content
			REMINDME_SAVED: `${e.success} | Rappel correctement enregistré, vous recevrez un message à la fin du temps !`,
			REMINDME_TITLE: `Rappel ${c.botname}`,
			REMINDME_FIELDS: [
				"Créé il y a",
				"Message"
			],

			/* USERINFO COMMAND */

			// Utils
			USERINFO_DESCRIPTION: "Affiche des informations sur l'utilisateur !",
			USERINFO_USAGE: "userinfo (@user/userID)",
			USERINFO_EXAMPLES: "$userinfo\n$userinfo @Androz#2091\n$userinfo 422820341791064085",
			// Errors
			USERINFO_ERR_ID: (id) => `${e.error} | Aucun utilisateur sur Discord ne possède l'ID \`${id}\` !`,
			// Content
			USERINFO_FIELDS: [
				":man: Pseudo",
				`${e.discriminator} Discriminateur`,
				`${e.bot} Robot`,
				`${e.avatar} Avatar`,
				`${e.calendar} Création`,
				`${e.games} Jeu`,
				`${e.status.online} Statut`,
				`${e.up} Rôle`,
				`${e.calendar2} Arrivée`,
				`${e.pencil} Surnom`,
				`${e.roles} Rôles`,
				`${e.color} Couleur`,
				`${e.desc} Description`,
				`${e.stats} Stats`,
				`${e.link} Liens`
			],
			USERINFO_NO_GAME: "Pas de jeu",
			USERINFO_NO_ROLE: "Aucun rôle",
			USERINFO_MORE_ROLES: (nb) => ` et ${nb} autres rôles`,
			USERINFO_NO_NICKNAME: "Pas de surnom",
			USERINFO_LINKS: (discord, invite, github, website) => `${discord ? `[Support](https://discord.gg/${discord})\n` : ""}[Invitation](${invite})\n${github ? `[Github](${github})\n` : ""}${website ? `[Site web](${website})` : ""}`,
			USERINFO_STATS: (votes, servers, shards, lib) => `**${votes}** votes (Discordbots.org)\n**${servers}** serveurs\n**${shards.length === 0 ? "Aucun" : shards.length}** shards\nDéveloppé avec **${lib}**`,

			/* SERVERINFO COMMAND */

			// Utils
			SERVERINFO_DESCRIPTION: "Affiche des informations sur le serveur !",
			SERVERINFO_USAGE: "serverinfo [ID/Nom]",
			SERVERINFO_EXAMPLES: "$serverinfo Atlanta\n$serverinfo",
			// Content
			// Headings
			SERVERINFO_HEADINGS:[
				`${e.title} Nom`,
				`${e.calendar} Création`,
				`${e.users} Membres`,
				`${e.channels} Salons`,
				`${e.afk} Salon AFK`,
				`${e.id} ID`,
				`${e.crown} Fondateur`,
				`${e.boost} Boosts`
			],
			SERVERINFO_MEMBERCOUNT: (members) => `${members.filter((m) => !m.user.bot).size} membres | ${members.filter((m) => m.user.bot).size} bots`,
			SERVERINFO_NO_AFK: "Aucun salon AFK",
			SERVERINFO_CHANNELS: (channels) => `${channels.filter((ch) => ch.type === "voice").size} vocaux | ${channels.filter((ch) => ch.type === "text").size} textuels | ${channels.filter((ch) => ch.type === "category").size} catégories`,

			/* MENTIONROLE COMMAND */

			// Utils
			MENTIONROLE_DESCRIPTION: "Mentionne un rôle puis désactive la possibilité de mentionner",
			MENTIONROLE_USAGE: "mentionrole [nom]",
			MENTIONROLE_EXAMPLES: "$mentionrole Membres",
			// Errors
			MENTIONROLE_NOT_FOUND: `${e.error} | Vous devez entrer un rôle à mentionner !`,

			/* UNBAN COMMAND */

			// Utils
			UNBAN_DESCRIPTION: "Unban l'utilisateur du serveur !",
			UNBAN_USAGE: "unban [userID/user#0000]",
			UNBAN_EXAMPLES: "$unban 422820341791064085\n$unban Androz#2091",
			// Errors
			UNBAN_ERR_ID: (id) => `${e.error} | Aucun utilisateur sur Discord ne possède l'ID \`${id}\` !`,
			UNBAN_ERR_NOT_BANNED: (user) => `${e.error} | **${user.username}** n'est pas banni !`,
			// Content
			UNBAN_SUCCESS: (user, msg) => `${e.success} | **${user.username}** vient d'être débanni de **${msg.guild.name}** !`,

			/* EVAL COMMAND */

			// Utils
			EVAL_DESCRIPTION: "Exécute le code",
			EVAL_USAGE: "eval [code]",
			EVAL_EXAMPLES: "$eval message.channel.send('Coucou');",
			
			/* REPORT COMMAND */
			REPORT_DESCRIPTION: "Envoyez votre signalement dans le salon défini pour cela !",
			REPORT_USAGE: "report [@user] [raison]",
			REPORT_EXAMPLES: "$report @Androz#2091 Règles non respectées",
			// Errors
			REPORT_ERR_NO_CHANNEL: `${e.error} | Aucun salon de signalement défini !`,
			REPORT_ERR_NO_REP: `${e.error} | Veuillez entrer une raison pour votre signalement !`,
			REPORT_ERR_NO_USER: `${e.error} | Veuillez mentionner l'utilisateur à signaler !`,
			REPORT_ERR_USER_YOURSELF: `${e.error} | Vous ne pouvez pas vous signaler vous-même !`,
			//Headings
			REPORT_HEADINGS: [
				"Auteur",
				"Date",
				"Contenu",
				"Signalement"
			],
			// Content
			REPORT_TITLE: (user) => `Signalement - ${user.tag}`,
			REPORT_SUCCESS: (channel) => `${e.success} | Votre rapport a été envoyé dans ${channel} !`,

			/* GETINVITE COMMAND */

			// Utils
			GETINVITE_DESCRIPTION: "Génère une invitation vers le serveur en question. Veillez à faire bon usage de cette commande.",
			GETINVITE_USAGE: "getinvite [ID/Nom]",
			GETINVITE_EXAMPLES: "$getinvite Atlanta\n$getinvite 565048515357835264",
			// Errors
			GETINVITE_ERR_NO_GUILD: (search) => `${e.error} | Aucun serveur trouvé (recherche: ${search})`,

			/* SUGGEST COMMAND */

			// Utils
			SUGGEST_DESCRIPTION: "Envoie votre suggestion dans le salon défini pour ça !",
			SUGGEST_USAGE: "suggest [message]",
			SUGGEST_EXAMPLES: "$suggest Un nouveau salon #spam !",
			// Errors
			SUGGEST_ERR_NO_CHANNEL: `${e.error} | Aucun salon de suggestion défini !`,
			SUGGEST_ERR_NO_SUGG: `${e.error} | Veuillez entrer une suggestion !`,
			// Headings
			SUGGEST_HEADINGS: [
				"Auteur",
				"Date",
				"Contenu"
			],
			// Content
			SUGGEST_TITLE: (user) => `Suggestion - ${user.tag}`,
			SUGGEST_SUCCESS: (channel) => `${e.success} | Votre suggestion est en cours de vote dans ${channel} !`,

			/* INVITE COMMAND */

			// Utils
			INVITE_DESCRIPTION: `Affiche les liens d'${c.botname} !`,
			INVITE_USAGE: "invite (copy)",
			INVITE_EXAMPLES: "$invite\n$invite copy",
			// Content
			INVITE_TITLE: "Liens principaux",
			INVITE_DESC: (prefix) => `Tapez \`${prefix}invite copy\` pour pouvoir copier le lien !`,
			INVITE_HEADINGS: [
				`${e.add} Inviter ${c.botname}`,
				`${e.vote} Voter pour ${c.botname}`,
				`${e.help} Support`
			],

			/* SHORTURL COMMAND */

			// Utils
			SHORTURL_DESCRIPTION: "Raccourci votre lien !",
			SHORTURL_USAGE: "shorturl [url]",
			SHORTURL_EXAMPLES: "$shorturl https://google.fr",
			// Errors
			SHORTURL_ERR_INVALID_URL: `${e.error} | Veuillez entrer une URL valide !`,

			/* MINECRAFT COMMAND */

			// Utils
			MINECRAFT_DESCRIPTION: "Affiche des informations sur le serveur Minecraft !",
			MINECRAFT_USAGE: "minecraft [ip]",
			MINECRAFT_EXAMPLES: "$minecraft mc.hypixel.net",
			// Errors
			MINECRAFT_ERR_IP: `${e.error} | Veuillez entrer une IP !`,
			MINECRAFT_ERR_OFFLINE: `${e.error} | Ce serveur est hors ligne ou a bloqué les accès !`,
			// Content
			MINECRAFT_ONLINE: "En ligne",
			MINECRAFT_OFFLINE: "Hors ligne",
			MINECRAFT_PLAYERS: (nb) => `${nb} joueur(s)`,
			// Headings
			MINECRAFT_HEADINGS: (ip) => [
				`Informations sur ${ip}`,
				`${e.version} Version`,
				`${e.minecraft} Actuellement connectés`,
				`${e.users} Maximum`,
				`${e.status.online} Statut`,
				`${e.ip} IP complète`
			],

			/* STAFF COMMAND */

			// Utils
			STAFF_DESCRIPTION: "Affiche la liste des membres du staff du serveur !",
			STAFF_USAGE: "staff",
			STAFF_EXAMPLES: "$staff",
			// Content
			STAFF_TITLE: (guildName) => `Staff de ${guildName}`,
			STAFF_HEADINGS: {
				ADMIN: "Administrateurs",
				MOD: "Modérateurs"
			},
			STAFF_NO_ADMIN: "Aucun administrateur",
			STAFF_NO_MOD: "Aucun modérateur",
			
			/* JOKE COMMAND */

			// Utils
			JOKE_DESCRIPTION: "Affiche une blague en français",
			JOKE_USAGE: "joke",
			JOKE_EXAMPLES: "$joke",
			// Content
			JOKE_FOOTER: "blague.xyz | Par Skiz#0001",

			/* FML COMMAND */

			// Utils
			FML_DESCRIPTION: "Affiche une VDM au hasard",
			FML_USAGE: "fml",
			FML_EXAMPLES: "$fml\n$vdm",
			// Content
			FML_TITLE: "VDM | viedemerde.fr",
			FML_URL: "https://www.viedemerde.fr/aleatoire",
			FML_ERROR: "Une erreur est survenue pendant la récupération de la VDM",

			/* 8BALL COMMAND */

			// Utils
			EIGHTBALL_DESCRIPTION: "Je vous dis la vérité !",
			EIGHTBALL_USAGE: "8ball [question]",
			EIGHTBALL_EXAMPLES: "$8ball Est-ce qu'Atlanta est le meilleur bot Discord ?",
			// Errors
			EIGHTBALL_ERR_QUESTION: `${e.error} | Vous devez entrer une question à me poser !`,
			// Content
			EIGHTBALL_ANSWERS: [
				"j'en suis certain.",
				"c'est décidément sur.",
				"sans aucun doute.",
				"oui, j'en suis sur et certain !",
				"probablement...",
				"oui !",
				"non !",
				"des signes me font dire oui...",
				"demandez à nouveau plus tard :\\",
				"mieux vaut ne pas te le dire maintenant...",
				"je ne peux pas prédire maintenant.",
				"concentrez-vous et demandez à nouveau !",
				"ne compte pas la dessus.",
				"ma réponse est non.",
				"mes sources disent que non...",
				"oh... J'en doute !"
			],

			/* QRCODE */

			// Utils
			QRCODE_DESCRIPTION: "Génère un QR Code avec votre texte !",
			QRCODE_USAGE: "qrcode [texte]",
			QRCODE_EXAMPLES: "$qrcode Coucou !",
			// Errors
			QRCODE_ERR_TEXT: `${e.error} | Vous devez entrer un texte !`,
			
			/* FLIP COMMAND */

			// Utils
			FLIP_DESCRIPTION: "Je lance les dés pour vous !",
			FLIP_USAGE: "flip",
			FLIP_EXAMPLES: "$flip",
			// Content
			FLIP_PILE: ":game_die: | C'est **pile** !",
			FLIP_FACE: ":game_die: | C'est **face** !",

			/* LMG COMMAND */

			// Utils
			LMG_DESCRIPTION: "Renvoie un lien vers lmgtfy.com",
			LMG_USAGE: "lmg [question]",
			LMG_EXAMPLES: "$lmg Comment créer son bot Discord ?",
			// Errors
			LMG_ERR_QUESTION: `${e.error} | Vous devez préciser une recherche !`,

			/* APITOKEN COMMAND */

			// Utils
			APITOKEN_DESCRIPTION: "Renvoie votre token pour utiliser l'API d'Atlanta !",
			APITOKEN_USAGE: "apitoken (regenerate)",
			APITOKEN_EXAMPLES: "$apitoken\n$apitoken regenerate",
			// Content
			APITOKEN_DM_SUCCESS: `:incoming_envelope: | Clé d'API envoyée par messages privés !`,
			APITOKEN_DM_SUCCESS_REGENERATE: `:incoming_envelope: | Nouvelle clé d'API envoyée par messages privés !`,
			APITOKEN_SUCCESS: (token) => `:key: | Votre clé d'API est \`${token}\` !`,
			APITOKEN_SUCCESS_REGENERATE: (token) => `:key: | Clé d'API regénérée ! Votre clé d'API est maintenant \`${token}\`.`,

			/* LOVECALC COMMAND */

			// Utils
			LOVECALC_DESCRIPTION: "Combien d'amour y a t'il entre deux personnes ? *Ceci est une commande fun, à ne pas prendre au sérieux*",
			LOVECALC_USAGE: "lovecalc [@membre1] (@membre2)",
			LOVECALC_EXAMPLES: "$lovecalc @Androz#2091\n$lovecalc @Androz#2091 @Atlanta#6770",
			// Errors
			LOVECALC_ERR_MENTIONS: `${e.error} | Vous devez mentionner deux membres !`,
			// Content
			LOVECALC_CONTENT: (percent, username1, username2) => `Il y a **${percent}%** d'amour entre **${username1}** et **${username2}** !`,

			/* GETCONF COMMAND */

			// Utils
			GETCONF_DESCRIPTION: "Affiche la configuration d'un serveur",
			GETCONF_USAGE: "getconf [serveur ID]",
			GETCONF_EXAMPLES: "$getconf 565048515357835264",
			// Errors
			GETCONF_ERR_ID: `${e.error} | Veuillez entrer une ID valide !`,
			GETCONF_ERR_GUILD_NOT_FOUND: `${e.error} | Aucun serveur trouvé!`,

			/* PERMISSIONS COMMAND */

			// Utils
			PERMISSIONS_DESCRIPTION: "Affiche les permissions du membre dans le salon",
			PERMISSIONS_USAGE: "permissions (@membre)",
			PERMISSIONS_EXAMPLES: "$permissions\n$permissions @Androz#2091",
			// Content
			PERMISSIONS_TITLE: (username, channel) => `Permissions de ${username} dans #${channel}`,

			/* PARTNERS COMMAND */

			// Utils
			PARTNERS_DESCRIPTION: "Affiche les partenaires d'Atlanta",
			PARTNERS_USAGE: "partners",
			PARTNERS_EXAMPLES: "$partners",
			// Content
			PARTNERS_TITLE: `Partenaires d'${c.botname}`,

			/* SERVERSLIST COMMAND */

			SERVERSLIST_DESCRIPTION: "Affiche la liste des serveurs du bot !",
			SERVERSLIST_USAGE: "servers-list",
			SERVERSLIST_EXAMPLES: "$servers-list",

			/* BACKUP COMMAND */

			// Utils
			BACKUP_DESCRIPTION: "Gérez vos sauvegardes de serveur de manière ergonomique et efficace!",
			BACKUP_USAGE: "backup [create/load/infos]",
			BACKUP_EXAMPLES: "$backup create\n$backup load 92N1x\n$backup infos 92N1x",
			// Errors
			BACKUP_ERR_STATUS: `${e.error} | Vous devez préciser \`create\`, \`load\` ou \`infos\` !`,
			BACKUP_ERR_NOT_FOUND: (backupID) => `${e.error} | Aucune sauvegarde trouvée pour \`${backupID}\``,
			BACKUP_ERR_ID: `${e.error} | Veuillez entrer une ID de sauvegarde !`,
			BACKUP_ERR_TIMEOUT: `${e.error} | Temps écoulé | Chargement de la sauvegarde annulé !`,
			// Content
			BACKUP_CREATE_SUCCESS: `${e.success} | Sauvegarde créée avec succès ! L'ID de la sauvegarde vous a été envoyée en messages privés !`,
			BACKUP_CREATE_SUCCESS_ID: (backupID) => `${e.success} | Voici l'ID de votre sauvegarde : \`\`\`${backupID}\`\`\``,
			BACKUP_CONFIRMATION: `${e.warn} | :warning: | Lorsque la sauvegarde sera chargée, tous les salons, rôles, etc... seront remplacés ! Tapez \`-confirm\` pour confirmer !`,
			BACKUP_START_SAVING: `${e.success} | Démarrage du chargement de la sauvegarde !`,
			BACKUP_LOAD_SUCCESS: `${e.success} | Sauvegarde chargée avec succès !`,
			// Headings
			BACKUP_HEADINGS: [
				"Informations sur la sauvegarde",
				"ID",
				"ID du serveur",
				"Taille",
				"Créée le"
			],

			/* TWEET COMMAND */

			// Utils
			TWEET_DESCRIPTION: "Génère un tweet d'une personne de votre choix sur Twitter !",
			TWEET_USAGE: "tweet [@twitter] [texte]",
			TWEET_EXAMPLES: "$tweet EmmanuelMacron Bonjour la France !",
			// Errors
			TWEET_ERR_USERNAME: `${e.error} | Vous devez entrer le pseudo twitter de quelqu'un !`,
			TWEET_ERR_TEXT: `${e.error} | Vous devez entrer un message !`,
			// Content
			TWEET_CONTENT: (user) => `Nouveau tweet publié par ${user} :`,

			/* CONFIGURATION COMMAND */

			// Utils
			CONFIGURATION_DESCRIPTION: "Affiche la configuration du serveur",
			CONFIGURATION_USAGE: "configuration",
			CONFIGURATION_EXAMPLES: "$configuration",
			// Headings
			CONFIGURATION_HEADINGS: [
				[ "Salon(s) ignoré(s)", "Aucun salon ignoré" ],
				[ "Autôrole", "Autorôle désactivé" ],
				[ "Bienvenue", "Messages de bienvenue désactivés" ],
				[ "Au revoir", "Messages d'au revoir désactivés" ],
				[ "Slowmode", "Aucun salon avec slowmode" ],
				[ "Salons" ],
				[ "Avertissements" ],
				[ "Automodération", "Automodération désactivée" ],
				[ "Auto-suppression commandes", "Auto-suppression des commandes de modération désactivée" ],
				[ "Éditer votre configuration", `[Cliquez ici pour accéder au dashboard !](${c.dashboard.baseURL})`]
			],
			CONFIGURATION_AUTOROLE: (roleID) => `Rôle : <@&${roleID}>`,
			CONFIGURATION_WELCOME: (withImage, channelID) => `Salon : <#${channelID}>\nImage : ${withImage ? "Oui" : "Non"}`,
			CONFIGURATION_GOODBYE: (withImage, channelID) => `Salon : <#${channelID}>\nImage : ${withImage ? "Oui" : "Non"}`,
			CONFIGURATION_MODLOGS: (channelID) => `Logs modération : ${channelID ? `<#${channelID}>` : "Indéfini"}`,
			CONFIGURATION_SUGGESTIONS: (channelID) => `Suggestions : ${channelID ? `<#${channelID}>` : "Indéfini" }`,
			CONFIGURATION_REPORTS: (channelID) => `Signalements : ${channelID ? `<#${channelID}>` : "Non défini" }`,
			CONFIGURATION_FORTNITESHOP: (channelID) => `Boutique Fortnite : ${channelID ? `<#${channelID}>` : "Indéfini" }`,
			CONFIGURATION_AUTOMOD: (ignoredChannels) => `${ignoredChannels.length > 0 ? `Salon ignorés : ${ignoredChannels.map((ch) => `<#${ch}>`)}` : "Aucun salon ignoré."}`,
			CONFIGURATION_WARNS: (kick, ban) => `${kick ? `**Expulsion**: au bout de **${kick}** avertissements.` : "**Expulsion**: Non définie."}\n${ban ? `**Bannissement**: au bout de **${ban}** avertissements.` : "**Bannissement**: Non défini."}`,
			CONFIGURATION_AUTODELETEMOD: "Auto-suppression des commandes de modération activée",

			/* IGNORE COMMAND */

			// Utils
			IGNORE_DESCRIPTION: "Désactive ou active les commandes dans le salon mentionné",
			IGNORE_USAGE: "ignore [#salon]",
			IGNORE_EXAMPLES: "$ignore #général",
			// Content
			IGNORE_SUCCESS_DISABLED: (channel) => `${e.success} | Les commandes sont maintenant autorisées dans ${channel} !`,
			IGNORE_SUCCESS_ENABLED: (channel) => `${e.warn} | Les commandes sont maintenant interdites dans ${channel} !`,

			/* SETPREFIX COMMAND */

			// Utils
			SETPREFIX_DESCRIPTION: "Change le préfixe du serveur",
			SETPREFIX_USAGE: "setprefix [préfixe]",
			SETPREFIX_EXAMPLES: "$setprefix !",
			// Errors
			SETPREFIX_ERR_PREFIX: `${e.error} | Veuillez entrer un préfixe valide !`,
			SETPREFIX_ERR_CARACT: `${e.error} | Le préfixe ne doit pas excéder les 5 caractères !`,
			// Content
			SETPREFIX_SUCCESS: (prefix) => `${e.success} | Le préfixe a bien été modifié ! Tapez \`${prefix}help\` pour voir la liste des commandes !`,

			/* AUTOROLE COMMAND */

			// Utils
			AUTOROLE_DESCRIPTION: "Active ou désactive l'autorôle sur le serveur !",
			AUTOROLE_USAGE: "autorole [on/off] (role)",
			AUTOROLE_EXAMPLES: "$autorole on Members\n$autorole off",
			// Errors
			AUTOROLE_ERR_STATUS: `${e.error} | Veuillez indiquer \`on\` ou \`off\` et un nom de rôle !`,
			// Content
			AUTOROLE_ENABLED: (prefix) => `${e.success} | Autôrole correctement activé ! Pour avoir plus d'informations sur la configuration de votre serveur tapez \`${prefix}configuration\` !`,
			AUTOROLE_DISABLED: (prefix) => `${e.warn} | Autôrole correctement désactivé ! Pour avoir plus d'informations sur la configuration de votre serveur tapez \`${prefix}configuration\` !`,

			/* WELCOME COMMAND */

			// Utils
			WELCOME_DESCRIPTION: `Envoie un message de bienvenue dans un salon défini au préalable !`,
			WELCOME_USAGE: "welcome",
			WELCOME_EXAMPLES: "$welcome",
			// Content
			WELCOME_TEST_SUCCESS: `${e.success} | Test effectué !`,
			WELCOME_DISABLED: (prefix) => `${e.success} | Les messages de bienvenue viennent d'être désactivés ! Tapez \`${prefix}configuration\` pour voir la configuration actuelle !`,
			WELCOME_FORM_CHANNEL: (author) => `Bonjour ${author} ! Dans quel salon s'enverra le message de bienvenue ? (mentionnez un salon)`,
			WELCOME_FORM_MESSAGE: (channel, msg) => `D'accord ! Les messages s'enverront donc dans ${channel}. Entrez le message de bienvenue ci-dessous : \n\nInfos:\`\`\`\nMention : {user}\nMembres : {membercount}\nServeur : {server}\`\`\`Par exemple, "Bienvenue {user} sur {server} ! Grâce à toi, nous sommes {membercount} !" donnera "Bienvenue ${msg.author} sur ${msg.guild.name} ! Grâce à toi, nous sommes ${msg.guild.memberCount} !".`,
			WELCOME_FORM_IMAGE: `Ça marche ! Voulez-vous qu'une superbe image de bienvenue soit envoyée en même temps ? Répondez par "oui" ou par "non" !`,
			WELCOME_FORM_SUCCESS: (channel, prefix) => `${e.success} | Messages de bienvenue activés dans <#${channel}> ! Tapez \`${prefix}welcome test\` pour tester le message de bienvenue !`,
			WELCOME_IMG_MSG: (name) => `Bienvenue sur ${name} !`,
			WELCOME_IMG_NUMBER: (memberCount) => `- ${memberCount}ème membre !`,
			WELCOME_IMG_TITLE: "BIENVENUE",
			WELCOME_DEFAULT_MESSAGE: "Bienvenue {user} sur {server} ! Grâce à toi, nous sommes {membercount} !",

			// Errors
			WELCOME_ERR_TIMEOUT: `${e.error} | Temps écoulé ! Veuillez retaper la commande !`,
			WELCOME_ERR_CARACT: `${e.error} | Votre message ne doit pas excéder les 1500 caractères !`,

			/* GOODBYE COMMAND */

			// Utils
			GOODBYE_DESCRIPTION: "Envoie un message d'au revoir dans un salon défini au préalable !",
			GOODBYE_USAGE: "goodbye",
			GOODBYE_EXAMPLES: "$goodbye",
			// Content
			GOODBYE_DISABLED: (prefix) => `${e.success} | Les messages d'au revoir viennent d'être désactivés ! Tapez \`${prefix}configuration\` pour voir la configuration actuelle !`,
			GOODBYE_TEST_SUCCESS: `${e.success} | Test effectué !`,
			GOODBYE_FORM_CHANNEL: (author) => `Bonjour ${author} ! Dans quel salon s'enverra le message d'au revoir ? (mentionnez un salon)`,
			GOODBYE_FORM_MESSAGE: (channel, msg) => `D'accord ! Les messages s'enverront donc dans ${channel}. Entrez le message d'au revoir ci-dessous : \n\nInfos:\`\`\`\nMention : {user}\nMembres : {membercount}\nServeur : {server}\`\`\`Par exemple, "Au revoir {user} ! C'est triste, sans toi nous ne sommes que {membercount} sur {server} !" donnera "Au revoir ${msg.author.username}#${msg.author.discriminator} ! C'est triste, sans toi nous ne sommes que ${msg.guild.memberCount} sur ${msg.guild.name} !".`,
			GOODBYE_FORM_IMAGE: `Ça marche ! Voulez-vous qu'une superbe image d'au revoir soit envoyée en même temps ? Répondez par "oui" ou par "non" !`,
			GOODBYE_FORM_SUCCESS: (channel, prefix) => `${e.success} | Messages d'au revoir activés dans <#${channel}> ! Tapez \`${prefix}goodbye test\` pour tester le message d'au revoir !`,
			GOODBYE_IMG_MSG: (name) => `Départ de ${name}`,
			GOODBYE_IMG_NUMBER: (memberCount) => `- ${memberCount}ème membre !`,
			GOODBYE_IMG_TITLE: "AU REVOIR",
			GOODBYE_DEFAULT_MESSAGE: "Au revoir {user} ! C'est triste, sans toi nous ne sommes que {membercount} sur {server} !",
			// Errors
			GOODBYE_ERR_TIMEOUT: `${e.error} | Temps écoulé ! Veuillez retaper la commande !`,
			GOODBYE_ERR_CARACT: `${e.error} | Votre message ne doit pas excéder les 1500 caractères !`,

			/* SLOWMODE COMMAND */

			// Utils
			SLOWMODE_DESCRIPTION: "Définissez un cooldown dans un salon",
			SLOWMODE_USAGE: "slowmode [#salon] (temps)",
			SLOWMODE_EXAMPLES: "$slowmode #général 10m\n$slowmode #général",
			// Errors
			SLOWMODE_PLEASE_WAIT: (time, channel) => `${e.error} | Le salon ${channel} est en slowmode ! Veuillez attendre ${time} pour pouvoir poster un nouveau message !`,
			// Content
			SLOWMODE_DISABLED: (channel) => `${e.success} | Le slowmode a été désactivé dans le salon <#${channel}> !`,
			SLOWMODE_ENABLED: (channel, time) => `${e.success} | Slowmode activé dans <#${channel}> avec un temps de ${time} !`,

			/* ADDCOMMAND COMMAND */

			// Utils
			ADDCOMMAND_DESCRIPTION: "Ajoutez une commande personnalisée au serveur !",
			ADDCOMMAND_USAGE: "addcommand [nom] [réponse]",
			ADDCOMMAND_EXAMPLES: "$addcommand salut coucou",
			// Errors
			ADDCOMMAND_ERR_NAME: `${e.error} | Veuillez entrer un nom et une réponse à la commande !`,
			ADDCOMMAND_ERR_EXISTS: (name) => `${e.error} | La commande ${name} existe déjà !`,
			ADDCOMMAND_ERR_ANSWER: `${e.error} | Veuillez entrer une réponse à cette commande !`,
			// Content
			ADDCOMMAND_SUCCESS: (cmd) => `${e.success} | La commande ${cmd} a bien été ajoutée au serveur !`,

			/* DELCOMMAND COMMAND */

			// Utils
			DELCOMMAND_DESCRIPTION: "Enlevez une commande personnalisée du serveur !",
			DELCOMMAND_USAGE: "delcommand [nom-de-la-commande]",
			DELCOMMAND_EXAMPLES: "$delcommand salut",
			// Errors
			DELCOMMAND_ERR_NAME: `${e.error} | Veuillez entrer le nom de la commande que vous souhaitez supprimer !`,
			DELCOMMAND_ERR_EXISTS: (cmd) => `${e.error} | La commande ${cmd} n'existe pas !`,
			// Content
			DELCOMMAND_SUCCESS: (cmd) => `${e.success} | La commande ${cmd} a bien été enlevée du serveur !`,

			/* RELOAD COMMAND */

			// Utils
			RELOAD_DESCRIPTION: "Reload une commande du bot !",
			RELOAD_USAGE: "reload [nom-de-la-commande]",
			RELOAD_EXAMPLES: "$reload ping",
			// Errors
			RELOAD_ERR_CMD: `${e.error} | Veuillez entrer le nom de la commande que vous souhaitez reload !`,
			RELOAD_ERR_NOT_FOUND: (cmd) => `${e.error} | Aucune commande trouvée pour \`${cmd}\` !`,
			// Content
			RELOAD_SUCCESS: (cmd) => `${e.success} | La commande ${cmd} a bien été reload !`,

			/* PROFILE COMMAND */

			// Utils
			PROFILE_DESCRIPTION: "Affiche le profil de l'utilisateur mentionné (ou de l'auteur du message)",
			PROFILE_USAGE: "profile (@user#0000)",
			PROFILE_EXAMPLES: "$profile\n$profile @Androz#2091",
			// Content
			NO_BIO: "Aucune biographie enregistrée",
			DISPLAY_REP: (points) => `**${points}** point(s)`,
			DISPLAY_MONEY: (money) => `**${money}** crédit(s)`,
			NO_PARTNER: "Célibataire",
			NO_BIRTHDATE: "Indéfini",
			// Headings
			PROFILE_TITLE: (username) => `Profil de ${username}`,
			PROFILE_HEADINGS:{
				MONEY:"💰 Argent local",
				GLOBAL_MONEY:"🌍 Argent global",
				BANK: "💳 Banque",
				REP: "🎩 Réputation",
				REGISTERED_AT: "📅 Enregistré",
				LEVEL:"📊 Niveau",
				EXP: "🔮 Expérience",
				BIRTHDATE: "🎂 Anniversaire",
				MARRIED: "❤️ Marié(e)",
				INVITER: "🤵 Inviteur",
				PSEUDO: "📝 Pseudo",
				ACHIEVEMENTS: "🔥 Réalisations",
				BIO: "🔖 Biographie"
			},
			PROFILE_ACHIEVEMENTS: (prefix) => `Obtenez plus d'informations avec \`${prefix}achievements\` !`,
			
			/* WORK COMMAND */

			// Utils
			WORK_DESCRIPTION: "Travaillez et gagnez de l'argent !",
			WORK_USAGE: "work",
			WORK_EXAMPLES: "$work",
			// Content
			WORK_CLAIMED_HEADINGS: [
				"Salaire",
				"Série"
			],
			WORK_CLAIMED_SALARY: (amount) => `${amount} crédits ajoutés à votre compte !`,
			WORK_AWARD: ":tada: Vous avez gagné 200 crédits bonus !",
			WORK_FOOTER: "Terminez le mot AWARD pour gagner 200 crédits bonus !",
			// Errors
			WORK_ERR_COOLDOWN: (delay) => `${e.error} | Vous devez attendre ${delay} avant de pouvoir de nouveau travailler !`,

			/* REP COMMAND */

			// Utils
			REP_DESCRIPTION: "Donnez un point de réputation à un membre !",
			REP_USAGE: "rep [@user#0000]",
			REP_EXAMPLES: "$rep @Androz#2091",
			// Errors
			REP_ERR_COOLDOWN: (delay) => `${e.error} | Vous devez attendre ${delay} avant de pouvoir de nouveau donner un point de réputation !`,
			REP_ERR_YOURSELF: `${e.error} | Vous ne pouvez pas vous donner vous-même un point de réputation !`,
			// Content
			REP_SUCCESS: (tag) => `${e.success} | Vous avez bien donné un point de réputation à **${tag}** !`,

			/* SETBIO COMMAND */

			// Utils
			SETBIO_DESCRIPTION: "Changez la description qui apparaitra sur votre profil !",
			SETBIO_USAGE: "setbio [description]",
			SETBIO_EXAMPLES: "$setbio Développeur depuis 5 ans en Swift",
			// Errors
			SETBIO_ERR_NO_BIO : `${e.error} | Veuillez entrer une description valide !`,
			SETBIO_ERR_CARACT: `${e.error} | Votre biographie ne doit pas excéder les 100 caractères !`,
			// Content
			SETBIO_SUCCESS: `${e.success} | Votre biographie vient d'être modifiée !`,

			/* MONEY COMMAND */

			// Utils
			MONEY_DESCRIPTION: "Affiche vos crédits",
			MONEY_USAGE: "money (@membre)",
			MONEY_EXAMPLES: "$money\n$money @user#0000",
			// Content
			CREDITS_TITLE: (username) => `Crédits de ${username}`,

			/* LEADERBOARD COMMAND */

			// Utils
			LEADERBOARD_DESCRIPTION: "Affiche les utilisateurs qui dispose du plus de crédits, de niveaux ou de points de réputation !",
			LEADERBOARD_USAGE: "leaderboard [rep/levels/credits]",
			LEADERBOARD_EXAMPLES: "$leaderboard credits\n$leaderboard levels",
			// Errors
			LEADERBOARD_ERR_TYPE: `${e.error} | Veuillez entrer un type de leaderboard ! (\`credits\`, \`level\` ou \`rep\`)`,
			LEADERBOARD_WARN_PHONE: `:confused: Nous avons detecté que vous utilisez un téléphone... Le leaderboard peut mal s'afficher sur les petits écrans. Essayez de passer en paysage (ou allez sur le dashboard) !`,

			/* ROB COMMAND */

			// Utils
			ROB_DESCRIPTION: "Essayez de piller un membre !",
			ROB_USAGE: "rob [@membre] [crédits]",
			ROB_EXAMPLES: "$rob @Androz#2091 100",
			// Errors
			ROB_ERR_YOURSELF: `${e.error} | Vous ne pouvez pas vous piller vous-même !`,
			ROB_ERR_AMOUNT: (member) => `${e.error} | Veuillez entrer un montant valide à piller à **${member.user.tag}** !`,
			ROB_ERR_AMOUNT_MEMBER: (member, money) => `${e.error} | **${member.user.username}** ne dispose pas de **${money}** crédits !`,
			ROB_ERR_NO_MONEY: (needed) => `${e.error} | Vous devez avoir plus de **${needed}** crédits pour tenter ce pillage !`,
			ROB_ERR_CLDWN: (member) => `:spy: **${member.user.username}** est sur ses gardes... Patientez un peu et réessayez !`,
			// Content
			ROB_WON: (robbed, member) => [
				`:tada: | Félicitations ! La police n'a pas été assez rapide pour t'empêcher de piller **${robbed}** crédits à **${member.user.username}** !`,
				`:confused: | **${member.user.username}** ? Mauvaise nouvelle. Tu viens de te faire piller **${robbed}** crédits !`,
			],
			ROB_LOSE: (lose, member, won) => [
				`:oncoming_police_car: | La police t'a pris sur le fait, impossible de nier, ton amende est de **${lose}** crédits. **${won}** crédits de compensation seront versés à **${member.user.username}**.`,
				`:police_car: | Mauvaise nouvelle... **${member.user.username}** a appelé la police à temps. Ton amende est de **${lose}** crédits et **${won}** crédits de compensation seront versés à **${member.user.username}**.`
			],

			/* DEPOSIT COMMAND */

			// Utils
			DEPOSIT_DESCRIPTION: "Déposez votre argent à la banque",
			DEPOSIT_USAGE: "deposit [montant]",
			DEPOSIT_EXAMPLES: "$deposit 400",
			// Errors
			DEPOSIT_ERR_AMOUNT: `${e.error} | Veuillez préciser un montant à déposer à la banque !`,
			DEPOSIT_ERR_NO_MONEY: `${e.error} | Vous n’avez pas de crédit !`,
			DEPOSIT_ERR_AMOUNT_TOO_HIGH: (money) => `${e.error} | Vous ne disposez pas de \`${money}\` crédits !`,
			// Content
			DEPOSIT_SUCCESS: (money) => `${e.success} | **${money}** crédits déposés à la banque !`,

			/* WITHDRAW COMMAND */

			// Utils
			WITHDRAW_DESCRIPTION: "Retirez de l'argent !",
			WITHDRAW_USAGE: "withdraw [montant]",
			WITHDRAW_EXAMPLES: "$withdraw 400",
			// Errors
			WITHDRAW_ERR_AMOUNT: `${e.error} | Veuillez préciser un montant à retirer !`,
			WITHDRAW_ERR_NO_MONEY: `${e.error} | Vous n’avez pas de crédit à la banque !`,
			WITHDRAW_ERR_AMOUNT_TOO_HIGH: (money) => `${e.error} | Vous ne disposez pas de \`${money}\` crédits à la banque !`,
			// Content
			WITHDRAW_SUCCESS: (money) => `${e.success} | **${money}** crédits retirés !`,

			/* PAY COMMAND */

			// Utils
			PAY_DESCRIPTION: "Payez un membre avec des crédits !",
			PAY_USAGE: "pay [@user#0000] [montant]",
			PAY_EXAMPLES: "$pay @Androz#2091 400",
			// Errors
			PAY_ERR_YOURSELF: `${e.error} | Vous ne pouvez pas vous payer vous-même !`,
			PAY_ERR_INVALID_AMOUNT: (username) => `${e.error} | Vous devez entrer un montant à verser à **${username}** !`,
			PAY_ERR_AMOUNT_TOO_HIGH: (amount, username) => `${e.error} | Vous ne disposez pas d'assez de crédits pour verser ${amount} crédits à ${username} !`,
			// Content
			PAY_SUCCESS: (amount, username) => `${e.success} | Vous avez versé ${amount} crédits à ${username} !`,

			/* BIRTHDATE COMMAND */

			// Utils
			BIRTHDATE_DESCRIPTION: "Définissez la date de votre anniversaire (qui apparaitre sur votre profil)",
			BIRTHDATE_USAGE: "birthdate (date)",
			BIRTHDATE_EXAMPLES: "$birthdate 01/12/2000",
			// Errors
			BIRTHDATE_ERR_DATE: `${e.error} | Veuillez entrer une date valide ! Par exemple 01/12/2000`,
			BIRTHDATE_ERR_DATE_FORMAT: `${e.error} | Vous avez entrer une date invalide. Rappel : le format de la date doit être : Jour/Mois/Année. Par exemple, 01/12/2000 pour le premier décembre 2000.`,
			BIRTHDATE_ERR_INVALID_DATE_FORMAT: `${e.error} |  Vous avez entrer une date invalide (ou la date indiquée n'existe pas). Rappel : le format de la date doit être : Jour/Mois/Année. Par exemple, 01/12/2000 pour le premier décembre 2000.`,
			BIRTHDATE_ERR_TOO_HIGH: `${e.error} | Vous ne pouvez pas ne pas encore être né !`,
			BIRTHDATE_ERR_TOO_LOW: `${e.error} | Plus de 80 ans ? :eyes:`,
			// Content
			BIRTHDATE_SUCCESS: (date) => `${e.success} | Votre date d'anniversaire a été définie sur le ${date} !`,
			
			
			/* WEDDING COMMAND */

			// Utils
			WEDDING_DESCRIPTION: "Mariez-vous avec la personne de votre choix !",
			WEDDING_USAGE: "wedding [@user#0000]",
			WEDDING_EXAMPLES: "$wedding @Androz#2091",
			// Errors
			WEDDING_ERR_AUTHOR_MARRIED: (prefix) => `${e.error} | Vous êtes déjà marié(e) ! Utilisez d'abord \`${prefix}divorce\` pour divorcer`,
			WEDDING_ERR_MEMBER_MARRIED: (username) => `${e.error} | La place est prise compagnon ! **${username}** est déjà marié(e) !`,
			WEDDING_ERR_AUTHOR_PENDING_REQUESTER: (username) => `${e.error} | Vous avez déjà une demande en cours auprès de **${username}** !`,
			WEDDING_ERR_AUTHOR_PENDING_RECEIVER: (username) => `${e.error} | **${username}** vous a déjà envoyé une demande ! Veuillez la refuser ou l'accepter (ou attendre qu'elle expire dans quelques minutes).`,
			WEDDING_ERR_MEMBER_PENDING_REQUESTER: (username1, username2) => `${e.error} | **${username2}** a déjà une demande envoyé une demande auprès de **${username1}** !`,
			WEDDING_ERR_MEMBER_PENDING_RECEIVER: (username1, username2) => `${e.error} | **${username1}** a déjà envoyé une demande auprès de **${username2}** ! Attendez que **${username2}** accepte ou refuse la demande de **${username1}** ou que celle-ci expire puis réessayez !`,
			WEDDING_ERR_TIMEOUT: (member) => `${e.error} | ${member} n'a pas répondu... Attendez qu'il/elle soit connecté(e) puis réessayez !`,
			WEDDING_ERR_DENIED: (author, member) => `${e.error} | ${author}, j'ai une mauvaise nouvelle... ${member} a refusé votre demande en mariage.`,
			WEDDING_ERR_YOURSELF: `${e.error} | Vous ne pouvez pas vous épouser vous-même !`,
			// Content
			WEDDING_REQUEST: (member, author) => `${e.warn} | ${member}, acceptez-vous d'épouser ${author} ? Répondez par "oui" ou "non" !`,
			WEDDING_SUCCESS: (author, member) => `${e.success} | ${author}, j'ai une bonne nouvelle... ${member} a accepté votre demande en mariage !`,

			/* DIVORCE COMMAND */

			// Utils
			DIVORCE_DESCRIPTION: "Divorcez avec la personne avec qui vous êtes actuellement marié(e) !",
			DIVORCE_USAGE: "divorce",
			DIVORCE_EXAMPLES: "divorce",
			// Errors
			DIVORCE_ERR_NOT_WEDDED: `${e.error} | Vous n'êtes actuellement pas marié(e) !`,
			// Content
			DIVORCE_SUCCESS: (username) => `${e.success} | Vous venez de divorcer avec **${username}** !`,

			/* SLOTS COMMAND */

			// Utils
			SLOTS_DESCRIPTION: "Un équivalent au Casino !",
			SLOTS_USAGE: "slots [montant]",
			SLOTS_EXAMPLES: "$slots\n$slots 10",
			// Content
			SLOTS_DEFEAT: (amount, username) => `**${username}** a utilisé ${amount} crédit(s) et a tout perdu.`,
			SLOTS_VICTORY: (text, amount, won, username) => `${text}**${username}** a utilisé ${amount} crédit(s) et a gagné ${won} crédit(s) !`,
			// Errors
			SLOTS_ERR_TOO_HIGH: (money) => `${e.error} | Vous ne disposez pas de ${money} crédit(s).`,

			/* STATS COMMAND */

			// Utils
			STATS_DESCRIPTION: "Affiche les stats du bot !",
			STATS_USAGE: "stats",
			STATS_EXAMPLES: "$stats",
			// Content
			STATS: (serv, users) => `\`Serveurs : ${serv}\`\n\`Utilisateurs : ${users}\``,
			STATS_DESC: `${c.botname} est un bot open source développé par ${c.owner.name} !`,
			STATS_ONLINE: (time) => `Depuis ${time}`,
			STATS_VC: (nb) => `Musique en cours sur \`${nb}\` serveurs`,
			STATS_CREDITS: "Merci à `https://icones8.fr/icons/`, tous les emojis (ou presque) viennent de ce site !\n__**Donateurs**__:\n- `xixi52#0001` **GOD**\n- `Marty#3994` **GOD**\n- `\"</Synaro/>\"#2019` **GOD**\n- `🍮_Lucas_🍮#6171` **SUPPORTER**",
			STATS_LINKS: (url, id) => `[Donate](${c.others.donate}) ● [Invite](https://discordapp.com/oauth2/authorize?client_id=${id}&scope=bot&permissions=2146958847) ● [Serveur](${url}) ● [Github](${c.others.github})`,
			// Headings
			STATS_HEADINGS:[
				`Stats`,
				`${e.stats} • __Statistiques__`,
				`${e.version} • __Version__`,
				`${e.ram} • __RAM__`,
				`${e.status.online} • __En ligne__`,
				`${e.voice} • __Musique__`,
				":heart: • __Remerciements & crédits__",
				`${e.link} • __Liens__`,
			],

			/* FIRE COMMAND */

			// Utils
			FIRE_DESCRIPTION: "Génère une image de type \"fire\" grâce à l'API Améthyste",
			FIRE_USAGE: "fire (@membre)",
			FIRE_EXAMPLES: "$fire\n$fire @Androz#2091",

			/* JAIL COMMAND */

			// Utils
			JAIL_DESCRIPTION: "Génère une image de type \"jail\" grâce à l'API Améthyste",
			JAIL_USAGE: "jail (@membre)",
			JAIL_EXAMPLES: "$jail\n$jail @Androz#2091",

			/* MISSION COMMAND */

			// Utils
			MISSION_DESCRIPTION: "Génère une image de type \"mission\" grâce à l'API Améthyste",
			MISSION_USAGE: "mission (@membre)",
			MISSION_EXAMPLES: "$mission\n$mission @Androz#2091",

			/* RIP COMMAND */

			// Utils
			RIP_DESCRIPTION: "Génère une image de type \"rip\" grâce à l'API Améthyste",
			RIP_USAGE: "rip (@membre)",
			RIP_EXAMPLES: "$rip\n$rip @Androz#2091",

			/* SCARY COMMAND */

			// Utils
			SCARY_DESCRIPTION: "Génère une image de type \"scary\" grâce à l'API Améthyste",
			SCARY_USAGE: "scary (@membre)",
			SCARY_EXAMPLES: "$scary\n$scary @Androz#2091",

			/* TOBECONTINUED COMMAND */

			// Utils
			TOBECONTINUED_DESCRIPTION: "Génère une image de type \"tobecontinued\" grâce à l'API Améthyste",
			TOBECONTINUED_USAGE: "tobecontinued (@membre)",
			TOBECONTINUED_EXAMPLES: "$tobecontinued\n$tobecontinued @Androz#2091",

			/* TRIGGERED COMMAND */

			// Utils
			TRIGGERED_DESCRIPTION: "Génère une image de type \"triggered\" grâce à l'API Améthyste",
			TRIGGERED_USAGE: "triggered (@membre)",
			TRIGGERED_EXAMPLES: "$triggered\n$triggered @Androz#2091",

			/* WANTED COMMAND */

			// Utils
			WANTED_DESCRIPTION: "Génère une image de type \"wanted\" grâce à l'API Améthyste",
			WANTED_USAGE: "wanted (@membre)",
			WANTED_EXAMPLES: "$wanted\n$wanted @Androz#2091",

			/* WASTED COMMAND */

			// Utils
			WASTED_DESCRIPTION: "Génère une image de type \"wasted\" grâce à l'API Améthyste",
			WASTED_USAGE: "wasted (@membre)",
			WASTED_EXAMPLES: "$wasted\n$wasted @Androz#2091",

			/* CAPTCHA COMMAND */

			// Utils
			CAPTCHA_DESCRIPTION: "Génère une image de type \"captcha\" grâce à l'API Nekobot",
			CAPTCHA_USAGE: "captcha (@membre)",
			CAPTCHA_EXAMPLES: "$captcha\n$captcha @Androz#2091",

			/* PHCOMMENT COMMAND */

			// Utils
			PHCOMMENT_DESCRIPTION: "Génère une image de type \"phcomment\" grâce à l'API Nekobot",
			PHCOMMENT_USAGE: "phcomment (@membre) (texte)",
			PHCOMMENT_EXAMPLES: "$phcomment\n$phcomment @Androz#2091",
			// Errors
			PHCOMMENT_ERR_TEXT: `${e.error} | Vous devez entrer le texte du commentaire !`,

			/* AVATAR COMMAND */

			// Utils
			AVATAR_DESCRIPTION: "Affiche l'avatar du membre mentionné",
			AVATAR_USAGE: "avatar (@membre)",
			AVATAR_EXAMPLES: "$avatar\n$avatar @Androz#2091",

			/* LOVE COMMAND */

			// Utils
			LOVE_DESCRIPTION: "Génère une image de type \"love\" grâce à l'API Nekobot",
			LOVE_USAGE: "love [@user1] (@user2)",
			LOVE_EXAMPLES: "$love @Androz#2091\n$love @Androz#2091 @Clyde#0000",

			/* CLYDE COMMAND */

			// Utils
			CLYDE_DESCRIPTION: "Génère une image de type \"clyde\" grâce à l'API Nekobot",
			CLYDE_USAGE: "clyde [texte]",
			CLYDE_EXAMPLES: "$clyde Discord va fermer le 11 novembre 2019. Au revoir.",
			// Errors
			CLYDE_ERR_TEXT: `${e.error} | Veuillez entrer un texte !`,

			/* PLAY COMMAND */

			// Utils
			PLAY_DESCRIPTION: "Joue de la musique !",
			PLAY_USAGE: "play [titre]",
			PLAY_EXAMPLES: "$play Despacito",
			// Errors
			PLAY_ERR_CANT_JOIN: `${e.error} | Je ne peux pas rentrer dans le salon vocal !`,
			PLAY_ERR_NO_SONG: `${e.error} | Plus aucune musique dans la queue !`,
			// Content
			PLAY_ADDED_TO_QUEUE: (title) => `${e.add} | ${title} a été ajouté à la queue !`,
			PLAY_SEARCH: "Veuillez indiquer une valeur pour sélectionner l'un des résultats de recherche compris entre 1 et 10.",
			PLAY_ERR_NO_NAME: `${e.error} | Veuillez entrer un nom de vidéo à chercher !`,
			PLAY_ERR_VOICE_CHANNEL: `${e.error} | Vous devez être connecté dans un salon vocal !`,
			PLAY_ERR_PERMS: `${e.error} | Une erreur s'est produite. Soit je ne peux pas me connecter dans votre salon, soit je ne peux pas parler dans votre salon. Vérifiez mes permissions et réessayez.`,
			PLAY_ERR_TIMEOUT: `${e.error} | Temps écoulé ! Veuillez retaper la commande !`,
			PLAY_ERR_NOT_FOUND: `${e.error} | Aucun résultat sur Youtube !`,
			PLAY_ERR_NOT_PLAYING: `${e.error} | Aucune musique en cours !`,
			// Headings
			PLAY_PLAYING_TITLE: "Lecture en cours",
			PLAY_HEADINGS: [
				`${e.title} Titre`,
				`${e.singer} Chanteur`,
				`${e.time} Durée`,
				`${e.search} Recherche`,
				`${e.calendar} Création`,
				`${e.desc} Description`,
				`${e.time} Durée`
			],
			PLAY_SUCCESS: (song) => `▶️ ${song.name} en cours de lecture...`,
			PLAY_ADDED_TO_QUEUE: (song) => `🎵 ${song.name} ajouté à la queue!`,

			/* STOP COMMAND */

			// Utils
			STOP_DESCRIPTION: "Arrête la musique en cours !",
			STOP_USAGE: "stop",
			STOP_EXAMPLES: "$stop",
			// Content
			STOP_TITLE: `Arrêter la musique`,
			STOP_CONTENT: (voteCount, requiredCount) => `Arrêter la musique\nVote : ${voteCount}/${requiredCount}\nRéagissez avec 👍 pour arrêter la musique !`,
			STOP_CONTENT_COMPLETE: "Musique correctement arrêtée !",

			/* SKIP COMMAND */

			// Utils
			SKIP_DESCRIPTION: "Passe à la chanson suivante !",
			SKIP_USAGE: "skip",
			SKIP_EXAMPLES: "$skip",
			// Content
			SKIP_TITLE: "Passer à la chanson suivante",
			SKIP_CONTENT: (title, voteCount, requiredCount) => `Chanson suivante : ${title}\nVote : ${voteCount}/${requiredCount}\nRéagissez avec 👍 pour passer à la chanson suivante !`,
			SKIP_CONTENT_COMPLETE: (title) => `Chanson passée ! Maintenant : ${title}`,
			// Errors
			SKIP_ERR_NO_SONG: `${e.error} | Aucune chanson suivante !`,

			/* NP COMMAND */

			// Utils
			NP_DESCRIPTION: "Affiche des informations sur la chanson actuelle !",
			NP_USAGE: "np",
			NP_EXAMPLES: "$np",
			// Errors
			NP_ERR_NO_DESC: "**Aucune description**",

			/* QUEUE COMMAND */

			// Utils
			QUEUE_DESCRIPTION: "Affiche la queue",
			QUEUE_USAGE: "queue",
			QUEUE_EXAMPLES: "$queue",
			// Content
			QUEUE_TITLE: `${e.playlist} Playlist`,

			/* PAUSE COMMAND */
			
			// Utils
			PAUSE_DESCPRIPTION: "Met la chanson actuelle en pause",
			PAUSE_USAGE: "pause",
			PAUSE_EXAMPLES: "$pause",
			// Content
			PAUSE_SUCCESS: "⏸️ Musique en pause.",

			/* RESUME COMMAND */
			
			// Utils
			RESUME_DESCPRIPTION: "Reprend la musique actuelle",
			RESUME_USAGE: "resume",
			RESUME_EXAMPLES: "$resume",
			// Content
			RESUME_SUCCESS: "▶️ Musique de nouveau en cours de lecture.",

			/* LYRICS COMMAND */

			// Utils
			LYRICS_DESCRIPTION: "Affiche les paroles d'une chanson",
			LYRICS_USAGE: "lyrics [nom-de-la-chanson]",
			LYRICS_EXAMPLES: "$lyrics Skyfall",
			// Content
			LYRICS_TITLE: (songName) => `🎤 Paroles de ${songName}`,
			LYRICS_NEXT: (link) => `\n**Et plus...** (${link})[Cliquez ici pour la suite]`,
			// Errors
			LYRICS_ERR_SONG_NAME: `${e.error} | Veuillez entrer un nom de chanson !`,
			LYRICS_ERR_NO_LYRICS: (songName) => `${e.error} | Aucune parole trouvée pour \`${songName}\` !`,

			/* TRANSLATE COMMAND  */

			// Utils
			TRANSLATE_DESCRIPTION: "Je traduis votre texte !",
			TRANSLATE_USAGE: "translate [langue] [message]",
			TRANSLATE_EXAMPLES: "$translate en Comment allez-vous ?",
			// Content
			TRANSLATE_LANGS: `${e.success} | La liste des langues vient de vous être envoyé par messages privés !`,
			// Errors
			TRANSLATE_ERR_LANG: (prefix) => `${e.error} | Veuillez entrer une langue ! Pour afficher la liste des langues, tapez \`${prefix}translate langs-list\` !`,
			TRANSLATE_ERR_NOT_FOUND: (prefix, lang) => `${e.error} | La langue \`${lang}\` n'existe pas ! Pour afficher la liste des langues, tapez \`${prefix}translate langs-list\` !`,
			TRANSLATE_ERR_MSG: `${e.error} | Veuillez entrer un texte à traduire !`,

			/* BAN COMMAND */

			// Utils
			BAN_DESCRIPTION: "Banni le membre mentionné !",
			BAN_USAGE: "ban [@user] (raison)",
			BAN_EXAMPLES: "$ban @Androz#2091 Spam",
			// Errors
			BAN_ERR_BANNED: (user) => `${e.error} | **${user.username}** est déjà banni !`,
			BAN_ERR_PERMISSIONS: `${e.error} | Une erreur est survenue... vérifiez que j'ai bien les permissions de bannir ce membre et réessayez !`,
			BAN_SUCCESS_DM: (user, msg, reason) => `${e.error} | Bonjour <@${user.id}>,\nVous venez d'être banni de **${msg.guild.name}** par **${msg.author.tag}** pour **${reason}** !`,
			BAN_SUCCESS_CHANNEL: (user, msg, reason) => `${e.success} | **${user.username}** vient d'être banni de **${msg.guild.name}** par **${msg.author.tag}** pour **${reason}** !`,
			BAN_TITLE_LOGS: (caseNumber) => `Ban | Cas #${caseNumber}`,

			/* KICK COMMAND */

			// Utils
			KICK_DESCRIPTION: "Expulse le membre mentionné !",
			KICK_USAGE: "kick [@user] (raison)",
			KICK_EXAMPLES: "$kick @Androz#2091 Spam",
			// Errors
			KICK_ERR_PERMISSIONS: `${e.error} | Une erreur est survenue... vérifiez que j'ai bien les permissions d'expulser ce membre et réessayez !`,
			KICK_SUCCESS_DM: (user, msg, reason) => `${e.error} | Bonjour <@${user.id}>,\nVous venez d'être expulsé de **${msg.guild.name}** par **${msg.author.tag}** pour **${reason}** !`,
			KICK_SUCCESS_CHANNEL: (user, msg, reason) => `${e.success} | **${user.username}** vient d'être expulsé de **${msg.guild.name}** par **${msg.author.tag}** pour **${reason}** !`,
			KICK_TITLE_LOGS: (caseNumber) => `Kick | Cas #${caseNumber}`,

			/* CHECKINVITES COMMAND */

			// Utils
			CHECKINVITES_DESCRIPTION: "Vérifie si les membres n'ont pas une publicité pour leur serveur Discord dans leur présence !",
			CHECKINVITES_USAGE: "checkinvites",
			CHECKINVITES_EXAMPLES: "$checkinvites",
			// Content
			CHECKINVITES_NOT_FOUND: `${e.success} | Aucun membre ne fait de la publicité dans son jeu !`,

			/* CLEAR COMMAND */

			// Utils
			CLEAR_DESCRIPTION: "Supprime des messages très rapidement !",
			CLEAR_USAGE: "clear [nombre-de-messages] (@membre)",
			CLEAR_EXAMPLES: "$clear 10\n$clear 10 @Androz#2091",
			// Errors
			CLEAR_ERR_AMOUNT: `${e.error} | Vous devez préciser un nombre de messages à supprimer !`,
			CLEAR_ERR_TIMEOUT: `${e.error} | Temps écoulé ! Veuillez retaper la commande !`,
			// Content
			CLEAR_CLONE: `${e.warn} | Tous les messages du salons seront supprimés ! Pour confirmer tapez \`-confirm\``,
			CLEAR_DELETED: `${e.success} | Salon réinitalisé !`,
			CLEAR_SUCCESS: (amount) => `${e.success} | **${amount}** messages supprimés !`,
			CLEAR_SUCCESS_USER: (amount, user) => `${e.success} | **${amount}** messages de **${user.tag}** supprimés !`,

			/* MUTE COMMAND */

			// Utils
			MUTE_DESCRIPTION: "Empêche le membre d'envoyer des messages et de se connecter en vocal pendant un certain temps !",
			MUTE_USAGE: "mute [@membre] [temps]",
			MUTE_EXAMPLES: "$mute @Androz#2091 Spam",
			// Content
			MUTE_SUCCESS: (member, time, reason) => `${e.success} | **${member.user.tag}** est maintenant mute pendant **${time}** pour **${reason}** !`,
			MUTE_SUCCESS_DM: (message, time, reason) => `${e.error} | Vous êtes mute sur **${message.guild.name}** pendant **${time}** pour **${reason}** !`,
			MUTE_TITLE_LOGS: (caseNumber) => `Mute | Cas #${caseNumber}`,

			/* UNMUTE COMMAND */

			// Utils
			UNMUTE_DESCRIPTION: "Unmute le membre mentionné !",
			UNMUTE_USAGE: "unmute [@membre]",
			UNMUTE_EXAMPLES: "$unmute @Androz#2091",
			// Errors
			UNMUTE_ERR_NOT_MUTED: `${e.error} | Ce membre n'est pas mute sur ce serveur !`,
			// Content
			UNMUTE_SUCCESS: (userID, caseNumber) => `<@${userID}> vient d'être unmute ! (cas du mute : #${caseNumber})`,
			UNMUTE_SUCCESS_USER: (user) => `${e.success} | ${user.tag} vient d'être unmute !`,

			/* WARN COMMAND */

			// Utils
			WARN_DESCRIPTION: "Averti un membre en messages privés",
			WARN_USAGE: "warn [@membre] [raison]",
			WARN_EXAMPLES: "$warn @Androz#2091 Spam",
			// Errors
			WARN_ERR_REASON: `${e.error} | Veuillez entrer une raison !`,
			// Content
			WARN_AUTOBAN: (member, number) => `${e.success} | **${member.user.tag}** a été banni automatiquement car il avait plus de **${number}** warns !`,
			WARN_AUTOKICK: (member, number) => `${e.success} | **${member.user.tag}** a été expulsé automatiquement car il avait plus de **${number}** warns !`,
			WARN_SUCCESS_DM: (msg, reason) => `${e.warn} | Vous venez d'être averti sur **${msg.guild.name}** par **${msg.author.tag}** pour **${reason}** !`,
			WARN_SUCCESS: (member, reason) => `${e.success} | **${member.user.tag}** a été averti par messages privés pour **${reason}** !`,
			WARN_TITLE_LOGS: (caseNumber) => `Avertissement | Cas #${caseNumber}`,

			/* CLEARSANCTIONS COMMAND */

			// Utils
			CLEARSANCTIONS_DESCRIPTION: "Supprime toutes les sanctions d'un membre !",
			CLEARSANCTIONS_USAGE: "clear-sanctions [@membre]",
			CLEARSANCTIONS_EXAMPLES: "$clear-sanctions @Androz#2091",
			// Content
			CLEARSANCTIONS_SUCCESS: `${e.success} | Sanctions supprimées !`,

			/* SETWARNS COMMAND */

			// Utils
			SETWARNS_DESCRIPTION: "Définissez les sanctions qu'obtiendront les membres au bout d'un certain nombre de warns !",
			SETWARNS_USAGE: "setwarns [kick/ban] [nombre/reset]",
			SETWARNS_EXAMPLES: "$setwarns kick 10\n$setwarns ban 10\n$setwarns ban reset",
			// Errors
			SETWARNS_ERR_SANCTION: `${e.error} | Veuillez indiquer un type de sanction valide ! (\`kick\`, \`ban\`)`,
			// Content
			SETWARNS_SUCCESS_KICK: (prefix, number) => `${e.success} | Configuration enregistrée ! Lorsqu'un membre aura atteint les ${number} warns, il sera expulsé. Tapez \`${prefix}configuration\` pour voir votre nouvelle configuration !`,
			SETWARNS_SUCCESS_BAN: (prefix, number) => `${e.success} | Configuration enregistrée ! Lorsqu'un membre aura atteint les ${number} warns, il sera banni. Tapez \`${prefix}configuration\` pour voir votre nouvelle configuration !`,
			SETWARNS_SUCCESS_RESET_KICK: (prefix) => `${e.success} | Configuration enregistrée ! La sanction kick n'est maintenant plus automatique ! Tapez \`${prefix}configuration\` pour voir votre nouvelle configuration !`,
			SETWARNS_SUCCESS_RESET_BAN: (prefix) => `${e.success} | Configuration enregistrée ! La sanction ban n'est maintenant plus automatique ! Tapez \`${prefix}configuration\` pour voir votre nouvelle configuration !`,

			/* POLL COMMAND */

			// Utils
			POLL_DESCRIPTION: "Lance un sondage dans le salon actuel !",
			POLL_USAGE: "poll [question]",
			POLL_EXAMPLES: "$poll Voulez-vous un nouveau salon ?",
			// Errors
			POLL_ERR_QUESTION: `${e.error} | Vous devez entrer une question !`,
			POLL_ERR_TIMEOUT: `${e.error} | Temps écoulé ! Veuillez retaper la commande !`,
			// Content
			POLL_FORM_MENTION: "Souhaitez-vous ajouter une mention à votre message ? Répondez par \"oui\" ou \"non\" !",
			POLL_FORM_MENTION_HE: "Tapez une des réponses suivantes : `every` (pour une mention @ everyone) ou `here` (pour une mention @ here) !",
			POLL_REACT: `Réagissez avec ${e.success} ou ${e.error} !`,
			POLL_HEADING: "📊 Sondage :",

			/* ANNOUNCEMENT COMMAND */

			// Utils
			ANNOUNCEMENT_DESCRIPTION: "Envoie une annonce dans le salon actuel !",
			ANNOUNCEMENT_USAGE: "announcement [annonce]",
			ANNOUNCEMENT_EXAMPLES: "$announcement Un nouveau salon #spam !",
			// Errors
			ANNOUNCEMENT_ERR_TEXT: `${e.error} | Vous devez entrer le texte de l'annonce !`,
			ANNOUNCEMENT_ERR_TEXT_LENGTH: `${e.error} | Veuillez entrer un texte inférieur à 1030 caractères !`,
			ANNOUNCEMENT_ERR_TIMEOUT: `${e.error} | Temps écoulé ! Veuillez retaper la commande !`,
			// Content
			ANNOUNCEMENT_FORM_MENTION: "Souhaitez-vous ajouter une mention à votre annonce ? Répondez par \"oui\" ou \"non\" !",
			ANNOUNCEMENT_FORM_MENTION_HE: "Tapez une des réponses suivantes : `every` (pour une mention @ everyone) ou `here` (pour une mention @ here) !",
			ANNOUNCEMENT_HEADING: "📢 Annonce :",

			/* GIVEAWAY COMMAND */

			// Utils
			GIVEAWAY_DESCRIPTION: "Gérez vos giveaways simplement !",
			GIVEAWAY_USAGE: "giveaway [create/reroll/delete/end] (temps) (nombre de gagnants) (prix)",
			GIVEAWAY_EXAMPLES: "$giveaway create 10m 2 5€ PayPal !\n$giveaway reroll 597812898022031374",
			// Errors
			GIVEAWAY_ERR_STATUS: `${e.error} | Vous devez préciser \`create\`, \`reroll\` ou \`delete\` !`,
			GIVEAWAY_ERR_CREATE: (prefix) => `${e.error} | Vous devez entrer les informations sous cette forme : \n\n\`${prefix}giveaway create [temps] [nombre de gagnants] [prix]\``,
			GIVEAWAY_ERR_REROLL: `${e.error} | Vous devez entrer l'ID du message du giveaway a re-tirer !`,
			GIVEAWAY_ERR_DELETE: `${e.error} | Vous devez entrer l'ID du message du giveaway a supprimer !`,
			GIVEAWAY_ERR_END: `${e.error} | Vous devez entrer l'ID du message du giveaway a terminer !`,
			GIVEAWAY_ERR_REROLL_MSG_ENDED: (messageID) => `${e.error} | Aucun giveaway **terminé** trouvé avec comme ID de message \`${messageID}\``,
			GIVEAWAY_ERR_MESSAGE_NOT_FOUND: (messageID) => `${e.error} | Aucun giveaway trouvé avec comme ID de message \`${messageID}\``,
			GIVEAWAY_ERR_15_DAYS: `${e.error} | La longueur maximale d'un giveaway est de 15 jours.`,
			GIVEAWAY_ERR_MAX: `${e.error} | Un maximum de 4 Giveaways peuvent être lancé sur un même serveur.`,
			// Content
			GIVEAWAY_CREATED: `${e.success} | Giveaway lancé !`,
			GIVEAWAY_REROLLED: `${e.success} | Nouveau tirage effectué !`,
			GIVEAWAY_DELETED: `${e.success} | Giveaway supprimé !`,
			GIVEAWAY_ENDED: `${e.success} | Giveaway en cours d'arrêt (- de 15 secondes) !`,
			// Messages
			GIVEAWAY_CREATE_MESSAGES: {
				giveaway: "🎉🎉 **GIVEAWAY** 🎉🎉",
				giveawayEnded: "🎉🎉 **GIVEAWAY TERMINÉ** 🎉🎉",
				timeRemaining: "Temps restant: **{duration}** !",
				inviteToParticipate: "Réagissez avec 🎉 pour participer !",
				winMessage: "Félicitations, {winners} ! Vous avez gagné **{prize}** !",
				embedFooter: "Giveaways",
				noWinner: "Giveaway annulé, pas de participation valide.",
				winners: "gagnant(s)",
				endedAt: "Fin le",
				units: { seconds: "secondes", minutes: "minutes", hours: "heures", days: "jours" }		
			},
			GIVEAWAY_REROLL_MESSAGES: {
				congrat: ":tada: Nouveau gagnant(s) : {winners} ! Félicitations !",
				error: "Aucune participation valide, aucun gagnant ne peut être choisi !"
			},

			/* SANCTIONS COMMAND */
			
			// Utils
			SANCTIONS_DESCRIPTION: "Affiche la liste des infractions commises par un membre !",
			SANCTIONS_USAGE: "sanctions [@membre]",
			SANCTIONS_EXAMPLES: "$sanctions @Androz#2091",
			// Errors
			SANCTIONS_ERR_NOTHING: "Ce membre n'a commis aucune infraction.",
			PRINT_SANCTION: (sData) => `Modérateur: <@${sData.moderator}>\nRaison: ${sData.reason}`,

			/* DELETEMOD COMMAND */

			// Utils
			DELETEMOD_DESCRIPTION: "Active ou désactive l'auto suppression des commandes de modération !",
			DELETEMOD_USAGE: "deletemod [on/off]",
			DELETEMOD_EXAMPLES: "$deletemod on",
			// Errors
			DELETEMOD_ERR_STATUS: `${e.error} | Vous devez préciser \`on\` ou \`off\` !`,
			// Content
			DELETEMOD_SUCCESS_ENABLED: `${e.success} | Les commandes de modération seront automatiquement supprimées !`,
			DELETEMOD_SUCCESS_DISABLED: `${e.success} | Les commandes de modération ne seront plus automatiquement supprimées !`,

			/* MODOGS EMBEDS */
			MODLOGS_TYPES: {
				BAN: `Ban | Cas #{case}`,
				KICK: `Kick | Cas #{case}`,
				UNBAN: `Unban | Cas #{case}`,
				WARN: `Avertissement | Cas #{case}`,
				MUTE: `Mute | Cas #{case}`
			},
			MODLOGS_HEADINGS: {
				USER: "Utilisateur",
				MODERATOR: "Modérateur",
				REASON: "Raison",
				TIME: "Temps",
				EXPIRATION: "Expiration"
			},

			/* SETMODLOGS COMMAND */

			// Utils
			SETMODLOGS_DESCRIPTION: "Définissez le salon des logs de modération !",
			SETMODLOGS_USAGE: "setmodlogs (#salon)",
			SETMODLOGS_EXAMPLES: "$setmodlogs #modlogs\n$setmodlogs",
			// Content
			SETMODLOGS_SUCCESS: (id) => `${e.success} | Salon des logs de modération défini sur <#${id}> !`,

			/* SOMEONE COMMAND */

			// Utils
			SOMEONE_DESCRIPTION: "Tire un membre aléatoire sur le serveur !",
			SOMEONE_USAGE: "someone",
			SOMEONE_EXAMPLES: "$someone\n@someone",
			// Headings
			SOMEONE_HEADINGS: [
				"Pseudo",
				"Discriminant",
				"ID"
			],

			/* SETSUGGESTS COMMAND */

			// Utils
			SETSUGGESTS_DESCRIPTION: "Définissez le salon des suggestions !",
			SETSUGGESTS_USAGE: "setsuggests (#salon)",
			SETSUGGESTS_EXAMPLES: "$setsuggests #général\n$setsuggests",
			// Content
			SETSUGGESTS_SUCCESS: (channel) => `${e.success} | Le salon des suggestions est maintenant ${channel} !`,

			/* SETREPORTS COMMAND */
			SETREPORTS_DESCRIPTION: "Définissez un salon de signalements!",
			SETREPORTS_USAGE: "setreports (#salon)",
			SETREPORTS_EXAMPLES: "$setreports #general\n$setreports",
			// Content
			SETREPORTS_SUCCESS: (channel) => `${e.success} | Le salon des signalements est maintenant ${channel} !`,
			
			/* ADDEMOTE COMMAND */

			// Utils
			ADDEMOTE_DESCRIPTION: "Ajoute un émoji au serveur !",
			ADDEMOTE_USAGE: "addemote [URL] [nom]",
			ADDEMOTE_EXAMPLES: "$addemote https://une-image-de.com/papillon.png papillon",
			// Errors
			ADDEMOTE_ERR_NAME: `${e.error} | Veuillez indiquer le nom de l'émoji !`,
			ADDEMOTE_ERR_URL: `${e.error} | Veuillez indiquer l'url de l'émoji !`,
			ADDEMOTE_ERROR: `${e.error} | L'URL vers l'image est invalide ou vous n'avez plus de place sur votre Discord !`,
			// Content
			ADDEMOTE_SUCCESS: (emote) => `${e.success} | Émoji ${emote.name} ajouté au serveur ! Chaîne : \`${emote.toString()}\``,
			
			/* AUTOMOD COMMAND */

			// Utils
			AUTOMOD_DESCRIPTION: "Active ou désactive la suppression automatique des invitations discord",
			AUTOMOD_USAGE: "automod [on/off] (#salon)",
			AUTOMOD_EXAMPLES: "$automod on\n$automod off #general\n$automod off",
			// Errors
			AUTOMOD_ERR_STATUS: `${e.error} | Veuillez entrer un statut valide ! (\`on\` ou \`off\`) !`,
			// Content
			AUTOMOD_SUCCESS_ENABLED: (prefix) => `${e.success} | Les invitations Discord seront automatiquement supprimées ! Si vous souhaitez ignorer un salon, tapez simplement \`${prefix}automod off #salon\` ! Cela désactivera l'auto modération dans le salon mentionné !`,
			AUTOMOD_SUCCESS_DISABLED_CHANNEL: (channel) => `${e.success} | L'auto modération ne sera plus effectuée dans le salon ${channel} !`,
			AUTOMOD_SUCCESS_DISABLED: `${e.success} | Très bien ! L'auto modération n'est plus effective sur ce serveur !`,
			AUTOMOD_MSG: (msg) => `${msg.author} | Votre message contenait une invitation Discord, il a donc été supprimé. Si c'était involontaire, vous pouvez rééditer votre message, il vous a été envoyé en message privé !`,

			/* SETLANG COMMAND */

			// Utils
			SETLANG_DESCRIPTION: "Change la langue du serveur!",
			SETLANG_USAGE: "setlang [french/english]",
			SETLANG_EXAMPLES: "$setlang french\n$setlang english",
			// Errors
			SETLANG_ERR_LANG: `${e.error} | Veuillez entrer une langue valide (\`french\` ou \`english\`) !`,
			// Content
			SETLANG_LANGS:[
				":flag_fr: | La langue de ce serveur est maintenant le Français !",
				":flag_gb: | The language of this server is now English!"
			],

			/* FORTNITE COMMAND */
			
			// Utils
			FORTNITE_DESCRIPTION: "Affiche les stats Fortnite d'un joueur !",
			FORTNITE_USAGE: "fortnite [psn/xbl/pc] [pseudo]",
			FORTNITE_EXAMPLES: "$fortnite pc Ninja",
			// Errors
			FORTNITE_ERR_PLATFORM: `${e.error} | Entrez une plateforme valide : \`psn\`, \`pc\` ou \`xbl\` !`,
			FORTNITE_ERR_USERNAME: `${e.error} | Entrez un pseudo epic games valide !`,
			FORTNITE_ERR_NOT_FOUND: (platform, username) => `${e.error} | Joueur \`${username}\` introuvable sur la plateforme \`${platform}\` !`,
			// Content
			FORTNITE_TITLE: (username, link) => `Stats Fortnite de [${username}](${link})`,
			FORTNITE_STATS_RIGHT: (kd, percent) => `${kd} K/D - ${percent} V%`,
			FORTNITE_AVERAGE_KILLS: "KILLS/PARTIE",
			FORTNITE_AVERAGE_KILL: "KILL/PARTIE",
			FORTNITE_W_PERCENT: "V%",
			FORTNITE_KD: "K/D",
			FORTNITE_WINS : "VICTOIRES",
			FORTNITE_WIN : "VICTOIRE",
			FORTNITE_KILLS : "KILLS",
			FORTNITE_KILL : "KILL",
			FORTNITE_WINS_PERCENT : "VICTOIRE%",
			FORTNITE_MATCHES : "PARTIES",
			FORTNITE_MATCH : "PARTIE",

			/* FORTNITESHOP COMMAND */
			
			// Utils
			FORTNITESHOP_DESCRIPTION: "Affiche la boutique d'objets Fortnite !",
			FORTNITESHOP_USAGE: "fortniteshop",
			FORTNITESHOP_EXAMPLES: "$fortniteshop",
			// Content
			FORTNITESHOP_HEADER: "BOUTIQUE D'OBJETS FORTNITE",
			FORTNITESHOP_DAILY: "DU JOUR",
			FORTNITESHOP_FEATURED: "A LA UNE",
			FORTNITESHOP_TITLE: (date) => `Boutique Fortnite du ${date}`,

			/* SETFORTNITESHOP COMMAND */
			
			// Utils
			SETFORTNITESHOP_DESCRIPTION: "Définissez le salon de la boutique Fortnite du jour !",
			SETFORTNITESHOP_USAGE: "setfortniteshop (#salon)",
			SETFORTNITESHOP_EXAMPLES: "$setfortniteshop #shop\n$setfortniteshop",
			// Content
			SETFORTNITESHOP_DISABLED: `${e.success} | Boutique Fortnite du jour désactivée !`,
			SETFORTNITESHOP_ENABLED: (id) => `${e.success} | Salon de la boutique Fortnite du jour défini sur <#${id}> !`,

			/* CALC COMMAND */
			
			// Utils
			CALC_DESCRIPTION: "Une calculatrice capable de résoudre des opérations complexes et convertir des unités !",
			CALC_USAGE: "calc [calcul]",
			CALC_EXAMPLES: "$calc 10*5+sin(3)\n$calc 10cm to m",
			// Errors
			CALC_EMPTY: `${e.error} | Entrez un calcul !`,
			CALC_ERROR: `${e.error} | Entez un calcul valide !`,
			// Content
			CALC_TITLE: "Calculatrice",
			CALC_OPERATION: "Opération",
			CALC_RESULT: "Résultat",

			/* PURGE COMMAND */

			// Utils
			PURGE_DESCRIPTION: "Expulse les membres inactifs !",
			PURGE_USAGE: "purge [jours]",
			PURGE_EXAMPLES: "$purge 10",
			// Errors
			PURGE_ERR_DAYS: `${e.error} | Veuillez préciser un nombre de jours !`,
			PURGE_ERR_TIMEOUT: `${e.error} | Temps écoulé ! Veuillez retaper la commande !`,
			// Content
			PURGE_CONFIRMATION: (members) => `${e.warn} | ${members} membres seront expulsés ! Pour confirmer, tapez \`confirm\` !`,
			PURGE_SUCCESS: (members) => `${e.success} | ${members} membres expulsés !`,

			/* DASHBOARD */

			FIRST_LOGIN: (username) => `${username} s'est connecté pour la première fois au dashboard ! :tada:`,
			REGISTERED_FROM: (date) => `Membre depuis le ${(date ? date : "")}`,
			HELLO: (username) => `Bonjour, ${username}`,
			SEARCH_SERVERS: "Chercher des serveurs...",
			SERVERS_LIST: "Liste des serveurs",
			SELECTOR: "Sélecteur",
			SERVERS_MANAGEMENT: "GESTION DES SERVEURS",
			ERR_NOT_FOUND: "Oups ! Page introuvable.",
			ERR_NOT_FOUND_CONTENT: "Nous n'avons pas trouvé la page que vous cherchiez. En attendant, vous pouvez retourner au tableau de bord ou essayer d'utiliser le formulaire de recherche.",
			ERR_SOMETING_WENT_WRONG: "Oups ! Quelque chose s'est mal passé.",
			ERR_SOMETING_WENT_WRONG_CONTENT: "Nous nous efforcerons d'y remédier tout de suite. En attendant, vous pouvez retourner au tableau de bord ou essayer d'utiliser le formulaire de recherche.",
			ERR_NO_SERVER_FOUND: "Aucun serveur trouvé",
			ERR_NO_SERVER_FOUND_CONTENT: "Aucun serveur à afficher. Vérifiez que vous êtes connecté avec le bon compte et réessayez.",
			SERVER_CONF: "Configuration",
			CONFIG_HEADINGS: {
				BASIC: "📝 Configuration basique",
				WELCOME: "👋 Messages de bienvenue",
				GOODBYE: "😢 Messages d'au revoir",
				CHANNELS: "🌀 Salons spéciaux",
				AUTOROLE: "🎖️ Autorôle"
			},
			CONFIG_FIELDS: {
				PREFIX: "Préfixe",
				LANG: "Langue",
				CHANNEL: "Salon",
				MESSAGE: "Message",
				ROLE: "Rôle",
				WITHIMAGE_WELCOME: "Inclure une superbe image de bienvenue",
				WITHIMAGE_GOODBYE: "Inclure une superbe image d'au revoir",
				SUGGESTIONS: "Suggestions",
				MODLOGS: "Logs de modération",
				REPORTS: "Signalements",
				FORTNITESHOP: "Boutique Fortnite"
			},
			ENABLE_MESSAGES: "Activer les messages",
			DISABLE_MESSAGES: "Désactiver les messages",
			ENABLE_AUTOROLE: "Activer l'autorôle",
			DISABLE_AUTOROLE: "Désactiver l'autorôle",
			SWITCH_LANG: "Passer en Anglais 🇬🇧",
			FIRST_LEAD_MONEY: "1er du classement \"Crédits\"",
			FIRST_LEAD_LEVEL: "1er du classement \"Niveau\"",
			FIRST_LEAD_REP: "1er du classement \"Réputation\"",
			VIEW_PUB_PROFILE: "Voir mon profil public",
			SETTINGS_HEADINGS: [
				"🇫🇷 Langue",
				"Déconnexion"
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
			case "function": return value(...args);
			default: return value;
		}
	}

	getLang(){
		return lang;
	}

	printDate(pdate, isLongDate){
        let monthNames = [
            "janvier", "février", "mars",
            "avril", "mai", "juin", "juillet",
            "août", "septembre", "octobre",
            "novembre", "décembre"
        ];

        let day = pdate.getDate();
        let monthIndex = pdate.getMonth();
        let year = pdate.getFullYear();
        let hour = pdate.getHours() < 10 ? "0" + pdate.getHours() : pdate.getHours();
        let minute = pdate.getMinutes() < 10 ? "0" + pdate.getMinutes() : pdate.getMinutes();

		let thedate = (isLongDate) ? day + " " + monthNames[monthIndex] + " " + year + " à " + hour + "h" + minute 
		: day + " " + monthNames[monthIndex] + " " + year;
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
		(!isDays ? "" : (isMinutes || isHours) ? "{days} jours, " : "{days} jours et ")+
		(!isHours ? "" : (isMinutes) ? "{hours} heures, " : "{hours} heures et ")+
		(!isMinutes ? "" : "{minutes} minutes et ")+
		("{seconds} secondes");
		let sentence = pattern
			.replace("{duration}", pattern)
			.replace("{days}", days)
			.replace("{hours}", hours)
			.replace("{minutes}", minutes)
			.replace("{seconds}", seconds);
		return sentence;
	}

}
