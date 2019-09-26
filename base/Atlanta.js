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
    async findOrCreateUser(param, isLean){
        let usersData = this.usersData;
        return new Promise(async function (resolve, reject){
            let userData = (isLean ? await usersData.findOne(param).lean() : await usersData.findOne(param));
            if(userData){
                resolve(userData);
            } else {
                userData = new usersData(param);
                await userData.save();
                resolve((isLean ? userData.toJSON() : userData));
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
                let guild = await guildsData.findOne({ id: param.guildID });
                if(guild){
                    guild.members.push(memberData._id);
                    await guild.save();
                }
                resolve((isLean ? memberData.toJSON() : memberData));
            }
        });
    }

    // This function is used to find a guild data or create it
    async findOrCreateGuild(param, isLean){
        let guildsData = this.guildsData;
        return new Promise(async function (resolve, reject){
            let guildData = (isLean ? await guildsData.findOne(param).populate("members").lean() : await guildsData.findOne(param).populate("members"));
            if(guildData){
                resolve(guildData);
            } else {
                guildData = new guildsData(param);
                await guildData.save();
                resolve(guildData.toJSON());
            }
        });
    }

    
    // This function is used to resolve a user from a string
    async resolveUser(search){
        let user = null;
        if(!search || typeof search !== "string") return;
        // Try ID search
        if(search.match(/^<@!?(\d+)>$/)){
            let id = search.match(/^<@!?(\d+)>$/)[1];
            user = this.users.fetch(id).catch((err) => {});
            if(user) return user;
        }
        // Try username search
        if(search.match(/^!?(\w+)#(\d+)$/)){
            let username = search.match(/^!?(\w+)#(\d+)$/)[0];
            let discriminator = search.match(/^!?(\w+)#(\d+)$/)[1];
            user = this.users.find((u) => u.username === username && u.discriminator === discriminator);
            if(user) return user;
        }
        user = await this.users.fetch(search).catch(() => {});
        return user;
    }

    async resolveMember(search, guild){
        let member = null;
        if(!search || typeof search !== "string") return;
        // Try ID search
        if(search.match(/^<@!?(\d+)>$/)){
            let id = search.match(/^<@!?(\d+)>$/)[1];
            member = await guild.members.fetch(id).catch(() => {});
            if(member) return member;
        }
        // Try username search
        if(search.match(/^!?(\w+)#(\d+)$/)){
            guild = await guild.fetch();
            member = guild.members.find((m) => m.user.tag === search);
            if(member) return member;
        }
        member = await guild.members.fetch(search).catch(() => {});
        return member;
    }

    async resolveRole(search, guild){
        let role = null;
        if(!search || typeof search !== "string") return;
        // Try ID search
        if(search.match(/^<@&!?(\d+)>$/)){
            let id = search.match(/^<@&!?(\d+)>$/)[1];
            role = guild.roles.get(id);
            if(role) return role;
        }
        // Try name search
        role = guild.roles.find((r) => search === r.name);
        if(role) return role;
        role = guild.roles.get(search);
        return role;
    }

}

module.exports = Atlanta;