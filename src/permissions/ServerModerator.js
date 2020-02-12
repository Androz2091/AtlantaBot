const PermissionLevel = require('../structures/PermissionLevel');
const Constants = require('../utility/Constants');

module.exports = class extends PermissionLevel {

    constructor(){
        super({
            title: 'Server Moderator',
            level: Constants.PermissionsLevels.SERVER_MODERATOR
        });
    }

    check(guild, member) {
        const roleIDs = this.fetchRoles(guild, 'moderator');

        return roleIDs.some(id => member.roles.cache.has(id));
    }
}