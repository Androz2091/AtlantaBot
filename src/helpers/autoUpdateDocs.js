/* THIS CHECK IF THE DOCS NEED TO BE UPDATED */

module.exports = {
    /**
     * Update the doc
     * @param {object} client The Discord Client instance
     */
    update(client) {
        let table = require("markdown-table");
        let language = new (require("../languages/" +
            client.config.defaultLanguage +
            ".js"))();
        let commands = client.commands;
        let categories = [];
        commands.forEach(cmd => {
            if (!categories.includes(cmd.help.category)) {
                categories.push(cmd.help.category);
            }
        });
        let text = `# Commands  \nHere's the list of Atlanta commands. This one contains more than **${Math.floor(
            commands.size / 10
        )}0 commands** in **${
            categories.length
        } categories**!  \n\n#### Contents of the table  \n**Name**: The name of the command  \n**Description**: A brief explanation of the purpose of the command  \n**Usage**: The arguments/options that the command takes in parameters  \n**Cooldown**: The time that must elapse between each command so that it can be executed again by the user\n\n`;

        categories
            .sort(function(a, b) {
                let aCmdsLength = commands
                    .filter(cmd => cmd.help.category === a)
                    .array().length;
                let bCmdsLength = commands
                    .filter(cmd => cmd.help.category === b)
                    .array().length;
                if (aCmdsLength > bCmdsLength) {
                    return -1;
                } else {
                    return 1;
                }
            })
            .forEach(cat => {
                let arrCat = [["Name", "Description", "Usage", "Cooldown"]];
                let cmds = commands
                    .filter(cmd => cmd.help.category === cat)
                    .array();
                text += `### ${cat} (${cmds.length} commands)\n\n`;
                cmds.sort(function(a, b) {
                    if (a.help.name < b.help.name) {
                        return -1;
                    } else {
                        return 1;
                    }
                }).forEach(cmd => {
                    arrCat.push([
                        `**${cmd.help.name}**`,
                        cmd.help.description(language),
                        cmd.help.usage(language),
                        Math.ceil(cmd.conf.cooldown / 1000) + " seconds"
                    ]);
                });
                text += `${table(arrCat)}\n\n`;
            });
        let fs = require("fs");
        fs.writeFileSync("./docs/commands.md", text);
        client.logger.log("Docs updated!");
    }
};
