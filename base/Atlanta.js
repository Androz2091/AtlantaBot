const { Client, Collection } = require("discord.js"),
util = require("util"),
path = require("path");

// Creates Atlanta class
class Atlanta extends Client {

    constructor (options) {
        super(options);
        this.config = require("../config"); // Load the config file
        this.commands = new Collection(); // Creates new commands collection
        this.aliases = new Collection(); // Creates new command aliases collection
        this.logger = require("../utils/logger"); // Load the logger file
        this.wait = util.promisify(setTimeout); // client.wait(1000) - Wait 1 second
        this.functions = require("../utils/functions"); // Load the functions file
        this.guildsData = require("../base/Guild"); // Guild mongoose model
        this.usersData = require("../base/User"); // User mongoose model
        this.membersData = require("../base/Member"); // Member mongoose model
        this.dashboard = require("../dashboard/app"); // Dashboard app
        this.queues = new Collection(); // This collection will be used for the music
    }

    // This function is used to load a command and add it to the collection
    loadCommand (commandPath, commandName) {
        try {
            const props = new (require(`.${commandPath}${path.sep}${commandName}`))(this);
            this.logger.log(`Loading Command: ${props.help.name}. 👌`, "log");
            props.conf.location = commandPath;
            if (props.init){
                props.init(this);
            }
            this.commands.set(props.help.name, props);
            props.conf.aliases.forEach((alias) => {
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
        if(this.commands.has(commandName)) {
            command = this.commands.get(commandName);
        } else if(this.aliases.has(commandName)){
            command = this.commands.get(this.aliases.get(commandName));
        }
        if(!command){
            return `The command \`${commandName}\` doesn't seem to exist, nor is it an alias. Try again!`;
        }
        if(command.shutdown){
            await command.shutdown(this);
        }
        delete require.cache[require.resolve(`.${commandPath}${path.sep}${commandName}.js`)];
        return false;
    }

    // This function is used to find a user data or create it
    async findOrCreateUser(params, isLean){
        let usersData = this.usersData;
        return new Promise(async function (resolve, reject){
            let userData = (isLean ? await usersData.findOne(param).lean() : await userData.findOne(param));
            if(userData){
                resolve(userData);
            } else {
                userData = new usersData(param);
                await userData.save();
                resolve(userData.toJSON());
            }
        });
    }

    // This function is used to find a member data or create it
    async findOrCreateMember(param, isLean){
        let membersData = this.membersData;
        let guildsData = this.guildsData;
        return new Promise(async function (resolve, reject){
            let memberData = (isLean ? await membersData.findOne(param).lean() : await membersData.findOne(param));
            if(memberData){
                resolve(memberData);
            } else {
                memberData = new membersData(param);
                await memberData.save();
                let guild = await guildsData.findOne({ id: memberData.guildID });
                if(guild){
                    guild.membersData.push(memberData);
                    await guild.save();
                }
                resolve(memberData.toJSON());
            }
        });
    }

}

module.exports = Atlanta;