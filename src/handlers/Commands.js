const { Collection } = require("discord.js");
const { join, parse } = require("path");
const klaw = require("klaw");

module.exports = class CommandHandler extends Collection {
    constructor(client) {
        super();
        this.client = client;

        this.init();
    }

    async init() {
        const path = join(__dirname, "..", "commands");
        const start = Date.now();

        klaw(path)
            .on("data", item => {
                const file = parse(item.path);
                if (!file.ext || file.ext !== ".js") return;

                const Command = (r => r.default || r)(
                    require(join(file.dir, file.base))
                );
                const command = new Command(
                    this.client,
                    file.name,
                    join(file.dir, file.base)
                );

                this.set(file.name, command);
            })
            .on("end", () => {
                this.client.logger.info(
                    `Loaded ${this.size} Commands in ${Date.now() - start}ms`
                );

                return this;
            });
    }

    fetch(name) {
        if (this.has(name)) return this.get(name);
        const commandAlias = this.find(c => c.aliases.includes(name));
        if (commandAlias) return commandAlias;
    }

    reload(command) {
        delete require.cache[command.path];

        const file = require(command.path);
        const req = new file(this.client, command.name, command.path);

        this.set(req.name, req);
    }
};
