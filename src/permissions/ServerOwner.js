const PermissionLevel = require("../structures/PermissionLevel");
const Constants = require("../utility/Constants");

module.exports = class extends PermissionLevel {
    constructor() {
        super({
            title: "Server Owner",
            level: Constants.PermissionsLevels.SERVER_OWNER
        });
    }

    check(guild, member) {
        return guild.ownerID === member.id;
    }
};
