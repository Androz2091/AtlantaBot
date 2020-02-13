const PermissionLevel = require('../structures/PermissionLevel');
const Constants = require('../utility/Constants');

module.exports = class extends PermissionLevel {

    constructor(){
        super({
            title: 'Server Blacklisted',
            level: Constants.PermissionsLevels.SERVER_BLACKLISTED
        });
    }

    check(guild, member) {
        const roleID = this.fetchRole(guild, 'blacklist');
        return (roleID ? member.roles.cache.has(roleID) : false);
    }
}