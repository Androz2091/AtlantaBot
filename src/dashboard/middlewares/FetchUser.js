const Discord = require("discord.js");

module.exports = async (req, _res, next) => {
    // Fetch guilds
    const sessionUser = req.session.user;
    sessionUser.guilds.forEach(async (guild) => {
        const permissions = new Discord.Permissions(guild.permissions);
        guild.manageable = permissions.has("MANAGE_GUILD");
        const guildJSON = await req.client.broadcastEval(`const guild = this.guilds.cache.get('${guild.id}'); if(guild) guild.toJSON();`, true);
        guild.baseInviteURL = `https://discordapp.com/oauth2/authorize?client_id=${req.client.user.id}&scope=bot&permissions=2146958847&guild_id=${guild.id}&response_type=code&redirect_uri=${encodeURIComponent(req.client.config.dashboard.baseURL+"/auth/callback")}&state`;
        guild.manageURL = (guildJSON ? `/manage/${guild.id}` : `${baseInviteURL}=manage:${guild.id}`);
        guild.statsURL = (guildJSON ? `/stats/${guild.id}` : `${baseInviteURL}=stats:${guild.id}`);
        guild.inviteURL = `${guild.baseInviteURL}=null`;
        guild.iconURL = (guild.icon ? `https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.png?size=128` : "https://discordemoji.com/assets/emoji/discordcry.png");
    });
    sessionUser.manageableGuilds = sessionUser.guilds.filter((guild) => guild.manageable);
    if(!sessionUser.manageableGuilds) delete sessionUser.manageableGuilds;
    // Fetch discord user profile
    const discordUser = await req.client.users.fetch(sessionUser.id);
    const discordUserJSON = discordUser.toJSON();
    discordUserJSON.status = discordUser.presence.status;
    // Fetch user data from db
    const dbUser = await req.client.handlers.database.fetchUser(sessionUser.id);
    // Check if the member is present in the support server
    const member = await req.client.guilds.cache.get(req.config.support.id).members.fetch(sessionUser.id).catch(() => {});
    req.hasJoinedSupport = Boolean(member);
    // Merge object and save it in the request
    req.userData = {
        ... discordUserJSON,
        ... sessionUser,
        ... dbUser
    };
    // Add translate
    req.locale = sessionUser.locale;
    req.translate = req.client.translate.get(Array.from(req.client.translate).find((l) => l[0].includes(sessionUser.locale))[0]);
    return next();
};