const express = require("express"),
CheckAuth = require("../auth/CheckAuth"),
router = express.Router();

router.get("/:lang/", CheckAuth, (req, res) => {
    res.send(req.language);
});

module.exports = router;