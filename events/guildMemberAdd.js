const fetch = require("node-fetch"),
Discord = require("discord.js");

module.exports = class {

    constructor (client) {
        this.client = client;
    }

    async run (member) {
    
        member.guild.fetch().then(async (guild) => {

            let settings = await this.client.functions.getSettings(this.client, guild);

            // Check if the autorole is enabled
            if(settings.plugins.autorole.enabled){
                member.roles.add(settings.plugins.autorole.role).catch((err) => {});
            }
    
            // Check if welcome message is enabled
            if(settings.plugins.welcome.enabled){
                let channel = member.guild.channels.get(settings.plugins.welcome.channel);
                if(channel){
                    let message = settings.plugins.welcome.message
                    .replace(/{user}/g, member)
                    .replace(/{server}/g, guild.name)
                    .replace(/{membercount}/g, guild.memberCount);
                    if(settings.plugins.welcome.withImage){
                        let lang = new(require(`../languages/${settings.language}.js`));
                        let text = lang.get("WELCOME_IMG", guild.name);
                        let userAvatar = member.user.displayAvatarURL().replace("webp", "png");
                        let URL = encodeURI(`https://dev.anidiots.guide/greetings/unified?type=welcome&version=gearz&message=${text}&bot=${member.user.bot}&avatar=${userAvatar}&username=${member.user.username}&discriminator=${member.user.discriminator}&guildName=${guild.name}&memberCount=${guild.memberCount}`);
                        let res = await fetch(URL, { headers: { "Authorization": guild.client.config.apiKeys.anidiots } });
                        let attachment = new Discord.MessageAttachment(await res.buffer(), "welcome.png");
                        channel.send(message, attachment);
                    } else {
                        channel.send(message);
                    }
                }
            }

        });
    }

};