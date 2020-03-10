const Command = require("../../structures/Command"),
    Constants = require("../../utility/Constants");

module.exports = class extends Command {
    constructor(...args) {
        super(
            {
                userPermissionLevel: Constants.PermissionsLevels.SERVER_MEMBER
            },
            ...args
        );
    }

    async execute(message) {
        
        // Fetch message author data
        const userData = await this.client.handlers.database.fetchUser(message.author.id);
        
        // Check if the author is married
        if(!userData.relationShips.current){
            return message.error("economy/divorce:NOT_MARRIED");
        }

        const endedAt = new Date();
        // Update partner data
        const partnerUserData = await this.client.handlers.database.fetchUser(userData.relationShips.current.partnerID);
        await partnerUserData.destroyRelationShip(endedAt, true);
        // Update message author data
        await userData.destroyRelationShip(endedAt);

        const partnerUser = this.client.users.cache.get(partnerUserData.id) || await this.client.users.fetch(partnerUserData.id);

        // Send success message 
        message.success("economy/divorce:SUCCESS", {
            partner: partnerUser.tag
        });

    }

}
