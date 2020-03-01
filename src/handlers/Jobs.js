const { join, parse } = require("path");
const klaw = require("klaw");
const { Collection } = require("discord.js");

module.exports = class Jobs extends Collection {
    constructor(client) {
        super();
        this.client = client;
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

                this.set(file.name, job);
            })
            .on("end", () => {
                this.client.logger.info(
                    `Loaded ${
                        this.size
                    } Jobs in ${Date.now() - start}ms`
                );
            });
    }
};
