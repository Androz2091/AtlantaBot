const PermissionLevel = require("../structures/PermissionLevel");
const Constants = require("../utility/Constants");

module.exports = class extends PermissionLevel {
    constructor() {
        super({
            title: "Server Moderator",
            level: Constants.PermissionsLevels.SERVER_MODERATOR
        });
    }

    check(guild, member) {
        const roleID = this.fetchRole(guild, "moderator");
        return roleID ? member.roles.has(roleID) : false;
    }
};
