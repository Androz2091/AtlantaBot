const Discord = require("discord.js"),
proUsers = require("../../assets/json/pro_users.json");

module.exports = class {

    constructor (client) {
      this.client = client;
    }
    
    async run (guild) {

        if(this.client.config.proMode){
            if(!proUsers.includes(guild.ownerID) || this.guilds.filter((g) => g.ownerID === guild.ownerID) > 1){
                this.client.logger.log(guild.ownerID+" tried to invite Atlanta on its server.");
                return guild.leave();
            }
        }
        
        guild = await guild.fetch();

        let thanksEmbed = new Discord.MessageEmbed()
            .setAuthor("Thank you for adding me to your guild !")
            .setDescription("To configure me, type `"+this.client.config.prefix+"help` and look at the administration commands!\nTo change the language, type `"+this.client.config.prefix+"setlang [language]`.")
            .setColor(this.client.config.embed.color)
            .setFooter(this.client.config.embed.footer)
            .setTimestamp();
        guild.owner.send(thanksEmbed).catch((err) => {});

        let text = "J'ai rejoint **"+guild.name+"**, avec **"+guild.members.filter((m) => !m.user.bot).size+"** membres (et "+guild.members.filter((m) => m.user.bot).size+" bots)";

        // Sends log embed in the logs channel
        let logsEmbed = new Discord.MessageEmbed()
            .setAuthor(guild.name, guild.iconURL())
            .setColor("#32CD32")
            .setDescription(text);
        this.client.channels.get(this.client.config.support.logs).send(logsEmbed);
        
    }
}  