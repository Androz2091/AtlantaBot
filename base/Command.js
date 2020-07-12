const path = require("path");

module.exports = class Command {
	constructor(client, {
		name = null,
		dirname = false,
		enabled = true,
		guildOnly = false,
		aliases = new Array(),
		botPermissions = new Array(),
		memberPermissions = new Array(),
		nsfw = false,
		ownerOnly = false,
		cooldown = 3000
	})
	{
		const category = (dirname ? dirname.split(path.sep)[parseInt(dirname.split(path.sep).length-1, 10)] : "Other");
		this.client = client;
		this.conf = { enabled, guildOnly, memberPermissions, botPermissions, nsfw, ownerOnly, cooldown};
		this.help = { name, category, aliases };
	}
};
