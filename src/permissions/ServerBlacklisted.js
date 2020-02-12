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
        const roleIDs = this.fetchRoles(guild, 'blacklist');

        return roleIDs.some(id => member.roles.cache.has(id));
    }
}