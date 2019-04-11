class Command {
    constructor(client, {
      name = null,
      description = false,
      dirname = false,
      usage = false,
      enabled = true,
      guildOnly = false,
      aliases = new Array(),
      permission = false,
      botpermissions = new Array(),
      nsfw = false,
      examples = false,
      owner = false
    }) {
      var category = 'Other';
      if(dirname){
        var folders = dirname.split('/');
        category = folders[folders.length - 1];
      }
      this.client = client;
      this.conf = { enabled, guildOnly, aliases, permission, botpermissions, nsfw, owner};
      this.help = { name, description, category, usage, examples };
    }
  }
  module.exports = Command;
  