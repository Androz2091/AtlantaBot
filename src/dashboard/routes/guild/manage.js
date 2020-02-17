const { Router } = require('express');
const CheckAuth = require("../../middlewares/CheckAuth");
const FetchUser = require("../../middlewares/FetchUser");
const FetchGuild = require("../../middlewares/FetchGuild");
const Constants = require("../../../utility/Constants");

module.exports.Router = class Manage extends Router {
    constructor() {
        super();
        this.get('/', [CheckAuth, FetchUser], (_req, res) => {
            res.redirect('/selector');
        });
        this.get('/:guildID', [CheckAuth, FetchUser, FetchGuild], (req, res) => {
            res.render("manage", {
                guild: req.guildData,
                user: req.userData,
                translate: req.translate,
                locale: req.locale,
                currentURL: `${req.client.config.dashboard.baseURL}${req.originalUrl}`
            });
        });
        this.get('/:guildID/:type', (req, res) => {
            res.redirect("/guild/manage/"+req.params.guildID);
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
            if(req.params.type === "channels"){
                await req.client.helpers.asyncForEach.execute(["suggestions","modlogs","fortniteshop","reports"], async (settingName) => {
                    const channelName = req.body[settingName];
                    if(channelName){
                        // If the user selected "No channel"
                        if(channelName === req.translate("common:NO_CHANNEL")){
                            await guild.setSpecialChannel(settingName, null);
                        } else {
                            const channelID = req.guildData.channels.find((c) => c.formattedName === channelName).id;
                            await guild.setSpecialChannel(settingName, channelID);
                        }
                    } else {
                        await guild.setSpecialChannel(settingName, null);
                    }
                });
            }
            res.redirect(`/guild/manage/${req.params.guildID}`);
        });
    }
};

module.exports.name = '/guild/manage/';