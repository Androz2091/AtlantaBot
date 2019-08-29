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
            guildOnly: true,
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
        let colonnes = [
            message.client.functions.shuffle(fruits),
            message.client.functions.shuffle(fruits),
            message.client.functions.shuffle(fruits)
        ];

        // Gets the amount provided
        let amount = args[0];
        if(!amount || isNaN(amount) || amount < 1){
            amount = 1;
        }
        if(amount > data.memberData.money){
            return message.channel.send(message.language.get("SLOTS_ERR_TOO_HIGH", amount));
        }
        amount = Math.round(amount);
        
        function getCredits(number, isJackpot){
            if(!isJackpot){
                number = number*1.5;
            }
            if(isJackpot){
                number = number*4;
            }
            return Math.round(number);
        }

        let tmsg = await message.channel.send(message.language.get("UTILS").PLEASE_WAIT);
        editMsg();
        let interval = setInterval(editMsg, 1000);
        setTimeout(() => {
            clearInterval(interval);
            end(tmsg);
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
        
            msg += colonnes[0][i1] + " : " + colonnes[1][j1] + " : "+ colonnes[2][k1] + "\n";
            msg += colonnes[0][i2] + " : " + colonnes[1][j2] + " : "+ colonnes[2][k2] + " **<**\n";
            msg += colonnes[0][i3] + " : " + colonnes[1][j3] + " : "+ colonnes[2][k3] + "\n------------------\n";
            
            if((colonnes[0][i2] == colonnes[1][j2]) && (colonnes[1][j2] == colonnes[2][k2])){
                msg += "| : : :  **"+message.language.get("UTILS").VICTORY.toUpperCase()+"**  : : : |";
                tmsg.edit(msg);
                let credits = getCredits(amount, true);
                message.channel.send(message.language.get("SLOTS_VICTORY", "JACKPOT ! ", amount, credits, message.author.username));
                let toAdd = credits - amount;
                data.memberData.money = data.memberData.money + toAdd;
                await data.memberData.save();
                return;
            }
            
            if(colonnes[0][i2] == colonnes[1][j2] || colonnes[1][j2] == colonnes[2][k2] || colonnes[0][i2] == colonnes[2][k2]){
                msg += "| : : :  **"+message.language.get("UTILS").VICTORY.toUpperCase()+"**  : : : |";
                tmsg.edit(msg);
                let credits = getCredits(amount, false);
                message.channel.send(message.language.get("SLOTS_VICTORY", "", amount, credits, message.author.username));
                let toAdd = credits - amount;
                data.memberData.money = data.memberData.money + toAdd;
                await data.memberData.save();
                return;
            }
            
            msg += "| : : :  **"+message.language.get("UTILS").DEFEAT.toUpperCase()+"**  : : : |";
            message.channel.send(message.language.get("SLOTS_DEFEAT", amount, message.author.username));
            data.memberData.money = data.memberData.money - amount;
            await data.memberData.save();
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
        
            msg += colonnes[0][i1] + " : " + colonnes[1][j1] + " : "+ colonnes[2][k1] + "\n";
            msg += colonnes[0][i2] + " : " + colonnes[1][j2] + " : "+ colonnes[2][k2] + " **<**\n";
            msg += colonnes[0][i3] + " : " + colonnes[1][j3] + " : "+ colonnes[2][k3] + "\n";

            tmsg.edit(msg);
        }
    }

}

module.exports = Slots;