const { join, parse } = require("path");
const klaw = require("klaw");
const { Collection } = require("discord.js");

module.exports = class TaskHandler {
    constructor(client) {
        this.client = client;
        this.collection = new Collection();

        const path = join(__dirname, "..", "tasks");
        const start = Date.now();

        klaw(path)
            .on("data", item => {
                const file = parse(item.path);

                if (!file.ext || file.ext !== ".js") return;

                const req = (r => r.default || r)(
                    // eslint-disable-next-line @typescript-eslint/no-var-requires
                    require(join(file.dir, file.base))
                );

                this.taskTypes.set(file.name, req);
            })
            .on("end", async () => {
                // eslint-disable-next-line no-console
                client.logger.info(
                    `Loaded ${this.collection.size} Tasks in ${Date.now() -
                        start}ms`
                );

                /*const list = await this.client.handlers.database.get(
                    'tasks'
                );
                for (const task of list) {
                    const taskType = this.taskTypes.get(task.type);
                    if (!taskType) continue;

                    this.collection.set(
                        task.id,
                        new taskType(this.client, task)
                    );
                }*/
            });

        setInterval(() => {
            this.collection
                .filter(task => Date.now() >= task.end)
                .forEach(async task => {
                    task.execute(task.data);
                    this.collection.delete(task.id);
                });
        }, 1000);
    }

    async taskInit() {
        const tasks = await this.client.handlers.database.get("tasks");

        for (const task of tasks) {
            const taskType = this.taskTypes.get(task.type);
            if (!taskType) continue;

            this.collection.set(task.id, new taskType(this.client, task));
        }
    }

    async create(type, end, data) {
        const id = 10e4 + Math.floor(Math.random() * (10e4 - 1));
        const payload = {
            id,
            type,
            end,
            data
        };

        await this.client.handlers.database.insert("tasks", payload);

        const Task = this.taskTypes.get(type);
        if (!type) return null;

        this.collection.set(id, new Task(this.client, payload));

        return Task;
    }

    async delete(id) {
        await this.client.handlers.database.delete("tasks", id.toString());
        this.collection.delete(id);
    }
};
