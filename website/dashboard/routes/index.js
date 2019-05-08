const express = require('express');
const router = express.Router();

// Gets home page
router.get("/", function(req, res) {
    res.send("The dashboard is currently under development");
});


module.exports = router;