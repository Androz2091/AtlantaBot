// The MESSAGE event runs anytime a message is received
// Note that due to the binding of client to every event, every event
// goes `client, other, args` when this function is run.

module.exports = class {
    constructor (client) {
      this.client = client;
    }
  
    async run (member) {
        // Gets the guild data
        var guild_data = this.client.databases[1].get(member.guild.id) || this.client.functions.createGuild(member.guild);

        // Check if leave message is enabled
        if(guild_data.leave.status == 'on'){
            var channel = member.guild.channels.get(guild_data.leave.channel);
            if(channel){
                // Gets and edits the message
                var message = guild_data.leave.message
                    .replace(/{user}/g, `${member.user.username}#${member.user.discriminator}`)
                    .replace(/{server}/g, member.guild.name)
                    .replace(/{membercount}/g, member.guild.memberCount)
                
                if(guild_data.leave.withImage === 'true'){
                    var lang = new(require('../languages/'+guild_data.lang+'.js'));
                    var text = lang.get('LEAVE_IMG', member.guild.name);
                    const { body } = await require('snekfetch').get(encodeURI(`https://dev.anidiots.guide/greetings/unified?type=goodbye&version=gearz&message=${text}&bot=${member.user.bot}&avatar=${member.user.displayAvatarURL}&username=${member.user.username}&discriminator=${member.user.discriminator}&guildName=${member.guild.name}&memberCount=${member.guild.memberCount}`)).set("Authorization", this.client.config.anidiots);
                    channel.send(message, {
                        files: [{
                            attachment: Buffer.from(body.data),
                            name: "gdb.png"
                        }]
                    });
                } else channel.send(message);
            }
        }
    }
  };
  