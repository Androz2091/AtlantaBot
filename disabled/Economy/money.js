const Command = require("../../base/Command.js"),
Discord = require("discord.js");

const asyncForEach = async (array, callback) => {
    for (let index = 0; index < array.length; index++) {
        await callback(array[index], index, array);
    }
}

class Credits extends Command {

    constructor (client) {
        super(client, {
            name: "money",
            description: (language) => language.get("MONEY_DESCRIPTION"),
            usage: (language) => language.get("MONEY_USAGE"),
            examples: (language) => language.get("MONEY_EXAMPLES"),
            dirname: __dirname,
            enabled: true,
            guildOnly: true,
            aliases: [ "credits", "balance" ],
            memberPermissions: [],
            botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],
            nsfw: false,
            ownerOnly: false,
            cooldown: 1000
        });
    }

    async run (message, args, data) {
        
        let member = await this.client.resolveMember(args[0], message.guild);
        if(!member) member = message.member;
        let user = member.user;

        if(user.bot){
            return message.channel.send(message.language.get("ERR_BOT_USER"));
        }

        let memberData = (message.author === user) ? data.memberData : await this.client.findOrCreateMember({ id: user.id, guildID: message.guild.id }); 

        let commonsGuilds = this.client.guilds.filter((g) => g.members.cache.get(user.id));
        let globalMoney = 0;
        await asyncForEach(commonsGuilds.array(), async (guild) => {
            let memberData = await this.client.findOrCreateMember({ id: user.id, guildID: guild.id });
            globalMoney+=memberData.money;
            globalMoney+=memberData.bankSold;
        });

        let embed = new Discord.MessageEmbed()
            .setAuthor(message.language.get("CREDITS_TITLE", user.tag), user.displayAvatarURL())
            .addField(message.language.get("PROFILE_HEADINGS").MONEY, message.language.get("DISPLAY_MONEY", Math.ceil(memberData.money)), true)
            .addField(message.language.get("PROFILE_HEADINGS").BANK, message.language.get("DISPLAY_MONEY",  Math.ceil(memberData.bankSold)), true)
            .addField(message.language.get("PROFILE_HEADINGS").GLOBAL_MONEY, message.language.get("DISPLAY_MONEY",  Math.ceil(globalMoney)), true)
            .setColor(data.config.embed.color)
            .setFooter(data.config.embed.footer)
        message.channel.send(embed);
    }

}

module.exports = Credits;
