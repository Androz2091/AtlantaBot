const express = require("express"),
	utils = require("../utils"),
	CheckAuth = require("../auth/CheckAuth"),
	router = express.Router();
const generator = require("colors-generator");

router.get("/:serverID", CheckAuth, async(req, res) => {
	// Check if the user has the permissions to edit this guild
	const guild = req.client.guilds.cache.get(req.params.serverID);
	if(!guild || !req.userInfos.displayedGuilds || !req.userInfos.displayedGuilds.find((g) => g.id === req.params.serverID)){
		return res.render("404", {
			user: req.userInfos,
			language: req.language,
			currentURL: `${req.client.config.dashboard.baseURL}/${req.originalUrl}`
		});
	}

	// Fetch guild informations
	const guildInfos = await utils.fetchGuild(guild.id, req.client, req.user.guilds);

	const membersData = await req.client.membersData.find({ guildID: guild.id }).lean();
    
	const leaderboards = {
		money: sortArrayOfObjects("money", membersData),
		level: sortArrayOfObjects("level", membersData)
	};
    
	for(const cat in leaderboards){
		const e = leaderboards[cat];
		if(e.length > 10) e.length = 10;
	}
	const stats = { money: await utils.fetchUsers(leaderboards.money, req.client), level: await utils.fetchUsers(leaderboards.level, req.client) };
	res.render("stats/guild", {
		stats,
		commands: getCommands(guildInfos.commands.filter((c) => c.date > Date.now()-604800000)),
		commandsUsage: getCommandsUsage(guildInfos.commands),
		user: req.userInfos,
		language: req.language,
		currentURL: `${req.client.config.dashboard.baseURL}/${req.originalUrl}`,
	});
});

module.exports = router;

function getCommands(commands){
	const aDateCommand = {};
	commands.forEach((cmd) => {
		const tDate = formatDate(new Date(cmd.date));
		if(aDateCommand[tDate]){
			aDateCommand[tDate]++;
		} else {
			aDateCommand[tDate] = 1;
		}
	});
	return aDateCommand;
}

function getCommandsUsage(commands){
	const objectCount = commands.reduce((acc, curr) => {
		if (typeof acc[curr.command] == "undefined") {
			acc[curr.command] = 1;
		} else {
			acc[curr.command] += 1;
		}
		return acc;
	}, {});
	const percentages = getPercentagePerKey(objectCount); // [ { key: "help", percentage: 20 } ]
	const colors = generator.generate("#86bff2", percentages.length).get();
	let i = 0;
	percentages.forEach((p) => {
		p.color = colors[i];
		i++;
	});
	return percentages;
}

function getPercentagePerKey(myArray) {
	const sum = getSum(myArray);
	const arrayWithPercentages = [];
	for (const key in myArray) {
		const val = myArray[key];
		const percentage = Math.round((val / sum) * 100);
		arrayWithPercentages.push({key, percentage});
	}
	return arrayWithPercentages;
}
  
function getSum(myArray) {
	let sum = 0;
	for (const key in myArray) {
		sum += myArray[key];
	}
	return sum;
}

function sortArrayOfObjects(key, arr){
	const array = arr.slice(0);
	return array.sort((a, b) => {
		return b[key] - a[key];
	});
}

function formatDate(date){
	let dd = date.getDate();
	let mm = date.getMonth()+1;
	if(dd<10) {dd="0"+dd;}
	if(mm<10) {mm="0"+mm;}
	date = mm+"/"+dd;
	return date;
}