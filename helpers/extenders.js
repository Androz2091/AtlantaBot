const { Guild, Message, MessageEmbed, Interaction } = require("discord.js");
const config = require("../config");

// locale = 'fr' ? return 'fr-FR'
const formatLocale = function (locale) {
	return locale.length === 2 ? locale+"-"+locale.toUpperCase() : locale;
};

Guild.prototype.translate = function(key, args) {
	const language = this.client.translations.get(this.data.language ?? "en-US");
	if (!language) throw "Message: Invalid language set in data.";
	return language(key, args);
};

Interaction.prototype.translate = function(key, args) {
	let language = this.client.translations.get(
		this.guild ? this.guild.data.language : formatLocale(this.locale)
	);
	if (!language) language = this.client.translations.get("en-US");
	return language(key, args);
};

//Translate an interaction and reply it
Interaction.prototype.replyT = function(key, args, options = {}) {
	let string = this.translate(key, args);
	if (options.prefixEmoji) {
		string = `${this.client.customEmojis[options.prefixEmoji]} | ${string}`;
	}
	if (options.edit) {
		return this.editReply(string);
	} else {
		//console.log(options);
		return this.reply(string, {
			ephemeral: !!options.ephemeral,
		});
	}
};

Interaction.prototype.error = function(key, args, options = {}) {
	return this.replyT(key, args, Object.assign(options, { prefixEmoji: "error" }));
};

Interaction.prototype.success = function(key, args, options = {}) {
	return this.replyT(key, args, Object.assign(options, { prefixEmoji: "success" }));
};

//Messages Prototypes
Message.prototype.translate = function(key, args) {
	const language = this.client.translations.get(
		this.guild ? this.guild.data.language : "en-US"
	);
	if (!language) throw "Message: Invalid language set in data.";
	return language(key, args);
};

// Wrapper for sendT with error emoji
Message.prototype.error = function(key, args, options = {}) {
	return this.sendT(key, args, Object.assign(options, { prefixEmoji: "error" }));
};

// Wrapper for sendT with success emoji
Message.prototype.success = function(key, args, options = {}) {
	return this.sendT(key, args, Object.assign(options, { prefixEmoji: "success" }));
};

// Translate and send the message
Message.prototype.sendT = function(key, args, options = {}) {
	let string = this.translate(key, args);
	if (options.prefixEmoji) {
		string = `${this.client.customEmojis[options.prefixEmoji]} | ${string}`;
	}
	if (options.edit) {
		return this.edit(string);
	} else {
		return this.channel.send(string);
	}
};

// Format a date
Message.prototype.printDate = function(date, format) {
	return this.client.printDate(date, format, this.guild.data.language);
};

// Convert time
Message.prototype.convertTime = function(time, type, noPrefix) {
	return this.client.convertTime(time, type, noPrefix, (this.guild && this.guild.data) ? this.guild.data.language : null);
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
