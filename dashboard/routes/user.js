const express = require("express"),
utils = require("../utils"),
CheckAuth = require("../auth/CheckAuth"),
router = express.Router();

// Gets profile page
router.get("/:userID", CheckAuth, async function(req, res) {
    let userInfos = await utils.fetchUser({
        id: req.params.userID
    }, req.client).catch((err) => {
        res.render("404", {
            user: req.userInfos,
            language: req.language,
            currentURL: `${req.client.config.dashboard.baseURL}/${req.originalUrl}`
        });
    });
    let leaderboard = await utils.getLeaderboard(req.client);
    res.render("user", {
        user: req.userInfos,
        userInfos: {
            ...userInfos,
            ...{
                moneyLeaderboard: leaderboard.money.map((e) => e.id).indexOf(userInfos.id)+1,
                levelLeaderboard: leaderboard.level.map((e) => e.id).indexOf(userInfos.id)+1,
                repLeaderboard: leaderboard.rep.map((e) => e.id).indexOf(userInfos.id)+1
            }
        },
        client: req.client,
        language: req.language,
        currentURL: `${req.client.config.dashboard.baseURL}/${req.originalUrl}`
    });
});

module.exports = router;