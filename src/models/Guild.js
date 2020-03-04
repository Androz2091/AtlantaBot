const { Collection } = require("discord.js");

const AutomodPlugin = require("./AutomodPlugin");
const AutorolePlugin = require("./AutorolePlugin");
const WelcomePlugin = require("./WelcomePlugin");
const GoodbyePlugin = require("./GoodbyePlugin");

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
        this.plugins = {};
        await this.fetchPlugins(false, this.data.guild_plugins);
        // Fetch custom commands
        this.customCommands = new Collection();
        await this.fetchCustomCommands();
        // Fetch ignored channels
        this.ignoredChannels = [];
        await this.fetchIgnoredChannels();
        // Fetch command logs
        this.commandLogs = [];
        await this.fetchCommandLogs();
        // Fetch special channels
        this.specialChannels = {};
        await this.fetchSpecialChannels();
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
        this.plugins.welcome = new WelcomePlugin(
            this,
            pluginsData.find(p => p.plugin_name === "welcome").plugin_data
        );
        this.plugins.goodbye = new GoodbyePlugin(
            this,
            pluginsData.find(p => p.plugin_name === "goodbye").plugin_data
        );
        this.plugins.autorole = new AutorolePlugin(
            this,
            pluginsData.find(p => p.plugin_name === "autorole").plugin_data
        );
        this.plugins.automod = new AutomodPlugin(
            this,
            pluginsData.find(p => p.plugin_name === "automod").plugin_data
        );
        //this.plugins.set("warnsSanctions", new WarnsSanctions(this, pluginsData.find((p) => p.plugin_name === "warnsSanctions")));
        Object.keys(this.plugins).forEach(pName =>
            this.plugins[pName].insert()
        );
        return this.plugins;
    }

    // Fetch and fill special channels
    async fetchSpecialChannels() {
        const { rows } = await this.handler.query(`
            SELECT * from guild_channels
            WHERE guild_id = '${this.id}';
        `);
        rows.forEach(channelData => {
            this.specialChannels[channelData.setting_name] =
                channelData.setting_value;
        });
        return this;
    }

    // Define a special channels
    async setSpecialChannel(name, value) {
        const alreadyCreated = this.specialChannels.hasOwnProperty(name);
        const formattedValue = !value ? "null" : `'${value}'`;
        if (alreadyCreated) {
            await this.handler.query(`
                UPDATE guild_channels
                SET setting_value = ${alreadyCreated}
                WHERE guild_id = '${this.id}';
            `);
        } else {
            await this.handler.query(`
                INSERT INTO guild_channels
                (guild_id, setting_name, setting_value) VALUES
                ('${this.id}', '${name}', ${formattedValue});
            `);
        }
        this.specialChannels[name] = value;
        return this;
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

    // Add a channel to the ignored channels
    async addIgnoredChannel(channelID) {
        await this.handler.query(`
            INSERT INTO guild_ignored_channels
            (guild_id, channel_id) VALUES
            ('${this.id}', '${channelID}');
        `);
        this.ignoredChannels.push(channelID);
        return this;
    }

    // Delete a channel from the ignored channels
    async deleteIgnoredChannel(channelID) {
        await this.handler.query(`
            DELETE FROM guild_ignored_channels
            WHERE guild_id = '${this.id}'
            AND channel_id = '${channelID}';
        `);
        this.ignoredChannels = this.ignoredChannels.filter(
            chID => chID !== channelID
        );
        return this;
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

    // Add a custom command
    async addCustomCommand({ name, answer }) {
        await this.handler.query(`
            INSERT INTO guild_custom_commands
            (guild_id, cmd_name, cmd_reply) VALUES
            ('${this.id}', '${name}', '${answer}');
        `);
        this.customCommands.set(name, answer);
        return this;
    }

    // Delete a custom command
    async deleteCustomCommand(name) {
        await this.handler.query(`
            DELETE FROM guild_custom_commands
            WHERE guild_id = '${this.id}'
            AND cmd_name = '${name}';
        `);
        this.customCommands.delete(name);
        return this;
    }

    // Fetch and fill command logs
    async fetchCommandLogs() {
        const { rows } = await this.handler.query(`
            SELECT * FROM guild_cmd_logs
            WHERE guild_id = '${this.id}';
        `);
        rows.forEach(cmdLog => {
            this.commandLogs.push({
                name: cmdLog.cmd_name,
                channelID: cmdLog.cmd_channel_id,
                userID: cmdLog.user_id,
                date: cmdLog.cmd_date
            });
        });
        return this.customCommands;
    }

    // Add a command log
    async addCommandLog({ name, channelID, userID, date = new Date() }) {
        await this.handler.query(`
            INSERT INTO guild_cmd_logs
            (guild_id, cmd_name, cmd_channel_id, cmd_user_id, cmd_date) VALUES
            ('${
                this.id
            }', '${name}', '${channelID}', '${userID}', '${date.toISOString()}');
        `);
        this.commandLogs.push({
            name,
            channelID,
            userID,
            date
        });
        return this;
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
