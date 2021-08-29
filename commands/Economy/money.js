const Command = require("../../base/Command.js"),
	Discord = require("discord.js");

const asyncForEach = async (array, callback) => {
	for (let index = 0; index < array.length; index++) {
		await callback(array[index], index, array);
	}
};

module.exports = class extends Command {

	constructor (client) {
		super(client, {
			name: "money",

			options: [
				{
					name: "user",
					type: "USER",
					required: false
				}
			],

			enabled: true,
			guildOnly: true,
			memberPermissions: [],
			botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],
			nsfw: false,
			ownerOnly: false,
			cooldown: 1000,

			dirname: __dirname
		});
	}

	async run (interaction, translate, data) {
        
		const user = interaction.options.getUser("user") || interaction.user;

		if(user.bot){
			return interaction.reply({
				content: translate("misc:BOT_USER"),
				ephemeral: true
			});
		}

		const memberData = (interaction.user === user) ? data.memberData : await this.client.findOrCreateMember({ id: user.id, guildID: interaction.guild.id }); 

		const commonsGuilds = this.client.guilds.cache.filter((g) => g.members.cache.get(user.id));
		let globalMoney = 0;
		await asyncForEach(commonsGuilds.array(), async (guild) => {
			const memberData = await this.client.findOrCreateMember({ id: user.id, guildID: guild.id });
			globalMoney += memberData.money;
			globalMoney += memberData.bankSold;
		});

		const embed = new Discord.MessageEmbed()
			.setAuthor(translate("economy/money:TITLE", {
				username: user.username
			}), user.displayAvatarURL({ size: 512, dynamic: true, format: "png" }))
			.addField(translate("economy/profile:CASH"), translate("economy/profile:MONEY", {
				money: memberData.money
			}), true)
			.addField(translate("economy/profile:BANK"), translate("economy/profile:MONEY", {
				money: memberData.bankSold
			}), true)
			.addField(translate("economy/profile:GLOBAL"), translate("economy/profile:MONEY", {
				money: globalMoney
			}), true)
			.setColor(this.client.config.embed.color)
			.setFooter(this.client.config.embed.footer);
		interaction.channel.send({ embeds: [embed] });
	}

};
