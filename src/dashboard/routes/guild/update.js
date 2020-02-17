const { Router } = require('express');
const CheckAuth = require("../../middlewares/CheckAuth");
const FetchUser = require("../../middlewares/FetchUser");
const FetchGuild = require("../../middlewares/FetchGuild");
const Constants = require("../../../utility/Constants");

module.exports.Router = class Update extends Router {
    constructor() {
        super();
        this.get('/', [CheckAuth, FetchUser], (_req, res) => {
            res.redirect('/selector');
        });
        this.post('/:guildID/:type', [CheckAuth, FetchUser, FetchGuild], async (req, res) => {
            const payload = req.body;
            const guild = await req.client.handlers.database.fetchGuild(req.params.guildID);
            if(req.params.type === "leave"){
                await req.client.broadcastEval(`const guild = this.guilds.cache.get('${req.params.guildID}'); if(guild) guild.leave();`);
                return res.redirect("/selector");
            }
            if(req.params.type === "basic"){
                if (payload.prefix){
                    await guild.setPrefix(payload.prefix);
                }
                if (payload.language) {
                    await guild.setLanguage(payload.language);
                }
            }
            if(req.params.type === "welcome"){
                const update = payload.hasOwnProperty("update");
                const disable = payload.hasOwnProperty("disable");
                const enable = payload.hasOwnProperty("enable");
                guild.plugins.welcome.message = payload.message;
                guild.plugins.welcome.channelID = req.guildData.channels.find((c) => `#${c.name}` === payload.channel).id;
                guild.plugins.welcome.withImage = payload.withImage === "on";
                if(update){
                    await guild.plugins.welcome.updateData();
                } else if(disable){
                    guild.plugins.welcome.enabled = false;
                    await guild.plugins.welcome.updateData();
                } else if(enable){
                    guild.plugins.welcome.enabled = true;
                    await guild.plugins.welcome.updateData();
                }
            }
            if(req.params.type === "goodbye"){
                const update = payload.hasOwnProperty("update");
                const disable = payload.hasOwnProperty("disable");
                const enable = payload.hasOwnProperty("enable");
                guild.plugins.goodbye.message = payload.message;
                guild.plugins.goodbye.channelID = req.guildData.channels.find((c) => `#${c.name}` === payload.channel).id;
                guild.plugins.goodbye.withImage = payload.withImage === "on";
                if(update){
                    await guild.plugins.goodbye.updateData();
                } else if(disable){
                    guild.plugins.goodbye.enabled = false;
                    await guild.plugins.goodbye.updateData();
                } else if(enable){
                    guild.plugins.goodbye.enabled = true;
                    await guild.plugins.goodbye.updateData();
                }
            }
            res.redirect(`/guild/manage/${req.params.guildID}`);
        });
    }
};

module.exports.name = '/guild/update';