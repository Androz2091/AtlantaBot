const { CronJob } = require("cron");

module.exports = class Job {
    constructor(client, cronTime = "* * * * * *") {
        this.client = client;
        this.cronJob = new CronJob(
            "* * * * * *",
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
