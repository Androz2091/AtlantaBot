const chalk = require("chalk");
const readline = require("readline");
const config = require("../config");
const { Pool } = require("pg");
const mongoose = require("mongoose");
const fs = require("fs").promises;

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const ask = async (question) => {
    return new Promise((resolve) => {
        rl.question(question, (answer) => {
            resolve(answer);
        });
    });
};

const GuildModel = mongoose.model("Guild", new mongoose.Schema({

    /* REQUIRED */
    id: { type: String }, // Discord ID of the guild
    
    /* MEMBERSDATA */
    membersData: { type: Object, default: {} }, // Members data of the guild
    members: [{ type: mongoose.Schema.Types.ObjectId, ref: "Member" }],

    /* CONFIGURATION */
    language: { type: String, default: "english" }, // Language of the guild
    prefix: { type: String, default: "*" }, // Default or custom prefix of the guild
    plugins: { type: Object, default: { // Plugins data
        // Welcome messages
        welcome: {
            enabled: false, // Whether the welcome messages are enabled
            message: null, // The welcome message
            channel: null, // The channel to send the welcome messages
            withImage: null // Whether the welcome images are enabled
        },
        // Goodbye messages
        goodbye: {
            enabled: false, // Whether the goodbye messages are enabled
            message: null, // The goodbye message
            channel: null, // The channel to send the goodbye messages
            withImage: null // Whether the goodbye images are enabled
        },
        // Autorole
        autorole: {
            enabled: false, // Whether the autorole is enabled
            role: null // The role to add when a member join the server
        },
        // Auto moderation
        automod: {
            enabled: false, // Whether the auto moderation is enabled
            ignored: [] // The channels in which the auto moderation is disabled
        },
        // Auto sanctions
        warnsSanctions: {
            kick: false, // The number of warns required to kick the user
            ban: false // The number of warns required to ban the user
        },
        // Tickets
        tickets: {
            enabled: false, // Whether the tickets system is enabled
            category: null // The category for the tickets system
        },
        suggestions: false, // the channel in which the suggestions will be sent
        modlogs: false, // the channel in which the moderation logs (mute, kick, ban, etc...) will be sent
        reports: false, // the channel in which the reports will be sent
        fortniteshop: false, // the channel in which the fortnite shop image will be sent at 2.05am
        logs: false // the channel in which the logs (message deleted, etc...) will be sent
    }},
    slowmode: { type: Object, default: { // Servers slowmode
        users: [],
        channels: []
    }},
    casesCount: { type: Number, default: 0 },
    ignoredChannels: { type: Array, default: [] }, // Channels ignored by the bot
    customCommands: { type: Array, default: [] }, // Custom commands of the guild
    commands: { type: Array, default: [] }, // Commands logs
    autoDeleteModCommands: { type: Boolean, default: false }, // Whether to auto delete moderation commands
    disabledCategories: { type: Array, default: [] } // Disabled categories
}));

(async () => {
    const saved = { guilds: [], users: [], members: [] };
    const commands = [];
    const oldMongoDbURL = await ask("Enter old mongodb url (mongodb://localhost:27017/Atlanta): ") || "mongodb://localhost:27017/Atlanta";
    const backupFilePath = await ask("Enter file in which save the SQL queries (./): " || "./");
    await mongoose.connect(oldMongoDbURL, { useNewUrlParser: true, useUnifiedTopology: true });
    const oldGuildsData = await GuildModel.find();
    let startAt = Date.now();
    console.log(chalk.red(`\n[!]`), `Restoring ${oldGuildsData.length} guilds...`);
    oldGuildsData.forEach((oldGuildData) => {
        if(saved.guilds.includes(oldGuildData.id)) return;
        saved.guilds.push(oldGuildData.id);
        commands.push(`INSERT INTO guilds (guild_id, guild_prefix, guild_language, guild_del_mod_cmd) VALUES ('${oldGuildData.id}', '${oldGuildData.prefix.replace(/'/g, "''")}', '${oldGuildData.language === "french" ? "fr-FR" : "en-US"}', ${oldGuildData.autoDeleteModCommands});`);
        Object.keys(oldGuildData.plugins).forEach((pluginName) => {
            const pluginData = oldGuildData.plugins[pluginName];
            if(typeof pluginData !== "object"){
                commands.push(`INSERT INTO guild_channels (guild_id, setting_name, setting_value) VALUES ('${oldGuildData.id}', '${pluginName}', ${!pluginData ? null : `'${pluginData}'`});`);
            } else {
                commands.push(`INSERT INTO guild_plugins (guild_id, plugin_name, plugin_data) VALUES ('${oldGuildData.id}', '${pluginName}', '${JSON.stringify(pluginData).replace(/'/g, "''")}');`);
            }
        });
        oldGuildData.customCommands.forEach((cmd) => {
            commands.push(`INSERT INTO guild_custom_commands (guild_id, cmd_name, cmd_reply) VALUES ('${oldGuildData.id}', '${cmd.name.replace(/'/g, "''")}', '${cmd.answer.replace(/'/g, "''")}');`);
        });
        oldGuildData.ignoredChannels.forEach((channelID) => {
            commands.push(`INSERT INTO guild_ignored_channels (guild_id, channel_id) VALUES ('${oldGuildData.id}', '${channelID}');`);
        });
    });
    console.log(chalk.green(`[OK]`), `Guilds restored in ${Date.now()-startAt} ms`);
    await fs.writeFile(backupFilePath+"backup.sql", commands.join("\n"), "utf-8");
    console.log(chalk.green(`\n\n[SUCCESS]`), `Database backup stored here: ${backupFilePath}backup.sql`);
    process.exit(0);
})();