const Discord = require("discord.js"),
    giveaways = require("discord-giveaways");

const Event = require("../structures/Event");

module.exports = class Ready extends Event {
    constructor(...args) {
        super(...args);
    }

    async execute() {
        const client = this.client;
        client.handlers.database.initCache();

        // Logs some informations using the logger file
        client.logger.info(
            `${client.user.tag}, ready to serve ${client.users.cache.size} users in ${client.guilds.cache.size} servers.`
        );

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

        // Start the dashboard
        if (client.config.dashboard.enabled) {
            client.dashboard.load(client);
        }

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
        setInterval(function() {
            let toDisplay = `${status[parseInt(i, 10)].name.replace(
                "{serversCount}",
                client.guilds.cache.size
            )} | v${version}}`;
            client.user.setActivity(toDisplay, {
                type: status[parseInt(i, 10)].type
            });
            if (status[parseInt(i + 1, 10)]) i++;
            else i = 0;
        }, 20000); // Every 20 seconds
    }
};
