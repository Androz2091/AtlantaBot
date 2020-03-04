const Command = require("../../structures/Command"),
    Constants = require("../../utility/Constants");

module.exports = class extends Command {
    constructor(...args) {
        super(
            {
                userPermissionLevel: Constants.PermissionsLevels.ATLANTA_MAINTAINER
            },
            ...args
        );
    }

    async execute(message) {
        const content = message.content
            .split(" ")
            .slice(1)
            .join(" ");
        const result = new Promise(resolve => resolve(eval(content)));

        return result
            .then(output => {
                if (typeof output !== "string") {
                    output = require("util").inspect(output, { depth: 0 });
                }
                if (output.includes(this.client.token)) {
                    output = output.replace(this.client.token, "T0K3N");
                }
                message.channel.send(output, {
                    code: "js"
                });
            })
            .catch(err => {
                err = err.toString();
                if (err.includes(this.client.token)) {
                    err = err.replace(this.client.token, "T0K3N");
                }
                message.channel.send(err, {
                    code: "js"
                });
            });
    }
};
