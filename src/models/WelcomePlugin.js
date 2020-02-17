class WelcomePlugin {
    constructor(guild, data = {}) {
        this.guild = guild;
        this.handler = guild.handler;
        this.inserted = data !== {};
        // Whether the plugin is enabled
        this.enabled = data.enabled || false;
        // The welcome channel
        this.channelID = data.channel || null;
        // The welcome message
        this.message = data.message || null;
        // Whether to send an image with the message
        this.withImage = data.withImage || null;
    }

    // Returns a string with the plugin's data
    get data() {
        return JSON.stringify({
            enabled: this.enabled,
            channel: this.channelID,
            message: this.message,
            withImage: this.withImage
        }).replace(/'/g, "''");
    }

    // Update the plugin data
    async updateData() {
        await this.handler.query(`
            UPDATE guild_plugins
            SET plugin_data = '${this.data}'
            WHERE
            guild_id = '${this.guild.id}' AND
            plugin_name = 'welcome';
        `);
        return this;
    }

    // Insert the plugin in the db if it doesn't exist
    async insert() {
        if (!this.inserted) {
            await this.handler.query(`
                INSERT INTO guild_plugins
                (guild_id, plugin_name, plugin_data) VALUES
                ('${this.guild.id}', 'welcome', '${this.data}');
            `);
            this.inserted = true;
        }
        return this;
    }
}

module.exports = WelcomePlugin;
