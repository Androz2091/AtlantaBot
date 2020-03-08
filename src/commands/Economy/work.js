const Command = require("../../structures/Command"),
    Constants = require("../../utility/Constants"),
    Discord = require("discord.js");

module.exports = class extends Command {
    constructor(...args) {
        super(
            {
                aliases: ["salary"],
                userPermissionLevel: Constants.PermissionsLevels.SERVER_MEMBER
            },
            ...args
        );
    }

    async execute(message, args) {

        const memberData = await this.client.handlers.database.fetchMember(message.member.id, message.guild.id);

        const workCooldownEnd = memberData.cooldowns.work;
        // If the member is in cooldown
        if(workCooldownEnd && (workCooldownEnd > Date.now())){
            return message.sendT("economy/work:COOLDOWN", {
                time: this.client.helpers.convertTime.execute(message.guild, workCooldownEnd - Date.now())
            });
        }

        if(Date.now() > (workCooldownEnd || 0)+(24*3600000)){
            await memberData.setWorkStreak(0);
        }

        // Records in the database the time when the member will be able to execute the command again (in 12 hours)
        const toWait = new Date(Date.now() + 21600000);
        await memberData.addCooldown("work", toWait);
        
        await memberData.setWorkStreak(memberData.workStreak + 1);

        const embed = new Discord.MessageEmbed()
            .setFooter(message.translate("economy/work:AWARD"), message.author.displayAvatarURL())
            .setColor(this.client.config.embed.color);
        
        let award = [
            Constants.Emojis.LETTERS.A,
            Constants.Emojis.LETTERS.W,
            Constants.Emojis.LETTERS.A,
            Constants.Emojis.LETTERS.R,
            Constants.Emojis.LETTERS.D
        ];
        let won = 200;

        if(memberData.workStreak >= 5){
            won += 200;
            embed.addField(message.translate("economy/work:SALARY"), message.translate("economy/work:SALARY_CONTENT", {
                won
            }))
            .addField(message.translate("economy/work:STREAK"), message.translate("economy/work:STREAK_CONTENT"));
            memberData.setWorkStreak(0);
        } else {
            for(let i = 0; i < award.length; i++){
                if(memberData.workStreak > i){
                    const letter = Discord.Util.parseEmoji(award[i]).name.split("_")[1];
                    award[i] = `:regional_indicator_${letter}:`;
                }
            }
            embed.addField(message.translate("economy/work:SALARY"), message.translate("economy/work:SALARY_CONTENT", {
                won
            }))
            .addField(message.translate("economy/work:STREAK"), award.join(""));
        }

        /*let messageOptions = { embed };
        if(!data.userData.achievements.work.achieved){
            data.userData.achievements.work.progress.now += 1;
            if(data.userData.achievements.work.progress.now === data.userData.achievements.work.progress.total){
                messageOptions.files = [
                    {
                        name: "unlocked.png",
                        attachment: "./assets/img/achievements/achievement_unlocked1.png"
                    }
                ];
                data.userData.achievements.work.achieved = true;
            }
            data.userData.markModified("achievements.work");
            data.userData.save();
        }*/

        await memberData.createTransaction({
            action: "work",
            date: new Date(),
            credit: 200
        });

        // Send the embed in the current channel
        message.channel.send(embed);
    }

}
