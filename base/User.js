const mongoose = require("mongoose");

module.exports = mongoose.model("User", new mongoose.Schema({
    id: { type: String }, // Discord ID of the user
    money: { type: Number, default: 0 }, // Money of the user
    rep: { type: Number, default: 0 }, // Reputation points of the user
    exp: { type: Object, default: { // Experience of the user
        level: 0,
        points: 0
    }},
    badges: { type: Array, default: [] }, // Badges of the user
    bio: { type: String }, // Biography of the user
    birthdate: { type: Date }, // Birthdate of the user (the timestamp)
    lover: { type: String }, // The person with whom the user is in a relationship
    registeredAt: { type: Number, default: Date.now() }, // Registered date of the user
    stats: { type: Object, default: { // Game stats for the user
        slots: 0,
        findwords: 0,
        number: 0
    }},
    slowmode: { type: Object }
}));