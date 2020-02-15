const { Router } = require('express');

module.exports.Router = class Login extends Router {
    constructor() {
        super();
        this.get('/', (req, res) => {
            if(!req.session.authenticated){
                return res.redirect(`https://discordapp.com/api/oauth2/authorize?client_id=${req.client.user.id}&scope=identify%20guilds&response_type=code&redirect_uri=${encodeURIComponent(req.client.config.dashboard.baseURL+"/auth/callback")}&state=${req.query.state || "null"}`);
            }
            res.redirect("/selector");
        });
    }
};

module.exports.name = '/auth/login';