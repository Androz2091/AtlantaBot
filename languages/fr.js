var 
warn = "<:atlanta_warn:565212996565991425>",
error = "<:atlanta_error:565212755804684318>",
success = "<:atlanta_success:565212709591973896>",
loading = "<a:atlanta_loading:565214530121105418>"

var owner = "`Androz#2091`";
yes = 'oui',
no = 'non',
botname = 'Atlanta'

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

			// ERROR MESSAGE
			INHIBITOR_MISSING_BOT_PERMS: (perms) => `${error} | J'ai besoin des permissions suivantes pour effectuer cette commande : ${perms}`,
			INHIBITOR_NSFW: `${error} | Vous devez vous rendre dans un salon qui autorise le NSFW pour taper cette commande !`,
			INHIBITOR_PERMISSIONS:(perm) => `${error} | Vous n'avez pas les permissions nécessaires pour effectuer cette commande (\`${perm}\`)`,
			COMMAND_DISABLED: `${error} | Cette commande est actuellement désactivée !`,
			OWNER_ONLY: `${error} | Seul ${owner} peut effectuer ces commandes !`,
			MENTION_CHANNEL: `${error} | Veuillez mentionner un salon valide !`,
			MENTION_ROLE: `${error} | Veuillez mentionner un rôle valide !`,
			MENTION_MEMBER: `${error} | Veuillez mentionner un membre valide !`,
			CHANNEL_IGNORED: (channel) => `${error} | Les commandes sont interdites dans ${channel} !`,
			BAD_PARAMETERS: (cmd, prefix) => `${error} | Veuillez vérifier les paramètres de la commande. Regardez les exemples en tapant \`${prefix}help ${cmd.help.name}\` !`,
			ROLE_NOT_FOUND: (role) => `${error} | Aucun rôle trouvé avec \`${role}\` !`,
			YES_OR_NO: `${error} | Vous devez répondre par "oui" ou par "non" !`,
			INVALID_TIME: `${error} | Vous devez entrer un temps valide ! Unités valides : \`s\`, \`m\`, \`h\`, \`d\`, \`w\`, \`y\``,
			MENTION_EVERYONE: `${error} | Vous n'avez pas l'autorisation de mentionner everyone ou here dans les commandes.`,
			IS_A_BOT: `${error} | Cet utilisateur est un bot !`,
			NAN: (nan) => `${error} | \`${nan}\` n'est pas un nombre valide !`,
			
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
			HELP_PERMISSIONS: `Permissions :`,
			HELP_CUSTOMIZED: (cmd) => `${error} | La commande ${cmd} ne dispose pas d'aide car elle est personnalisée.`,

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
			WELCOME_IMG: (name) => `Sur ${name} !`,

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

			// Profile command
			PROFILE_DESCRIPTION: `Affiche le profil du membre mentionné (ou de l'auteur du message)`,
			PROFILE_HEADING: (username) => `Profil de ${username}`,
			NO_BIO: `Aucune biographie enregistrée`,
			DISPLAY_REP: (points) => `**${points}** point(s)`,
			DISPLAY_CREDITS: (credits) => `**${credits}** crédit(s)`,
			NO_PARTNER: `Célibataire`,
			NO_BIRTHDATE: `Indéfini`,
			
			// work command
			WORK_DESCRIPTION: `Travaillez et gagnez de l'argent !`,
			WORK_COOLDOWN: (delai) => `${error} | Vous devez attendre ${delai} avant de pouvoir de nouveau travailler !`,
			SALARY_CLAIMED: `Salaire`,
			SALARY_CLAIMED2: `200 crédits ajoutés à votre compte !`,

			// Eval
			EVAL_DESCRIPTION: `Exécute le code`,
			
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

			// Divorce command
			DIVORCE_DESCRIPTION: `Divorcez avec la personne avec qui vous êtes actuellement marié(e) !`,
			DIVORCE_NOT_WEEDED: `${error} | Vous n'êtes actuellement pas marié(e) !`,
			DIVORCE_SUCCESS: (username) => `${success} | Vous venez de divorcer avec **${username}** !`
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