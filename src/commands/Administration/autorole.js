const Command = require("../../structures/Command"),
    Constants = require("../../utility/Constants"),
    Resolvers = require("../../utility/Resolvers");

module.exports = class extends Command {
    constructor(...args) {
        super(
            {
                userPermissionLevel:
                    Constants.PermissionsLevels.SERVER_MODERATOR,
                clientPermissions: ["MANAGE_ROLES"]
            },
            ...args
        );
    }

    async execute(message, args) {

        const status = args[0];
        if(status !== "on" && status !== "off"){
            return message.error("administration/autorole:MISSING_STATUS");
        }
        
        if(status === "on"){

            const role = await Resolvers.resolveRole({
                message,
                search: args.slice(1).join(" ")
            });
            if(!role){
                return message.error("administration/autorole:MISSING_ROLE");
            }

            message.guild.settings.plugins.autorole.enabled = true;
            message.guild.settings.plugins.autorole.roleID = role.id;
            await message.guild.settings.plugins.autorole.updateData();

            message.success("administration/autorole:SUCCESS_ENABLED", {
                roleName: role.name
            });
        }

        if(status === "off"){

            message.guild.settings.plugins.autorole.enabled = false;
            message.guild.settings.plugins.autorole.roleID = null;
            await message.guild.settings.plugins.autorole.updateData();
            
            message.success("administration/autorole:SUCCESS_DISABLED", {
                prefix: message.guild.settings.prefix
            });

        }
        
    }

}
