/*const { Client: Joker } = require("blague.xyz"),
util = require("util"),
fs = require("fs"),
readdir = util.promisify(fs.readdir),
AmeClient = require("amethyste-api"),
mongoose = require("mongoose");

// Load Atlanta class
const Atlanta = require("./base/Atlanta"),
client = new Atlanta();

const init = async () => {

    // Search for all commands
    let directories = await readdir("./commands/");
    client.logger.log(`Loading a total of ${directories.length} categories.`, "log");
    directories.forEach(async (dir) => {
        let commands = await readdir("./commands/"+dir+"/");
        commands.filter((cmd) => cmd.split(".").pop() === "js").forEach((cmd) => {
            const response = client.loadCommand("./commands/"+dir, cmd);
            if(response){
                client.logger.log(response, "error");
            }
        });
    });

    // Then we load events, which will include our message and ready event.
    const evtFiles = await readdir("./events/");
    client.logger.log(`Loading a total of ${evtFiles.length} events.`, "log");
    evtFiles.forEach((file) => {
        const eventName = file.split(".")[0];
        client.logger.log(`Loading Event: ${eventName}`);
        const event = new (require(`./events/${file}`))(client);
        client.on(eventName, (...args) => event.run(...args));
        delete require.cache[require.resolve(`./events/${file}`)];
    });
    
    client.login(client.config.token); // Log in to the discord api

    // connect to mongoose database
    mongoose.connect(client.config.mongoDB, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
        client.logger.log("Connected to the Mongodb database.", "log");
    }).catch((err) => {
        client.logger.log("Unable to connect to the Mongodb database. Error:"+err, "error");
    });

    if(client.config.apiKeys.amethyste){
        client.AmeAPI = new AmeClient(client.config.apiKeys.amethyste);
    }

    if(client.config.apiKeys.blagueXYZ){
        client.joker = new Joker(client.config.apiKeys.blagueXYZ, {
            defaultLanguage: "en"
        });
    }

    if(client.config.apiKeys.simpleYoutube){
        const { Player } = require("discord-player");
        client.player = new Player(client, client.config.apiKeys.simpleYoutube, {
            leaveOnEmpty: false
        });
    }

};

init();

// if there are errors, log them
client.on("disconnect", () => client.logger.log("Bot is disconnecting...", "warn"))
    .on("reconnecting", () => client.logger.log("Bot reconnecting...", "log"))
    .on("error", (e) => client.logger.log(e, "error"))
    .on("warn", (info) => client.logger.log(info, "warn"));

// if there is an unhandledRejection, log them
process.on("unhandledRejection", (err) => {
    console.error(err);
});*/

require("./utility/Extenders");

const { Client, Collection } = require("discord.js");
const fetch = require("node-fetch");

const config = require("../config");
const { version } = require("../package.json");

const i18n = require("./i18n");

const DatabaseHandler = require("./handlers/Database");
const TaskHandler = require("./handlers/Tasks");
const PermissionsHandler = require("./handlers/Permissions");
const FunctionHandler = require("./handlers/Functions");
const CommandHandler = require("./handlers/Commands");
const EventHandler = require("./handlers/Events");

module.exports = class Atlanta extends Client {
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

        this.handlers = {};  
        this.handlers.database = new DatabaseHandler(this);
        this.handlers.tasks = new TaskHandler(this);
        this.handlers.permissions = new PermissionsHandler(this);      

        this.functions = new FunctionHandler(this);
        this.commands = new CommandHandler(this);
        this.events = new EventHandler(this);

        this.caches = {};
        this.caches.bans = new Collection();
        this.caches.unbans = new Collection();
        this.caches.softbans = new Collection();

        this.login();
    }

    async login(){
        let startAt = Date.now();
        this.translate = await i18n();
        this.logger.log("Loaded "+this.translate.size+" languages in "+(Date.now()-startAt)+"ms", "info");
        super.login(this.config.token);
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
