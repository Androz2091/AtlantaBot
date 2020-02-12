const PermissionLevel = require('../structures/PermissionLevel');
const Constants = require('../utility/Constants');

module.exports = class extends PermissionLevel {
    
    constructor(){
        super({
            title: 'Atlanta Maintainer',
            level: Constants.PermissionsLevels.ATLANTA_MAINTAINER
        });
    }

    check(_guild, member) {
        return this.client.config.maintainers.includes(member.id);
    }
}