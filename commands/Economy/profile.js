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
			name: "profile",
			dirname: __dirname,
			enabled: true,
			guildOnly: true,
			aliases: [ "profil" ],
			memberPermissions: [],
			botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],
			nsfw: false,
			ownerOnly: false,
			cooldown: 3000
		});
	}

	async run (interaction, translate, data) {

		const client = this.client;

		let member = await client.resolveMember(args[0], message.guild);
		if(!member) member = message.member;

		// Check if the user is a bot
		if(member.user.bot){
			return interaction.reply({
				content: translate("economy/profile:BOT_USER"),
				ephemeral: true
			});
		}

		// Gets the data of the user whose profile you want to display
		const memberData = (member.id === interaction.user.id ? data.memberData : await client.findOrCreateMember({ id: member.id, guildID: interaction.guild.id}));
		const userData = (member.id === interaction.user.id ? data.userData : await client.findOrCreateUser({ id: member.id }));

		// Check if the lover is cached 
		if(userData.lover && !this.client.users.cache.get(userData.lover)){
			await this.client.users.fetch(userData.lover, true);
		}

		const commonsGuilds = client.guilds.cache.filter((g) => g.members.cache.get(member.id));
		let globalMoney = 0;
		await asyncForEach(commonsGuilds.array(), async (guild) => {
			const memberData = await client.findOrCreateMember({ id: member.id, guildID: guild.id });
			globalMoney+=memberData.money;
			globalMoney+=memberData.bankSold;
		});

		const profileEmbed = new Discord.MessageEmbed()
			.setAuthor(translate("economy/profile:TITLE", {
				username: member.user.tag
			}), member.user.displayAvatarURL({ size: 512, dynamic: true, format: "png" }))
			.attachFiles([{ attachment: await userData.getAchievements(), name: "achievements.png" }])
			.setImage("attachment://achievements.png")
			.setDescription(userData.bio ? userData.bio : translate("economy/profile:NO_BIO"))
			.addField(translate("economy/profile:CASH"), translate("economy/profile:MONEY", {
				money: memberData.money
			}), true)
			.addField(translate("economy/profile:BANK"), translate("economy/profile:MONEY", {
				money: memberData.bankSold
			}), true)
			.addField(translate("economy/profile:GLOBAL"), translate("economy/profile:MONEY", {
				money: globalMoney
			}), true)
			.addField(translate("economy/profile:REPUTATION"), translate("economy/profile:REP_POINTS", {
				points: userData.rep
			}), true)
			.addField(translate("economy/profile:LEVEL"), `**${memberData.level}**`, true)
			.addField(translate("economy/profile:EXP"), `**${memberData.exp}** xp`, true)
			.addField(translate("economy/profile:REGISTERED"), message.printDate(new Date(memberData.registeredAt)), true)
			.addField(translate("economy/profile:BIRTHDATE"), (!userData.birthdate ? translate("economy/profile:NO_BIRTHDATE"): message.printDate(new Date(userData.birthdate))), true)
			.addField(translate("economy/profile:LOVER"), (!userData.lover ? translate("economy/profile:NO_LOVER") : this.client.users.cache.get(userData.lover).tag), true)
			.addField(translate("economy/profile:ACHIEVEMENTS"), translate("economy/profile:ACHIEVEMENTS_CONTENT", {
				prefix: data.guild.prefix
			}))
			.setColor(data.config.embed.color) // Sets the color of the embed
			.setFooter(data.config.embed.footer) // Sets the footer of the embed
			.setTimestamp();

		message.channel.send({ embeds: [profileEmbed] }); // Send the embed in the current channel
	}

};
