const express = require("express"),
router = express.Router();

// Gets login page
router.get("/", async function(req, res) {
    await req.logout();
    res.redirect(req.client.config.dashboard.failureURL);
});

module.exports = router;