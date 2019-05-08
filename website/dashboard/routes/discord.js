const express = require('express');  
const router = express.Router();
const passport = require("passport");

// Gets login page
router.get("/login", passport.authenticate("discord", { failureRedirect: "/login" }), function(req, res) {
    res.redirect("/panel");
});

router.get("/", function(req, res){
    res.redirect("/login");
});

module.exports = router;