const path = require("path");

module.exports = class Command {
	constructor(client, {
		name = null,
		dirname = false,
		enabled = true,
		guildOnly = false,
		botPermissions = [],
		memberPermissions = [],
		nsfw = false,
		ownerOnly = false,
		cooldown = 3000,
		commandBody = {}
	})
	{
		const category = (dirname ? dirname.split(path.sep)[parseInt(dirname.split(path.sep).length-1, 10)] : "Other");
		this.client = client;
		this.conf = { enabled, guildOnly, memberPermissions, botPermissions, nsfw, ownerOnly, cooldown};
		this.help = { name, category };
		this.applicationCommandBody = commandBody;
	}
};
