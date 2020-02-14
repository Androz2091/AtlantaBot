require("./utility/Extenders");

const { Client: VezaClient } = require("veza");
const { Client, Collection } = require("discord.js");
const fetch = require("node-fetch");

const config = require("../config");
const { version } = require("../package.json");

const i18n = require("./i18n");

const DatabaseHandler = require("./handlers/Database");
const PermissionsHandler = require("./handlers/Permissions");
const FunctionHandler = require("./handlers/Functions");
const JobHandler = require("./handlers/Jobs");
const CommandHandler = require("./handlers/Commands");
const EventHandler = require("./handlers/Events");

module.exports = class AtlantaCluster extends Client {
    constructor() {
        super({
            messageCacheMaxSize: 150,
            messageCacheLifetime: 1800,
            messageSweepInterval: 300,
            disableEveryone: true,
            disabledEvents: ["TYPING_START", "CHANNEL_PINS_UPDATE"],
            partials: ["MESSAGE"]
        });

        this.config = config;
        this.version = version;
        this.shard = process.env.SHARDS || "0";
        this.shardCount = process.env.SHARD_COUNT || "1";
        this.logger = require("./utility/Logger");

        this.handlers = {};
        this.handlers.database = new DatabaseHandler(this);
        this.handlers.permissions = new PermissionsHandler(this);

        this.helpers = {};
        this.functions = new FunctionHandler(this);
        this.jobs = new JobHandler(this);
        this.commands = new CommandHandler(this);
        this.events = new EventHandler(this);

        this.caches = {};
        this.caches.bans = new Collection();
        this.caches.unbans = new Collection();
        this.caches.softbans = new Collection();

        this.login();
    }

    async login() {
        let startAt = Date.now();
        this.translate = await i18n();
        this.logger.log(
            "Loaded " +
                this.translate.size +
                " languages in " +
                (Date.now() - startAt) +
                "ms",
            "info"
        );
        if (this.config.clustered) await this.createVezaClient();
        super.login(this.config.token);
    }

    fetchData(property) {
        if (!this.node) return eval(`this.${property}`);

        return this.node.sendTo(
            "manager",
            {
                event: "collectData",
                data: property
            },
            { receptive: true }
        );
    }

    get usedRAM() {
        return Math.round(process.memoryUsage().heapUsed / 1048576);
    }

    get totalRAM() {
        return Math.round(process.memoryUsage().heapTotal / 1048576);
    }

    async sendStatistics() {
        fetch(`https://discordbots.org/api/bots/${this.user.id}/stats`, {
            method: "post",
            headers: {
                Authorization: this.config.apis.discordbots
            },
            body: JSON.stringify({
                server_count: this.guilds
                    .filter(g => g.shardID === shardID)
                    .size.toString()
            })
        }).catch(err => {
            if (err) console.error(`DiscordBots Stats Transfer Failed ${err}`);
        });
    }

    async createVezaClient() {
        return new Promise(resolve => {
            this.node = new VezaClient(`atlantabot-shard-${this.shard}`)
                .on("error", (error, client) =>
                    console.error(`[IPC] Error from ${client.name}:`, error)
                )
                .on("disconnect", client =>
                    this.logger.log(
                        `[IPC] Disconnected from ${client.name}, "ipc`
                    )
                )
                .on("ready", client => {
                    this.logger.log("Connected to " + client.name, "ipc");
                    resolve();
                })
                .on("message", async message => {
                    if (message.data.event === "collectData") {
                        message.reply(eval(`this.${message.data.data}`));
                    } else if (message.data.event === "shardCount") {
                        message.reply(client.shardCount);
                    }
                })
                .connectTo(this.config.nodePort);
        });
    }
};
