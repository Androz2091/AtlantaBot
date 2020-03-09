const Command = require("../../structures/Command"),
    Constants = require("../../utility/Constants"),
    moment = require("moment");

module.exports = class extends Command {
    constructor(...args) {
        super(
            {
                aliases: ["setbirthdate"],
                userPermissionLevel: Constants.PermissionsLevels.SERVER_MEMBER
            },
            ...args
        );
    }

    async execute(message, args) {
        
        const date = args[0];
        if(!date){
            return message.error("economy/birthdate:MISSING_DATE");
        }

        const dateArgs = date.split("/");
        const [day, month, year] = dateArgs;
        if(!day || !month || !year){
            return message.error("economy/birthdate:INVALID_DATE");
        }
        
        // Gets the string of the date
        const match = date.match(/\d+/g);
        if (!match){
            return message.error("economy/birthdate:INVALID_DATE");
        }
        const   tday = +match[0],
                tmonth = +match[1] - 1,
                tyear = +match[2];
        if (tyear < 100){
            tyear += tyear < 50 ? 2000 : 1900;
        }
        const finalDate = new Date(tyear, tmonth, tday);
        if(!(tday == finalDate.getDate() && tmonth == finalDate.getMonth() && tyear == finalDate.getFullYear())){
            return message.error("economy/birthdate:INVALID_DATE");
        }
        if(finalDate.getTime() > Date.now()){
            return message.error("economy/birthdate:INVALID_DATE_TOO_HIGH");
        }
        if(finalDate.getTime() < (Date.now()-2.523e+12)){
            return message.error("economy/birthdate:INVALID_DATE_TOO_LOW");
        }

        const user = await this.client.handlers.database.fetchUser(message.author.id);
        await user.setBirthdate(finalDate);
        
        // Gets the guild language formatted to work with moment
        const guildLanguage = message.guild.settings.language.substr(0, 2);

        // Load locale file
        if(guildLanguage !== "en") require(`moment/locale/${guildLanguage}`);

        const birthdate = moment(finalDate)
        .locale(guildLanguage)
        .format("LL");

        message.success("economy/birthdate:SUCCESS", {
            birthdate
        });

    }

}
