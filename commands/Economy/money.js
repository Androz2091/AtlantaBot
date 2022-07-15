const Command = require("../../base/Command.js"),
	Discord = require("discord.js");

const asyncForEach = async (array, callback) => {
	for (let index = 0; index < array.length; index++) {
		await callback(array[index], index, array);
	}
};

class Credits extends Command {

	constructor (client) {
		super(client, {
			name: "money",
			dirname: __dirname,
			enabled: true,
			guildOnly: true,
			memberPermissions: [],
			botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],
			nsfw: false,
			ownerOnly: false,
			cooldown: 1000,
			options: [
				{
					name: "member",
					description: "the member you want to check the money",
					required: true,
					type: "USER"
				}
			]
		});
	}

	async run (interaction, data) {
        
		let member = await interaction.options.getMember("mmeber");
		if(!member) member = interaction.member;
		const user = member.user;

		if(user.bot){
			return interaction.error("misc:BOT_USER");
		}

		const memberData = (interaction.member === user) ? data.memberData : await this.client.database.findOrCreateMember({ id: user.id, guildID: interaction.guild.id }); 

		const commonsGuilds = this.client.guilds.cache.filter((g) => g.members.cache.get(user.id));
		let globalMoney = 0;
		await asyncForEach(commonsGuilds.array(), async (guild) => {
			const memberData = await this.client.database.findOrCreateMember({ id: user.id, guildID: guild.id });
			globalMoney+=memberData.money;
			globalMoney+=memberData.bankSold;
		});

		const embed = new Discord.MessageEmbed()
			.setAuthor(interaction.translate("economy/money:TITLE", {
				username: member.user.username
			}), member.user.displayAvatarURL({ size: 512, dynamic: true, format: 'png' }))
			.addField(interaction.translate("economy/profile:CASH"), interaction.translate("economy/profile:MONEY", {
				money: memberData.money
			}), true)
			.addField(interaction.translate("economy/profile:BANK"), interaction.translate("economy/profile:MONEY", {
				money: memberData.bankSold
			}), true)
			.addField(interaction.translate("economy/profile:GLOBAL"), interaction.translate("economy/profile:MONEY", {
				money: globalMoney
			}), true)
			.setColor(this.client.config.embed.color)
			.setFooter(this.client.config.embed.footer);
		interaction.reply({ embeds: [embed] });
	}

}

module.exports = Credits;
