const { Pool } = require("pg");
const { User, Guild, Member } = require("../models");
const { Collection } = require("discord.js");

module.exports = class DatabaseHandler {
    constructor(client) {
        Object.defineProperty(this, "client", { value: client });
        const { database } = this.client.config;
        this.pool = new Pool(database);

        // Cache
        this.guildCache = new Collection();
        this.userCache = new Collection();
        this.memberCache = new Collection();
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
            let { rows } = await this.query(
                `SELECT * FROM users WHERE user_id = '${userID}'`
            );
            const user = new User(userID, rows[0], this);
            // Insert the user into the database if it's needed
            if (!user.inserted) await user.insert();
            // Fetch user reminds, etc...
            await user.fetch();
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

    // Create or get a member
    fetchMember(memberID, guildID, forceFetch) {
        return new Promise(async resolve => {
            // If the member is in the cache
            if (this.memberCache.get(`${memberID}${guildID}`) && !forceFetch)
                return resolve(this.memberCache.get(`${memberID}${guildID}`));
            let { rows } = await this.query(`
                SELECT * FROM members
                WHERE user_id = '${memberID}'
                AND guild_id = '${guildID}';
            `);
            const member = new Member(memberID, guildID, rows[0], this);
            // Insert the member into the database if it's needed
            if (!member.inserted) await member.insert();
            // Fetch money, etc...
            await member.fetch();
            resolve(member);
            // Add the member to the cache
            this.memberCache.set(`${memberID}${guildID}`, member);
        });
    }
};
