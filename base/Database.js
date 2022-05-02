const {Collection} = require("discord.js");
module.exports = class Database {
	constructor(_client) {
		this._client = _client;

		this.cache = {
			users: new Collection(),
			guilds: new Collection(),
			members: new Collection(),
			usersReminds: new Collection(),
			mutedUsers: new Collection(),
		};

		this.guildsData = require("../base/Guild"); // Guild mongoose model
		this.usersData = require("../base/User"); // User mongoose model
		this.membersData = require("../base/Member"); // Member mongoose model
	}

	// This function is used to find a user data or create it
	async findOrCreateUser({ id: userID }, isLean){
		if(this.cache.users.get(userID)){
			return isLean ? this.cache.users.get(userID).toJSON() : this.cache.users.get(userID);
		} else {
			let userData = (isLean ? await this.usersData.findOne({ id: userID }).lean() : await this.usersData.findOne({ id: userID }));
			if(userData){
				if(!isLean) this.cache.users.set(userID, userData);
				return userData;
			} else {
				userData = new this.usersData({ id: userID });
				await userData.save();
				this.cache.users.set(userID, userData);
				return isLean ? userData.toJSON() : userData;
			}
		}
	}

	// This function is used to find a guild data or create it
	async findOrCreateGuild({ id: guildID }, isLean){
		if(this.cache.guilds.get(guildID)){
			return isLean ? this.cache.guilds.get(guildID).toJSON() : this.cache.guilds.get(guildID);
		} else {
			let guildData = (isLean ? await this.guildsData.findOne({ id: guildID }).populate("members").lean() : await this.guildsData.findOne({ id: guildID }).populate("members"));
			if(guildData){
				if(!isLean) this.cache.guilds.set(guildID, guildData);
				return guildData;
			} else {
				guildData = new this.guildsData({ id: guildID });
				await guildData.save();
				this.cache.guilds.set(guildID, guildData);
				return isLean ? guildData.toJSON() : guildData;
			}
		}
	}
};