const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();

module.exports.init = async(client) => {
    
    // For the home page
    var indexRouter = require("./routes/index");

    // To handle votes
    var votesRouter = require("./routes/votes");

    app.use(bodyParser.json())
    .use(bodyParser.urlencoded({ extended: true }))
    .engine("html", require("ejs").renderFile)
    .use(express.static(path.join(__dirname, "/public")))
    .set("view engine", "ejs")
    .set("views", path.join(__dirname, "views"))
    .set("port", client.config.server.port)
    
    // Add client variable to request
    app.use(function(req,res,next){
        req.client = client;
        next();
    });

    // Redirect
    app.use("/votes", votesRouter)
    .use("/", indexRouter);

    // Listen on the port 
    app.listen(app.get('port'), (err) => {
        if (err) throw err;
        console.log("Atlanta is listening on port "+app.get('port'));
    });

};