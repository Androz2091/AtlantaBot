const express = require("express"),
CheckAuth = require("../auth/CheckAuth"),
router = express.Router();

router.get("/", CheckAuth, async (req, res) => {
    res.redirect("/selector");
});

router.get("/selector", CheckAuth, async(req, res) => {
    res.render("selector", {
        user: req.userInfos,
        language: req.language,
        currentURL: `${req.protocol}://${req.get("host")}${req.originalUrl}`
    });
});

router.get("/language", CheckAuth, async(req, res) => {
    let newLanguage = (req.user.locale === "en" ? "fr" : "en");
    req.user.locale = newLanguage;
    res.redirect(303, req.query.redirect);
});

module.exports = router;