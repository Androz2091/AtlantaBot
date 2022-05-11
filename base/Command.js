const path = require("path");
const {Permissions} = require("discord.js");

module.exports = class Command {
	constructor(client, {
		name = null,
		description = false,
		dirname = false,
		enabled = true,
		guildOnly = false,
		memberPermissions = [],
		botPermissions = [],
		nsfw = false,
		ownerOnly = false,
		cooldown = 3000,
		options = {}
	})
	{
		memberPermissions.forEach((p, i) => {
			memberPermissions[i] = Permissions.FLAGS[p];
		});
		const bit = memberPermissions.reduce((a, b) => a | b, 0n).toString();
		const category = dirname ? dirname.split(path.sep)[dirname.split(path.sep).length - 1] : "Other";
		this.client = client;
		this.conf = { enabled, guildOnly, botPermissions, nsfw, ownerOnly, cooldown};
		this.help = { name, category };
		this.applicationCommandBody = {name, description, options, dm_permission: !guildOnly};


		if (bit !== "0") {
			this.applicationCommandBody["default_member_permissions"] = bit;
		}
	}
};
