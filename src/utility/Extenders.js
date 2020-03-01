const { Guild, Message, MessageEmbed } = require("discord.js");
const Constants = require("../utility/Constants");

Guild.prototype.translate = function(key, args) {
    const language = this.client.translations.get(this.settings.language);
    if (!language) throw "Message: Invalid language set in settings.";
    return language(key, args);
};

Message.prototype.translate = function(key, args) {
    const language = this.client.translations.get(
        this.guild ? this.guild.settings.language : "en-US"
    );
    if (!language) throw "Message: Invalid language set in settings.";
    return language(key, args);
};

// Translate and send the message with an error emoji
Message.prototype.error = function(key, args, edit = false, embed = false) {
    if(embed && this.channel.permissionsFor(this.guild.me).has("EMBED_LINKS")){
        const embed = {
            color: Constants.Colors.ERROR,
            description: this.translate(key, args)
        };
        return edit ? this.edit({ embed }) : this.channel.send({ embed });
     } else {
        const updatedContent = `${Constants.Emojis.ERROR} | ${this.translate(key, args)}`;
        return edit ? this.edit(updatedContent) : this.channel.send(updatedContent);
    }
};

// Translate and send the message with a success emoji
Message.prototype.success = function(key, args, edit = false, embed = false) {
    if(embed && this.channel.permissionsFor(this.guild.me).has("EMBED_LINKS")){
        const embed = {
            color: Constants.Colors.SUCCESS,
            description: this.translate(key, args)
        };
        return edit ? this.edit({ embed }) : this.channel.send({ embed });
     } else {
        const updatedContent = `${Constants.Emojis.SUCCESS} | ${this.translate(key, args)}`;
        return edit ? this.edit(updatedContent) : this.channel.send(updatedContent);
    }
};


// Translate and send the message
Message.prototype.sendT = function(key, args, edit = false, embed = false, emoji = null) {
    const prefix = emoji ? `${Constants.Emojis[emoji.toUpperCase()]} | ` : "";
    if(embed && this.channel.permissionsFor(this.guild.me).has("EMBED_LINKS")){
        const embed = {
            color: Constants.Colors.DEFAULT,
            description: prefix+this.translate(key, args)
        };
        return edit ? this.edit({ embed }) : this.channel.send({ embed });
     } else {
        return edit ? this.edit(prefix+this.translate(key, args)) : this.channel.send(prefix+this.translate(key, args));
    }
};

MessageEmbed.prototype.errorColor = function() {
    this.setColor(Constants.Colors.ERROR);
    return this;
};

MessageEmbed.prototype.successColor = function() {
    this.setColor(Constants.Colors.SUCCESS);
    return this;
};

MessageEmbed.prototype.defaultColor = function() {
    this.setColor(Constants.Colors.DEFAULT);
    return this;
};
