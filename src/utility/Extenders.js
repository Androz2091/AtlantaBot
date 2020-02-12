const { Message } = require("discord.js");

Message.prototype.error = function(content) {
    this.channel.send();
};
