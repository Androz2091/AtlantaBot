const resolveChannel = async ({ message, search, channelType }) => {
    const contentToCheck = search || message.content;
    if (!contentToCheck || typeof contentToCheck !== "string") return;
    // Try by parsing the search
    if (contentToCheck.match(/^<#([0-9]{18})>/)) {
        const [_, channelID ] = contentToCheck.match(/^<#([0-9]{18})>/);
        const channelFound = message.guild.channels.cache.get(channelID);
        if (channelFound && channelType && channelFound.type === channelType)
            return channelFound;
    }
    // Try with ID
    if (message.guild.channels.cache.has(search)) {
        const channelFound = message.guild.channels.cache.get(search);
        if (channelFound && channelType && channelFound.type === channelType)
            return channelFound;
    }
    // Try with name with #
    if (
        message.guild.channels.cache.some(
            channel => `#${channel.name}` === search || channel.name === search
        )
    ) {
        const channelFound = message.guild.channels.cache.find(
            channel => `#${channel.name}` === search || channel.name === search
        );
        if (channelFound && channelType && channelFound.type === channelType)
            return channelFound;
    }
    return;
};

module.exports = {
    resolveChannel
};
