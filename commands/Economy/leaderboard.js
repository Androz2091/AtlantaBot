const Command = require("../../base/Command.js"),
	AsciiTable = require("ascii-table");

class Leaderboard extends Command {

	constructor (client) {
		super(client, {
			name: "leaderboard",
			dirname: __dirname,
			enabled: true,
			guildOnly: true,
			aliases: [ "lb" ],
			memberPermissions: [],
			botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],
			nsfw: false,
			ownerOnly: false,
			cooldown: 5000
		});
	}

	async run (message, args) {
        
		const isOnlyOnMobile = (message.author.presence.clientStatus ? JSON.stringify(Object.keys(message.author.presence.clientStatus)) === JSON.stringify([ "mobile" ]) : false);

		const type = args[0];
		if(!type || (type !== "credits" && type !== "level" && type !== "rep")){
			return message.error("economy/leaderboard:MISSING_TYPE");
		}

		if(type === "credits"){
			const members = await this.client.membersData.find({ guildID: message.guild.id }).lean(),
				membersLeaderboard = members.map((m) => {
					return {
						id: m.id,
						value: m.money+m.bankSold
					};
				}).sort((a,b) => b.value - a.value);
			const table = new AsciiTable("LEADERBOARD");
			table.setHeading("#", message.translate("common:USER"), message.translate("common:CREDITS"));
			if(membersLeaderboard.length > 20) membersLeaderboard.length = 20;
			const newTable = await fetchUsers(membersLeaderboard, table, this.client);
			message.channel.send("```\n"+newTable.toString()+"```");
		} else if(type === "level"){
			const members = await this.client.membersData.find({ guildID: message.guild.id }).lean(),
				membersLeaderboard = members.map((m) => {
					return {
						id: m.id,
						value: m.level
					};
				}).sort((a,b) => b.value - a.value);
			const table = new AsciiTable("LEADERBOARD");
			table.setHeading("#", message.translate("common:USER"), message.translate("common:LEVEL"));
			if(membersLeaderboard.length > 20) membersLeaderboard.length = 20;
			const newTable = await fetchUsers(membersLeaderboard, table, this.client);
			message.channel.send("```\n"+newTable.toString()+"```");
		} else if(type === "rep"){
			const users = await this.client.usersData.find().lean(),
				usersLeaderboard = users.map((u) => {
					return {
						id: u.id,
						value: u.rep
					};
				}).sort((a,b) => b.value - a.value);
			const table = new AsciiTable("LEADERBOARD");
			table.setHeading("#", message.translate("common:USER"), message.translate("common:POINTS"));
			if(usersLeaderboard.length > 20) usersLeaderboard.length = 20;
			const newTable = await fetchUsers(usersLeaderboard, table, this.client);
			message.channel.send("```\n"+newTable.toString()+"```");
		}

		if(isOnlyOnMobile){
			message.sendT("economy/leaderboard:MOBILE");
		}
        
		async function fetchUsers(array, table, client) {
			return new Promise((resolve) => {
				let index = 0;
				array.forEach((element) => {
					client.users.fetch(element.id).then((user) => {
						const regEx = /(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\u0023-\u0039]\ufe0f?\u20e3|\u3299|\u3297|\u303d|\u3030|\u24c2|\ud83c[\udd70-\udd71]|\ud83c[\udd7e-\udd7f]|\ud83c\udd8e|\ud83c[\udd91-\udd9a]|\ud83c[\udde6-\uddff]|\ud83c[\ude01-\ude02]|\ud83c\ude1a|\ud83c\ude2f|\ud83c[\ude32-\ude3a]|\ud83c[\ude50-\ude51]|\u203c|\u2049|[\u25aa-\u25ab]|\u25b6|\u25c0|[\u25fb-\u25fe]|\u00a9|\u00ae|\u2122|\u2139|\ud83c\udc04|[\u2600-\u26FF]|\u2b05|\u2b06|\u2b07|\u2b1b|\u2b1c|\u2b50|\u2b55|\u231a|\u231b|\u2328|\u23cf|[\u23e9-\u23f3]|[\u23f8-\u23fa]|\ud83c\udccf|\u2934|\u2935|[\u2190-\u21ff])/g;
						let username = user.username.replace(regEx, "");
						if(username.length > 20){
							username = username.substr(0, 20);
						}
						table.addRow(index++, username, element.value);
					});
				});
				resolve(table);
			});
		}
	}

}

module.exports = Leaderboard;
