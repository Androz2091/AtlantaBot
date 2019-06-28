let lang = "french";

let c = require("../config.js");
let e = c.emojis;

// This class is used to store languages strings

module.exports = class {
    constructor(...args) {
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
				CUSTOM: "Personnalisées"
			},
			

			// ERROR MESSAGES

			ERR_COMMAND_DISABLED: `${e.error} | Cette commande est actuellement désactivée !`,
			ERR_OWNER_ONLY: `${e.error} | Seul ${c.owner.name} peut effectuer ces commandes !`,
			ERR_INVALID_CHANNEL: `${e.error} | Veuillez mentionner un salon valide !`,
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
			ERR_CHANNEL_NOT_FOUND: (channel) => `${e.error} | Aucun salon trouvé avec \`${channel}\``,
			ERR_YES_NO: `${e.error} | Vous devez répondre par "oui" ou par "non" !`,
			ERR_EVERYONE: `${e.error} | Vous n'avez pas l'autorisation de mentionner everyone ou here dans les commandes.`,
			ERR_BOT_USER: `${e.error} | Cet utilisateur est un bot !`,
			ERR_GAME_ALREADY_LAUNCHED: `${e.error} | Une partie est déjà en cours sur ce serveur !`,
			ERR_A_GAME_ALREADY_LAUNCHED: `${e.error} | A cause des lags et bugs dus au findwords et au number, il est impossible de lancer deux parties en même temps, même si elles sont sur deux serveurs différents.\nIl y a une partie actuellement en cours sur un autre serveur, veuillez donc patientez quelques minutes puis réessayer.\nNous sommes désolés, mais des personnes abusaient de cette commande en la spammant sur pleins de serveurs.`,
			ERR_OCCURENCED: `${e.error} | Une erreur est survenue, veuillez réessayez dans quelques minutes.`,
			ERR_CMD_COOLDOWN: (seconds) => `${e.error} | Vous devez attendre **${seconds}** seconde(s) pour pouvoir de nouveau effectuer cette commande !`,
			
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
			HELP_REMINDER: (prefix) => `Pour avoir de l\'aide sur une commande tapez \`${prefix}help <commande>\` !`,
			HELP_TITLE:(nb) => `Liste des commandes - (${nb})`,
			HELP_NO_ALIASES: "Aucun alias.",
			// Headings
			HELP_HEADINGS: [
				"Aide :",
				"Utilisation :",
				"Exemples :",
				"Groupe :",
				"Description :",
				"Alias :",
				"Permissions :"
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
			HASTEBIN_TEXT: `${e.error} | Vous devez entrer un texte !`,
			// Content
			HASTEBIN_SUCCESS: (url) => `${e.success} | Votre texte a été uploadé sur hastebin ! Voici votre lien : ${url}`,

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
				`${e.calendar} Création`,
				`${e.games} Jeu`,
				`${e.online} Statut`,
				`${e.up} Rôle`,
				`${e.calendar2} Arrivée`,
				`${e.pencil} Surnom`,
				`${e.roles} Rôles`,
				`${e.color} Couleur`
			],
			USERINFO_NO_GAME: "Pas de jeu",
			USERINFO_NO_ROLE: "Aucun rôle",
			USERINFO_MORE_ROLES: (nb) => ` et ${nb} autres rôles`,
			USERINFO_NO_NICKNAME: "Pas de surnom",

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
				[ "Automodération", "Automodération désactivée" ]
			],
			CONFIGURATION_AUTOROLE: (roleID) => `Rôle : <@&${roleID}>`,
			CONFIGURATION_WELCOME: (withImage, channelID) => `Salon : <#${channelID}>\nImage : ${withImage ? "Oui" : "Non"}`,
			CONFIGURATION_GOODBYE: (withImage, channelID) => `Salon : <#${channelID}>\nImage : ${withImage ? "Oui" : "Non"}`,
			CONFIGURATION_MODLOGS: (channelID) => `Logs : ${channelID ? `<#${channelID}>` : "Indéfini"}`,
			CONFIGURATION_SUGGESTIONS: (channelID) => `Suggestions : ${channelID ? `<#${channelID}>` : "Indéfini" }`,
			CONFIGURATION_AUTOMOD: (ignoredChannels) => `${ignoredChannels.length > 0 ? `Salon ignorés : ${ignoredChannels.map((ch) => `<#${ch}>`)}` : "Aucun salon ignoré."}`,
			CONFIGURATION_WARNS: (kick, ban) => `${kick ? `**Expulsion**: au bout de **${kick}** avertissements.` : "**Expulsion**: Non définie."}\n${ban ? `**Bannissement**: au bout de **${ban}** avertissements.` : "**Bannissement**: Non défini."}`,

			/* IGNORE COMMAND */

			// Utils
			IGNORE_DESCRIPTION: "Désactive ou active les commandes dans le salon mentionné",
			IGNORE_USAGE: "ignore [#salon]",
			IGNORE_EXAMPLES: "$ignore #général",
			// Content
			IGNORE_SUCCESS_DISABLED: (channel) => `${e.success} | Les commandes sont maintenant autorisées dans ${channel} !`,
			IGNORE_SUCCESS_ENABLED: (channel) => `${e.warn} | Les commandes sont maintenant interdites dans ${channel} !`,

			/* SETPREFIX COMMAND */

			// Utils
			SETPREFIX_DESCRIPTION: "Change le préfixe du serveur",
			SETPREFIX_USAGE: "setprefix [préfixe]",
			SETPREFIX_EXAMPLES: "$setprefix !",
			// Errors
			SETPREFIX_ERR_PREFIX: `${e.error} | Veuillez entrer un préfixe valide !`,
			SETPREFIX_ERR_CARACT: `${e.error} | Le préfixe ne doit pas excéder les 5 caractères !`,
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
			WELCOME_FORM_SUCCESS: (channel, prefix) => `${e.success} | Messages de bienvenue activés dans <#${channel}> ! Tapez \`${prefix}welcome test\` pour tester le message de bienvenue !`,
			WELCOME_IMG: (name) => `Bienvenue sur ${name} !`,
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
			GOODBYE_FORM_SUCCESS: (channel, prefix) => `${e.success} | Messages d'au revoir activés dans <#${channel}> ! Tapez \`${prefix}goodbye test\` pour tester le message d'au revoir !`,
			GOODBYE_IMG: (name) => `Départ de ${name}`,
			// Errors
			GOODBYE_ERR_TIMEOUT: `${e.error} | Temps écoulé ! Veuillez retaper la commande !`,
			GOODBYE_ERR_CARACT: `${e.error} | Votre message ne doit pas excéder les 1500 caractères !`,

			/* SLOWMODE COMMAND */

			// Utils
			SLOWMODE_DESCRIPTION: "Définissez un cooldown dans un salon",
			SLOWMODE_USAGE: "slowmode [#salon] (temps)",
			SLOWMODE_EXAMPELS: "$slowmode #général 10m\n$slowmode #général",
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
			NO_BADGE: "Aucun badge.",
			// Headings
			PROFILE_TITLE: (username) => `Profil de ${username}`,
			PROFILE_HEADINGS:{
				MONEY:"💰 Argent",
				REP: "🎩 Réputation",
				REGISTERED_AT: "📅 Enregistré",
				LEVEL:"📊 Niveau",
				EXP: "🔮 Expérience",
				BIRTHDATE: "🎂 Anniversaire",
				MARRIED: "❤️ Marié(e)",
				INVITER: "🤵 Inviteur",
				PSEUDO: "📝 Pseudo",
				BADGES: "🔥 Badges",
			},
			
			/* WORK COMMAND */

			// Utils
			WORK_DESCRIPTION: "Travaillez et gagnez de l'argent !",
			WORK_USAGE: "work",
			WORK_EXAMPLES: "$work",
			// Content
			WORK_CLAIMED_TITLE: "Salaire",
			WORK_CLAIMED_CONTENT: "200 crédits ajoutés à votre compte !",
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
			CREDITS_CONTENT: (credits, username) => `Actuellement **${credits}** crédits sur le compte de **${username}** !`,

			/* LEADERBOARD COMMAND */

			// Utils
			LEADERBOARD_DESCRIPTION: "Affiche les utilisateurs qui dispose du plus de crédits, de niveaux ou de points de réputation !",
			LEADERBOARD_USAGE: "leaderboard [rep/levels/credits]",
			LEADERBOARD_EXAMPLES: "$leaderboard credits\n$leaderboard levels",
			// Errors
			LEADERBOARD_ERR_TYPE: `${e.error} | Veuillez entrer un type de leaderboard ! (\`credits\`, \`level\` ou \`rep\`)`,

			/* PAY COMMAND */

			// Utils
			PAY_DESCRIPTION: "Payez un membre avec des crédits !",
			PAY_USAGE: "pay [@user#0000] [montant]",
			PAY_EXAMPLES: "$pay @Androz#2091 400",
			// Errors
			PAY_ERR_YOURSELF: `${e.error} | Vous ne pouvez pas vous payer vous-même !`,
			PAY_ERR_INVALID_AMOUNT: (username) => `${e.error} | Vous devez entrer un montant à verser à **${username}** !`,
			PAY_ERR_AMOUNT_TOO_HIGH: (amount, username) => `${e.error} | Vous ne disposez pas d\'assez de crédits pour verser ${amount} crédits à ${username} !`,
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

			/* BADGE COMMAND */

			// Utils
			BADGE_DESCRIPTION: "Achetez des badges qui apparaîtront sur votre profil !",
			BADGE_USAGE: "badge (nom-du-badge)",
			BADGE_EXAMPLES: "badge\nbadge France",
			// Content
			BADGE_TITLE: `Badges ${c.botname}`,
			BADGE_DESCRIPTION: (prefix) => `Pour acheter un badge, tapez \`${prefix}badge [nom-du-badge]\``,
			BADGE_FORMAT: (badge) => `Badge : ${badge.emoji}\nNom : ${badge.name}\nPrix : ${badge.price} crédits\n--------\n`,
			BADGE_FORMAT_BOUGHT: (badge) => `Badge : ${badge.emoji}\nNom : ${badge.name}\nDéjà acheté (${badge.price} crédits)\n--------\n`,
			BADGE_SUCCESS: (badge) => `${e.success} | Vous venez d'acheter le badge ${badge.name} (${badge.emoji}) pour ${badge.price} crédits !`,
			// Errors
			BADGE_ERR_NOT_FOUND: (text) => `${e.error} | Aucun badge trouvé pour \`${text}\``,
			BADGE_ERR_PRICE: `${e.error} | Vous n'avez pas assez de crédits pour acheter ce badge !`,
			BADGE_ERR_BOUGHT: `${e.error} | Vous possédez déjà ce badge !`,
			// Headings
			BADGE_HEADINGS: {
				flags: "Drapeaux",
				games: "Jeux",
				others: "Autres"
			},

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
			STATS_CREDITS: "Merci à \`https://icones8.fr/icons/\`, tous les emojis (ou presque) viennent de ce site !",
			STATS_LINKS: (url, id) => `[Github](${c.others.github}) | [Inviter ${c.botname}](https://discordapp.com/oauth2/authorize?client_id=${id}&scope=bot&permissions=2146958847) | [Support](${url}) | [Don](${c.others.donate})`,
			// Headings
			STATS_HEADINGS:[
				`Stats`,
				`${e.stats} • __Statistiques__`,
				`${e.ram} • __RAM__`,
				`${e.version} • __Version__`,
				`${e.online} • __En ligne__`,
				`${e.links} • __Liens__`,
				`${e.voice} • __Musique__`,
				":heart: • __Remerciements & crédits__",
			],

			/* TRANSLATE COMMAND  */

			// Utils
			TRANSLATE_DESCRIPTION: "Je traduis votre texte !",
			TRANSLATE_USAGE: "translate [langues] [message]",
			TRANSLATE_EXAMPLES: "$translate fr-en Comment allez-vous ?",
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

			/* KICK COMMAND */

			// Utils
			KICK_DESCRIPTION: "Expulse le membre mentionné !",
			KICK_USAGE: "kick [@user] (raison)",
			KICK_EXAMPLES: "$kick @Androz#2091 Spam",
			// Errors
			KICK_ERR_PERMISSIONS: `${e.error} | Une erreur est survenue... vérifiez que j'ai bien les permissions d'expulser ce membre et réessayez !`,
			KICK_SUCCESS_DM: (user, msg, reason) => `${e.error} | Bonjour <@${user.id}>,\nVous venez d'être expulsé de **${msg.guild.name}** par **${msg.author.tag}** pour **${reason}** !`,
			KICK_SUCCESS_CHANNEL: (user, msg, reason) => `${e.success} | **${user.username}** vient d'être expulsé de **${msg.guild.name}** par **${msg.author.tag}** pour **${reason}** !`,

			/* CHECKINVITES COMMAND */

			// Utils
			CHECKINVITES_DESCRIPTION: "Vérifie si les membres n'ont pas une publicité pour leur serveur Discord dans leur présence !",
			CHECKINVITES_USAGE: "checkinvites",
			CHECKINVITES_EXAMPLES: "$checkinvites",
			// Content
			CHECKINVITES_NOT_FOUND: `${e.success} | Aucun membre ne fait de la publicité dans son jeu !`,

			/* CLEAR COMMAND */

			// Utils
			CLEAR_DESCRIPTION: "Supprime des messages très rapidement !",
			CLEAR_USAGE: "clear [nombre-de-messages] (@membre)",
			CLEAR_EXAMPLES: "$clear 10\n$clear 10 @Androz#2091",
			// Errors
			CLEAR_ERR_AMOUNT: `${e.error} | Vous devez préciser un nombre de messages à supprimer !`,
			// Content
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

			/* SETWARNS COMMAND */

			// Utils
			SETWARNS_DESCRIPTION: "Définissez les sanctions qu'obtiendront les membres au bout d'un certain nombre de warns !",
			SETWARNS_USAGE: "setwarns [kick/ban] [nombre/reset]",
			SETWARNS_EXAMPLES: "$setwarns kick 10\n$setwarns ban 10\n$setwarns ban reset",
			// Errors
			SETWARNS_ERR_SANCTION: `${e.error} | Veuillez indiquer un type de sanction valide ! (\`kick\`, \`ban\`)`,
			// Content
			SETWARNS_SUCCESS_KICK: (prefix, number) => `${e.success} | Configuration enregistrée ! Lorsqu'un membre aura atteint les ${number} warns, il sera expulsé. Tapez \`${prefix}configuration\` pour voir votre nouvelle configuration !`,
			SETWARNS_SUCCESS_BAN: (prefix, number) => `${e.success} | Configuration enregistrée ! Lorsqu'un membre aura atteint les ${number} warns, il sera banni. Tapez \`${prefix}configuration\` pour voir votre nouvelle configuration !`,
			SETWARNS_SUCCESS_RESET_KICK: (prefix, number) => `${e.success} | Configuration enregistrée ! La sanction kick n'est maintenant plus automatique ! Tapez \`${prefix}configuration\` pour voir votre nouvelle configuration !`,
			SETWARNS_SUCCESS_RESET_BAN: (prefix, number) => `${e.success} | Configuration enregistrée ! La sanction ban n'est maintenant plus automatique ! Tapez \`${prefix}configuration\` pour voir votre nouvelle configuration !`,

			/* POLL COMMAND */

			// Utils
			POLL_DESCRIPTION: "Lance un sondage dans le salon actuel !",
			POLL_USAGE: "poll [question]",
			POLL_EXAMPLES: "$poll Voulez-vous un nouveau salon ?",
			// Errors
			POLL_ERR_QUESTION: `${e.error} | Vous devez entrer une question !`,
			POLL_ERR_TIMEOUT: `${e.error} | Temps écoulé ! Veuillez retaper la commande !`,
			// Content
			POLL_FORM_MENTION: `Souhaitez-vous ajouter une mention à votre message ? Répondez par "oui" ou "non" !`,
			POLL_FORM_MENTION_HE: "Tapez une des réponses suivantes : \`every\` (pour une mention @ everyone) ou \`here\` (pour une mention @ here) !",
			POLL_REACT: `Réagissez avec ${e.success} ou ${e.error} !`,
			POLL_HEADING: "📊 Sondage :",

			/* SANCTIONS COMMAND */
			
			// Utils
			SANCTIONS_DESCRIPTION: "Affiche la liste des infractions commises par un membre !",
			SANCTIONS_USAGE: "sanctions [@membre]",
			SANCTIONS_EXAMPLE: "$sanctions @Androz#2091",
			// Errors
			SANCTIONS_ERR_NOTHING: "Ce membre n'a commis aucune infraction.",

			/* MODOGS EMBEDS */
			MODLOGS_TYPES: {
				BAN: `Ban | Cas #{case}`,
				KICK: `Kick | Cas #{case}`,
				UNBAN: `Unban | Cas #{case}`,
				WARN: `Avertissement | Cas #{case}`,
				MUTE: `Mute | Cas #{case}`
			},
			MODLOGS_HEADINGS: [
				"Utilisateur",
				"Modérateur",
				"Raison",
				"Temps",
				"Expiration"
			],

			/* SETLOGS COMMAND */

			// Utils
			SETLOGS_DESCRIPTION: "Définissez le salon des logs !",
			SETLOGS_USAGE: "setlogs (#salon)",
			SETLOGS_EXAMPLES: "$setlogs #modlogs\n$setlogs",
			// Content
			SETLOGS_SUCCESS: (id) => `${e.success} | Salon des logs défini sur <#${id}> !`,

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

			/* ADDEMOTE COMMAND */

			// Utils
			ADDEMOTE_DESCRIPTION: "Ajoute un émoji au serveur !",
			ADDEMOTE_USAGE: "addemote [URL] [nom]",
			ADDEMOTE_EXAMPLES: "$addemote https://une-image-de.com/papillon.png papillon",
			// Errors
			ADDEMOTE_ERR_NAME: `${e.error} | Veuillez indiquer le nom de l'émoji !`,
			ADDEMOTE_ERR_URL: `${e.error} | Veuillez indiquer l'url de l'émoji !`,
			ADDEMOTE_ERROR: `${e.error} | L'URL vers l'image est invalide ou vous n'avez plus de place sur votre Discord !`,
			// Content
			ADDEMOTE_SUCCESS: (emote) => `${e.success} | Émoji ${emote.name} ajouté au serveur !`,
			
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
			AUTOMOD_SUCCESS_DISABLED: `${e.success} | Très bien ! L'auto modération n'est plus effective sur ce serveur !`,
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
			FORTNITE_ERR_USERNAME: `${e.error} | Entrez un pseudo epic games valide !`,
			FORTNITE_ERR_NOT_FOUND: (platform, username) => `${e.error} | Joueur \`${username}\` introuvable sur la plateforme \`${platform}\` !`,
			// Content
			FORTNITE_DESC: (platform, username) => `${username} joue sur ${platform} !`,
			FORTNITE_SOLO_STATS: (data) => `${e.score} K/D : ${data.stats.solo.kd}\n${e.games} Parties : ${data.stats.solo.matches}\n${e.kills} Kills : ${data.stats.solo.kills}\n${e.crown} Victoire(s) : ${data.stats.solo.wins}`,
			FORTNITE_DUO_STATS: (data) => `${e.score} K/D : ${data.stats.duo.kd}\n${e.games} Parties : ${data.stats.duo.matches}\n${e.kills} Kills : ${data.stats.duo.kills}\n${e.crown} Victoire(s) : ${data.stats.duo.wins}`,
			FORTNITE_SQUAD_STATS: (data) => `${e.score} K/D : ${data.stats.squad.kd}\n${e.games} Parties : ${data.stats.squad.matches}\n${e.kills} Kills : ${data.stats.squad.kills}\n${e.crown} Victoire(s) : ${data.stats.squad.wins}`,
			FORTNITE_LIFETIME_STATS: (data) => `${e.score}	K/D : ${data.stats.lifetime.kd}\n${e.games} Parties : ${data.stats.lifetime.matches}\n${e.kills} Kills : ${data.stats.lifetime.kills}\n${e.crown} Victoire(s) : ${data.stats.lifetime.wins}`,

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
			PURGE_SUCCESS: (members) => `${e.success} | ${members} membres expulsés !`,

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
        let hour = pdate.getHours();
        let minute = pdate.getMinutes();

		let thedate = (isLongDate) ? day + " " + monthNames[monthIndex] + " " + year + " à " + hour + "h" + minute 
		: day + " " + monthNames[monthIndex] + " " + year;
        return thedate;
	}
	
	convertMs(ms){
		let d, h, m, s;
		s = Math.floor(ms / 1000);
		m = Math.floor(s / 60);
		s = s % 60;
		h = Math.floor(m / 60);
		m = m % 60;
		d = Math.floor(h / 24);
		h = h % 24;
		h += d * 24;
		return h + " heure(s) " + m + " minute(s) " + s + " seconde(s)";
	}

}