const { Router } = require('express');
const CheckAuth = require("../middlewares/CheckAuth");

module.exports.Router = class Index extends Router {
    constructor() {
        super();
        this.get('/', CheckAuth, (_req, res) => {
            res.redirect('/selector');
        });
    }
};

module.exports.name = '/';