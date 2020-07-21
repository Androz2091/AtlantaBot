const {model, Schema} = require("mongoose");

module.exports = model("Log", new Schema({

	commandName: { type: String, default: "unknown" },
	date: { type: Number, default: Date.now() },
	author: { type: Object, default: {
		username: "Unknown",
		discrminator: "0000",
		id: null
	}},
	guild: { type: Object, default: {
		name: "Unknown",
		id: null
	}}
    
}));