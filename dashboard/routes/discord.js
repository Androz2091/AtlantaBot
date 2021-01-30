const express = require("express"),
	router = express.Router(),
	Discord = require("discord.js");

const fetch = require("node-fetch"),
	btoa = require("btoa");

// Gets login page
router.get("/login", async function(req, res) {
	if(!req.user || !req.user.id || !req.user.guilds){
		return res.redirect(`https://discordapp.com/api/oauth2/authorize?client_id=${req.client.user.id}&scope=identify%20guilds&response_type=code&redirect_uri=${encodeURIComponent(req.client.config.dashboard.baseURL+"/api/callback")}&state=${req.query.state || "no"}`);
	}
	res.redirect("/selector");
});

router.get("/callback", async (req, res) => {
	if(!req.query.code) return res.redirect(req.client.config.dashboard.failureURL);
	if(req.query.state && req.query.state.startsWith("invite")){
		if(req.query.code){
			const guildID = req.query.state.substr("invite".length, req.query.state.length);
			req.client.knownGuilds.push({ id: guildID, user: req.user.id });
			return res.redirect("/manage/"+guildID);
		}
	}
	const redirectURL = req.client.states[req.query.state] || "/selector";
	const params = new URLSearchParams();
	params.set("grant_type", "authorization_code");
	params.set("code", req.query.code);
	params.set("redirect_uri", `${req.client.config.dashboard.baseURL}/api/callback`);
	let response = await fetch("https://discord.com/api/oauth2/token", {
		method: "POST",
		body: params.toString(),
		headers: {
			Authorization: `Basic ${btoa(`${req.client.user.id}:${req.client.config.dashboard.secret}`)}`,
			"Content-Type": "application/x-www-form-urlencoded"
		}
	});
	// Fetch tokens (used to fetch user informations)
	const tokens = await response.json();
	// If the code isn't valid
	if(tokens.error || !tokens.access_token) return res.redirect(`/api/login&state=${req.query.state}`);
	const userData = {
		infos: null,
		guilds: null
	};
	while(!userData.infos || !userData.guilds){
		/* User infos */
		if(!userData.infos){
			response = await fetch("http://discordapp.com/api/users/@me", {
				method: "GET",
				headers: { Authorization: `Bearer ${tokens.access_token}` }
			});
			const json = await response.json();
			if(json.retry_after) await req.client.wait(json.retry_after);
			else userData.infos = json;
		}
		/* User guilds */
		if(!userData.guilds){
			response = await fetch("https://discordapp.com/api/users/@me/guilds", {
				method: "GET",
				headers: { Authorization: `Bearer ${tokens.access_token}` }
			});
			const json = await response.json();
			if(json.retry_after) await req.client.wait(json.retry_after);
			else userData.guilds = json;
		}
	}
	/* Change format (from "0": { data }, "1": { data }, etc... to [ { data }, { data } ]) */
	const guilds = [];
	for(const guildPos in userData.guilds) guilds.push(userData.guilds[guildPos]);
	// Update session
	req.session.user = { ... userData.infos, ... { guilds } };
	const user = await req.client.users.fetch(req.session.user.id);
	const userDB = await req.client.findOrCreateUser(req.session.user.id);
	const logsChannel = req.client.channels.cache.get(req.client.config.dashboard.logs);
	if(!userDB.logged && logsChannel && user){
		const embed = new Discord.MessageEmbed()
			.setAuthor(user.username, user.displayAvatarURL())
			.setColor("#DA70D6")
			.setDescription(req.client.translate("dashboard:FIRST_LOGIN", {
				user: user.tag
			}));
		logsChannel.send(embed);
		userDB.logged = true;
		userDB.save();
	}
	res.redirect(redirectURL);
});

module.exports = router;