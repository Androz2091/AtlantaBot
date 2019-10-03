const mongoose = require("mongoose");

module.exports = mongoose.model("User", new mongoose.Schema({

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

}));