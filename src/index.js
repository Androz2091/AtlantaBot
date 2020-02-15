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
        this.logger = require("./utility/Logger");
        this.sharded = Boolean(process.env.SHARDS);

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
        super.login(this.config.token);
    }

    async fetchData(property) {
        if (!this.config.sharded) return eval(`this.${property}`);
        else {
            const results = await this.shard.fetchClientValues(property);
            return results.reduce((p, c) => p + c);
        }
    }

    async broadcastEval(evalStr) {
        if (!this.config.sharded) return [ eval(evalStr) ];
        else {
            const results = await this.shard.broadcastEval(evalStr);
            return results;
        }
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
};
