const mongoose = require("mongoose");

module.exports = mongoose.model("User", new mongoose.Schema({
    id: { type: String }, // Discord ID of the user
    bio: { type: String }, // Biography of the user
    birthdate: { type: Date }, // Birthdate of the user (the timestamp)
    lover: { type: String }, // The person with whom the user is in a relationship
    registeredAt: { type: Number, default: Date.now() }, // Registered date of the user
    stats: { type: Object, default: { // Game stats for the user
        slots: 0,
        findwords: 0,
        number: 0
    }}
}));