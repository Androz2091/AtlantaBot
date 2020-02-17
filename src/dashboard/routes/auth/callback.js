const { Router } = require('express');
const fetch = require("node-fetch");
const btoa = require("btoa");
const wait = (time) => new Promise((r) => setTimeout(r, time));

module.exports.Router = class Callback extends Router {
    constructor() {
        super();
        this.get('/', async (req, res) => {
            if(req.query.state && req.query.state.startsWith("invite")){
                if(req.query.code){
                    const guildID = req.query.state.substr("invite".length, req.query.state.length);
                    req.client.knownGuilds.push({ id: guildID, user: req.user.id });
                    return res.redirect(`/guild/manage/${guildID}`);
                } else {
                    return res.redirect("/selector");
                }
            }
            if(!req.query.code) return res.redirect(req.client.config.dashboard.failureURL);
            const state = req.dashboard.states[req.query.state];
            const redirectURL = state || "/selector";
            let response = await fetch(`https://discordapp.com/api/oauth2/token?grant_type=authorization_code&code=${req.query.code}&redirect_uri=${req.client.config.dashboard.baseURL}/auth/callback`, {
                method: "POST",
                headers: {
                    Authorization: `Basic ${btoa(`${req.client.user.id}:${req.client.config.dashboard.secret}`)}`
                }
            });
            // Fetch tokens (used to fetch user informations)
            const tokens = await response.json();
            // If the code isn't valid
            if(tokens.error || !tokens.access_token) return res.redirect(`/auth/login?state=${req.query.state}`);
            const userData = {
                infos: null,
                guilds: null
            };
            while(!userData.infos || !userData.guilds){
                /* User infos */
                if(!userData.infos){
                    response = await fetch("http://discordapp.com/api/users/@me", {
                        method: "GET",
                        headers: {
                            Authorization: `Bearer ${tokens.access_token}`
                        }
                    });
                    const json = await response.json();
                    if(json.retry_after) await wait(json.retry_after);
                    else userData.infos = json;
                }
                /* User guilds */
                if(!userData.guilds){
                    response = await fetch("https://discordapp.com/api/users/@me/guilds", {
                        method: "GET",
                        headers: {
                            Authorization: `Bearer ${tokens.access_token}`
                        }
                    });
                    let json = await response.json();
                    if(json.retry_after) await wait(json.retry_after);
                    else userData.guilds = json;
                }
            }
            // Change format (from "0": { data }, "1": { data }, etc... to [ { data }, { data } ])
            const guilds = [];
            for(let guildPos in userData.guilds) guilds.push(userData.guilds[guildPos]);
            // Update session
            req.session.user = {
                ... userData.infos,
                ... { guilds }
            };
            const user = await req.client.users.fetch(req.session.user.id);
            const userDB = await req.client.handlers.database.fetchUser(req.session.user.id);
            if(!userDB.loggedDashboard){
                const embed = JSON.stringify({
                    color: req.client.config.color,
                    author: {
                        name: user.tag+" connected to the dashboard!"
                    }
                }).replace(/'/g, "''");
                req.client.broadcastEval(`let channel = this.channels.cache.get(this.config.dashboard.logs); if(channel) channel.send({ embed: JSON.parse('${embed}') });`);
            }
            userDB.addDashboardConnection(state, new Date());
            req.session.authenticated = true;
            res.redirect(redirectURL);
        });
    }
};

module.exports.name = '/auth/callback';
