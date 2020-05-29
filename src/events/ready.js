const Discord = require("discord.js"),
    giveaways = require("discord-giveaways");
const AtlantaDashboard = require("../dashboard/app");

const Event = require("../structures/Event");

module.exports = class Ready extends Event {
    constructor(...args) {
        super(...args);
    }

    async execute() {
        const client = this.client;
        client.handlers.database.initCache();
        // If dashboard is enabled
        if (client.config.dashboard.enabled && client.sharded) {
            // Check every 30 seconds if dashboard is uninitialized
            const timeout = setInterval(async () => {
                if (!(await client.fetchInitializer).some((v) => v)) {
                    client.initializer = true;
                    client.dashboard = new AtlantaDashboard(client);
                    clearInterval(timeout);
                };
            }, 30000);
            // Initialize dashboard If it is not done yet
            if (!(await client.fetchInitializer).some((v) => v)) {
                client.initializer = true;
                client.dashboard = new AtlantaDashboard(client);
                clearInterval(timeout);
            };
        } else {
            client.dashboard = new AtlantaDashboard(client);
        };

        // Logs some informations using the logger file
        client.logger.info(
            `${client.user.tag}, ready to serve ${client.users.cache.size} users in ${client.guilds.cache.size} servers.`
        );

        this.client.jobs.get("discord-bots").execute();

        /* DiscordBots.org STATS 
        let discordbotsorg = require("../helpers/discordbots.org.js");
        discordbotsorg.init(client);

        /* UNMUTE USERS 
        let checkUnmutes = require("../helpers/checkUnmutes.js");
        checkUnmutes.init(client);

        /* SEND REMIND 
        let checkReminders = require("../helpers/checkReminders.js");
        checkReminders.init(client);

        /* DAILY SHOP FORTNITE 
        let fortniteShop = require("../helpers/fortniteShop.js");
        fortniteShop.init(client);

        /* AUTO UPDATE DOCS 
        let autoUpdateDocs = require("../helpers/autoUpdateDocs.js");
        autoUpdateDocs.update(client); */

        /*
        let giveawaysOptions = {
            updateCountdownEvery: 15000,
            ignoreIfHasPermission: ["ADMINISTRATOR"],
            storage: require("path").resolve() + "/giveaways.json"
        };
        giveaways.launch(client, giveawaysOptions);*/

        // Update the game every 20s
        const { status } = this.client.config,
            version = this.client.version;
        let i = 0;
        setInterval(async () => {
            const guildCount = await client.fetchData("guilds.cache.size");
            let toDisplay = `${status[parseInt(i, 10)].name.replace(
                "{serversCount}",
                guildCount
            )} | v${version}}`;
            client.user.setActivity(toDisplay, {
                type: status[parseInt(i, 10)].type
            });
            if (status[parseInt(i + 1, 10)]) i++;
            else i = 0;
        }, 20000); // Every 20 seconds
    }
};
