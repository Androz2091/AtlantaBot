const { join, parse } = require("path");
const klaw = require("klaw");
const { Collection } = require("discord.js");

module.exports = class EventHandler extends Collection {
    constructor(client) {
        super();

        this.client = client;

        this.init();
    }

    async init() {
        const path = join(__dirname, "..", "events");
        const start = Date.now();

        klaw(path)
            .on("data", item => {
                const file = parse(item.path);

                if (file.ext && file.ext === ".js") {
                    const Event = (r => r.default || r)(
                        require(join(file.dir, file.base))
                    );
                    const event = new Event(
                        this.client,
                        file.name,
                        join(file.dir, file.base)
                    );

                    this.set(file.name, event);

                    this.client[event.once ? "once" : "on"](
                        event.name,
                        (...args) => event.execute(...args)
                    );
                }
            })
            .on("end", () => {
                this.client.logger.info(
                    `Loaded ${this.size} Events in ${Date.now() - start}ms`
                );
            });
    }
};
