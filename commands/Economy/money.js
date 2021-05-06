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
			aliases: [ "credits", "balance" ],
			memberPermissions: [],
			botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],
			nsfw: false,
			ownerOnly: false,
			cooldown: 1000
		});
	}

	async run (message, args, data) {
        
		let member = await this.client.resolveMember(args[0], message.guild);
		if(!member) member = message.member;
		const user = member.user;

		if(user.bot){
			return message.error("misc:BOT_USER");
		}

		const memberData = (message.author === user) ? data.memberData : await this.client.findOrCreateMember({ id: user.id, guildID: message.guild.id }); 

		const commonsGuilds = this.client.guilds.cache.filter((g) => g.members.cache.get(user.id));
		let globalMoney = 0;
		await asyncForEach(commonsGuilds.array(), async (guild) => {
			const memberData = await this.client.findOrCreateMember({ id: user.id, guildID: guild.id });
			globalMoney+=memberData.money;
			globalMoney+=memberData.bankSold;
		});

		const embed = new Discord.MessageEmbed()
			.setAuthor(message.translate("economy/money:TITLE", {
				username: member.user.username
			}), member.user.displayAvatarURL({ size: 512, dynamic: true, format: 'png' }))
			.addField(message.translate("economy/profile:CASH"), message.translate("economy/profile:MONEY", {
				money: memberData.money
			}), true)
			.addField(message.translate("economy/profile:BANK"), message.translate("economy/profile:MONEY", {
				money: memberData.bankSold
			}), true)
			.addField(message.translate("economy/profile:GLOBAL"), message.translate("economy/profile:MONEY", {
				money: globalMoney
			}), true)
			.setColor(this.client.config.embed.color)
			.setFooter(this.client.config.embed.footer);
		message.channel.send(embed);
	}

}

module.exports = Credits;
