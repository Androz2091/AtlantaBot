const Constants = require("../utility/Constants");

module.exports = class PermissionLevel {
    constructor(options) {
        this.title = options.title;
        this.level = options.level;

        if (options.staff) this.staff = options.staff;
        if (options.staffOverride) this.staffOverride = options.staffOverride;
    }

    fetchRoles(guild, permission) {
        const pool = guild.settings.roles[permission].filter(role =>
            guild.roles.cache.has(role)
        );

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
        if (permRole && !pool.includes(permRole.id)) pool.push(permRole.id);

        return pool;
    }

    check(_guild, _member) {
        throw new Error(`${this.title} doesn't have a check method.`);
    }
};
