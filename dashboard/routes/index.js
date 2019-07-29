const express = require("express"),
CheckAuth = require("../auth/CheckAuth"),
router = express.Router();

router.get("/", CheckAuth, async (req, res) => {
    res.redirect("/selector");
});

router.get("/selector", CheckAuth, async(req, res) => {
    res.render("selector", {
        user: req.userInfos,
        language: req.language
    });
});

router.get("/server/:serverID", CheckAuth, async(req, res) => {
    let guild = req.client.guilds.get(req.params.serverID);
    if(!guild || !req.userInfos.displayedGuilds || !req.userInfos.displayedGuilds.includes(req.params.serverID)){
        return res.render("404", {
            user: req.userInfos,
            language: req.language
        });
    }
});

module.exports = router;