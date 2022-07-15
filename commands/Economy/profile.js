const Command = require("../../base/Command.js"),
	Discord = require("discord.js");

const asyncForEach = async (array, callback) => {
	for (let index = 0; index < array.length; index++) {
		await callback(array[index], index, array);
	}
};

class Profile extends Command {

	constructor (client) {
		super(client, {
			name: "profile",
			dirname: __dirname,
			enabled: true,
			guildOnly: true,
			memberPermissions: [],
			botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],
			nsfw: false,
			ownerOnly: false,
			cooldown: 3000,
			options: [
				{
					name: "member",
					description: "the member you want to profile",
					type: "USER",
					required: true
				}
			]
		});
	}

	async run (interaction, data) {

		const client = this.client;

		let member = await client.resolveMember(interaction.options.getMember("member"), interaction.guild);
		if(!member) member = interaction.member;

		// Check if the user is a bot
		if(member.user.bot){
			return interaction.error("economy/profile:BOT_USER");
		}

		// Gets the data of the user whose profile you want to display
		const memberData = (member.id === interaction.member.user.id ? data.memberData : await client.database.findOrCreateMember({ id: member.id, guildID: message.guild.id}));
		const userData = (member.id === interaction.member.user.id ? data.userData : await client.database.findOrCreateUser({ id: member.id }));

		// Check if the lover is cached 
		if(userData.lover && !this.client.users.cache.get(userData.lover)){
			await this.client.users.fetch(userData.lover, true);
		}

		const commonsGuilds = client.guilds.cache.filter((g) => g.members.cache.get(member.id));
		let globalMoney = 0;
		await asyncForEach(commonsGuilds.array(), async (guild) => {
			const memberData = await client.database.findOrCreateMember({ id: member.id, guildID: guild.id });
			globalMoney+=memberData.money;
			globalMoney+=memberData.bankSold;
		});

		const profileEmbed = new Discord.MessageEmbed()
			.setAuthor(interaction.translate("economy/profile:TITLE", {
				username: member.user.tag
			}), member.user.displayAvatarURL({ size: 512, dynamic: true, format: "png" }))
			.attachFiles([{ attachment: await userData.getAchievements(), name: "achievements.png" }])
			.setImage("attachment://achievements.png")
			.setDescription(userData.bio ? userData.bio : interaction.translate("economy/profile:NO_BIO"))
			.addField(interaction.translate("economy/profile:CASH"), interaction.translate("economy/profile:MONEY", {
				money: memberData.money
			}), true)
			.addField(interaction.translate("economy/profile:BANK"), interaction.translate("economy/profile:MONEY", {
				money: memberData.bankSold
			}), true)
			.addField(interaction.translate("economy/profile:GLOBAL"), interaction.translate("economy/profile:MONEY", {
				money: globalMoney
			}), true)
			.addField(interaction.translate("economy/profile:REPUTATION"), interaction.translate("economy/profile:REP_POINTS", {
				points: userData.rep
			}), true)
			.addField(interaction.translate("economy/profile:LEVEL"), `**${memberData.level}**`, true)
			.addField(interaction.translate("economy/profile:EXP"), `**${memberData.exp}** xp`, true)
			.addField(interaction.translate("economy/profile:REGISTERED"), interaction.printDate(new Date(memberData.registeredAt)), true)
			.addField(interaction.translate("economy/profile:BIRTHDATE"), (!userData.birthdate ? interaction.translate("economy/profile:NO_BIRTHDATE"): interaction.printDate(new Date(userData.birthdate))), true)
			.addField(interaction.translate("economy/profile:LOVER"), (!userData.lover ? interaction.translate("economy/profile:NO_LOVER") : this.client.users.cache.get(userData.lover).tag), true)
			.addField(interaction.translate("economy/profile:ACHIEVEMENTS"), interaction.translate("economy/profile:ACHIEVEMENTS_CONTENT", {
				prefix: data.guild.prefix
			}))
			.setColor(data.config.embed.color) // Sets the color of the embed
			.setFooter(data.config.embed.footer) // Sets the footer of the embed
			.setTimestamp();

		interaction.reply({ embeds: [profileEmbed] }); // Send the embed in the current channel
	}

}

module.exports = Profile;