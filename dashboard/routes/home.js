const express = require("express"),
CheckAuth = require("../auth/CheckAuth"),
router = express.Router();

router.get("/", CheckAuth, (req, res) => {
    res.send("It works!");
});

module.exports = router;