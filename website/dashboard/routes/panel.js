const express = require('express');  
const router = express.Router();

// Gets dashboard home page
router.get("/", (req, res) => {
    res.render("index", {
        title:"Hello World"
    });
});

module.exports = router;