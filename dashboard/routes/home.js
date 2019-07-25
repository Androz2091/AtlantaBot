const express = require("express"),
CheckAuth = require("../auth/CheckAuth"),
router = express.Router();

router.get("/", CheckAuth, async (req, res) => {
    let userInfos = await fetchUser(req.user, req.client);
    res.render("dashboard", {
        user: userInfos,
        language: req.language
    });
});

module.exports = router;

async function fetchUser(userData, client){
    let user = await client.users.fetch(userData.id);
    let usersDb = await client.functions.getUsersData(client, [ user ]);
    let userDb = usersDb[0].toJSON()
    let userInfos = { ...user.toJSON(), ...userDb, ...userData, ...user.presence };
    return userInfos;
}