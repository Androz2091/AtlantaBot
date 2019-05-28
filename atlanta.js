
// Load up the discord.js library
const { Client, Collection } = require("discord.js");
// We also load the rest of the things we need in this file:
const { promisify } = require("util"),
fs = require('fs'),
klaw = require("klaw"),
path = require("path"),
readdir = promisify(require("fs").readdir),
Quickdb = require('quick.db');
Quickdb.init('./data/atlanta.sqlite');

// Creates new class
class Atlanta extends Client {

    constructor (options) {
        super(options);
        this.config = require("./config.js"); // Load the config file
        this.commands = new Collection(); // Creates new commands collection
        this.aliases = new Collection(); // Creates new command aliases collection
        this.logger = require("./utils/logger.js"); // Load the logger file
        this.wait = require("util").promisify(setTimeout); // client.wait(1000) - Wait 1 second
        this.functions = require('./utils/functions.js'); // Load the functions file
        this.dashboard = require('./website/dashboard/app.js'); // Load the dashboard
        this.databases = [ // Create tables (quick.db)
            new Quickdb.Table('usersdata'),
            new Quickdb.Table('serversdata'),
            { 
                work: new Quickdb.Table('work'), 
                rep: new Quickdb.Table('rep'),
                xp: new Quickdb.Table('xp')
            },
            new Quickdb.Table('remindme'),
            new Quickdb.Table('stats'),
            new Quickdb.Table('blacklist')
        ],
        this.queues = new Collection(); // This collection will be used for the music
    }

    // This function is used to load a command and add it to the collection
    loadCommand (commandPath, commandName) {
        try {
            const props = new (require(`${commandPath}${path.sep}${commandName}`))(this);
            this.logger.log(`Loading Command: ${props.help.name}. 👌`, "log");
            props.conf.location = commandPath;
            if (props.init) props.init(this);
            this.commands.set(props.help.name, props);
            props.conf.aliases.forEach(alias => {
                this.aliases.set(alias, props.help.name);
            });
            return false;
        } catch (e) {
            return `Unable to load command ${commandName}: ${e}`;
        }
    }

    // This function is used to unload a command (you need to load them again)
    async unloadCommand (commandPath, commandName) {
        let command;
        if (this.commands.has(commandName)) {
            command = this.commands.get(commandName);
        } else if (this.aliases.has(commandName)) command = this.commands.get(this.aliases.get(commandName));
        if (!command) return `The command \`${commandName}\` doesn"t seem to exist, nor is it an alias. Try again!`;
        if (command.shutdown) await command.shutdown(this);
        delete require.cache[require.resolve(`${commandPath}${path.sep}${commandName}.js`)];
        return false;
    }

}

// Creates new client
const client = new Atlanta();

const init = async () => {

    // Search for all commands
    fs.readdir("./commands/", (err, content) => {
        if(err) console.log(err);
        if(content.length < 1) return console.log('Please create folder in "commands" folder.');
        var groups = [];
        content.forEach(element => {
            if(!element.includes('.')) groups.push(element); // If it's a folder
        });
        groups.forEach(folder => {
            fs.readdir("./commands/"+folder, (e, files) => {
                let js_files = files.filter(f => f.split(".").pop() === "js");
                if(js_files.length < 1) return console.log('Please create files in "'+folder+'" folder.');
                if(e) console.log(e);
                js_files.forEach(element => {
                    const response = client.loadCommand('./commands/'+folder, `${element}`);
                    if (response) client.logger.error(response);
                });
            });
        });
    });

    // Then we load events, which will include our message and ready event.
    const evtFiles = await readdir("./events/");
    client.logger.log(`Loading a total of ${evtFiles.length} events.`, "log");
    evtFiles.forEach(file => {
        const eventName = file.split(".")[0];
        client.logger.log(`Loading Event: ${eventName}`);
        const event = new (require(`./events/${file}`))(client);
        // This line is awesome by the way. Just sayin'.
        client.on(eventName, (...args) => event.run(...args).catch(err => console.log(err)));
        delete require.cache[require.resolve(`./events/${file}`)];
    });

    client.login(client.config.token); // Log to the discord api

};

init();

// if there are errors, log them
client.on("disconnect", () => client.logger.warn("Bot is disconnecting..."))
    .on("reconnecting", () => client.logger.log("Bot reconnecting...", "log"))
    .on("error", e => client.logger.error(e))
    .on("warn", info => client.logger.warn(info));

// if there is an unhandledRejection, log them
process.on("unhandledRejection", err => {
    console.error("Uncaught Promise Error: ", err);
});