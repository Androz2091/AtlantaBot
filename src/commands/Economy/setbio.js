const Command = require("../../structures/Command"),
    Constants = require("../../utility/Constants");

module.exports = class extends Command {
    constructor(...args) {
        super(
            {
                aliases: ["bio"],
                userPermissionLevel: Constants.PermissionsLevels.SERVER_MEMBER
            },
            ...args
        );
    }

    async execute(message, args) {
        const newBio = args.join(" ");
        if(!newBio){
            return message.error("economy/setbio:MISSING");
        }
        if(newBio.length > 100){
            return message.error("economy/setbio:MAX_CHARACT");
        }
        const user = await this.client.handlers.database.fetchUser(message.author.id);
        await user.setBio(newBio);
        message.success("economy/setbio:SUCCESS");
    }

}
