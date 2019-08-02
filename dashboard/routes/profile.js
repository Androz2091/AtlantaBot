const express = require("express"),
utils = require("../utils"),
CheckAuth = require("../auth/CheckAuth"),
router = express.Router();

// Gets profile page
router.get("/", CheckAuth, async function(req, res) {
    let stats = await utils.getLeaderboard(req.client, 10);
    res.render("profile", {
        user: req.userInfos,
        language: req.language,
        currentURL: `${req.client.config.dashboard.baseURL}/${req.originalUrl}`,
        stats
    });
});

router.post("/", CheckAuth, async function(req, res){
    let user = await req.client.usersData.findOne({id:req.user.id});
    let data = req.body;
    if(data.bio){
        user.bio = data.bio;
    }
    if(data.birthdate){
        let tArgs = data.birthdate.split("/");
        let [day, month, year] = tArgs;
        if(day && month && year){
            // Gets the string of the date
            let match = data.birthdate.match(/\d+/g);
            if (match){
                let tday = +match[0], tmonth = +match[1] - 1, tyear = +match[2];
                if(tyear < 100){
                    tyear += tyear < 50 ? 2000 : 1900;
                }
                let d = new Date(tyear, tmonth, tday);
                if(tday == d.getDate() && tmonth == d.getMonth() && tyear == d.getFullYear()){
                    if(d.getTime() < Date.now() && d.getTime() > (Date.now()-2.523e+12)){
                        user.birthdate = d;
                    }
                }
            }
        }
    }
    await user.save();
    res.redirect(303, "/profile");
});

module.exports = router;