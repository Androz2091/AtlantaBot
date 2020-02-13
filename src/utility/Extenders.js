const { Message } = require("discord.js");
const Constants = require("../utility/Constants");

Message.prototype.translate = function(key, args){
    const language = this.client.translate.get(
        this.guild ? this.guild.settings.language : 'en-US'
    );
    if (!language) throw 'Message: Invalid language set in settings.';
    return language(key, args);
};

Message.prototype.error = function(content) {
    this.channel.send(`${Constants.Emojis.ERROR} | ${content}`);
};

Message.prototype.success = function(content) {
    this.channel.send(`${Constants.Emojis.SUCCESS} | ${content}`);
};
