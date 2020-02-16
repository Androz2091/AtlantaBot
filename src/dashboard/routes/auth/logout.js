const { Router } = require('express');

module.exports.Router = class Logout extends Router {
    constructor() {
        super();
        this.get('/', (req, res) => {
            req.session.destroy();
            res.redirect(req.config.dashboard.failureURL);
        });
    }
};

module.exports.name = '/auth/logout';