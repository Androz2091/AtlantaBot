const Canvas = require("canvas"),
Discord = require("discord.js");
const { resolve } = require("path");
Canvas.registerFont(resolve("./assets/fonts/theboldfont.ttf"), { family: "Bold" });
const applyUsername = (canvas, text) => {
    const ctx = canvas.getContext("2d");

    // Declare a base size of the font
    let fontSize = 53;

    do {
        // Assign the font
        ctx.font = `${fontSize -= 10}px Bold`;
        // Compare pixel width
    } while (ctx.measureText(text).width > 600);

    // Return the result
    return ctx.font;
};
const applyServName = (canvas, text) => {
    const ctx = canvas.getContext("2d");

    // Declare a base size of the font
    let fontSize = 48;

    do {
        // Assign the font
        ctx.font = `${fontSize -= 10}px Bold`;
        // Compare pixel width
    } while (ctx.measureText(text).width > 600);

    // Return the result
    return ctx.font;
};

module.exports = class {

    constructor (client) {
        this.client = client;
    }

    async run (member) {
    
        member.guild.fetch().then(async (guild) => {

            let settings = await this.client.functions.getSettings(this.client, guild);

            // Check if the autorole is enabled
            if(settings.plugins.autorole.enabled){
                member.roles.add(settings.plugins.autorole.role).catch((err) => {});
            }
    
            // Check if welcome message is enabled
            if(settings.plugins.welcome.enabled){
                let channel = member.guild.channels.get(settings.plugins.welcome.channel);
                if(channel){
                    let message = settings.plugins.welcome.message
                    .replace(/{user}/g, member)
                    .replace(/{server}/g, guild.name)
                    .replace(/{membercount}/g, guild.memberCount);
                    if(settings.plugins.welcome.withImage){
                        let canvas = Canvas.createCanvas(1024, 450),
                        ctx = canvas.getContext("2d"),
                        lang = new(require(`../languages/${settings.language}.js`)),
                        text = lang.get("WELCOME_IMG", guild.name),
                        number = lang.get("WELCOME_NUMBER", guild.memberCount);
                    
                        // Background language
                        let background = await Canvas.loadImage(`./assets/img/welcome_background_${settings.language}.png`);
                        // This uses the canvas dimensions to stretch the image onto the entire canvas
                        ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
                        // Select the style that will be used to fill the text in
                        ctx.fillStyle = "#ffffff";
                        // Actually fill the text with a solid color
                        ctx.font = applyUsername(canvas, member.user.username);
                        ctx.fillText(member.user.username, canvas.width - 660, canvas.height - 248);
                        ctx.font = applyServName(canvas, text);
                        ctx.fillText(text, canvas.width - 690, canvas.height - 65);
                        ctx.font = "40px Bold";
                        ctx.fillText(member.user.discriminator, canvas.width - 623, canvas.height - 178);
                        ctx.font = "22px Bold";
                        ctx.fillText(number, 40, canvas.height - 50);
                
                        // Pick up the pen
                        ctx.beginPath();
                        //Define Stroke Line
                        ctx.lineWidth = 9;
                        //Define Stroke Style
                        ctx.strokeStyle = "#1e2225";
                        // Start the arc to form a circle
                        ctx.arc(180, 225, 135, 0, Math.PI * 2, true);
                        // Draw Stroke
                        ctx.stroke();
                        // Put the pen down
                        ctx.closePath();
                        // Clip off the region you drew on
                        ctx.clip();
                    
                        let options = { format: "png", size: 512 },
                        avatar = await Canvas.loadImage(member.user.displayAvatarURL(options));
                        // Move the image downwards vertically and constrain its height to 200, so it"s a square
                        ctx.drawImage(avatar, 45, 90, 270, 270);

                        let attachment = new Discord.MessageAttachment(canvas.toBuffer(), "welcome-image.png");
                            channel.send(message, attachment);
                    } else {
                        channel.send(message);
                    }
                }
            }

        });
    }

};