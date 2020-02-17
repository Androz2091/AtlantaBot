const Discord = require("discord.js");

module.exports = async (req, res, next) => {
    // Guild ID
    const guildID = req.params.guildID;
    // Check user permissions
    if (
        !req.userData.manageableGuilds ||
        !req.userData.manageableGuilds.some(g => g.id === guildID)
    )
        return res.redirect("/selector");
    // Format the guild
    const [
        [
            guildJSON,
            guildMemberCount,
            guildIconURL,
            guildChannelsJSON,
            guildRolesJSON
        ]
    ] = await req.client.broadcastEval(`
        const guild = this.guilds.cache.get('${guildID}');
        if(guild){
            [   
                guild.toJSON(),
                guild.memberCount,
                guild.iconURL(),
                guild.channels.cache.map((e) => {
                    return {
                        type: e.type,
                        name: e.name,
                        id: e.id
                    };
                }),
                guild.roles.cache.map((e) => {
                    return {
                        name: e.name,
                        id: e.id
                    };
                })
            ]
        }
    `);
    guildJSON.iconURL =
        guildIconURL || "https://discordemoji.com/assets/emoji/discordcry.png";
    guildJSON.memberCount = guildMemberCount;
    // Fetch guild in database
    const guildDB = await req.client.handlers.database.fetchGuild(guildID);
    // Add some useful variables
    // Welcome
    guildJSON.welcomeSelectedChannel = guildDB.plugins.welcome.enabled
        ? guildChannelsJSON.some(
              c => c.id === guildDB.plugins.welcome.channelID
          )
            ? guildChannelsJSON.find(
                  c => c.id === guildDB.plugins.welcome.channelID
              ).name
            : guildChannelsJSON[0].name
        : guildChannelsJSON[0].name;
    guildJSON.welcomeOtherChannels = guildChannelsJSON.filter(
        c => c.name !== guildJSON.welcomeSelectedChannel && c.type === "text"
    );
    // Goodbye
    guildJSON.goodbyeSelectedChannel = guildDB.plugins.goodbye.enabled
        ? guildChannelsJSON.some(
              c => c.id === guildDB.plugins.goodbye.channelID
          )
            ? guildChannelsJSON.find(
                  c => c.id === guildDB.plugins.goodbye.channelID
              ).name
            : guildChannelsJSON[0].name
        : guildChannelsJSON[0].name;
    guildJSON.goodbyeOtherChannels = guildChannelsJSON.filter(
        c => c.name !== guildJSON.goodbyeSelectedChannel && c.type === "text"
    );
    guildChannelsJSON.forEach((channel, index) => {
        guildChannelsJSON[index].formattedName = `#${channel.name}`;
    });
    const fetchChannels = (name) => {
        let selected, others;
        // If the channel is defined
        if(guildDB.specialChannels[name]){
            const channel = guildChannelsJSON.find((c) => c.id === guildDB.specialChannels[name]);
            if(channel){
                selected = channel;
                others = guildChannelsJSON.filter((c) => c.id !== channel.id && c.type === "text");
                others.push({ formattedName: req.translate("common:NO_CHANNEL") });
            } else {
                selected = { formattedName: req.translate("common:NO_CHANNEL") };
                others = guildChannelsJSON;
            }
        } else {
            selected = { formattedName: req.translate("common:NO_CHANNEL") };
            others = guildChannelsJSON.filter((c) => c.type === "text");
        }
        guildJSON[`${name}SelectedChannel`] = selected;
        guildJSON[`${name}OtherChannels`] = others;
    };
    fetchChannels("suggestions");
    fetchChannels("fortniteshop");
    fetchChannels("modlogs");
    fetchChannels("reports");
    const formattedGuild = {
        ...guildJSON,
        ...{ channels: guildChannelsJSON },
        ...{ roles: guildRolesJSON }
    };
    req.guildData = {
        ...formattedGuild,
        ...guildDB
    };
    return next();
};
