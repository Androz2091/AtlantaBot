const { Guild, Message, MessageEmbed } = require("discord.js");
const config = require("../config");
const moment = require("moment");

Guild.prototype.translate = function(key, args) {
    const language = this.client.translations.get(this.data.language);
    if (!language) throw "Message: Invalid language set in data.";
    return language(key, args);
};

Message.prototype.translate = function(key, args) {
    const language = this.client.translations.get(
        this.guild ? this.guild.data.language : "en-US"
    );
    if (!language) throw "Message: Invalid language set in data.";
    return language(key, args);
};

// Wrapper for sendT with error emoji
Message.prototype.error = function(key, args, options = {}) {
    options.prefixEmoji = "error";
    this.sendT(key, args, options);
};

// Wrapper for sendT with success emoji
Message.prototype.success = function(key, args, options = {}) {
    options.prefixEmoji = "success";
    this.sendT(key, args, options);
};

// Translate and send the message
Message.prototype.sendT = function(key, args, options = {}) {
    let string = this.translate(key, args);
    if (options.prefixEmoji) {
        string = `${this.client.config.emojis[options.prefixEmoji]} | ${string}`;
    }
    if (options.edit) {
        this.edit(string);
    } else {
        this.channel.send(string);
    }
};

// Format a date
Message.prototype.printDate = function(date, format) {
    return this.client.printDate(date, format, this.guild.data.language);
};

// Convert time
Message.prototype.convertTime = function(time, noPrefix) {
    return this.client.convertTime(time, noPrefix, locale);
};

MessageEmbed.prototype.errorColor = function() {
    this.setColor("#FF0000");
    return this;
};

MessageEmbed.prototype.successColor = function() {
    this.setColor("#32CD32");
    return this;
};

MessageEmbed.prototype.defaultColor = function() {
    this.setColor(config.color);
    return this;
};
