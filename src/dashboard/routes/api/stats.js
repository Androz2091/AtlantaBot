const { Router } = require("express");

module.exports.Router = class Stats extends Router {
    constructor() {
        super();
        this.get("/", async (req, res) => {
            const guildCount = await req.client.fetchData("guilds.cache.size");
            const userCount = await req.client.fetchData("guilds.cache.size");
            res.send({
                error: false,
                guildCount,
                userCount
            });
        });
    }
};

module.exports.name = "/api/stats";
