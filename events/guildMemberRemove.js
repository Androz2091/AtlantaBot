const fetch = require("node-fetch");

module.exports = class {

    constructor (client) {
      this.client = client;
    }
  
    async run (member) {

        member.guild.fetch().then(async (guild) => {

            let settings = await this.client.functions.getSettings(this.client, guild);

            // Check if goodbye message is enabled
            if(settings.plugins.goodbye.enabled){
                let channel = guild.channels.get(settings.plugins.goodbye.channel);
                if(channel){
                    let message = settings.plugins.goodbye.message
                    .replace(/{user}/g, member.user.tag)
                    .replace(/{server}/g, guild.name)
                    .replace(/{membercount}/g, guild.memberCount);
                    
                    if(settings.plugins.goodbye.withImage){
                        let lang = new(require(`../languages/${settings.language}.js`));
                        let text = lang.get("GOODBYE_IMG", member.guild.name);
                        let userAvatar = member.user.displayAvatarURL().replace("webp", "png");
                        let URL = encodeURI(`https://dev.anidiots.guide/greetings/unified?type=goodbye&version=gearz&message=${text}&bot=${member.user.bot}&avatar=${userAvatar}&username=${member.user.username}&discriminator=${member.user.discriminator}&guildName=${guild.name}&memberCount=${guild.memberCount}`);
                        let res = await fetch(URL, { headers: { "Authorization": guild.client.config.apiKeys.anidiots } });
                        let attachment = new Discord.MessageAttachment(await res.buffer(), "goodbye.png");
                        channel.send(message, attachment);
                    } else {
                        channel.send(message);
                    }
                }
            }

        });
    }
  };
  