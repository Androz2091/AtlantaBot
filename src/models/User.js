const { Collection } = require("discord.js");

module.exports = class User {
    constructor(userID, data = {}, handler) {
        this.id = userID;
        this.handler = handler;
        this.inserted = Object.keys(data).length !== 0;
        this.data = data;
        // Whether the user is fetched
        this.fetched = false;
        // User birthdate
        this.birthdate = data.user_birthdate || null;
        // User biography
        this.bio = data.user_bio || "";
        // User reputation
        this.rep = data.user_rep || 0;
        // Timestamp of the user creation date (in the database)
        this.registeredAt = data.guild_registered_at || Date.now();
    }

    async fetch() {
        if (this.fetched) return;
        this.dashboardConnections = [];
        await this.fetchDashboardConnections();
        this.relationShips = {
            current: null,
            old: []
        };
        await this.fetchRelationShips();
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

    async setBirthdate(newDate){
        await this.handler.query(`
            UPDATE users
            SET user_birthdate = '${newDate.toISOString()}'
            WHERE user_id = '${this.id}';
        `);
        this.birthdate = newDate.toISOString();
        return this;
    }

    // Fetch and fill relation ships
    async fetchRelationShips() {
        const { rows } = await this.handler.query(`
            SELECT * FROM user_relationships
            WHERE user_id_1 = '${this.id}'
            OR user_id_2 = '${this.id}';
        `);
        rows.forEach((relationShipData, i) => {
            const relationShip = {
                createdAt: new Date(relationShipData.created_at).getTime(),
                endedAt: new Date(relationShipData.ended_at).getTime(),
                relationShipCreator: relationShipData.user_id_1 === this.id
            };
            if(relationShip.relationShipCreator){
                relationShip.partnerID = relationShipData.user_id_2;
            } else {
                relationShip.partnerID = relationShipData.user_id_1;
            }
            if(!relationShipData.ended_at){
                this.relationShips.current = relationShip;
            } else {
                this.relationShips.old.push(relationShip);
            }
        });
        return this.relationShips;
    }

    async createRelationShip({ creator, partner, date = new Date() }, published) {
        if(!published) await this.handler.query(`
            INSERT INTO user_relationships
            (user_id_1, user_id_2, created_at) VALUES
            ('${creator ? this.id : partner}', '${creator ? partner : this.id}', '${date.toISOString()}');
        `);
        this.relationShips.current = {
            createdAt: date.toISOString(),
            partnerID: partner,
            relationShipCreator: creator
        };
        return this;
    }

    async destroyRelationShip(date = new Date(), published){
        if(!published) await this.handler.query(`
            UPDATE user_relationships
            SET ended_at = '${date.toISOString()}'
            WHERE user_id_1 = '${this.relationShips.current.relationShipCreator ? this.id : this.relationShips.current.partnerID}'
            AND user_id_2 = '${this.relationShips.current.relationShipCreator ? this.relationShips.current.partnerID : this.id}'
            AND ended_at = null;
        `);
        this.relationShips.current.endDate = date.getTime();
        this.relationShips.old.push(this.relationShips.current);
        this.relationShips.current = null;
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
                (user_id, user_rep, user_registered_at, user_bio ${this.birthdate ? `, user_birthdate` : ""}) VALUES
                ('${this.id}', '${this.rep}', ${this.registeredAt}, '${this.bio}' ${this.birthdate ? `, '${this.birthdate}` : ""});
            `);
            this.inserted = true;
        }
        return this;
    }
};
