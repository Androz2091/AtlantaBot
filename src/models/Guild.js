const { Collection } = require("discord.js");

const AutomodPlugin = require("./AutomodPlugin");
const WelcomePlugin = require("./WelcomePlugin");

module.exports = class Guild {
    constructor(guildID, data = {}, handler) {
        this.id = guildID;
        this.handler = handler;
        this.inserted = data !== {};
        this.data = data;
        // Whether the guild is fetched
        this.fetched = false;
        // Guild language
        this.language = data.guild_language || "english";
        // Guild prefix
        this.prefix = data.guild_prefix || "*";
        // Whether the mod commands should be automatically deleted
        this.autoDeleteModCommand = data.guild_del_mod_cmd || false;
        // Timestamp of the guild creation date (in the database)
        this.registeredAt = data.guild_registered_at || Date.now();
    }

    async fetch() {
        if (this.fetched) return;
        // Fetch or fill plugins
        this.plugins = new Collection();
        await this.fetchPlugins(false, this.data.guild_plugins);
        // Fetch custom commands
        this.customCommands = new Collection();
        await this.fetchCustomCommands();
        // Fetch ignored channels
        this.ignoredChannels = [];
        await this.fetchIgnoredChannels();
        this.fetched = true;
    }

    // Fetch and fill plugins
    async fetchPlugins(forceFetch, pluginsData) {
        if (!pluginsData || forceFetch) {
            const { rows } = await this.handler.query(`
                SELECT * FROM guild_plugins
                WHERE guild_id = '${this.id}';
            `);
            pluginsData = rows;
        }
        this.plugins.set(
            "welcome",
            new WelcomePlugin(
                this,
                pluginsData.find(p => p.plugin_name === "welcome")
            )
        );
        //this.plugins.set("goodbye", new GoodbyePlugin(this, pluginsData.find((p) => p.plugin_name === "goodbye")));
        //this.plugins.set("autorole", new AutorolePlugin(this, pluginsData.find((p) => p.plugin_name === "autorole")));
        this.plugins.set(
            "automod",
            new AutomodPlugin(
                this,
                pluginsData.find(p => p.plugin_name === "automod")
            )
        );
        //this.plugins.set("warnsSanctions", new WarnsSanctions(this, pluginsData.find((p) => p.plugin_name === "warnsSanctions")));
        this.plugins.each(p => p.insert());
        return this.plugins;
    }

    // Fetch and fill ignored channels
    async fetchIgnoredChannels() {
        const { rows } = await this.handler.query(`
            SELECT * FROM guild_ignored_channels
            WHERE guild_id = '${this.id}';
        `);
        rows.forEach(ignoredChannelData => {
            this.ignoredChannels.push(ignoredChannelData.channel_id);
        });
        return this.ignoredChannels;
    }

    // Fetch and fill custom commands
    async fetchCustomCommands() {
        const { rows } = await this.handler.query(`
            SELECT * FROM guild_custom_commands
            WHERE guild_id = '${this.id}';
        `);
        rows.forEach(customCommandData => {
            this.customCommands.set(
                customCommandData.cmd_name,
                customCommandData.cmd_reply
            );
        });
        return this.customCommands;
    }

    // Update the guild language
    async setLanguage(newLanguage) {
        await this.handler.query(`
            UPDATE guilds
            SET guild_language = '${newLanguage}'
            WHERE guild_id = '${this.id}';
        `);
        this.language = newLanguage;
        return this;
    }

    // Update the guild prefix
    async setPrefix(newPrefix) {
        await this.handler.query(`
            UPDATE guilds
            SET guild_prefix = '${newPrefix}'
            WHERE guild_id = '${this.id}';
        `);
        this.prefix = newPrefix;
        return this;
    }

    // Insert the guild in the db if it doesn't exist
    async insert() {
        if (!this.inserted) {
            await this.handler.query(`
                INSERT INTO guilds
                (guild_id, guild_prefix, guild_language, guild_registered_at) VALUES
                ('${this.id}', '${this.prefix}', '${this.language}', ${this.registeredAt});
            `);
            this.inserted = true;
        }
        return this;
    }
};
