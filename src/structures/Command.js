const { sep } = require("path");
const Constants = require("../utility/Constants");

module.exports = class Command {
    constructor(
        client,
        {
            // required
            name = null,
            path = null,
            description = language => language.get("NO_DESCRIPTION_PROVIDED"),
            usage = language => language.get("NO_USAGE_PROVIDED"),
            examples = language => language.get("NO_EXAMPLE_PROVIDED"),
            // not required
            enabled = true,
            aliases = new Array(),
            guildOnly = true,
            permission = Constants.PermissionsLevels.ATLANTA_MAINTAINER,
            nsfw = false
        }
    ) {
        let category = path.split(sep)[
            parseInt(path.split(sep).length - 1, 10)
        ];
        this.client = client;
        this.conf = {
            path,
            enabled,
            aliases,
            guildOnly,
            permission,
            nsfw
        };
        this.help = {
            name,
            description,
            usage,
            examples,
            category
        };
    }

    execute() {
        throw new Error(`${this.name} doesn't have an execute method.`);
    }
};
