const mongoose = require("mongoose"),
Canvas = require("canvas");

const userSchema = new mongoose.Schema({

    /* REQUIRED */
    id: { type: String }, // Discord ID of the user

    /* ECONOMY (GLOBAL) */
    rep: { type: Number, default: 0 }, // Reputation points of the user
    badges: { type: Array, default: [] }, // Badges of the user
    bio: { type: String }, // Biography of the user
    birthdate: { type: Number }, // Birthdate of the user (the timestamp)
    lover: { type: String }, // The person with whom the user is in a relationship

    /* STATS */
    registeredAt: { type: Number, default: Date.now() }, // Registered date of the user

    /* ACHIEVEMENTS */
    achievements: { type: Object, default: {
        married: false,
        work: false,
        firstCommand: false,
        slots: false,
        tip: false,
        rep: false,
        invite: false,
        leaderboard: false
    }},

    /* OTHER INFORMATIONS */
    afk: { type: String, default: null }, // Whether the member is AFK
    reminds: { type: Array, default: [] }, // the reminds of the user
    logged: { type: Boolean, default: false } // if the user is logged to the dashboard

});

userSchema.method("getAchievements", async function(){
    let canvas = Canvas.createCanvas(1800, 250),
    ctx = canvas.getContext("2d");
    let images = [
        await Canvas.loadImage("./assets/img/achievements/achievement"+(this.achievements.work ? "_colored" : "")+"1.png"),
        await Canvas.loadImage("./assets/img/achievements/achievement"+(this.achievements.firstCommand ? "_colored" : "")+"2.png"),
        await Canvas.loadImage("./assets/img/achievements/achievement"+(this.achievements.leaderboard ? "_colored" : "")+"3.png"),
        await Canvas.loadImage("./assets/img/achievements/achievement"+(this.achievements.married ? "_colored" : "")+"4.png"),
        await Canvas.loadImage("./assets/img/achievements/achievement"+(this.achievements.slots ? "_colored" : "")+"5.png"),
        await Canvas.loadImage("./assets/img/achievements/achievement"+(this.achievements.tip ? "_colored" : "")+"6.png"),
        await Canvas.loadImage("./assets/img/achievements/achievement"+(this.achievements.rep ? "_colored" : "")+"7.png"),
        await Canvas.loadImage("./assets/img/achievements/achievement"+(this.achievements.invite ? "_colored" : "")+"8.png")
    ];
    let dim = 0;
    for(let i = 0; i < images.length; i++){
        await ctx.drawImage(images[i], dim, 10, 350, 200);
        dim += 200;
    }
    return canvas.toBuffer();
});

module.exports = mongoose.model("User", userSchema);