const Command = require("../../base/Command.js"),
Canvas = require("canvas"),
Discord = require("discord.js"),
fortnite = require("fortnite");
const { resolve } = require("path");
// Register assets fonts
Canvas.registerFont(resolve("./assets/fonts/Burbank-Big-Condensed-Bold-Font.otf"), { family: "Burbank" });
Canvas.registerFont(resolve("./assets/fonts/KeepCalm-Medium.ttf"), { family: "KeepCalm" });

class Fortnite extends Command {
    constructor (client) {
        super(client, {
            name: "fortnite",
            description: (language) => language.get("FORTNITE_DESCRIPTION"),
            usage: (language) => language.get("FORTNITE_USAGE"),
            examples: (language) => language.get("FORTNITE_EXAMPLES"),
            dirname: __dirname,
            enabled: true,
            guildOnly: false,
            aliases: [ "fn" ],
            memberPermissions: [],
            botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],
            nsfw: false,
            ownerOnly: false,
            cooldown: 500
        });
    }
 
    async run (message, args, data) {

        if(!data.config.apiKeys.fortniteTRN || data.config.apiKeys.fortniteTRN.length === ""){
            return message.channel.send(message.language.get("ERR_COMMAND_DISABLED"));
        }

        let fortniteClient = new fortnite(data.config.apiKeys.fortniteTRN);

        let platform = args[0];
        if(!platform || (platform !== "pc" && platform !== "xbl" && platform !== "psn")){
            return message.channel.send(message.language.get("FORTNITE_ERR_PLATFORM"));
        }

        let user = args.slice(1).join(" ");
        if(!user){
            return message.channel.send(message.language.get("FORTNITE_ERR_USERNAME"));
        }
        
        fortniteClient.user(user, platform).then(async (tdata) => {

            if(tdata.code === 404){
                return message.channel.send(message.language.get("FORTNITE_ERR_NOT_FOUND", platform, user));
            }
            let m = await message.channel.send(message.language.get("UTILS").PLEASE_WAIT);

            let canvas = Canvas.createCanvas(975, 650),
            ctx = canvas.getContext("2d");

            // Background stats
            let background = await Canvas.loadImage("./assets/img/fortnite_stats_background.png");
            // This uses the canvas dimensions to stretch the image onto the entire canvas
            ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
            // Draw xbox, pc or psn logo
            let iconPlatform = await Canvas.loadImage(`./assets/img/fortnite_stats_${platform}.png`);
            ctx.drawImage(iconPlatform, 62, 43, 60, 60);
            // Draw crown logo
            let iconCrown = await Canvas.loadImage("./assets/img/fortnite_stats_crown.png");
            ctx.drawImage(iconCrown, canvas.width - 280, 41, 60, 60);
            // Draw username
            ctx.fillStyle = "#dcdfd9";
            ctx.font = "50px Burbank";
            ctx.textAlign = "center";
            ctx.fillText(tdata.username, canvas.width - 630, canvas.height - 560);
            // Draw Wins Lifetime
            ctx.font = "70px Burbank";
            ctx.textAlign = "left";
            ctx.fillText(tdata.stats.lifetime.wins, canvas.width - 205, canvas.height - 557);
            // Draw average kills, matches and kills lifetime
            ctx.textAlign = "center";
            ctx.font = "18px KeepCalm";
            if(tdata.stats.lifetime){
            let averageKills = (tdata.stats.lifetime.kills / tdata.stats.lifetime.matches),
            averageKillsText = averageKills.toFixed(2)+" "+(averageKills > 1 ? message.language.get("FORTNITE_AVERAGE_KILLS") : message.language.get("FORTNITE_AVERAGE_KILL")),
            lifetimeKillsText = tdata.stats.lifetime.kills+" "+(tdata.stats.lifetime.kills > 1 ? message.language.get("FORTNITE_KILLS") : message.language.get("FORTNITE_KILL")),
            lifetimeMatchesText = tdata.stats.lifetime.matches+" "+(tdata.stats.lifetime.matches > 1 ? message.language.get("FORTNITE_MATCHES") : message.language.get("FORTNITE_MATCH"));
            ctx.fillText(lifetimeMatchesText+" - "+lifetimeKillsText+" - "+averageKillsText, 350, canvas.height - 515);
            } else {
                let lifetimeKillsText = "0 "+message.language.get("FORTNITE_KILLS"),
                averageKillsText = "0.00 "+message.language.get("FORTNITE_AVERAGE_KILL"),
                lifetimeMatchesText = "0 "+message.language.get("FORTNITE_MATCH");
                ctx.fillText(lifetimeMatchesText+" - "+lifetimeKillsText+" - "+averageKillsText, 350, canvas.height - 515);
            }
            // Draw K/D and WIN% lifetime
            if(tdata.stats.lifetime){
            let winsLifetimePercent = (tdata.stats.lifetime.wins / tdata.stats.lifetime.matches * 100);
            ctx.fillText(message.language.get("FORTNITE_STATS_RIGHT", tdata.stats.lifetime.kd, winsLifetimePercent.toFixed(2)), canvas.width - 174, canvas.height - 515);
            } else {
                let winsLifetimePercent = "0.00",
                statsLifetimeKD = "0";
                ctx.fillText(message.language.get("FORTNITE_STATS_RIGHT", statsLifetimeKD, winsLifetimePercent), canvas.width - 174, canvas.height - 515);
            }
            // Draw col solo : TITLE
            ctx.font = "37px KeepCalm";
            ctx.fillText("SOLO", 176, canvas.height - 443);
            // Draw col solo : KD
            ctx.font = "26px KeepCalm";
            if(tdata.stats.solo){
            ctx.fillText(tdata.stats.solo.kd+" "+message.language.get("FORTNITE_KD"), 176, canvas.height - 375);
            } else {
                ctx.fillText("0 "+message.language.get("FORTNITE_KD"), 176, canvas.height - 375);
            }
            // Draw col solo : WINS
            if(tdata.stats.solo){
                if(tdata.stats.solo.wins > 1) {
                    ctx.fillText(tdata.stats.solo.wins+" "+message.language.get("FORTNITE_WINS"), 176, canvas.height - 302);
                } else {
                    ctx.fillText(tdata.stats.solo.wins+" "+message.language.get("FORTNITE_WIN"), 176, canvas.height - 302);
                }
            } else {
                ctx.fillText("0 "+message.language.get("FORTNITE_WIN"), 176, canvas.height - 302);
            }
            // Draw col solo : KILLS
            if(tdata.stats.solo){
                if(tdata.stats.solo.kills > 1) {
                    ctx.fillText(tdata.stats.solo.kills+" "+message.language.get("FORTNITE_KILLS"), 176, canvas.height - 222);
                } else {
                    ctx.fillText(tdata.stats.solo.kills+" "+message.language.get("FORTNITE_KILL"), 176, canvas.height - 222);
                }
            } else {
                ctx.fillText("0 "+message.language.get("FORTNITE_KILL"), 176, canvas.height - 222);
            }
            // Draw col solo : WIN%
            if(tdata.stats.solo){
            let winsSoloPercent = (tdata.stats.solo.wins / tdata.stats.solo.matches * 100);
            ctx.fillText(winsSoloPercent.toFixed(2)+" "+message.language.get("FORTNITE_WINS_PERCENT"), 176, canvas.height - 145);
            } else {
                ctx.fillText("0.00 "+message.language.get("FORTNITE_WINS_PERCENT"), 176, canvas.height - 145);
            }
            // Draw col solo : MATCHES
            if(tdata.stats.solo){
                if(tdata.stats.solo.matches > 1) {
                    ctx.fillText(tdata.stats.solo.matches+" "+message.language.get("FORTNITE_MATCHES"), 176, canvas.height - 67);
                } else {
                    ctx.fillText(tdata.stats.solo.matches+" "+message.language.get("FORTNITE_MATCH"), 176, canvas.height - 67);
                }
            } else {
                ctx.fillText("0 "+message.language.get("FORTNITE_MATCH"), 176, canvas.height - 67);
            }
            // Draw col duo : TITLE
            ctx.font = "37px KeepCalm";
            ctx.fillText("DUO", 485, canvas.height - 443);
            // Draw col duo : KD
            ctx.font = "26px KeepCalm";
            if(tdata.stats.duo){
            ctx.fillText(tdata.stats.duo.kd+" "+message.language.get("FORTNITE_KD"), 485, canvas.height - 375);
            } else {
                ctx.fillText("0 "+message.language.get("FORTNITE_KD"), 485, canvas.height - 375);
            }
            // Draw col duo : WINS
            if(tdata.stats.duo){
                if(tdata.stats.duo.wins > 1) {
                    ctx.fillText(tdata.stats.duo.wins+" "+message.language.get("FORTNITE_WINS"), 485, canvas.height - 302);
                } else {
                    ctx.fillText(tdata.stats.duo.wins+" "+message.language.get("FORTNITE_WIN"), 485, canvas.height - 302);
                }
            } else {
                ctx.fillText("0 "+message.language.get("FORTNITE_WIN"), 485, canvas.height - 302);
            }
            // Draw col duo : KILLS
            if(tdata.stats.duo){
                if(tdata.stats.duo.kills > 1) {
                    ctx.fillText(tdata.stats.duo.kills+" "+message.language.get("FORTNITE_KILLS"), 485, canvas.height - 222);
                } else {
                    ctx.fillText(tdata.stats.duo.kills+" "+message.language.get("FORTNITE_KILL"), 485, canvas.height - 222);
                }
            } else {
                ctx.fillText("0 "+message.language.get("FORTNITE_KILL"), 485, canvas.height - 222);
            }
            // Draw col duo : WIN%
            if(tdata.stats.duo){
            let winsDuoPercent = (tdata.stats.duo.wins / tdata.stats.duo.matches * 100);
            ctx.fillText(winsDuoPercent.toFixed(2)+" "+message.language.get("FORTNITE_WINS_PERCENT"), 485, canvas.height - 145);
            } else {
                ctx.fillText("0.00 "+message.language.get("FORTNITE_WINS_PERCENT"), 485, canvas.height - 145);
            }
            // Draw col duo : MATCHES
            if(tdata.stats.duo){
                if(tdata.stats.duo.matches > 1) {
                    ctx.fillText(tdata.stats.duo.matches+" "+message.language.get("FORTNITE_MATCHES"), 485, canvas.height - 67);
                } else {
                    ctx.fillText(tdata.stats.duo.matches+" "+message.language.get("FORTNITE_MATCH"), 485, canvas.height - 67);
                }
            } else {
                ctx.fillText("0 "+message.language.get("FORTNITE_MATCH"), 485, canvas.height - 67);
            }
            // Draw col squad : TITLE
            ctx.font = "37px KeepCalm";
            ctx.fillText("SQUAD", canvas.width - 174, canvas.height - 443);
            // Draw col squad : KD
            ctx.font = "26px KeepCalm";
            if(tdata.stats.squad){
            ctx.fillText(tdata.stats.squad.kd+" "+message.language.get("FORTNITE_KD"), canvas.width - 174, canvas.height - 375);
            } else {
                ctx.fillText("0 "+message.language.get("FORTNITE_KD"), canvas.width - 174, canvas.height - 375);
            }
            // Draw col squad : WINS
            if(tdata.stats.squad){
                if(tdata.stats.squad.wins > 1) {
                    ctx.fillText(tdata.stats.squad.wins+" "+message.language.get("FORTNITE_WINS"), canvas.width - 174, canvas.height - 302);
                } else {
                    ctx.fillText(tdata.stats.squad.wins+" "+message.language.get("FORTNITE_WIN"), canvas.width - 174, canvas.height - 302);
                }
            } else {
                ctx.fillText("0 "+message.language.get("FORTNITE_WIN"), canvas.width - 174, canvas.height - 302);
            }
            // Draw col squad : KILLS
            if(tdata.stats.squad){
                if(tdata.stats.squad.kills > 1) {
                    ctx.fillText(tdata.stats.squad.kills+" "+message.language.get("FORTNITE_KILLS"), canvas.width - 174, canvas.height - 222);
                } else {
                    ctx.fillText(tdata.stats.squad.kills+" "+message.language.get("FORTNITE_KILL"), canvas.width - 174, canvas.height - 222);
                }
            } else {
                ctx.fillText("0 "+message.language.get("FORTNITE_KILL"), canvas.width - 174, canvas.height - 222);
            }
            // Draw col squad : WIN%
            if(tdata.stats.squad){
            let winsSquadPercent = (tdata.stats.squad.wins / tdata.stats.squad.matches * 100);
            ctx.fillText(winsSquadPercent.toFixed(2)+" "+message.language.get("FORTNITE_WINS_PERCENT"), canvas.width - 174, canvas.height - 145);
            } else {
                ctx.fillText("0.00 "+message.language.get("FORTNITE_WINS_PERCENT"), canvas.width - 174, canvas.height - 145);
            }
            // Draw col squad : MATCHES
            if(tdata.stats.squad){
                if(tdata.stats.squad.matches > 1) {
                    ctx.fillText(tdata.stats.squad.matches+" "+message.language.get("FORTNITE_MATCHES"), canvas.width - 174, canvas.height - 67);
                } else {
                    ctx.fillText(tdata.stats.squad.matches+" "+message.language.get("FORTNITE_MATCH"), canvas.width - 174, canvas.height - 67);
                }
            } else {
                ctx.fillText("0 "+message.language.get("FORTNITE_MATCH"), canvas.width - 174, canvas.height - 67);
            }
            // Draw footer
            ctx.font = "23px KeepCalm";
            ctx.fillText(data.config.embed.footer+" - fortnitetracker.com", canvas.width / 2, canvas.height - 10); 


            let attachment = new Discord.MessageAttachment(canvas.toBuffer(), "fortnite-stats-image.png");
            m.delete();
            await message.channel.send(attachment);
        }).catch((err) => {
            return message.channel.send(message.language.get("FORTNITE_ERR_NOT_FOUND", platform, user));
        });
    }
}

module.exports = Fortnite;
