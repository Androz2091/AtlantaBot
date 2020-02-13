const Constants = require("../utility/Constants");

module.exports = class PermissionLevel {
    constructor(options) {
        this.title = options.title;
        this.level = options.level;

        if (options.staff) this.staff = options.staff;
        if (options.staffOverride) this.staffOverride = options.staffOverride;
    }

    fetchRole(guild, permission) {
        let roleName;
        switch (permission) {
            case "blacklist":
                roleName = Constants.PermissionsRoleTitles.BLACKLIST.toLowerCase();
                break;
            case "dj":
                roleName = Constants.PermissionsRoleTitles.DJ.toLowerCase();
                break;
            case "administrator":
                roleName = Constants.PermissionsRoleTitles.ADMINISTRATOR.toLowerCase();
                break;
            default:
                roleName = Constants.PermissionsRoleTitles.MODERATOR.toLowerCase();
        }

        const permRole = guild.roles.cache.find(
            role => role.name.toLowerCase() === roleName
        );

        return permRole ? permRole.id : null;
    }

    check(_guild, _member) {
        throw new Error(`${this.title} doesn't have a check method.`);
    }
};
