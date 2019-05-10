const express = require('express');  
const router = express.Router();
const passport = require("passport");

// Gets login page
router.get("/login", passport.authenticate("discord", { failureRedirect: "/login" }), function(req, res) {
    res.redirect("/panel/dashboard");
});

router.get("/", function(req, res){
    res.redirect("/login");
});

router.get("/logout", async function(req, res) {
    await req.logout();
    await res.redirect("/");
});

module.exports = router;