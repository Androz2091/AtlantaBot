const Command = require("../../structures/Command"),
    Constants = require("../../utility/Constants"),
    Resolvers = require("../../utility/Resolvers"),
    Discord = require("discord.js"),
    moment = require("moment");

module.exports = class extends Command {
    constructor(...args) {
        super(
            {
                aliases: ["profil"],
                userPermissionLevel: Constants.PermissionsLevels.SERVER_MEMBER
            },
            ...args
        );
    }

    async execute(message, args) {

        const member = await Resolvers.resolveMember({
            message,
            search: args.join(" "),
            useMessageContent: false
        }) || message.member;

        // Check if the user is a bot
        if(member.user.bot){
            return message.error("economy/profile:BOT_USER");
        }

        const memberData = await this.client.handlers.database.fetchMember(message.member.id, message.guild.id);
        const membersData = await this.client.handlers.database.fetchMembers(message.member.id);
        const userData = await this.client.handlers.database.fetchUser(message.author.id);

        // Check if the lover is cached
        const lover = userData.relationShips.current ? await this.client.users.fetch(userData.relationShips.current.partnerID) : false;
        // Calc global money
        const globalMoney = Math.ceil(membersData.map((m) => m.cash + m.bank).reduce((p, c) => p + c));
        // Format birthdate
        let birthdate;
        if(userData.birthdate){
            const guildLanguage = message.guild.settings.language.substr(0, 2);
            if(guildLanguage !== "en") require(`moment/locale/${guildLanguage}`);
            birthdate = moment(userData.birthdate)
            .locale(guildLanguage)
            .format("LL");
        } else {
            birthdate = message.translate("economy/profile:NO_BIRTHDATE");
        }
        

        const profileEmbed = new Discord.MessageEmbed()
            .setAuthor(message.translate("economy/profile:TITLE", { username: member.user.tag }), member.user.displayAvatarURL())
            //.attachFiles([{ attachment: await userData.getAchievements(), name: "achievements.png" }])
            //.setImage("attachment://achievements.png")
            .setDescription(userData.bio ? userData.bio : message.translate("economy/profile:NO_BIO"))
            .addField(message.translate("economy/profile:CASH"), message.translate("economy/profile:MONEY", {
                money: memberData.cash
            }), true)
            .addField(message.translate("economy/profile:BANK"), message.translate("economy/profile:MONEY", {
                money: memberData.bank
            }), true)
            .addField(message.translate("economy/profile:GLOBAL"), message.translate("economy/profile:MONEY", {
                money: globalMoney
            }), true)
            .addField(message.translate("economy/profile:REPUTATION"), message.translate("economy/profile:REP_POINTS", {
                points: userData.rep
            }), true)
            .addField(message.translate("economy/profile:LEVEL"), `**${memberData.level}**`, true)
            .addField(message.translate("economy/profile:BIRTHDATE"), birthdate, true)
            .addField(message.translate("economy/profile:LOVER"), (userData.lover ? lover.tag : message.translate("economy/profile:NO_LOVER")), true)
            .addField(message.translate("economy/profile:COMMANDS"), message.guild.settings.commandLogs.filter((c) => c.userID === member.id).length, true)
            .addField(message.translate("economy/profile:PERMISSIONS"), message.userPermissions.title, true)
            //.addField(message.language.get("PROFILE_HEADINGS").ACHIEVEMENTS, message.language.get("PROFILE_ACHIEVEMENTS", data.guild.prefix))
            .setColor(this.client.config.embed.color) // Sets the color of the embed
            .setFooter(this.client.config.embed.footer) // Sets the footer of the embed
            .setTimestamp();

        message.channel.send(profileEmbed); // Send the embed in the current channel
    }

}
