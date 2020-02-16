const { Collection } = require("discord.js");

module.exports = class User {
    constructor(userID, data = {}, handler) {
        this.id = userID;
        this.handler = handler;
        this.inserted = data !== {};
        this.data = data;
        // Whether the user is fetched
        this.fetched = false;
        // User birthdate
        this.birthdate = '';
        // User biography
        this.bio = '';
        // User reputation
        this.rep = 0;
        // Timestamp of the user creation date (in the database)
        this.registeredAt = data.guild_registered_at || Date.now();
    }

    async fetch() {
        if (this.fetched) return;
        this.reminds = [];
        await this.fetchReminds();
        this.fetched = true;
    }

    // Fetch and fill reminds
    async fetchReminds() {
        return;
    }

    // Insert the guild in the db if it doesn't exist
    async insert() {
        if (!this.inserted) {
            await this.handler.query(`
                INSERT INTO users
                (user_id, user_birthdate, user_rep, user_registered_at, user_bio) VALUES
                ('${this.id}', '${this.birthdate}', '${this.rep}', ${this.registeredAt}, '${this.bio}');
            `);
            this.inserted = true;
        }
        return this;
    }
};
