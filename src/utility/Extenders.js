const { Guild, Message } = require("discord.js");
const Constants = require("../utility/Constants");

Guild.prototype.translate = function(key, args){
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

Message.prototype.error = function(content, send = true) {
    const updatedContent = `${Constants.Emojis.ERROR} | ${content}`;
    return send ? this.channel.send(updatedContent) : updatedContent;
};

Message.prototype.success = function(content, send = true) {
    const updatedContent = `${Constants.Emojis.SUCCESS} | ${content}`;
    return send ? this.channel.send(updatedContent) : updatedContent;
};

// Translate and send the message
Message.prototype.sendT = function(key, args, type) {
    if (type === "error") return this.error(this.translate(key, args));
    if (type === "success") return this.success(this.translate(key, args));
    else return this.channel.send(this.translate(key, args));
};

// Translate and edit the message
Message.prototype.editT = function(key, args, type) {
    let updatedContent = "";
    if (type === "error")
        updatedContent = this.error(this.translate(key, args), true);
    if (type === "success")
        updatedContent = this.success(this.translate(key, args), true);
    else updatedContent = this.translate(key, args);
    return this.edit(updatedContent);
};
