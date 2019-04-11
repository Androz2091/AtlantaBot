module.exports = class {
    constructor (client) {
      this.client = client;
    }
    
    async run (guild) {
        
        // Loads discord lib
        var Discord = require('discord.js');

        // Fetch the guild owner
        this.client.fetchUser(guild.ownerID).then(owner => {

            // Sends log embed in the logs channel
            var log_embed = new Discord.RichEmbed()
                .setAuthor(guild.name, guild.iconURL)
                .setDescription('Le serveur `'+guild.name+'` ne fait désormais plus parti des miens...')
                .addField('ID', guild.id, true)
                .addField('Membres', `${parseInt(guild.memberCount - guild.members.filter(m => m.user.bot).size)} membres | ${guild.members.filter(m => m.user.bot).size} bots`)
                .addField('Salons', `${guild.channels.filter(ch => ch.type === 'text').size} textuels | ${guild.channels.filter(ch => ch.type === 'voice').size} ${(guild.channels.filter(ch => ch.type === 'voice').size > 1) ? 'vocaux' : 'vocal'} | ${guild.channels.filter(ch => ch.type === 'category').size} catégories`)
                .addField('Fondateur', `${owner.username}#${owner.discriminator}`)
                .setColor(0xFF0000)
                .setFooter(this.client.config.embed.footer)
            this.client.channels.get(this.client.config.support.logs).send(log_embed);
        });

    }
}  