const path = require("path");

module.exports = class Command {
    constructor(client, {
      name = null,
      description = (language) => language.get("NO_DESCRIPTION_PROVIDED"),
      usage = (language) => language.get("NO_USAGE_PROVIDED"),
      examples = (language) => language.get("NO_EXAMPLE_PROVIDED"),
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
      let category = (dirname ? dirname.split(path.sep)[parseInt(dirname.split(path.sep).length-1, 10)] : "Other");
      this.client = client;
      this.conf = { enabled, guildOnly, aliases, memberPermissions, botPermissions, nsfw, ownerOnly, cooldown};
      this.help = { name, description, category, usage, examples };
    }
  };
