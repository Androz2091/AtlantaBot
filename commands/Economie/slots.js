const Command = require("../../base/Command.js"),
Discord = require('discord.js');

class Slots extends Command {

    constructor (client) {
        super(client, {
            name: "slots",
            description: (language) => language.get('SLOTS_DESCRIPTION'),
            dirname: __dirname,
            usage: "slots [amount]",
            enabled: true,
            guildOnly: false,
            aliases: [],
            permission: false,
            botpermissions: [ "SEND_MESSAGES" ],
            nsfw: false,
            examples: "$slots 10",
            owner: false
        });
    }

    async run (message, args, membersdata, guild_data, data) {
        
        // Inits some variables
        var client = this.client;
        var tmsg = null;
        var fruits = [ "🍎", "🍐", "🍌", "🍇", "🍉", "🍒", "🍓" ]; // the array of the fruits
        var i1=0,j1=0,k1=0;
        var i2=1,j2=1,k2=1;
        var i3=2,j3=2,k3=2;

        // Gets three random fruits array
        var colonne1 = client.functions.shuffle(fruits);
        var colonne2 = client.functions.shuffle(fruits);
        var colonne3 = client.functions.shuffle(fruits);

        // Gets the amount provided
        var amount = args[0];
        if(!amount || isNaN(amount)) amount = 1;
        if(amount > membersdata[0].credits) return message.channel.send(message.language.get('SLOTS_TOO_HIGH', amount));
        
        message.channel.send(message.language.get('PLEASE_WAIT')).then(m => {
            tmsg = m;
            editMsg(); // Start to edit the message
            var interval = setInterval(editMsg, 1000); // every second, edit the message
            setTimeout(() => {
                clearInterval(interval); // clear the interval and
                end(); // then display the result
            }, (4000));
        });


        function end(){
            var msg = '[  :slot_machine: | **SLOTS** ]\n------------------\n';
            i1 = (i1 < fruits.length - 1) ? i1 + 1 : 0;
            i2 = (i2 < fruits.length - 1) ? i2 + 1 : 0;
            i3 = (i3 < fruits.length - 1) ? i3 + 1 : 0;
            j1 = (j1 < fruits.length - 1) ? j1 + 1 : 0;
            j2 = (j2 < fruits.length - 1) ? j2 + 1 : 0;
            j3 = (j3 < fruits.length - 1) ? j3 + 1 : 0;
            k1 = (k1 < fruits.length - 1) ? k1 + 1 : 0;
            k2 = (k2 < fruits.length - 1) ? k2 + 1 : 0;
            k3 = (k3 < fruits.length - 1) ? k3 + 1 : 0;
            msg += colonne1[i1] + ' : ' + colonne2[j1] + ' : '+ colonne3[k1] + '\n';
            msg += colonne1[i2] + ' : ' + colonne2[j2] + ' : '+ colonne3[k2] + ' **<**\n';
            msg += colonne1[i3] + ' : ' + colonne2[j3] + ' : '+ colonne3[k3] + '\n------------------\n';
            if((colonne1[i2] == colonne2[j2]) && (colonne2[j2] == colonne3[k2])){
                // If it's the jackpot (all the fruits are aligned)
                msg += '| : : :  **'+message.language.get('WIN').toUpperCase()+'**  : : : |';
                var credits = getCredits(amount, true); // gets the amount of credits to give to the member
                // Send a congratulatory message
                message.channel.send(message.language.get('SLOTS_WIN', 'JACKPOT ! ', amount, credits, message.author.username));
                // Updates member balance
                client.databases[0].add(`${message.author.id}.credits`, credits);
                client.databases[0].subtract(`${message.author.id}.credits`, amount);
            } else if(colonne1[i2] == colonne2[j2] || colonne2[j2] == colonne3[k2] || colonne1[i2] == colonne3[k2]){
                // if it's just a little win (only two fruits are aligned)
                var credits = getCredits(amount, false); // gets the amount of credits to give to the member
                // Send a congratulatory message
                message.channel.send(message.language.get('SLOTS_WIN', '', amount, credits, message.author.username));
                // Updates member balance
                client.databases[0].add(`${message.author.id}.credits`, credits);
                client.databases[0].subtract(`${message.author.id}.credits`, amount);
            } else {
                msg += '| : : :  **'+message.language.get('LOOSE').toUpperCase()+'**  : : : |';
                // Send a message
                message.channel.send(message.language.get('SLOTS_LOOSE', amount, message.author.username));
                // Updates member balance
                client.databases[0].subtract(`${message.author.id}.credits`, amount);
            }
            tmsg.edit(msg); // Then edit the message
        }
        function editMsg(){
            // Updates the message
            var msg = '[  :slot_machine: l SLOTS ]\n------------------\n';
            i1 = (i1 < fruits.length - 1) ? i1 + 1 : 0;
            i2 = (i2 < fruits.length - 1) ? i2 + 1 : 0;
            i3 = (i3 < fruits.length - 1) ? i3 + 1 : 0;
            j1 = (j1 < fruits.length - 1) ? j1 + 1 : 0;
            j2 = (j2 < fruits.length - 1) ? j2 + 1 : 0;
            j3 = (j3 < fruits.length - 1) ? j3 + 1 : 0;
            k1 = (k1 < fruits.length - 1) ? k1 + 1 : 0;
            k2 = (k2 < fruits.length - 1) ? k2 + 1 : 0;
            k3 = (k3 < fruits.length - 1) ? k3 + 1 : 0;
            msg += colonne1[i1] + ' : ' + colonne2[j1] + ' : '+ colonne3[k1] + '\n';
            msg += colonne1[i2] + ' : ' + colonne2[j2] + ' : '+ colonne3[k2] + ' **<**\n';
            msg += colonne1[i3] + ' : ' + colonne2[j3] + ' : '+ colonne3[k3] + '\n';
            tmsg.edit(msg);
        }
    
        function getCredits(number, isJackpot){
            if(!isJackpot) number = number*1.5;
            if(isJackpot) number = number*4;
            return Math.round(number);
        }
    }

}

module.exports = Slots;