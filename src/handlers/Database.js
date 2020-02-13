const { Pool } = require("pg");
const { User, Guild } = require("../models");
const { Collection } = require("discord.js");

module.exports = class DatabaseHandler {
    constructor(client) {
        Object.defineProperty(this, "client", { value: client });
        const { database } = this.client.config;
        this.pool = new Pool(database);

        // Cache
        this.guildCache = new Collection();
        this.userCache = new Collection();
    }

    async initCache() {
        await this.client.helpers.asyncForEach.execute(
            this.client.guilds.cache.array(),
            async guild => {
                await this.fetchGuild(guild.id);
            }
        );
    }

    // Make a new query to the db
    query(string) {
        return new Promise((resolve, reject) => {
            this.pool.query(string, (error, results) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(results);
                }
            });
        });
    }

    // Create or get a user
    fetchUser(userID, forceFetch) {
        return new Promise(async resolve => {
            // If the user is in the cache
            if (this.userCache.get(userID) && !forceFetch)
                return resolve(this.userCache.get(userID));
            const results = await this.query(
                `SELECT * FROM users WHERE id= '${userID}'`
            );
            if (results.rows.length === 0) {
                results = await this.query(
                    `INSERT INTO users (id, registered_at) VALUES ('${userID}', '${new Date().toISOString()}') RETURNING *`
                );
            }
            const user = new User(results.rows[0], this);
            resolve(user);
            // Add the user to the cache
            this.userCache.set(userID, user);
        });
    }

    // Create or get a guild
    fetchGuild(guildID, forceFetch) {
        return new Promise(async resolve => {
            // If the guild is in the cache
            if (this.guildCache.get(guildID) && !forceFetch)
                return resolve(this.guildCache.get(guildID));
            let { rows } = await this.query(
                `SELECT * FROM guilds WHERE guild_id = '${guildID}'`
            );
            const guild = new Guild(guildID, rows[0], this);
            // Insert the guild into the database if it's needed
            if (!guild.inserted) await guild.insert();
            // Fetch guild plugins, custom commands, etc...
            await guild.fetch();
            resolve(guild);
            // Add the guild to the cache
            this.guildCache.set(guildID, guild);
        });
    }
};
