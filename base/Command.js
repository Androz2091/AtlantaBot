module.exports = class Command {
    constructor(client, {
      name = null,
      description = languages.get("NO_DESCRIPTION_PROVIDED"),
      usage = languages.get("NO_USAGE_PROVIDED"),
      examples = languages.get("NO_EXAMPLES_PROVIDED"),
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
      let category = (dirname ? dirname.split("/")[parseInt(dirname.split("/").length-1, 10)] : "Other");
      this.client = client;
      this.conf = { enabled, guildOnly, aliases, memberPermissions, botPermissions, nsfw, ownerOnly};
      this.help = { name, description, category, usage, examples };
    };
  };
