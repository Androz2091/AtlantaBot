const { Guild, Message } = require("discord.js");
const Constants = require("../utility/Constants");

Guild.prototype.translate = function(key, args) {
    const language = this.client.translate.get(this.settings.language);
    if (!language) throw "Message: Invalid language set in settings.";
    return language(key, args);
};

Message.prototype.translate = function(key, args) {
    const language = this.client.translate.get(
        this.guild ? this.guild.settings.language : "en-US"
    );
    if (!language) throw "Message: Invalid language set in settings.";
    return language(key, args);
};

// Translate and send the message with an error emoji
Message.prototype.error = function(key, args, edit = false) {
    const updatedContent = `${Constants.Emojis.ERROR} | ${this.translate(key, args)}`;
    return edit ? this.edit(updatedContent) : this.channel.send(updatedContent);
};

// Translate and send the message with a success emoji
Message.prototype.success = function(key, args, edit = false) {
    const updatedContent = `${Constants.Emojis.SUCCESS} | ${this.translate(key, args)}`;
    return edit ? this.edit(updatedContent) : this.channel.send(updatedContent);
};

// Translate and send the message
Message.prototype.sendT = function(key, args, edit = false) {
    return edit ? this.edit(this.translate(key, args)) : this.channel.send(this.translate(key, args));
};