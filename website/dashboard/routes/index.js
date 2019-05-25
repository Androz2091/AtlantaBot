const express = require('express');
const router = express.Router();

// Gets home page
router.get("/", function(req, res) {
    res.redirect("/panel/dashboard");
});


module.exports = router;