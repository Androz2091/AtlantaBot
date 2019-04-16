const Command = require("../../base/Command.js"),
Discord = require('discord.js');

class Badge extends Command {

    constructor (client) {
        super(client, {
            name: "badge",
            description: (language) => language.get('BADGE_DESCRIPTION'),
            dirname: __dirname,
            usage: "badge (name)",
            enabled: true,
            guildOnly: false,
            aliases: [],
            permission: false,
            botpermissions: [ "SEND_MESSAGES" ],
            nsfw: false,
            examples: "$badge\n$badge Minecraft",
            owner: false
        });
    }

    async run (message, args, membersdata, guild_data, data) {

        var support_guild = this.client.guilds.get(this.client.config.support.id);
        var author_badges = membersdata[0].badges;

        var badges = {
            badge_games:[
                {
                    name:'Minecraft',
                    str:'<:bdg_minecraft:566874124547522571>',
                    price:1200
                },
                {
                    name:'GTA',
                    str:'<:bdg_gta:566871152144941106>',
                    price:1200
                },
                {
                    name:'Fortnite',
                    str:'<:bdg_fortnite:566869765700714516>',
                    price:1200
                },
                {
                    name:'Mario',
                    str:'<:bdg_mario:566874586185072652>',
                    price:1200
                },
                {
                    name:'LOL',
                    str:'<:bdg_lol:566870040482414594>',
                    price:1200
                }
            ],
            badge_flags:[
                {
                    name:'France',
                    str:'<:bdg_france:566878181890719745>',
                    price:1500
                },
                {
                    name:'Canada',
                    str:'<:bdg_canada:566878342809124865>',
                    price:1500
                },
                {
                    name:'Swiss',
                    str:'<:bdg_swiss:566878884700618752>',
                    price:1500
                },
                {
                    name:'Great Britain',
                    str:'<:bdg_gb:566878663769980938>',
                    price:1500
                },
                {
                    name:'USA',
                    str:'<:bdg_usa:566878492155969546>',
                    price:1500
                }
            ],
            badge_others:[
                {
                    name:'Rich',
                    str:'<:bdg_rich:566877660471623692>',
                    price:18000
                },
                {
                    name:'Troll',
                    str:'<:bdg_troll:566894143347884064>',
                    price:3000
                },
                {
                    name:'Atlanta',
                    str:'<:bdg_atlanta:566892999116849163>',
                    price:1200
                },
                {
                    name:'IAMABOT',
                    str:'<:bdg_IAMABOT:566892351570706432>',
                    price:1000
                },
                {
                    name:'Discordien',
                    str:'<:bdg_dcord:566891963652243456>',
                    price:500
                }
            ]
        };

        // If the member wants to buy
        if(args[0]){
            // Gets the name of the badge
            var badge_name = args.join(' ');
            // Search the badge
            var badge = null;
            for(var type in badges){
                var tbadges = badges[type];
                tbadges.forEach(gb => {
                    if(gb.name === badge_name) badge = gb;
                });
            }
            // if the badges is not found
            if(!badge) return message.channel.send(message.language.get('BADGE_404', badge_name));
            // if the member has already the badge
            if(membersdata[0].badges.some(g => g.str === badge.str)) return message.channel.send(message.language.get('BADGE_ALREADY'));
            // if the member doesn't have enough credits
            if(membersdata[0].credits < badge.price) return message.channel.send(message.language.get('BADGE_PRICE'));
            // Updates databases
            var tbadges = [];
            membersdata[0].badges.forEach(b => tbadges.push(b));
            tbadges.push(badge);
            this.client.databases[0].set(`${message.author.id}.credits`, membersdata[0].credits - badge.price);
            this.client.databases[0].set(`${message.author.id}.badges`, tbadges);
            return message.channel.send(message.language.get('BADGE_SUCCESS', badge));
        }

        // if the member doesn't want to buy, display the badges
        var embed = new Discord.RichEmbed()
            .setAuthor(message.language.get('BADGE_HEADING'))
            .setDescription(message.language.get('BADGE_DESCRIPTION', guild_data.prefix))
            .setColor(data.embed.color)
            .setFooter(data.embed.footer);
            
        for(var type in badges){
            var str = '';
            var tbadges = badges[type];
            tbadges.forEach(gb => {
                if(!author_badges.some(g => g.str === gb.str)) str += message.language.get('BADGE_FORMAT', gb);
                else str += message.language.get('BADGE_FORMAT_ALREADY', gb);
            });
            embed.addField(message.language.get(type.toUpperCase()), str.substr(0, str.length-10), true);
        }
       
        message.channel.send(embed);

    }

}

module.exports = Badge;