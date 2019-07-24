const mongoose = require("mongoose"),
config = require("../config.js");

module.exports = mongoose.model("Guild", new mongoose.Schema({
    id: { type: String }, // Discord ID of the guild
    membersData: { type: Object, default: {} }, // Members data of the guild
    language: { type: String, default: config.defaultLanguage }, // Language of the guild
    prefix: { type: String, default: config.prefix }, // Default or custom prefix of the guild
    plugins: { type: Object, default: { // Plugins data
        welcome: {
            enabled: false,
            message: null,
            channel: null,
            image: {
                enabled: false,
                color: null
            }
        },
        goodbye: {
            enabled: false,
            message: null,
            channel: null,
            image: {
                enabled: false,
                color: null
            }
        },
        autorole: {
            enabled: false,
            role: null
        },
        automod: {
            enabled: false,
            ignored: []
        },
        warnsSanctions: {
            kick: false,
            ban: false
        },
        suggestions: false,
        modlogs: false
    }},
    slowmode: { type: Object, default: {
        users: [],
        channels: []
    }},
    ignoredChannels: { type: Array, default: [] }, // Channels ignored by the bot
    cases: { type: Object, default: { // Warns data for the guild
        count: 0,
        list: []
    }},
    muted: { type: Array }, // Members that are muted in this guild
    customCommands: { type: Array } // Custom commands of the guild
}));
