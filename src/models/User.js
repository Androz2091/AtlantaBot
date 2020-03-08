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
        this.birthdate = data.user_birthdate || "";
        // User biography
        this.bio = data.user_bio ||"";
        // User reputation
        this.rep = data.user_rep || 0;
        // Timestamp of the user creation date (in the database)
        this.registeredAt = data.guild_registered_at || Date.now();
    }

    async fetch() {
        if (this.fetched) return;
        this.dashboardConnections = [];
        await this.fetchDashboardConnections();
        this.fetched = true;
    }

    get loggedDashboard() {
        return this.dashboardConnections.length > 0;
    }

    async setBio(newBio){
        await this.handler.query(`
            UPDATE users
            SET user_bio = '${newBio}'
            WHERE user_id = '${this.id}';
        `);
        this.bio = newBio;
        return this;
    }

    // Fetch and fill dashboard connections
    async fetchDashboardConnections() {
        const { rows } = await this.handler.query(`
            SELECT * FROM user_dashboard_connections
            WHERE user_id = '${this.id}';
        `);
        rows.forEach(dashboardConnection => {
            this.dashboardConnections.push({
                date: dashboardConnection.con_date,
                state: dashboardConnection.con_state
            });
        });
        return this.dashboardConnections;
    }

    async addDashboardConnection(state, date = new Date()) {
        await this.handler.query(`
            INSERT INTO user_dashboard_connections
            (user_id, con_date, con_state) VALUES
            ('${this.id}', '${date.toISOString()}', ${
            state ? `'${state}'` : "null"
        });
        `);
        this.dashboardConnections.push({
            date,
            state
        });
        return this;
    }

    // Insert the user in the db if it doesn't exist
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
