const Canvas = require("canvas"),
	Discord = require("discord.js");
const { resolve } = require("path");
// Register assets fonts
Canvas.registerFont(resolve("./assets/fonts/theboldfont.ttf"), { family: "Bold" });
Canvas.registerFont(resolve("./assets/fonts/SketchMatch.ttf"), { family: "SketchMatch" });

const applyText = (canvas, text, defaultFontSize) => {
	const ctx = canvas.getContext("2d");
	do {
		ctx.font = `${defaultFontSize -= 10}px Bold`;
	} while (ctx.measureText(text).width > 600);
	return ctx.font;
};

module.exports = class {

	constructor (client) {
		this.client = client;
	}

	async run (member) {
    
		member.guild.fetch().then(async (guild) => {

			const guildData = await this.client.findOrCreateGuild({ id: guild.id });
			member.guild.data = guildData;

			const memberData = await this.client.findOrCreateMember({ id: member.id, guildID: guild.id });
			if(memberData.mute.muted && memberData.mute.endDate > Date.now()){
				guild.channels.cache.forEach((channel) => {
					channel.updateOverwrite(member.id, {
						SEND_MESSAGES: false,
						ADD_REACTIONS: false,
						CONNECT: false
					}).catch(() => {});
				});
			}

			// Check if the autorole is enabled
			if(guildData.plugins.autorole.enabled){
				member.roles.add(guildData.plugins.autorole.role).catch(() => {});
			}
    
			// Check if welcome message is enabled
			if(guildData.plugins.welcome.enabled){
				const channel = member.guild.channels.cache.get(guildData.plugins.welcome.channel);
				if(channel){
					const message = guildData.plugins.welcome.message
						.replace(/{user}/g, member)
						.replace(/{server}/g, guild.name)
						.replace(/{membercount}/g, guild.memberCount);
					if(guildData.plugins.welcome.withImage){
						const canvas = Canvas.createCanvas(1024, 450),
							ctx = canvas.getContext("2d");
                    
						// Background language
						const background = await Canvas.loadImage("./assets/img/greetings_background.png");
						// This uses the canvas dimensions to stretch the image onto the entire canvas
						ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
						// Draw username
						ctx.fillStyle = "#ffffff";
						ctx.font = applyText(canvas, member.user.username, 48);
						ctx.fillText(member.user.username, canvas.width - 660, canvas.height - 248);
						// Draw server name
						ctx.font = applyText(canvas, member.guild.translate("administration/welcome:IMG_WELCOME", {
							server: member.guild.name
						}), 53);
						ctx.fillText(member.guild.translate("administration/welcome:IMG_WELCOME", {
							server: member.guild.name
						}), canvas.width - 690, canvas.height - 65);
						// Draw discriminator
						ctx.font = "40px Bold";
						ctx.fillText(member.user.discriminator, canvas.width - 623, canvas.height - 178);
						// Draw number
						ctx.font = "22px Bold";
						ctx.fillText(member.guild.translate("administration/welcome:IMG_NB", {
							memberCount: member.guild.memberCount
						}), 40, canvas.height - 50);
						// Draw # for discriminator
						ctx.fillStyle = "#44d14a";
						ctx.font = "75px SketchMatch";
						ctx.fillText("#", canvas.width - 690, canvas.height - 165);
						// Draw Title with gradient
						ctx.font = "90px Bold";
						ctx.strokeStyle = "#1d2124";
						ctx.lineWidth = 15;
						ctx.strokeText(member.guild.translate("administration/welcome:TITLE"), canvas.width - 620, canvas.height - 330);
						var gradient = ctx.createLinearGradient(canvas.width - 780, 0, canvas.width - 30, 0);
						gradient.addColorStop(0, "#e15500");
						gradient.addColorStop(1, "#e7b121");
						ctx.fillStyle = gradient;
						ctx.fillText(member.guild.translate("administration/welcome:TITLE"), canvas.width - 620, canvas.height - 330);
                
						// Pick up the pen
						ctx.beginPath();
						//Define Stroke Line
						ctx.lineWidth = 10;
						//Define Stroke Style
						ctx.strokeStyle = "#03A9F4";
						// Start the arc to form a circle
						ctx.arc(180, 225, 135, 0, Math.PI * 2, true);
						// Draw Stroke
						ctx.stroke();
						// Put the pen down
						ctx.closePath();
						// Clip off the region you drew on
						ctx.clip();
                    
						const options = { format: "png", size: 512 },
							avatar = await Canvas.loadImage(member.user.displayAvatarURL(options));
						// Move the image downwards vertically and constrain its height to 200, so it"s a square
						ctx.drawImage(avatar, 45, 90, 270, 270);

						const attachment = new Discord.MessageAttachment(canvas.toBuffer(), "welcome-image.png");
						channel.send(message, attachment);
					} else {
						channel.send(message);
					}
				}
			}

		});
	}

};