const { Router } = require("express");
const CheckAuth = require("../middlewares/CheckAuth");

module.exports.Router = class Language extends Router {
    constructor() {
        super();
        this.get("/", CheckAuth, (req, res) => {
            const newLanguage = req.query.new;
            req.session.locale = newLanguage.slice(0, 2);
            res.redirect(req.query.url);
        });
    }
};

module.exports.name = "/language";
