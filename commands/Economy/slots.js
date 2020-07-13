const Command = require("../../base/Command.js");

class Slots extends Command {

	constructor (client) {
		super(client, {
			name: "slots",
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
        
		const fruits = [ "🍎", "🍐", "🍌", "🍇", "🍉", "🍒", "🍓" ];

		let i1=0,j1=0,k1=0,i2=1,j2=1,k2=1,i3=2,j3=2,k3=2;

		// Gets three random fruits array
		const colonnes = [
			this.client.functions.shuffle(fruits),
			this.client.functions.shuffle(fruits),
			this.client.functions.shuffle(fruits)
		];

		// Gets the amount provided
		let amount = args[0];
		if(!amount || isNaN(amount) || amount < 1){
			amount = 1;
		}
		if(amount > data.memberData.money){
			return message.error("economy/slots:NOT_ENOUGH", {
				money: amount
			});
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

		const tmsg = await message.sendT("misc:loading", null, {
			prefixEmoji: "loading"
		});
		editMsg();
		const interval = setInterval(editMsg, 1000);
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
				msg += "| : : :  **"+(message.translate("common:VICTORY").toUpperCase())+"**  : : : |";
				tmsg.edit(msg);
				const credits = getCredits(amount, true);
				message.channel.send("**!! JACKPOT !!**\n"+message.translate("economy/slots:VICTORY", {
					money: amount,
					won: credits,
					username: message.author.username
				}));
				const toAdd = credits - amount;
				data.memberData.money = data.memberData.money + toAdd;
				if(!data.userData.achievements.slots.achieved){
					data.userData.achievements.slots.progress.now += 1;
					if(data.userData.achievements.slots.progress.now === data.userData.achievements.slots.progress.total){
						data.userData.achievements.slots.achieved = true;
						message.channel.send({ files: [ { name: "unlocked.png", attachment: "./assets/img/achievements/achievement_unlocked4.png" } ] });
					}
					data.userData.markModified("achievements.slots");
					await data.userData.save();
				}
				await data.memberData.save();
				return;
			}
            
			if(colonnes[0][i2] == colonnes[1][j2] || colonnes[1][j2] == colonnes[2][k2] || colonnes[0][i2] == colonnes[2][k2]){
				msg += "| : : :  **"+(message.translate("common:VICTORY").toUpperCase())+"**  : : : |";
				tmsg.edit(msg);
				const credits = getCredits(amount, false);
				message.channel.send(message.translate("economy/slots:VICTORY", {
					money: amount,
					won: credits,
					username: message.author.username
				}));
				const toAdd = credits - amount;
				data.memberData.money = data.memberData.money + toAdd;
				if(!data.userData.achievements.slots.achieved){
					data.userData.achievements.slots.progress.now += 1;
					if(data.userData.achievements.slots.progress.now === data.userData.achievements.slots.progress.total){
						data.userData.achievements.slots.achieved = true;
						message.channel.send({ files: [ { name: "unlocked.png", attachment: "./assets/img/achievements/achievement_unlocked4.png" } ] });
					}
					data.userData.markModified("achievements.slots");
					await data.userData.save();
				}
				await data.memberData.save();
				return;
			}
            
			msg += "| : : :  **"+(message.translate("common:DEFEAT").toUpperCase())+"**  : : : |";
			message.channel.send(message.translate("economy/slots:DEFEAT", {
				money: amount,
				username: message.author.username
			}));
			data.memberData.money = data.memberData.money - amount;
			if(!data.userData.achievements.slots.achieved){
				data.userData.achievements.slots.progress.now = 0;
				data.userData.markModified("achievements.slots");
				await data.userData.save();
			}
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