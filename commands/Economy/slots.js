const Command = require("../../base/Command.js"),
Discord = require("discord.js");

class Slots extends Command {

    constructor (client) {
        super(client, {
            name: "slots",
            description: (language) => language.get("SLOTS_DESCRIPTION"),
            usage: (language) => language.get("SLOTS_USAGE"),
            examples: (language) => language.get("SLOTS_EXAMPLES"),
            dirname: __dirname,
            enabled: true,
            guildOnly: false,
            aliases: [ "casino", "slot" ],
            memberPermissions: [],
            botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],
            nsfw: false,
            ownerOnly: false,
            cooldown: 3000
        });
    }

    async run (message, args, data) {
        
        let fruits = [ "🍎", "🍐", "🍌", "🍇", "🍉", "🍒", "🍓" ];

        let i1=0,j1=0,k1=0,i2=1,j2=1,k2=1,i3=2,j3=2,k3=2;

        // Gets three random fruits array
        let colonne1 = message.client.functions.shuffle(fruits),
        colonne2 = message.client.functions.shuffle(fruits),
        colonne3 = message.client.functions.shuffle(fruits);

        // Gets the amount provided
        let amount = args[0];
        if(!amount || isNaN(amount) || amount < 1){
            amount = 1;
        }
        if(amount > data.users[0].money){
            return message.channel.send(message.language.get("SLOTS_ERR_TOO_HIGH", amount));
        }
        amount = Math.round(amount);
        
        let tmsg = await message.channel.send(message.language.get("UTILS").PLEASE_WAIT);
        editMsg();
        let interval = setInterval(editMsg, 1000);
        setTimeout(() => {
            clearInterval(interval);
            end();
        }, 4000);


        async function end(){

            let msg = "[  :slot_machine: | **SLOTS** ]\n------------------\n";

            i1 = (i1 < fruits.length - 1) ? i1 + 1 : 0;
            i2 = (i2 < fruits.length - 1) ? i2 + 1 : 0;
            i3 = (i3 < fruits.length - 1) ? i3 + 1 : 0;
            j1 = (j1 < fruits.length - 1) ? j1 + 1 : 0;
            j2 = (j2 < fruits.length - 1) ? j2 + 1 : 0;
            j3 = (j3 < fruits.length - 1) ? j3 + 1 : 0;
            k1 = (k1 < fruits.length - 1) ? k1 + 1 : 0;
            k2 = (k2 < fruits.length - 1) ? k2 + 1 : 0;
            k3 = (k3 < fruits.length - 1) ? k3 + 1 : 0;

            msg += colonne1[i1] + " : " + colonne2[j1] + " : "+ colonne3[k1] + "\n";
            msg += colonne1[i2] + " : " + colonne2[j2] + " : "+ colonne3[k2] + " **<**\n";
            msg += colonne1[i3] + " : " + colonne2[j3] + " : "+ colonne3[k3] + "\n------------------\n";
            
            if((colonne1[i2] == colonne2[j2]) && (colonne2[j2] == colonne3[k2])){
                msg += "| : : :  **"+message.language.get("UTILS").VICTORY.toUpperCase()+"**  : : : |";
                tmsg.edit(msg);
                let credits = getCredits(amount, true);
                message.channel.send(message.language.get("SLOTS_VICTORY", "JACKPOT ! ", amount, credits, message.author.username));
                let toAdd = credits - amount;
                data.users[0].money = data.users[0].money + toAdd;
                await data.users[0].save();
                return;
            }
            
            if(colonne1[i2] == colonne2[j2] || colonne2[j2] == colonne3[k2] || colonne1[i2] == colonne3[k2]){
                msg += "| : : :  **"+message.language.get("UTILS").VICTORY.toUpperCase()+"**  : : : |";
                tmsg.edit(msg);
                let credits = getCredits(amount, false);
                message.channel.send(message.language.get("SLOTS_VICTORY", "", amount, credits, message.author.username));
                let toAdd = credits - amount;
                data.users[0].money = data.users[0].money + toAdd;
                await data.users[0].save();
                return;
            }
            
            msg += "| : : :  **"+message.language.get("UTILS").DEFEAT.toUpperCase()+"**  : : : |";
            message.channel.send(message.language.get("SLOTS_DEFEAT", amount, message.author.username));
            data.users[0].money = data.users[0].money - amount;
            await data.users[0].save();
            return;

        }
        function editMsg(){

            let msg = "[  :slot_machine: l SLOTS ]\n------------------\n";

            i1 = (i1 < fruits.length - 1) ? i1 + 1 : 0;
            i2 = (i2 < fruits.length - 1) ? i2 + 1 : 0;
            i3 = (i3 < fruits.length - 1) ? i3 + 1 : 0;
            j1 = (j1 < fruits.length - 1) ? j1 + 1 : 0;
            j2 = (j2 < fruits.length - 1) ? j2 + 1 : 0;
            j3 = (j3 < fruits.length - 1) ? j3 + 1 : 0;
            k1 = (k1 < fruits.length - 1) ? k1 + 1 : 0;
            k2 = (k2 < fruits.length - 1) ? k2 + 1 : 0;
            k3 = (k3 < fruits.length - 1) ? k3 + 1 : 0;

            msg += colonne1[i1] + " : " + colonne2[j1] + " : "+ colonne3[k1] + "\n";
            msg += colonne1[i2] + " : " + colonne2[j2] + " : "+ colonne3[k2] + " **<**\n";
            msg += colonne1[i3] + " : " + colonne2[j3] + " : "+ colonne3[k3] + "\n";

            tmsg.edit(msg);
        }
    
        function getCredits(number, isJackpot){
            if(!isJackpot){
                number = number*1.5;
            }
            if(isJackpot){
                number = number*4;
            }
            return Math.round(number);
        }
    }

}

module.exports = Slots;