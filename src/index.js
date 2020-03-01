require("./utility/Extenders");

const { Client, Collection, MessageEmbed } = require("discord.js");
const fetch = require("node-fetch");

const config = require("../config");
const { version } = require("../package.json");

const i18n = require("./i18n");

const { ErelaClient } = require("erela.js");
const { Client: Joker } = require("blague.xyz");

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

        this.joker = new Joker(this.config.apiKeys.blagueXYZ, {
            defaultLang: "en"
        });

        this.login();
    }

    async login() {
        let startAt = Date.now();
        this.translations = await i18n();
        this.logger.log(
            "Loaded " +
                this.translations.size +
                " languages in " +
                (Date.now() - startAt) +
                "ms",
            "info"
        );
        await super.login(this.config.token);
        this.initErelaClient();
    }

    async fetchData(property) {
        if (!this.config.sharded) return eval(`this.${property}`);
        else {
            const results = await this.shard.fetchClientValues(property);
            return results.reduce((p, c) => p + c);
        }
    }

    async broadcastEval(evalStr, onlyOneValid) {
        if (!this.config.sharded) {
            return [eval(evalStr)];
        } else {
            const results = await this.shard.broadcastEval(evalStr);
            if (onlyOneValid) return results.find(r => r);
            return results;
        }
    }

    get usedRAM() {
        return Math.round(process.memoryUsage().heapUsed / 1048576);
    }

    get totalRAM() {
        return Math.round(process.memoryUsage().heapTotal / 1048576);
    }

    translate(languageName, key, args){
        const language = this.translations.get(languageName);
        if (!language) throw "Message: Invalid language set in settings.";
        return language(key, args);
    }

    async initErelaClient() {
        class AtlantaErelaClient extends ErelaClient {
            sendWS(data) {
                const guild = this.client.guilds.cache.get(data.d.guild_id);
                if (guild) {
                    const { shard } = this.client.guilds.cache.get(guild.id);
                    shard.send(data);
                }
            }
        }
        this.music = new AtlantaErelaClient(this, this.config.music.nodes)
            .on("nodeError", () => console.error)
            .on("nodeConnect", () => this.logger.log("Successfully created a new Node.", "info"))
            .on("trackStart", async (player, track) => {
                const guildData = await this.handlers.database.fetchGuild(player.guild.id);
                const nowPlayingEmbed = new MessageEmbed()
                .setDescription(
                    this.translate(guildData.language, "music/play:NOW_PLAYING", {
                        songName: `[${track.title}](${track.uri})`
                    })
                )
                .setImage(track.thumbnail.replace("default", "hqdefault"))
                .defaultColor();
                player.textChannel.send(nowPlayingEmbed);
            })
            .on("queueEnd", async player => {
                const guildData = await this.handlers.database.fetchGuild(player.guild.id);
                const embed = new MessageEmbed()
                .setDescription(this.translate(guildData.language, "music/play:QUEUE_ENDED"))
                .errorColor();
                player.textChannel.send(embed);
                return this.music.players.destroy(player.guild.id);
            });
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
