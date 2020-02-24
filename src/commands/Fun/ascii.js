const Command = require("../../structures/Command"),
    Constants = require("../../utility/Constants");

const figlet = require("figlet");
const { promisify } = require("util");
const figletAsync = promisify(figlet);

module.exports = class extends Command {
    constructor(...args) {
        super(
            {
                permission: Constants.PermissionsLevels.SERVER_MEMBER
            },
            ...args
        );
    }

    async execute (message, args, data) {

        const text = args.join(" ");
        if(!text || text.length > 20){
            return message.sendT("fun/ascii:TEXT_MISSING", null, "error");
        }
    
        const rendered = await figletAsync(text);
        message.channel.send("```"+rendered+"```");

    }

}
