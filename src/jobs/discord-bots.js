const Job = require("../structures/Job");
const fetch = require("node-fetch");

module.exports = class DiscordBotsJob extends Job {
    constructor(client) {
        super(client, {
            time: "0 0 */2 * * *"
        });
    }

    execute() {
        this.client.logger.log("Posting Discordbots stats...", "info");
        if (!this.client.config.apiKeys.discordbots) return;
        fetch(`https://discordbots.org/api/bots/${this.client.user.id}/stats`, {
            method: "post",
            headers: {
                Authorization: this.client.config.apiKeys.discordbots
            },
            body: JSON.stringify({
                server_count: this.client.guilds.cache.size.toString()
            })
        }).catch(err => {
            if (err) console.error(`DiscordBots Stats Transfer Failed ${err}`);
        });
    }
};
