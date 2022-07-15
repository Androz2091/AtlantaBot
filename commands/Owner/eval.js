const Command = require("../../base/Command.js");

class Eval extends Command {

	constructor (client) {
		super(client, {
			name: "eval",
			dirname: __dirname,
			enabled: true,
			guildOnly: false,
			memberPermissions: [],
			botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],
			nsfw: false,
			ownerOnly: true,
			cooldown: 3000,
			options: [
				{
					name: "content",
					description: "the content you want to evaluate",
					type: "STRING",
					required: true
				}
			]
		});
	}
	async run (interaction, data) {

		const usersData = this.client.database.usersData;

		const guildsData = this.client.database.guildsData;
        
		const content = interaction.options.getString("content").split(" ").slice(1).join(" ");
		const result = new Promise((resolve) => resolve(eval(content)));
        
		return result.then((output) => {
			if(typeof output !== "string"){
				output = require("util").inspect(output, { depth: 0 });
			}
			if(output.includes(this.client.token)){
				output = output.replace(this.client.token, "T0K3N");
			}
			interaction.reply(output, {
				code: "js"
			});
		}).catch((err) => {
			err = err.toString();
			if(err.includes(this.client.token)){
				err = err.replace(this.client.token, "T0K3N");
			}
			interaction.reply(err, {
				code: "js"
			});
		});

	}

}

module.exports = Eval;