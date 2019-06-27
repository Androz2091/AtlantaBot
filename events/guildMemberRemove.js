module.exports = class {

    constructor (client) {
      this.client = client;
    }
  
    async run (member) {

        member.guild.fetch().then(async (guild) => {

            let settings = await this.client.functions.getSettings(this.client, guild.channels.first());

            // Check if goodbye message is enabled
            if(settings.plugins.goodbye.enabled){
                let channel = guild.channels.get(settings.plugins.leave.channel);
                if(channel){
                    let message = settings.plugins.leave.message
                    .replace(/{user}/g, member.user.tag)
                    .replace(/{server}/g, guild.name)
                    .replace(/{membercount}/g, guild.memberCount);
                    
                    if(settings.plugins.leave.withImage){
                        let lang = new(require(`../languages/${settings.language}.js`));
                        let text = lang.get("LEAVE_IMG", member.guild.name);
                        let URL = encodeURI(`https://dev.anidiots.guide/greetings/unified?type=goodbye&version=gearz&message=${text}&bot=${member.user.bot}&avatar=${member.user.displayAvatarURL}&username=${member.user.username}&discriminator=${member.user.discriminator}&guildName=${guild.name}&memberCount=${guild.memberCount}`);
                        let res = await fetch(URL, { headers: { "Authorization": guild.client.config.apiKeys.anidiots } });
                        channel.send(message, {
                            files: [{
                                attachment: res.body,
                                name: "goodbye.png"
                            }]
                        });
                    } else {
                        channel.send(message);
                    }
                }
            }

        });
    }
  };
  