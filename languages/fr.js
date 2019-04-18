var 
warn = "<:atlanta_warn:565212996565991425>",
error = "<:atlanta_error:565212755804684318>",
success = "<:atlanta_success:565212709591973896>",
loading = "<a:atlanta_loading:565214530121105418>"

var owner = "`Androz#2091`";
yes = 'oui',
no = 'non',
botname = 'Atlanta',
lang = 'fr',
stats = [ 
	"<:stats:566982702704754715>",
	"<:ram:566979302076448828>",
	"<:version:566983129370460170>",
	"<:online:566984813278527508>",
	"<:lien:566985712399024131>",
	"<:voice:567393244741107745>",
	"<:love:567394342168166416>"
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
			PREFIX_INFO: (prefix) => `le préfixe de ce serveur est \`${prefix}\``,
			YES: 'Oui',
			NO : 'Non',
			USER: `Utilisateur`,
			TLEVEL: `Niveau`,
			TREP: `Réputation`,
			TCREDITS: `Crédits`,
			WIN: `Victoire`,
			LOOSE: `Perdu`,
			PAGE: `Page`,
			TOTAL_SERVERS: `Total serveurs`,
			MEMBERS: `Membres`,
			STATUS: {
				"dnd":"Ne pas déranger",
				"idle":"AFK (idle)",
				"offline":"Déconnecté",
				"online":"En ligne"
			},
			NO_REASON_PROVIDED: `pas de raison donnée`,
			UNDEFINED: `Indéfini`,

			// ERROR MESSAGE
			INHIBITOR_MISSING_BOT_PERMS: (perms) => `${error} | J'ai besoin des permissions suivantes pour effectuer cette commande : \`${perms}\``,
			INHIBITOR_NSFW: `${error} | Vous devez vous rendre dans un salon qui autorise le NSFW pour taper cette commande !`,
			INHIBITOR_PERMISSIONS:(perm) => `${error} | Vous n'avez pas les permissions nécessaires pour effectuer cette commande (\`${perm}\`)`,
			COMMAND_DISABLED: `${error} | Cette commande est actuellement désactivée !`,
			OWNER_ONLY: `${error} | Seul ${owner} peut effectuer ces commandes !`,
			MENTION_CHANNEL: `${error} | Veuillez mentionner un salon valide !`,
			MENTION_ROLE: `${error} | Veuillez mentionner un rôle valide !`,
			MENTION_MEMBER: `${error} | Veuillez mentionner un membre valide !`,
			CHANNEL_IGNORED: (channel) => `${error} | Les commandes sont interdites dans ${channel} !`,
			BAD_PARAMETERS: (cmd, prefix) => `${error} | Veuillez vérifier les paramètres de la commande. Regardez les exemples en tapant \`${prefix}help ${cmd}\` !`,
			ROLE_NOT_FOUND: (role) => `${error} | Aucun rôle trouvé avec \`${role}\` !`,
			YES_OR_NO: `${error} | Vous devez répondre par "oui" ou par "non" !`,
			INVALID_TIME: `${error} | Vous devez entrer un temps valide ! Unités valides : \`s\`, \`m\`, \`h\`, \`d\`, \`w\`, \`y\``,
			MENTION_EVERYONE: `${error} | Vous n'avez pas l'autorisation de mentionner everyone ou here dans les commandes.`,
			IS_A_BOT: `${error} | Cet utilisateur est un bot !`,
			NAN: (nan) => `${error} | \`${nan}\` n'est pas un nombre valide !`,
			INVALID_ID: `${error} | Veuillez entrer une ID valide !`,
			PLEASE_WAIT: `${loading} | Veuillez patienter...`,
			GAME_ALREADY_LAUNCHED: `${error} | Une partie est déjà en cours sur ce serveur !`,
			A_GAME_ALREADY_LAUNCHED: `${error} | A cause des lags et bugs dus au findwords et au number, il est impossible de lancer deux parties en même temps, même si elles sont sur deux serveurs différents.\nIl y a une partie actuellement en cours sur un autre serveur, veuillez donc patientez quelques minutes puis réessayer.\nNous sommes désolés, mais des personnes abusaient de cette commande en la spammant sur pleins de serveurs.`,
			AN_ERROR_OCCURENCED: `${error} | Une erreur est survenue, veuillez réessayez dans quelques minutes.`,
			NUMBER_1_10: `${error} Veuillez indiquer un nombre valide entre 1 et 10 !`,
			
			// PING COMMAND
			PING_DESCRIPTION: 'Affiche la latence du bot',
			PING: (ms) => `${success} | Pong ! Ma latence est de \`${ms}\` ms !`,

			// HELP COMMAND
			HELP_DESCRIPTION: `Affiche l'aide des commandes ou l'aide d'une commande en particulier`,
			HELP_COMMAND_NOT_FOUND: (cmd) => `${error} | Commande ${cmd} introuvable !`,
			HELP_DISABLED: `Cette commande est actuellement désactivée`,
			HELP_OWNER_ONLY: `Seul ${owner} peut effectuer cette commande !`,
			HELP_REMINDER: (prefix) => `Pour avoir de l\'aide sur une commande tapez \`${prefix}help <commande>\` !`,
			HELP_HEADING_2:(nb) => `Liste des commandes - (${nb})`,
			HELP_HEADING: `Aide :`,
			HELP_USAGE: `Utilisation :`,
			HELP_EXAMPLES: `Exemples :`,
			HELP_GROUP: `Groupe :`,
			HELP_DESC: `Description :`,
			HELP_ALIASES: `Alias :`,
			HELP_PERMISSIONS: `Permissions :`,
			HELP_CUSTOMIZED: (cmd) => `${error} | La commande ${cmd} ne dispose pas d'aide car elle est personnalisée.`,
			HELP_NO_ALIASES: `Aucun alias.`,

			// Conf command
			CONFIGURATION_DESCRIPTION:'Affiche la configuration du serveur',
			PREFIX: "Préfixe",
			IGNORED_CHANNELS: "Salons ignorés",
			NO_IGNORED_CHANNELS: "Aucun salon ignoré",
			AUTOROLE: 'Autôrole',
			WELCOME: 'Bienvenue',
			CONFIGURATION_AUTOROLE_ENABLED: (data) => `Statut : **Activé**\nRôle : <@&${data.role}>`,
			DISABLED_PLUGIN: `Statut : **Désactivé**`,
			CONFIGURATION_WELCOME_ENABLED: (data) => `Statut : **Activé**\nSalon : <#${data.channel}>\nImage : ${(data.withImage == 'true') ? 'Oui' : 'Non'}`,
			LEAVE: 'Au revoir',
			CONFIGURATION_LEAVE_ENABLED: (data) => `Statut : **Activé**\nSalon : <#${data.channel}>\nImage : ${(data.withImage == 'true') ? 'Oui' : 'Non'}`,
			SLOWMODE: 'Slowmode',
			NO_SLOWMODE: `Aucun salon avec slowmode`,
			CHANNELS: `Salons`,
			CONF_LOGS: (data) => `Logs : ${data.channels.modlogs === 'false' ? 'Indéfini' : `<#${data.channels.modlogs}>`}\n`,
			CONF_SUGG: (data) => `Suggestions : ${data.channels.suggestion === 'false' ? 'Indéfini' : `<#${data.channels.suggestion}>`}\n`,
			CONF_WARNS: `Avertissements (warns)`,
			CONF_WARNS_MESSAGE: (data) => ``,

			// Ignore command
			IGNORE_DESCRIPTION: 'Désactive ou active les commandes dans le salon mentionné',
			UNIGNORE_SUCESS: (channel) => `${success} | Les commandes sont maintenant autorisées dans ${channel} !`,
			IGNORE_SUCESS: (channel) => `${warn} | Les commandes sont maintenant interdites dans ${channel} !`,

			// Set prefix 
			SETPREFIX_DESCRIPTION: 'Change le préfixe du serveur',
			VALID_PREFIX: `${error} | Veuillez entrer un préfixe valide !`,
			PREFIX_CHARACTERS: `${error} | Le préfixe ne doit pas excéder les 5 caractères !`,
			PREFIX_SUCCESS: (prefix) => `${success} | Le préfixe a bien été modifié ! Tapez \`${prefix}help\` pour voir la liste des commandes !`,

			// Autorole cmd
			AUTOROLE_ENABLED: (prefix) => `${success} | Autôrole correctement activé ! Pour avoir plus d'informations sur la configuration de votre serveur tapez \`${prefix}configuration\` !`,
			AUTOROLE_DISABLED: (prefix) => `${warn} | Autôrole correctement désactivé ! Pour avoir plus d'informations sur la configuration de votre serveur tapez \`${prefix}configuration\` !`,

			// Welcome cmd
			WELCOME_DESCRIPTION: `Envoie un message de bienvenue dans un salon défini au préalable !`,
			WELCOME_DISABLED: (prefix) => `${success} | Les messages de bienvenue viennent d'être désactivés ! Tapez \`${prefix}configuration\` pour voir la configuration actuelle !`,
			WELCOME_TEST: `${success} | Test effectué !`,
			WELCOME1: (author) => `Bonjour ${author} ! Dans quel salon s'enverra le message de bienvenue ? (mentionnez un salon)`,
			WELCOME2: (channel, msg) => `D'accord ! Les messages s'enverront donc dans ${channel}. Entrez le message de bienvenue ci-dessous : \n\nInfos:\`\`\`\nMention : {user}\nMembres : {membercount}\nServeur : {server}\`\`\`Par exemple, "Bienvenue {user} sur {server} ! Grâce à toi, nous sommes {membercount} !" donnera "Bienvenue ${msg.author} sur ${msg.guild.name} ! Grâce à toi, nous sommes ${msg.guild.memberCount} !".`,
			WELCOME3: `Ça marche ! Voulez-vous qu'une superbe image de bienvenue soit envoyée en même temps ? Répondez par "${yes}" ou par "${no}" !`,
			WELCOME_SUCCESS: (channel, prefix) => `${success} | Messages de bienvenue activés dans <#${channel}> ! Tapez \`${prefix}welcome test\` pour tester le message de bienvenue !`,
			WELCOME_TIMEOUT: `${error} | Temps écoulé ! Veuillez retaper la commande !`,
			WELCOME_CARACT: `${error} | Votre message ne doit pas excéder les 1500 caractères !`,
			WELCOME_IMG: (name) => `Bienvenue sur ${name} !`,

			// Leave cmd
			LEAVE_DESCRIPTION: `Envoie un message d'au revoir dans un salon défini au préalable !`,
			LEAVE_DISABLED: (prefix) => `${success} | Les messages d'au revoir viennent d'être désactivés ! Tapez \`${prefix}configuration\` pour voir la configuration actuelle !`,
			LEAVE_TEST: `${success} | Test effectué !`,
			LEAVE1: (author) => `Bonjour ${author} ! Dans quel salon s'enverra le message d'au revoir ? (mentionnez un salon)`,
			LEAVE2: (channel, msg) => `D'accord ! Les messages s'enverront donc dans ${channel}. Entrez le message d'au revoir ci-dessous : \n\nInfos:\`\`\`\nMention : {user}\nMembres : {membercount}\nServeur : {server}\`\`\`Par exemple, "Au revoir {user} ! C'est triste, sans toi nous ne sommes que {membercount} sur {server} !" donnera "Au revoir ${msg.author.username}#${msg.author.discriminator} ! C'est triste, sans toi nous ne sommes que ${msg.guild.memberCount} sur ${msg.guild.name} !".`,
			LEAVE3: `Ça marche ! Voulez-vous qu'une superbe image d'au revoir soit envoyée en même temps ? Répondez par "${yes}" ou par "${no}" !`,
			LEAVE_SUCCESS: (channel, prefix) => `${success} | Messages d'au revoir activés dans <#${channel}> ! Tapez \`${prefix}leave test\` pour tester le message d'au revoir !`,
			LEAVE_TIMEOUT: `${error} | Temps écoulé ! Veuillez retaper la commande !`,
			LEAVE_CARACT: `${error} | Votre message ne doit pas excéder les 1500 caractères !`,
			LEAVE_IMG: (name) => `Départ de ${name}`,

			// Slowmode
			SLOWMODE_DESCRIPTION: `Définissez un cooldown dans un salon`,
			SLOWMODE_DISABLED: (channel) => `${success} | Le slowmode a été désactivé dans le salon <#${channel}> !`,
			SLOWMODE_ENABLED: (channel, time) => `${success} | Slowmode activé dans <#${channel}> avec un temps de ${time} !`,
			SLOWMODE_PLEASE_WAIT: (time, channel) => `${error} | Le salon ${channel} est en slowmode ! Veuillez attendre ${time} pour pouvoir poster un nouveau message !`,

			// Add command
			ADDCOMMAND_DESCRIPTION: `Ajoutez une commande personnalisée au serveur !`,
			ADDCOMMAND_NAME: `${error} | Veuillez entrer un nom et une réponse à la commande !`,
			ADDCOMMAND_ALREADY: (name) => `${error} | La commande ${name} existe déjà sur ${botname} !`,
			ADDCOMMAND_ANSWER: `${error} | Veuillez entrer une réponse à cette commande !`,
			ADDCOMMAND_SUCCESS: (cmd) => `${success} | La commande ${cmd} a bien été ajoutée au serveur !`,

			// Del command
			DELCOMMAND_DESCRIPTION: `Enlevez une commande personnalisée du serveur !`,
			ADDCOMMAND_NAME: `${error} | Veuillez entrer le nom de la commande que vous souhaitez supprimer !`,
			DELCOMMAND_EXIST: (cmd) => `${error} | La commande ${cmd} n'existe pas !`,
			DELCOMMAND_SUCCESS: (cmd) => `${success} | La commande ${cmd} a bien été enlevée du serveur !`,

			// ECONOMY
			MONEY: `💰 Argent`,
			REP: `🎩 Réputation`,
			REGISTERED_AT: `📅 Enregistré`,
			LEVEL: `📊 Niveau`,
			EXP: `🔮 Expérience`,
			BIRTHDATE: `🎂 Anniversaire`,
			COUPLE: `❤️ Marié(e)`,
			INVITER: `🤵 Inviteur`,
			PSEUDO: `📝 Pseudo`,
			BADGES: `🔥 Badges`,

			// Profile command
			PROFILE_DESCRIPTION: `Affiche le profil du membre mentionné (ou de l'auteur du message)`,
			PROFILE_HEADING: (username) => `Profil de ${username}`,
			NO_BIO: `Aucune biographie enregistrée`,
			DISPLAY_REP: (points) => `**${points}** point(s)`,
			DISPLAY_CREDITS: (credits) => `**${credits}** crédit(s)`,
			NO_PARTNER: `Célibataire`,
			NO_BIRTHDATE: `Indéfini`,
			NO_BADGE: `Aucun badge.`,
			
			// work command
			WORK_DESCRIPTION: `Travaillez et gagnez de l'argent !`,
			WORK_COOLDOWN: (delai) => `${error} | Vous devez attendre ${delai} avant de pouvoir de nouveau travailler !`,
			SALARY_CLAIMED: `Salaire`,
			SALARY_CLAIMED2: `200 crédits ajoutés à votre compte !`,

			// Eval
			EVAL_DESCRIPTION: `Exécute le code`,

			// Get conf command
			GETCONF_DESCRIPTION: `Récupère la configuration d'un serveur !`,
			GETCONF_NO_CONF: `${error} | Ce serveur ne possède pas de configuration car il n'a jamais ajouté ${botname} !`,

			// Get invite command
			GETINVITE_DESCRIPTION: `Génère une invitation vers le serveur en question. Veillez à faire bon usage de cette commande.`,
			GETINVITE_ERROR: `${error} | Je ne peux pas créer d'invitations sur ce serveur !`,
			GETINVITE_NO_GUILD: `${error} | Je ne suis pas sur ce serveur !`,

			// Rep command
			REP_DESCRIPTION: `Donnez un point de réputation à un membre !`,
			REP_COOLDOWN: (delai) => `${error} | Vous devez attendre ${delai} avant de pouvoir de nouveau donner un point de réputation !`,
			REP_BOT: `${error} | Vous ne pouvez pas donner un point de réputation à un bot !`,
			REP_SELF: `${error} | Vous ne pouvez pas vous donner vous-même un point de réputation !`,
			REP_SUCCESS: (tag) => `${success} | Vous avez bien donné un point de réputation à **${tag}** !`,

			// Setbio command
			SETBIO_DESCRIPTION: `Changez la description qui apparaitra sur votre profil !`,
			SETBIO_MISSING_DESCRIPTION : `${error} | Veuillez entrer une description valide !`,
			SETBIO_100: `${error} | Votre biographie ne doit pas excéder les 100 caractères !`,
			SETBIO_SUCCESS: `${success} | Votre biographie vient d'être modifiée !`,

			// credits command
			CREDITS_DESCRIPTION: `Affiche vos crédits`,
			CREDITS_HEADING: (username) => `Crédits de ${username}`,
			CREDITS_CONTENT: (credits, username) => `Actuellement **${credits}** crédits sur le compte de **${username}** !`,

			// leaderboard command
			LEADERBOARD_DESCRIPTION: `Affiche les utilisateurs qui dispose du plus de crédits, de niveaux ou de points de réputation !`,
			LEADERBOARD_TYPE: `${error} | Veuillez entrer un type de leaderboard ! (\`credits\`, \`levels\` ou \`rep\`)`,

			// Pay command
			PAY_DESCRIPTION: `Payez un membre avec des crédits !`,
			PAY_SELF: `${error} | Vous ne payez pas vous payez vous-même !`,
			PAY_AMOUNT: (username) => `${error} | Vous devez entrer un montant à verser à **${username}** !`,
			PAY_AMOUNT_TO_HIGH: (amount, username) => `${error} | Vous ne disposez pas d\'assez de crédits pour verser ${amount} crédits à ${username} !`,
			PAY_SUCCESS: (amount, username) => `${success} | Vous avez versé ${amount} crédits à ${username} !`,

			// Birthdate command
			BIRTHDATE_DESCRIPTION: `Définissez la date de votre anniversaire (qui apparaitre sur votre profil)`,
			BIRTHDATE_VALID_DATE: `${error} | Veuillez entrer une date valide ! Par exemple 01/12/2000`,
			BIRTHDATE_INVALID_DATE2: `${error} | Vous avez entrer une date invalide. Rappel : le format de la date doit être : Jour/Mois/Année. Par exemple, 01/12/2000 pour le premier décembre 2000.`,
			BIRTHDATE_INVALID_DATE3: `${error} |  Vous avez entrer une date invalide (ou la date indiquée n'existe pas). Rappel : le format de la date doit être : Jour/Mois/Année. Par exemple, 01/12/2000 pour le premier décembre 2000.`,
			BIRTHDATE_SUCCESS: (date) => `${success} | Votre date d'anniversaire a été définie sur le ${date} !`,
			BIRTHDATE_TOO_HIGH: `${error} | Vous ne pouvez pas ne pas encore être né !`,
			
			// Weegind command
			WEDDING_DESCRIPTION: `Mariez-vous avec la personne de votre choix !`,
			WEEDING_AUTHOR_ALREADY: (prefix) => `${error} | Vous êtes déjà marié(e) ! Utilisez d'abord \`${prefix}divorce\` pour divorcer`,
			WEEDING_MEMBER_ALREADY: (username) => `${error} | La place est prise compagnon ! **${username}** est déjà marié(e) !`,
			WEEDING_AUTHOR_PENDING: (username) => `${error} | Vous avez déjà une demande en cours auprès de **${username}** !`,
			WEEDING_AUTHOR_PENDING2: (username) => `${error} | **${username}** vous a déjà envoyé une demande ! Veuillez la refuser ou l'accepter (ou attendre qu'elle expire dans quelques minutes).`,
			WEEDING_MEMBER_PENDING: (username1, username2) => `${error} | **${username2}** a déjà une demande envoyé une demande auprès de **${username1}** !`,
			WEEDING_MEMBER_PENDING2: (username1, username2) => `${error} | **${username1}** a déjà envoyé une demande auprès de **${username2}** ! Attendez que **${username2}** accepte ou refuse la demande de **${username1}** ou que celle-ci expire puis réessayez !`,
			WEEDING_REQUEST: (member, author) => `${warn} | ${member}, acceptez-vous d'épouser ${author} ? Répondez par "${yes}" ou "${no}" !`,
			WEEDING_TIMEOUT: (member) => `${error} | ${member} n'a pas répondu... Attendez qu'il/elle soit connecté(e) puis réessayez !`,
			WEEDING_SUCCESS: (author, member) => `${success} | ${author}, j'ai une bonne nouvelle... ${member} a accepté votre demande en mariage !`,
			WEEDING_DENIED: (author, member) => `${error} | ${author}, j'ai une mauvaise nouvelle... ${member} a refusé votre demande en mariage.`,
			WEEDING_SELF: `${error} | Vous ne pouvez pas vous épouser vous-même !`,

			// Divorce command
			DIVORCE_DESCRIPTION: `Divorcez avec la personne avec qui vous êtes actuellement marié(e) !`,
			DIVORCE_NOT_WEEDED: `${error} | Vous n'êtes actuellement pas marié(e) !`,
			DIVORCE_SUCCESS: (username) => `${success} | Vous venez de divorcer avec **${username}** !`,

			// Slots command
			SLOTS_DESCRIPTION: `Un équivalent au Casino !`,
			SLOTS_TOO_HIGH: (credits) => `${error} | Vous ne disposez pas de ${credits} crédit(s).`,
			SLOTS_LOOSE: (amount, username) => `**${username}** a utilisé ${amount} crédit(s) et a tout perdu.`,
			SLOTS_WIN: (text, amount, won, username) => `${text}**${username}** a utilisé ${amount} crédit(s) et a gagné ${won} crédit(s) !`,

			// 8 ball command
			EIGHTBALL_DESCRIPTION: `Je vous dis la vérité`,
			EIGHTBALL_QUESTION: `${error} | Veuillez entrer une question valide !`,
			EIGHTBALL_QUESTIONS: [
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

			// ascii command
			ASCII_DESCRIPTION: `Transforme votre texte en caractères ascii !`,
			ASCII_TEXT: `${error} | Veuillez entrer un texte valide (inférieur à 20 caractères) !`,

			// badge command
			BADGE_DESCRIPTION: `Achetez des badges qui apparaîtront sur votre profil !`,
			BADGE_HEADING: `Badges Atlanta`,
			BADGE_DESCRIPTION: (prefix) => `Pour acheter un badge, tapez \`${prefix}badge [nom-du-badge]\``,
			BADGE_FORMAT: (badge) => `Badge : ${badge.str}\nNom : ${badge.name}\nPrix : ${badge.price} crédits\n--------\n`,
			BADGE_FORMAT_ALREADY: (badge) => `Badge : ${badge.str}\nNom : ${badge.name}\nDéjà acheté (${badge.price} crédits)\n--------\n`,
			BADGE_GAMES: `Jeux`,
			BADGE_FLAGS: `Pays`,
			BADGE_OTHERS: `Autre`,
			BADGE_404: (text) => `${error} | Aucun badge trouvé pour \`${text}\``,
			BADGE_SUCCESS: (badge) => `${success} | Vous venez d'acheter le badge ${badge.name} (${badge.str}) pour ${badge.price} crédits !`,
			BADGE_PRICE: `${error} | Vous n'avez pas assez de crédits pour acheter ce badge !`,
			BADGE_ALREADY: `${error} | Vous possédez déjà ce badge !`,

			// findwords command
			FINDWORDS_DESCRIPTION: `Lance une partie de findwords, un jeu ou vous devez trouver des mots !`,
			FINDWORDS_TIMER: `${warn} | La partie commence dans 10 secondes !`,
			FINDWORDS_20S: (word) => `${warn} | 20 secondes pour trouver un mot contenant "**${word}**" !`,
			FINWORDS_INVALID_WORD: (member) => `${error} | ${member} ton mot est invalide !`,
			FINDWORDS_NOBODY: `${error} | Personne n'a réussi à trouver de mots !`,
			FINDWORDS_GG: (winner) => `${success} | Bravo <@${winner}> ! Ton mot est valide et tu as été le plus rapide !`,
			FINDWORDS_NOBODY2: `${warn} | Je ne peux définir aucun gagnant car aucun mot n'a été trouvé de toutes les parties !`,
			FINDWORDS_GG2: (user, games, total_games, time, number, members) => `:tada: | ${user} a gagné la partie !\nManche Gagnées : ${games}/${total_games}\n\n**Stats de la partie :**\n__**Temps**__: ${time}\n__**Nombre de participants**__ : ${number}\n__**Participants**__ : \n${members}`,
			FINDWORDS_END: (member) => `${member} gagne 15 crédits ! :tada:`,

			// Lovecalc
			LOVECALC_DESCRIPTION: `Combien d'amour y a t'il entre deux personnes ? *Ceci est une commande fun, a ne pas prendre au sérieux*`,
			LOVECALC_MENTIONS: `${error} | Vous devez mentionner deux membres !`,
			LOVECALC_TEXT: (percent, username1, username2) => `Il y a **${percent}%** d'amour entre **${username1}** et **${username2}** !`,

			// Number command
			NUMBER_DESCRIPTION: `Trouvez le nombre que j'ai choisi !`,
			NUMBER_START: `${warn} | Nombre déterminé, vous pouvez commencer !`,
			NUMBER_HIGHER: (number, author) => `${author} | Le nombre est plus **grand** que \`${number}\` !`,
			NUMBER_SMALLER: (number, author) => `${author} | Le nombre est plus **petit** que \`${number}\` !`,
			NUMBER_GG2: (member) => `<@${member}> a gagné 10 crédits !`,
			NUMBER_GG1: (user, number, time, nb, members) => `:tada: | ${user} a trouvé le nombre ! C\'était __**${number}**__ !\n\n**Stats de la partie :**\n__**Temps**__: ${time}\n__**Nombre de participants**__ : ${nb}\n__**Participants**__ : \n${members}`,
			NUMBER_LOOSE: (number) => `${error} | Personne n'a réussi à trouver le nombre ! C'était ${number} !`,

			// Random command
			RANDOM_DESCRIPTION: `Tire aléatoirement un des choix que vous me donner !`,
			RANDOM_2_CHOICES: `${error} | Vous devez entrer plus de deux choix !`,
			RANDOM_CHOOSED: `${success} | Voici mon choix :`,
			RANDOM_WAIT: `${loading} | Choix en cours...`,
			RANDOM_BLANK: `${error} | Un de vos choix semble être vide... Veuillez réessayer !`,

			// Lmg command
			LMG_DESCRIPTION: `Renvoie un lien lmgtfy pour la recherche indiquée !`,
			LMG_SEARCH: `${error} | Vous devez préciser une recherche !`,

			// flip command
			FLIP_DESCRIPTION: `Je lance les dés pour vous !`,
			FLIP_PILE: `:game_die: | C'est **pile** !`,
			FLIP_FACE: `:game_die: | C'est **face** !`,

			// tweet command
			TWEET_DESCRIPTION: `Génère un tweet d'une personne de votre choix sur Twitter grâce à l'api nekobot !`,
			TWEET_USERNAME: `${error} | Vous devez entrer le pseudo twitter de quelqu'un !`,
			TWEET_TEXT: `${error} | Vous devez entrer un message !`,
			TWEET_TXT: (user) => `Nouveau tweet publié par ${user} :`,

			// qrcode
			QRCODE_DESCRIPTION: `Affiche un QR Code avec votre mot !`,
			QRCODE_TEXT: `${error} | Vous devez entrer un texte !`,

			// hastebin command
			HASTEBIN_DESCRIPTION: `Upload votre texte sur hastebin !`,
			HASTEBIN_TEXT: `${error} | Vous devez entrer un texte !`,
			HASTEBIN_SUCCESS: (url) => `${success} | Votre texte a été uploadé sur hastebin ! Voici votre lien : ${url}`,

			// stats command
			STATS_DESCRIPTION: `Affiche les stats du bot !`,
			STATS_HEADING: `Stats d'${botname}`,
			STATS_DESC: `${botname} est un bot open source développé par ${owner} !`,
			STATS_HEADERS:[
				`${stats[0]} • __Statistiques__`,
				`${stats[1]} • __RAM__`,
				`${stats[2]} • __Version__`,
				`${stats[3]} • __En ligne__`,
				`${stats[4]} • __Liens__`,
				`${stats[5]} • __Musique__`,
				`${stats[6]} • __Remerciements & crédits__`,
			],
			STATS_STATS: (serv, users) => `\`Serveurs : ${serv}\`\n\`Utilisateurs : ${users}\``,
			STATS_ONLINE: (time) => `Depuis ${time}`,
			STATS_VC: (nb) => `Musique en cours sur \`${nb}\` serveurs`,
			STATS_CREDITS: `Merci à \`https://icones8.fr/icons/\`, tous les emojis (ou presque) viennent de ce site !`,
			STATS_LINKS: (url) => `[Github](https://github.com/Androz2091) | [Inviter Atlanta](https://discordapp.com/oauth2/authorize?client_id=563420709423153152&scope=bot&permissions=2146958847) | [Support](${url}) | [Don](https://paypal.me/andr0z)`,

			// invite command
			INVITE_DESCRIPTION: `Affiche les liens d'${botname} !`,
			INVITE_HEADING: `Liens principaux`,
			INVITE_DESC: (prefix) => `Tapez \`${prefix}invite copy\` pour pouvoir copier le lien !`,
			INVITE_FIELD1: `${invite[0]} Inviter ${botname}`,
			INVITE_FIELD2: `${invite[1]} Voter pour ${botname}`,
			INVITE_FIELD3: `${invite[2]} Support`,

			// translate command
			TRANSLATE_DESCRIPTION: `Je traduis votre texte !`,
			TRANSLATE_LANG: (prefix) => `${error} | Veuillez entrer une langue ! Pour afficher la liste des langues, tapez \`${prefix}translate langs-list\` !`,
			TRANSLATE_LANG1: (prefix, lang) => `${error} | La langue \`${lang}\` n'existe pas ! Pour afficher la liste des langues, tapez \`${prefix}translate langs-list\` !`,
			TRANSLATE_LANGS: `${success} | La liste des langues vient de vous être envoyé par messages privés !`,
			TRANSLATE_MSG: `${error} | Veuillez entrer un texte à traduire !`,

			// servers list command
			SERVERS_LIST_DESCRIPTION: `Affiche mes serveurs !`,

			// userinfo command
			USERINFO_DESCRIPTION: `Affiche des informations sur l'utilisateur !`,
			USERINFO_ID: (id) => `${error} | Aucun utilisateur sur Discord ne possède l'ID \`${id}\` !`,
			USERINFO_FIELDS: [
				"<:username:567018125938130951> Pseudo",
				"<:discriminator:567017866856103950> Discriminateur",
				"<:bdg_IAMABOT:566892351570706432> Robot",
				"<:avatar:567020705728692271> Avatar",
				"<:calendar:567019405767213096> Création",
				"<:games:567019785620029529> Jeu",
				"<:online:567020241427890195> Statut",
				// member infos
				"<:up:567024250364493933> Rôle",
				"<:calendar2:567025420508200970> Arrivée",
				"<:pencil:567029174955671552> Surnom",
				"<:roles:567028552256454657> Rôles",
				"<:color:567030657545404446> Couleur"
			],
			USERINFO_NO_GAME: `Pas de jeu`,
			USERINFO_NO_ROLE: `Aucun rôle`,
			USERINFO_MORE_ROLES: (nb) => ` et ${nb} autres rôles`,
			USERINFO_NO_NICKNAME: `Pas de surnom`,

			// play command
			PLAY_DESCRIPTION: `Joue de la musique !`,
			PLAY_CANT_JOIN: `${error} | Je ne peux pas rentrer dans le salon vocal !`,
			PLAY_ADDED_TO_QUEUE: (title) => `<:add:566991586182037525> | ${title} a été ajouté à la queue !`,
			PLAY_NO_SONG: `${error} | Plus aucune musique dans la queue !`,
			PLAY_PLAYING: `Lecture en cours`,
			PLAY_UTILS: [
				"<:title:567363421776117778> Titre",
				"<:rap:567363851922833409> Chanteur",
				"<:time:567364870887178261> Durée",
				"<:search:567372154006536193> Recherche",
				"<:calendar:567019405767213096> Création",
				"<:desc:567390492845801473> Description"
			],
			PLAY_SEARCH: "Veuillez indiquer une valeur pour sélectionner l'un des résultats de recherche compris entre 1 et 10.",
			PLAY_PROVIDE_A_NAME: `${error} | Veuillez entrer un nom de vidéo à chercher !`,
			PLAY_VOICE_CHANNEL: `${error} | Vous devez être connecté dans un salon vocal !`,
			PLAY_PERMS: `${error} | Une erreur s'est produite. Soit je ne peux pas me connecter dans votre salon, soit je ne peux pas parler dans votre salon. Vérifiez mes permissions et réessayez.`,
			PLAY_TIMEOUT: `${error} | Temps écoulé ! Veuillez retaper la commande !`,
			PLAY_404: `${error} | Aucun résultat sur Youtube !`,
			PLAY_NOT_PLAYING: `${error} | Aucune musique en cours !`,

			// stop command
			STOP_DESCRIPTION: `Arrête la musique en cours !`,
			STOP_SUCCESS: `${success} | Je viens d'arrêter la musique !`,

			// queue command
			QUEUE_DESCRIPTION: `Affiche la queue`,
			QUEUE_HEADER: `<:queue:567387470837317662> Playlist`,

			// np command 
			NP_DESCRIPTION: `Affiche la musique actuelle !`,

			// pause command 
			PAUSE_DESCRIPTION: `Met votre musique en pause !`,
			PAUSE_ALREADY: `${error} | La musique est déjà en pause !`,
			PAUSE_SUCCESS: (prefix) => `${success} | La musique est sur pause (utilise \`${prefix}resume\` pour la relancer)`,

			// resume command
			RESUME_DESCRIPTION: `Met votre musique sur play !`,
			RESUME_NOT_PAUSED: `${error} | La musique n'est pas sur pause !`,
			RESUME_SUCCESS: `${success} | La musique est de nouveau en cours de lecture !`,

			// skip command
			SKIP_DESCRIPTION: `Passe à la chanson suivante !`,
			SKIP_SUCCESS: `${success} | Je viens de changer la chanson !`,

			// ban command
			BAN_DESCRIPTION: `Banni le membre mentionné !`,
			BAN_ID: (id) => `${error} | Aucun utilisateur sur Discord ne possède l'ID \`${id}\` !`,
			BAN_ALREADY_BANNED: (user) => `${error} | **${user.username}** est déjà banni !`,
			BAN_ERROR: `${error} | Une erreur est survenue... vérifiez que j'ai bien les permissions de bannir ce membre est réessayez !`,
			BAN_DM: (user, msg, reason) => `${error} | Bonjour <@${user.id}>,\nVous venez d'être banni de **${msg.guild.name}** par **${msg.author.tag}** pour **${reason}** !`,
			BAN_SUCCESS: (user, msg, reason) => `${success} | **${user.username}** vient d'être banni de **${msg.guild.name}** par **${msg.author.tag}** pour **${reason}** !`,

			// mod logs embed
			MODLOGS_HEADERS: (cas) => [
				`Ban | Cas #${cas}`,
				`Kick | Cas #${cas}`,
				`Unban | Cas #${cas}`,
				`Avertissement | Cas #${cas}`,
				`Mute | Cas #${cas}`,
				`Unmute | Cas #${cas}`
			],
			MODLOGS_UTILS: [
				`Membre`,
				`Modérateur`,
				`Raison`,
				`Temps`
			],

			// setlogs command
			SETLOGS_DESCRIPTION: `Définissez le salon des logs !`,
			SETLOGS_SUCCESS: (id) => `${success} | Salon des logs défini sur <#${id}> !`,

			// kick command
			KICK_DESCRIPTION: `Expulse le membre mentionné !`,
			KICK_ERROR:  `${error} | Une erreur est survenue... vérifiez que j'ai bien les permissions d'expulser ce membre est réessayez !`,
			KICK_DM: (user, msg, reason) => `${error} | Bonjour <@${user.id}>,\nVous venez d'être expulsé de **${msg.guild.name}** par **${msg.author.tag}** pour **${reason}** !`,
			KICK_SUCCESS: (user, msg, reason) => `${success} | **${user.username}** vient d'être expulsé de **${msg.guild.name}** par **${msg.author.tag}** pour **${reason}** !`,

			// Unban command
			UNBAN_DESCRIPTION: `Unban l'utilisateur du serveur !`,
			UNBAN_ID: (id) => `${error} | Aucun utilisateur sur Discord ne possède l'ID \`${id}\` !`,
			UNBAN_NOT_BANNED: (user) => `${error} | **${user.username}** n'est pas banni !`,
			UNBAN_SUCCESS: (user, msg) => `${success} | **${user.username}** vient d'être débanni de **${msg.guild.name}** !`,

			// clear command
			CLEAR_DESCRIPTION: `Supprime un nombre de message très rapidement !`,
			CLEAR_AMOUNT: `${error} | Vous devez préciser un nombre de messages à supprimer !`,
			CLEAR_CLEANED1: (amount, member) => `${success} | **${amount}** messages de **${member.user.tag}** supprimés !`,
			CLEAR_CLEANED2: (amount) => `${success} | **${amount}** messages supprimés !`,

			// Checkinvites command
			CHECKINVITES_DESCRIPTION: `Vérifie le jeu de chaque membre pour voir s'il n'y a pas une publicité dedans !`,
			CHECKINVITES_NOBODY: `Après une vérification intense, personne ne semble posséder d'invitations discord dans son jeu !`,

			// setwarns command
			SETWARNS_DESCRIPTION: `Définissez les sanctions qu'obtiendront les membres au bout d'un certain nombre de warns !`,
			SETWARNS_USAGE: (prefix) => `${error} | Utilisation : ${prefix}setwarns 4 kick <= quand un membre atteindra les 4 warns, il sera kick.\n${prefix}setwarns 4 reset <= reset la sanction définie lorsqu'un membre atteint les 4 warns.`,
			SETWARNS_ALREADY_A_SANCTION: (prefix, sanction, number) => `${error} | Une sanction (${sanction}) est déjà définie lorsqu\'un membre atteint les ${number} warns. Veuillez d\'abord taper \`${prefix}setwarns ${number} reset\` puis réessayez.`,
			SETWARNS_SUCCESS: (prefix, sanction, number) => `${success} | Configuration enregistrée ! Lorsqu\'un membre aura atteint les ${number} warns, il sera ${sanction}. Tapez \`${prefix}configuration\` pour voir votre nouvelle configuration !`,
			SETWARNS_SANCTION_ALREADY_USED: (prefix, sanction, number) => `${error} | La sanction ${sanction} est déjà prévue pour les ${number} warns. Tapez \`${prefix}setwarns ${number} reset\` puis réessayez.`,
			SETWARNS_NO_SANCTION: (number) => `Aucune sanction ne correspondait à ${number} warns !`,
			SETWARNS_SUCCESS_DELETE: (prefix, sanction, number) => `${success} | La sanction correspondant à ${number} warns (${sanction}) vient d'être supprimée ! Tapez \`${prefix}configuration\` pour voir votre nouvelle configuration !`,

			// warn command
			WARN_DESCRIPTION: `Averti un membre en messages privés !`,
			WARN_REASON: `${error} | Veuillez entrer une raison !`,
			WARN_AUTOBAN: (member, number) => `${success} | **${member.user.tag}** a été banni automatiquement car il avait plus de **${number}** warns !`,
			WARN_AUTOKICK: (member, number) => `${success} | **${member.user.tag}** a été expulsé automatiquement car il avait plus de **${number}** warns !`,
			WARN_DM: (msg, reason) => `${error} | Vous venez d'être averti sur **${msg.guild.name}** par **${msg.author.tag}** pour **${reason}** !`,
			WARN_SUCCESS: (member, reason) => `${success} | **${member.user.tag}** a été averti par messages privés pour **${reason}** !`,

			// seewwarns command
			SEEWARNS_DESCRIPTION: `Affiche les avertissements (warns) d'un membre !`,
			SEEWARNS_NO_WARN: `Aucun avertissement enregistré.`,
			SEEWARNS_HEADER: (tcase) => `Cas #${tcase}`,
			SEEWARNS_MODERATOR: (warn) => `**Modérateur** : <@${warn.moderator}>`,
			SEEWARNS_REASON: (warn) => `**Raison** : ${warn.reason}`,

			// mute command
			MUTE_DESCRIPTION: `Empêche le membre de parler pendant un certain temps !`,
			MUTE_SUCCESS: (member, time, reason) => `${success} | **${member.user.tag}** est mute pendant **${time}** pour **${reason}** !`,
			MUTE_DM: (message, time, reason) => `${error} | Vous êtes mute sur **${message.guild.name}** pendant **${time}** pour **${reason}** !`,

			// sondage command
			POLL_DESCRIPTION: `Envoie un sondage !`,
			POLL_QUESTION: `${error} | Vous devez entrer une question !`,
			POLL_MENTION: `Souhaitez-vous ajouter une mention à votre message ? Répondez par "${yes}" ou "${no}" !`,
			POLL_MENTION2: `Tapez une des réponses suivantes : \`every\` (pour une mention @ everyone) ou \`here\` (pour une mention @ here) !`,
			POLL_TIMEOUT: `${error} | Temps écoulé ! Veuillez retaper la commande !`,
			POLL_REACT: `Réagissez avec ${success} ou ${error} !`,
			POLL_HEADING: `📊 Sondage :`,

			// setafk command
			SETAFK_DESCRIPTION: `Devenez AFK (les membres qui vous mentionneront recevront un message)`,
			SETAFK_REASON: `${error} | Veuillez préciser la raison de votre afk !`,
			SETAFK_SUCCESS: (reason) => `${success} | Vous êtes passé afk (raison : ${reason})`,
			
			// afk command
			AFK_DELETED: (user) => `${user}, votre AFK vient d'être retiré !`,
			AFK_IS_AFK: (member, reason) => `**${member.user.tag}** est actuellement afk pour \`${reason}\``,

			// guildinfo command
			GUILDINFO_DESCRIPTION: `Affiche des informations sur le serveur !`,
			GUILDINFO_FIELDS:[
				"<:title:567363421776117778> Nom",
				"<:calendar:567019405767213096> Création",
				"<:users:568121122391064606> Membres",
				"<:channels:568121595227406337> Salons",
				"<:afk:568121945477087232> Salon AFK",
				"<:id:568122139291680789> ID",
				"<:founder:568122623599443978> Fondateur"
			],
			GUILDINFO_MEMBERCOUNT: (members) => `${members.filter(m => m.user.bot).size} membres | ${members.filter(m => !m.user.bot).size} bots`,
			GUILDINFO_NO_AFK: `Aucun salon AFK`,
			GUILDINFO_CHANNELS: (channels) => `${channels.filter(ch => ch.type === 'voice').size} vocaux | ${channels.filter(ch => ch.type === 'text').size} textuels | ${channels.filter(ch => ch.type === 'category').size} catégories`,

			// invitations command
			INVITATIONS_DESCRIPTION: `Affiche le nombre de personnes que vous avez invitées sur le serveur !`,
			INVITATIONS_NOBODY: `${error} | Vous n'avez invité personne sur le serveur !`,
			INVITATIONS_CODE: (invite) => `**${invite.code}** (${invite.uses} utilisations) | ${invite.channel}\n`,
			INVITATIONS_HEADING: (member, msg) => `Informations sur les invitations de ${member} sur ${msg.guild.name}`,
			INVITATIONS_FIELDS: [
				'👥 Personnes Invitées',
				'🔑 Codes',
				'membres'
			],

			// remind me
			REMINDME_DESCRIPTION: `Définissez un rappel !`,
			REMINDME_MESSAGE: `${error} | Vous devez entrer un message qui vous sera envoyé à la fin du temps !`,
			REMINDME_SAVED: `${success} | Rappel correctement enregistré, vous recevrez un message à la fin du temps !`,

			// someone command
			SOMEONE_DESCRIPTION: `Tire un membre aléatoire sur le serveur !`,

			// unmute command
			UNMUTE_DESCRIPTION: `Unmute un membre !`,
			UNMUTE_SUCCESS: (member) => `${success} | ${member} a maintenant les permissions d'écrire.`,

			//minimize command
			MINIMIZE_DESCRIPTION: `Raccourci votre lien !`,
			MINIMIZE_ERROR: `${error} | URL incompatible avec le raccourcisseur d'URL.`,
			MINIMIZE_URL: `${error} | Veuillez entrer une URL !`,

			// Suggestion command
			SUGGEST_DESCRIPTION: `Envoie votre suggestion dans le salon défini pour ça !`,
			SUGGEST_NO_CHANNEL: `${error} | Aucun salon de suggestion défini !`,
			SUGGEST_SUGG: `${error} | Veuillez entrer une suggestion !`,
			SUGGEST_HEADER: (user) => `Suggestion - ${user.tag}`,
			SUGGEST_HEADERS: [
				"Auteur",
				"Date",
				"Contenu"
			],
			SUGGEST_SUCCESS: (channel) => `${success} | Votre suggestion est en cours de vote dans ${channel} !`,

			// setsuggests command
			SETSUGGESTS_DESCRIPTION: `Définissez le salon des suggestions !`,
			SETSUGGESTS_SUCCESS: (channel) => `${success} | Le salon des suggestions est maintenant ${channel} !`

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
            "janvier", "février", "mars",
            "avril", "mai", "juin", "juillet",
            "août", "septembre", "octobre",
            "novembre", "décembre"
        ];

        var day = pdate.getDate();
        var monthIndex = pdate.getMonth();
        var year = pdate.getFullYear();
        var hour = pdate.getHours();
        var minute = pdate.getMinutes();

		var thedate = (isLongDate) ? day + ' ' + monthNames[monthIndex] + ' ' + year + " à " + hour + "h" + minute 
		: thedate = day + ' ' + monthNames[monthIndex] + ' ' + year;
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
		return h + ' heure(s) ' + m + ' minute(s) ' + s + ' seconde(s)';
	}

}