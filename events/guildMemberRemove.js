const Canvas = require("canvas"),
Discord = require("discord.js");
const { resolve } = require("path");
// Register assets fonts
Canvas.registerFont(resolve("./assets/fonts/theboldfont.ttf"), { family: "Bold" });
Canvas.registerFont(resolve("./assets/fonts/SketchMatch.ttf"), { family: "SketchMatch" });
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

            // Check if goodbye message is enabled
            if(settings.plugins.goodbye.enabled){
                let channel = guild.channels.get(settings.plugins.goodbye.channel);
                if(channel){
                    let message = settings.plugins.goodbye.message
                    .replace(/{user}/g, member.user.tag)
                    .replace(/{server}/g, guild.name)
                    .replace(/{membercount}/g, guild.memberCount);
                    if(settings.plugins.goodbye.withImage){
                        let canvas = Canvas.createCanvas(1024, 450),
                        ctx = canvas.getContext("2d"),
                        lang = new(require(`../languages/${settings.language}.js`)),
                        text = lang.get("GOODBYE_IMG_MSG", guild.name),
                        number = lang.get("GOODBYE_IMG_NUMBER", guild.memberCount),
                        title = lang.get("GOODBYE_IMG_TITLE");
                    
                        // Background language"
                        let background = await Canvas.loadImage("./assets/img/greetings_background.png");
                        // This uses the canvas dimensions to stretch the image onto the entire canvas
                        ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
                        // Draw username
                        ctx.fillStyle = "#ffffff";
                        ctx.font = applyUsername(canvas, member.user.username);
                        ctx.fillText(member.user.username, canvas.width - 660, canvas.height - 248);
                        // Draw server name
                        ctx.font = applyServName(canvas, text);
                        ctx.fillText(text, canvas.width - 690, canvas.height - 65);
                        // Draw discriminator
                        ctx.font = "40px Bold";
                        ctx.textAlign = "center";
                        ctx.fillText(member.user.discriminator, canvas.width - 567, canvas.height - 178);
                        // Draw number
                        ctx.font = "22px Bold";
                        ctx.textAlign = "left";
                        ctx.fillText(number, 40, canvas.height - 50);
                        // Draw # for discriminator
                        ctx.fillStyle = "#44d14a";
                        ctx.font = "75px SketchMatch";
                        ctx.fillText("#", canvas.width - 690, canvas.height - 165);
                        // Draw Title with gradient
                        ctx.font = "90px Bold";
                        ctx.textAlign = "center";
                        ctx.strokeStyle = "#1d2124";
                        ctx.lineWidth = 15;
                        ctx.strokeText(title, canvas.width - 370, canvas.height - 330);
                        // Settings title color
                        var gradient = ctx.createLinearGradient(canvas.width - 780, 0, canvas.width - 30, 0);
                        if(settings.plugins.goodbye.color.enabled){
                            if(settings.plugins.goodbye.color.color.startsWith("#")){
                                ctx.fillStyle = settings.plugins.goodbye.color.color;
                                }
                            if(settings.plugins.goodbye.color.color === "white"){
                                ctx.fillStyle = "#ffffff";
                                }
                            if(settings.plugins.goodbye.color.color === "orange"){
                                gradient.addColorStop(0, "#e15500"); 
                                gradient.addColorStop(1, "#e7b121");
                                ctx.fillStyle = gradient;
                                }
                            if (settings.plugins.goodbye.color.color === "red"){
                                gradient.addColorStop(0, "#a00707");
                                gradient.addColorStop(1, "#de0c0c");
                                ctx.fillStyle = gradient;
                                }
                            if (settings.plugins.goodbye.color.color === "blue"){
                                gradient.addColorStop(0, "#00c4ff");
                                gradient.addColorStop(1, "#0074ff");
                                ctx.fillStyle = gradient;
                                }
                            if (settings.plugins.goodbye.color.color === "green"){
                                gradient.addColorStop(0, "#4caf50");
                                gradient.addColorStop(1, "#26832a");
                                ctx.fillStyle = gradient;
                                }
                            if (settings.plugins.goodbye.color.color === "purple"){
                                gradient.addColorStop(0, "#7a4c9e");
                                gradient.addColorStop(1, "#a262d4");
                                ctx.fillStyle = gradient;
                                }
                        } else {
                            ctx.fillStyle = "#ffffff";
                        }
                        ctx.fillText(title, canvas.width - 370, canvas.height - 330);
                        ctx.textAlign = "left";
                        // Pick up the pen
                        ctx.beginPath();
                        //Define Stroke Line
                        ctx.lineWidth = 10;
                        //Define Stroke Style
                        ctx.strokeStyle = "#df0909";
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

                        let attachment = new Discord.MessageAttachment(canvas.toBuffer(), "goodbye-image.png");
                            channel.send(message, attachment);
                    } else {
                        channel.send(message);
                    }
                }
            }

        });
    }
  };
  
