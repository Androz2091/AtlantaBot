const express = require("express"),
config = require("../../config"),
router = express.Router(),
passport = require("passport"),
Discord = require("discord.js");

// Gets login page
router.get("/", passport.authenticate("discord", { failureRedirect: config.dashboard.failureURL }), async function(req, res) {
    res.send(req.user);
});

module.exports = router;