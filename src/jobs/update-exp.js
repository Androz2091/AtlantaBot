const Job = require("../structures/Job");

module.exports = class DiscordBotsJob extends Job {
    constructor(client) {
        super(client, {
            time: "0 * * * * *"
        });
    }

    execute() {
        this.client.logger.log("Updating members exp...", "info");
        this.client.handlers.database.memberCache
        .filter((m) => m.expCached)
        .each((m) => m.updateExp());
    }
};
