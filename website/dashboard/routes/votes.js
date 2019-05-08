const express = require('express');  
const router = express.Router();

// Gets votes page
router.post("/", (req, res) => {
    if (req.headers.authorization !== req.client.config.server.votes.auth) {
        req.client.logger.log("[VOTES] Rejected Post Request, Details Below\n"+req.headers);
        res.status(401).send('Unauthorized');
    } else {
        req.client.logger.log("[VOTES] New vote ! USER: "+req.body.user);
        req.client.functions.vote({user:req.body.user, isWeekend:req.body.isWeekend}, req.client);
        res.send("Success");
    }
});

module.exports = router;