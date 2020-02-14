const { join, parse } = require("path");
const klaw = require("klaw");

module.exports = class Jobs {
    constructor(client) {
        this.client = client;
        this.jobs = {};
        this.init();
    }

    init() {
        const start = Date.now();

        klaw(join(__dirname, "..", "jobs"))
            .on("data", item => {
                const file = parse(item.path);
                if (!file.ext || file.ext !== ".js") return;

                const Job = (r => r.default || r)(
                    require(join(file.dir, file.base))
                );
                const job = new Job(this.client);

                this.jobs[file.name] = job;
            })
            .on("end", () => {
                this.client.logger.info(
                    `Loaded ${
                        Object.keys(this.jobs).length
                    } Jobs in ${Date.now() - start}ms`
                );
            });
    }
};
