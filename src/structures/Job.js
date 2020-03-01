const { CronJob } = require("cron");

module.exports = class Job {
    constructor(client, {
        time = "* * * * * "
    }) {
        this.client = client;
        this.time = time;
        this.cronJob = new CronJob(
            this.time,
            this.execute,
            null,
            true,
            "America/Los_Angeles"
        );
    }

    execute() {
        throw new Error(`${this.name} doesn't have an execute method.`);
    }
};
