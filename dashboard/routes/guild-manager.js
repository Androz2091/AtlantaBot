const express = require("express"),
	utils = require("../utils"),
	CheckAuth = require("../auth/CheckAuth"),
	router = express.Router();

router.get("/:serverID", CheckAuth, async(req, res) => {

	// Check if the user has the permissions to edit this guild
	const guild = req.client.guilds.cache.get(req.params.serverID);
	if(!guild || !req.userInfos.displayedGuilds || !req.userInfos.displayedGuilds.find((g) => g.id === req.params.serverID)){
		return res.render("404", {
			user: req.userInfos,
			translate: req.translate,
			currentURL: `${req.client.config.dashboard.baseURL}/${req.originalUrl}`
		});
	}

	// Fetch guild informations
	const guildInfos = await utils.fetchGuild(guild.id, req.client, req.user.guilds);

	res.render("manager/guild", {
		guild: guildInfos,
		user: req.userInfos,
		translate: req.translate,
		bot: req.client,
		currentURL: `${req.client.config.dashboard.baseURL}/${req.originalUrl}`
	});

});

router.post("/:serverID", CheckAuth, async(req, res) => {

	// Check if the user has the permissions to edit this guild
	const guild = req.client.guilds.cache.get(req.params.serverID);
	if(!guild || !req.userInfos.displayedGuilds || !req.userInfos.displayedGuilds.find((g) => g.id === req.params.serverID)){
		return res.render("404", {
			user: req.userInfos,
			translate: req.translate,
			currentURL: `${req.client.config.dashboard.baseURL}/${req.originalUrl}`
		});
	}
    
	const guildData = await req.client.findOrCreateGuild({ id: guild.id });
	const data = req.body;
    
	if(data.language){
		const language = req.client.config.languages.find((language) => language.aliases[0].toLowerCase() === data.language.toLowerCase());
		if(language){
			guildData.language = language.name;
		}
		if(data.prefix.length >= 1 && data.prefix.length < 2000){
			guildData.prefix = data.prefix;
		}
		await guildData.save();
	}

	if(Object.prototype.hasOwnProperty.call(data, "welcomeEnable") || Object.prototype.hasOwnProperty.call(data, "welcomeUpdate")){
		const welcome = {
			enabled: true,
			message: data.message,
			channel: guild.channels.cache.find((ch) => "#"+ch.name === data.channel).id,
			withImage: data.withImage === "on"
		};
		guildData.plugins.welcome = welcome;
		guildData.markModified("plugins.welcome");
		await guildData.save();
	}

	if(Object.prototype.hasOwnProperty.call(data, "welcomeDisable")){
		const welcome = {
			enabled: false,
			message: null,
			channel: null,
			withImage: null
		};
		guildData.plugins.welcome = welcome;
		guildData.markModified("plugins.welcome");
		await guildData.save();
	}

	if(Object.prototype.hasOwnProperty.call(data, "goodbyeEnable") || Object.prototype.hasOwnProperty.call(data, "goodbyeUpdate")){
		const goodbye = {
			enabled: true,
			message: data.message,
			channel: guild.channels.cache.find((ch) => "#"+ch.name === data.channel).id,
			withImage: data.withImage === "on"
		};
		guildData.plugins.goodbye = goodbye;
		guildData.markModified("plugins.goodbye");
		await guildData.save();
	}

	if(Object.prototype.hasOwnProperty.call(data, "goodbyeDisable")){
		const goodbye = {
			enabled: false,
			message: null,
			channel: null,
			withImage: null
		};
		guildData.plugins.goodbye = goodbye;
		guildData.markModified("plugins.goodbye");
		await guildData.save();
	}

	if(Object.prototype.hasOwnProperty.call(data, "autoroleEnable") || Object.prototype.hasOwnProperty.call(data, "autoroleUpdate")){
		const autorole = {
			enabled: true,
			role: guild.roles.cache.find((r) => "@"+r.name === data.role).id
		};
		guildData.plugins.autorole = autorole;
		guildData.markModified("plugins.autorole");
		await guildData.save();
	}

	if(Object.prototype.hasOwnProperty.call(data, "autoroleDisable")){
		const autorole = {
			enabled: false,
			role: null
		};
		guildData.plugins.autorole = autorole;
		guildData.markModified("plugins.autorole");
		await guildData.save();
	}

	if(Object.prototype.hasOwnProperty.call(data, "suggestions")){
		if(data.suggestions === req.translate("common:NO_CHANNEL")){
			guildData.plugins.suggestions = false;
		} else {
			guildData.plugins.suggestions = guild.channels.cache.find((ch) => "#"+ch.name === data.suggestions).id;
		}
		if(data.modlogs === req.translate("common:NO_CHANNEL")){
			guildData.plugins.modlogs = false;
		} else {
			guildData.plugins.modlogs = guild.channels.cache.find((ch) => "#"+ch.name === data.modlogs).id;
		}
		if(data.fortniteshop === req.translate("common:NO_CHANNEL")){
			guildData.plugins.fortniteshop = false;
		} else {
			guildData.plugins.fortniteshop = guild.channels.cache.find((ch) => "#"+ch.name === data.fortniteshop).id;
		}
		guildData.markModified("plugins");
	}
    
	await guildData.save();

	res.redirect(303, "/manage/"+guild.id);
});

module.exports = router;