const PermissionLevel = require('../structures/PermissionLevel');
const Constants = require('../utility/Constants');

module.exports = class extends PermissionLevel {

    constructor(){
        super({
            title: 'Server Member',
            level: Constants.PermissionsLevels.SERVER_MEMBER
        });
    }

    check(_guild, _member) {
        return true;
    }
}