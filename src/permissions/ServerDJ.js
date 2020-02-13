const PermissionLevel = require("../structures/PermissionLevel");
const Constants = require("../utility/Constants");

module.exports = class extends PermissionLevel {
    constructor() {
        super({
            title: "Server DJ",
            level: Constants.PermissionsLevels.SERVER_DJ
        });
    }

    check(guild, member) {
        const roleID = this.fetchRole(guild, "dj");
        return roleID ? member.roles.cache.has(roleID) : false;
    }
};
