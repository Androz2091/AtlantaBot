const Command = require("../../base/Command.js"),
Discord = require("discord.js");

const asyncForEach = async (array, callback) => {
    for (let index = 0; index < array.length; index++) {
        await callback(array[index], index, array);
    }
}

const Canvas = require("canvas");

class Profile extends Command {

    constructor (client) {
        super(client, {
            name: "profile",
            dirname: __dirname,
            enabled: true,
            guildOnly: true,
            aliases: [ "profil" ],
            memberPermissions: [],
            botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],
            nsfw: false,
            ownerOnly: false,
            cooldown: 3000
        });
    }

    async run (message, args, data) {

        let client = this.client;

        let member = await client.resolveMember(args[0], message.guild);
        if(!member) member = message.member;

        // Check if the user is a bot
        if(member.user.bot){
            return message.error("economy/profile:BOT_USER");
        }

        // Gets the data of the user whose profile you want to display
        let memberData = (member.id === message.author.id ? data.memberData : await client.findOrCreateMember({ id: member.id, guildID: message.guild.id}));
        let userData = (member.id === message.author.id ? data.userData : await client.findOrCreateUser({ id: member.id }));

        // Check if the lover is cached 
        if(userData.lover && !message.client.users.get(userData.lover)){
            await message.client.users.fetch(userData.lover, true);
        }

        let commonsGuilds = client.guilds.filter((g) => g.members.get(member.id));
        let globalMoney = 0;
        await asyncForEach(commonsGuilds.array(), async (guild) => {
            let memberData = await client.findOrCreateMember({ id: member.id, guildID: guild.id });
            globalMoney+=memberData.money;
            globalMoney+=memberData.bankSold;
        });

        let profileEmbed = new Discord.MessageEmbed()
            .setAuthor(message.translate("economy/profile:TITLE", {
                username: member.user.tag
            }), member.user.displayAvatarURL())
            .attachFiles([{ attachment: await userData.getAchievements(), name: "achievements.png" }])
            .setImage("attachment://achievements.png")
            .setDescription(userData.bio ? userData.bio : message.translate("economy/profile:NO_BIO"))
            .addField(message.translate("economy/profile:CASH"), message.translate("economy/profile:MONEY", {
                money: memberData.money
            }), true)
            .addField(message.translate("economy/profile:BANK"), message.translate("economy/profile:MONEY", {
                money: memberData.bankSold
            }), true)
            .addField(message.translate("economy/profile:GLOBAL"), message.translate("economy/profile:MONEY", {
                money: globalMoney
            }), true)
            .addField(message.translate("economy/profile:REPUTATION"), message.translate("economy/profile:REP_POINTS", {
                points: userData.rep
            }), true)
            .addField(message.translate("economy/profile:LEVEL"), `**${memberData.level}**`, true)
            .addField(message.translate("economy/profile:EXP"), `**${memberData.exp}** xp`, true)
            .addField(message.translate("economy/profile:REGISTERED"), message.printDate(new Date(memberData.registeredAt)), true)
            .addField(message.translate("economy/profile:BIRTHDATE"), (!userData.birthdate ? message.translate("economy/profile:NO_BIRTHDATE"): message.printDate(new Date(userData.birthdate))), true)
            .addField(message.translate("economy/profile:LOVER"), (!userData.lover ? message.translate("economy/profile:NO_LOVER") : message.client.users.get(userData.lover).tag), true)
            .addField(message.translate("economy/profile:ACHIEVEMENTS"), message.translate("economy/profile:ACHIEVEMENTS_CONTENT", {
                prefix: data.guild.prefix
            }))
            .setColor(data.config.embed.color) // Sets the color of the embed
            .setFooter(data.config.embed.footer) // Sets the footer of the embed
            .setTimestamp();

        message.channel.send(profileEmbed); // Send the embed in the current channel
    }

}

module.exports = Profile;