const { sep } = require("path");
const Constants = require("../utility/Constants");

module.exports = class Command {
    constructor(
        client,
        {
            name,
            enabled = true,
            aliases = new Array(),
            guildOnly = true,
            permission = Constants.PermissionsLevels.ATLANTA_MAINTAINER,
            nsfw = false
        },
        path = ""
    ) {
        let category = path.split(sep)[
            parseInt(path.split(sep).length - 1, 10)
        ];
        this.client = client;
        this.name = name;
        this.path = path;
        this.category = category;
        this.enabled = enabled;
        this.aliases = aliases;
        this.guildOnly = guildOnly;
        this.permission = permission;
        this.nsfw = nsfw;
    }

    execute() {
        throw new Error(`${this.name} doesn't have an execute method.`);
    }
};
