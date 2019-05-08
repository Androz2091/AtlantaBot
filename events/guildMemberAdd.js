// The MESSAGE event runs anytime a message is received // Note that due to the binding of client to every event, every event // goes client, other, args when this function is run.

module.exports = class { constructor (client) { this.client = client; }

async run (member) {
    // Gets the guild data
    var guild_data = this.client.databases[1].get(member.guild.id) || this.client.functions.createGuild(member.guild);

    // Check if the autorole is enabled
    if(guild_data.autorole.status == 'on'){
        var role = member.guild.roles.get(guild_data.autorole.role);
        if(role) member.addRole(role).catch(err => this.client.logger.log(`I can't add the role to the member in ${guild.id}`, 'error'));
    }

    // Check if welcome message is enabled
    if(guild_data.welcome.status == 'on'){
        var channel = member.guild.channels.get(guild_data.welcome.channel);
        if(channel){
            // Gets and edits the message
            var message = guild_data.welcome.message
                .replace(/{user}/g, member)
                .replace(/{server}/g, member.guild.name)
                .replace(/{membercount}/g, member.guild.memberCount)
            
            if(guild_data.welcome.withImage === 'true'){
                var lang = new(require('../languages/'+guild_data.lang+'.js'));
                var text = lang.get('WELCOME_IMG', member.guild.name);
                const { body } = await require('snekfetch').get(encodeURI(`https://dev.anidiots.guide/greetings/unified?type=welcome&version=gearz&message=${text}&bot=${member.user.bot}&avatar=${member.user.displayAvatarURL}&username=${member.user.username}&discriminator=${member.user.discriminator}&guildName=${member.guild.name}&memberCount=${member.guild.memberCount}`)).set("Authorization", this.client.config.apiKeys.anidiots);
                channel.send(message, {
                    files: [{
                        attachment: Buffer.from(body.data),
                        name: "wlc.png"
                    }]
                });
            } else channel.send(message);
        }
    }
}



};