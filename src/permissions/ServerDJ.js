const PermissionLevel = require('../structures/PermissionLevel');
const Constants = require('../utility/Constants');

module.exports = class extends PermissionLevel {

    constructor(){
        super({
            title: 'Server DJ',
            level: Constants.PermissionsLevels.SERVER_DJ
        });
    }

    check(guild, member) {
        const roleIDs = this.fetchRoles(guild, 'dj');

        return roleIDs.some(id => member.roles.cache.has(id));
    }
}