module.exports = class {
    constructor (client) {
      this.client = client;
    }
    
    async run (guild) {
        
        // Loads discord lib
        var Discord = require('discord.js');
        
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
            var log_embed = new Discord.RichEmbed()
                .setAuthor(guild.name, guild.iconURL)
                .setDescription('Merci au staff du serveur `'+guild.name+'` de m\'avoir ajouté !')
                .addField('ID', guild.id, true)
                .addField('Membres', `${parseInt(guild.memberCount - guild.members.filter(m => m.user.bot).size)} membres | ${guild.members.filter(m => m.user.bot).size} bots`)
                .addField('Salons', `${guild.channels.filter(ch => ch.type === 'text').size} textuels | ${guild.channels.filter(ch => ch.type === 'voice').size} ${(guild.channels.filter(ch => ch.type === 'voice').size > 1) ? 'vocaux' : 'vocal'} | ${guild.channels.filter(ch => ch.type === 'category').size} catégories`)
                .addField('Fondateur', `${owner.username}#${owner.discriminator}`)
                .setColor(this.client.config.embed.color)
                .setFooter(this.client.config.embed.footer)
            this.client.channels.get(this.client.config.support.logs).send(log_embed);
        });
    }
}  