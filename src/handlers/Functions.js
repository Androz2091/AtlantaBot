const { join, parse } = require("path");
const klaw = require("klaw");
const { Collection } = require("discord.js");

module.exports = class FunctionHandler extends Collection {
    constructor(client) {
        super();
        this.client = client;

        this.init();
    }

    async init() {
        const path = join(__dirname, "..", "functions");
        const start = Date.now();

        let count = 0;

        klaw(path)
            .on("data", item => {
                const file = parse(item.path);
                if (!file.ext || file.ext !== ".js") return;

                count++;

                const Function = (r => r.default || r)(
                    require(join(file.dir, file.base))
                );
                const newReq = new Function(this.client, file.name);

                this.set(file.name, newReq);

                this.client.helpers[file.name] = newReq;
            })
            .on("end", () => {
                this.client.logger.info(
                    `Loaded ${count} Functions in ${Date.now() - start}ms`
                );

                return this;
            });
    }
};
