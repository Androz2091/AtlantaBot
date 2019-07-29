const mongoose = require("mongoose");

module.exports = mongoose.model("Log", new mongoose.Schema({
    command: { type: Object },
    date: { type: Number, default: Date.now() },
    user: { type: Object },
    guild: { type: Object }
}));