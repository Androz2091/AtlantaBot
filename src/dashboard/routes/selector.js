const { Router } = require("express");
const CheckAuth = require("../middlewares/CheckAuth");
const FetchUser = require("../middlewares/FetchUser");
const Constants = require("../../utility/Constants");

module.exports.Router = class Selector extends Router {
    constructor() {
        super();
        this.get("/", [CheckAuth, FetchUser], (req, res) => {
            res.render("selector", {
                user: req.userData,
                translate: req.translate,
                locale: req.locale,
                currentURL: `${req.client.config.dashboard.baseURL}${req.originalUrl}`,
                hasJoinedSupport: req.hasJoinedSupport,
                discord: Constants.Links.SERVER
            });
        });
    }
};

module.exports.name = "/selector";
