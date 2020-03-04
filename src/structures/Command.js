const { sep } = require("path");
const Constants = require("../utility/Constants");

module.exports = class Command {
    constructor(
        {
            enabled = true,
            aliases = new Array(),
            guildOnly = true,
            userPermissionLevel = Constants.PermissionsLevels
                .ATLANTA_MAINTAINER,
            clientPermissions = new Array(),
            nsfw = false
        },
        client,
        name,
        path
    ) {
        let category = path.split(sep)[
            parseInt(path.split(sep).length - 2, 10)
        ];
        this.client = client;
        this.name = name;
        this.path = path;
        this.category = category;
        this.enabled = enabled;
        this.aliases = aliases;
        this.guildOnly = guildOnly;
        this.userPermissionLevel = userPermissionLevel;
        this.clientPermissions = clientPermissions;
        this.nsfw = nsfw;
    }

    execute() {
        throw new Error(`${this.name} doesn't have an execute method.`);
    }
};
