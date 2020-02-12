class AutomodPlugin {
    constructor(guild, data = {}) {
        this.guild = guild;
        this.handler = guild.handler;
        this.inserted = data !== {};
        // Whether the plugin is enabled
        this.enabled = data.enabled || true;
        // Ignored channels
        this.ignored = data.ignored || [];
    }

    // Returns a string with the plugin's data
    get data() {
        return JSON.stringify({
            enabled: this.enabled,
            ignored: this.ignored
        });
    }

    // Update the plugin data
    async updateData() {
        await this.handler.query(`
            UPDATE guild_plugins
            SET plugin_data = '${this.data}'
            WHERE
            guild_id = '${this.guild.id}' AND
            plugin_name = 'automod';
        `);
        return this;
    }

    // Insert the plugin in the db if it doesn't exist
    async insert() {
        if (!this.inserted) {
            await this.handler.query(`
                INSERT INTO guild_plugins
                (guild_id, plugin_name, plugin_data) VALUES
                ('${this.guild.id}', 'automod', '${this.data}');
            `);
            this.inserted = true;
        }
        return this;
    }
}

module.exports = AutomodPlugin;
