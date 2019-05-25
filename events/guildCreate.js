module.exports = class {
    constructor (client) {
      this.client = client;
    }
    
    async run (guild) {
        
        // Loads discord lib
        var Discord = require('discord.js');

        if(this.client.databases[5].get(`guilds.${guild.id}`)){
            guild.owner.send(`Ce serveur (**${guild.name}**) est blacklist d'Atlanta pour la raison suivante : \`${this.client.databases[5].get(`guilds.${guild.id}`)}\``).then(() => {
                guild.leave();
            }).catch(err => {
                guild.leave();
            });
        }

        // Inits guild data 
        this.client.functions.createGuild(this.client, guild);

        // Fetch the guild owner
        this.client.fetchUser(guild.ownerID).then(owner => {

            // Send a dm to the guild founder 
            var embed = new Discord.RichEmbed()
                .setAuthor('Thank you for adding me to your guild !')
                .setDescription('To configure me, type `'+this.client.config.prefix+'help` and look at the administration commands!\nTo change the language, type `'+this.client.config.prefix+'setlang [language]`.')
                .setColor(this.client.config.embed.color)
                .setFooter(this.client.config.embed.footer)
                .setTimestamp();
            owner.send(embed).catch(err => this.client.logger.log(`I can't send message of thanks to the founder of ${guild.id}`, 'error'))

            // Sends log embed in the logs channel
            var embed = new Discord.RichEmbed().setAuthor(guild.name, guild.iconURL).setColor("#32CD32").setDescription("J'ai rejoint **"+guild.name+"**, avec **"+guild.members.filter((m) => !m.user.bot).size+"** membres (et "+guild.members.filter((m) => m.user.bot).size+" bots)");
            this.client.channels.get(this.client.config.support.logs).send(embed);
        });
    }
}  