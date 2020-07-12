const resolveChannel = async ({ message, search, channelType }) => {
	const contentToCheck = search || message.content;
	if (!contentToCheck || typeof contentToCheck !== "string") return;
	// Try by parsing the search
	if (contentToCheck.match(/^<#([0-9]{18})>/)) {
		const [, channelID] = contentToCheck.match(/^<#([0-9]{18})>/);
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

const resolveMember = async ({ message, search, useMessageContent = true }) => {
	const contentToCheck = search || (useMessageContent ? message.content : null);
	if (!contentToCheck || typeof contentToCheck !== "string") return;
	// Try by parsing the search
	if (contentToCheck.match(/^<@!?(\d+)>$/)) {
		const [, userID] = contentToCheck.match(/^<@!?(\d+)>$/);
		const memberFound = await message.guild.members.fetch(userID).catch(() => {});
		if (memberFound)
			return memberFound;
	}
	// Try with ID
	if (await message.guild.members.fetch(search).catch(() => {})) {
		const memberFound = await message.guild.members.fetch(search);
		if (memberFound)
			return memberFound;
	}
	// Try with name with @
	await message.guild.members.fetch({
		query: search
	});
	if (
		message.guild.members.cache.some(
			member => member.user.tag === search || member.user.username === search
		)
	) {
		const memberFound = message.guild.members.cache.find(
			member => member.user.tag === search || member.user.username === search
		);
		if (memberFound)
			return memberFound;
	}
	return;
};

const resolveRole = async ({ message, search }) => {
	const contentToCheck = search || message.content;
	if (!contentToCheck || typeof contentToCheck !== "string") return;
	// Try by parsing the search
	if (contentToCheck.match(/^<@&([0-9]{18})>/)) {
		const [, roleID] = contentToCheck.match(/^<@&([0-9]{18})>/);
		const roleFound = message.guild.roles.cache.get(roleID);
		if (roleFound)
			return roleFound;
	}
	// Try with ID
	if (message.guild.roles.cache.has(search)) {
		const roleFound = message.guild.roles.cache.get(search);
		if (roleFound)
			return roleFound;
	}
	// Try with name with @
	if (
		message.guild.roles.cache.some(
			role => `@${role.name}` === search || role.name === search
		)
	) {
		const roleFound = message.guild.roles.cache.find(
			role => `@${role.name}` === search || role.name === search
		);
		if (roleFound)
			return roleFound;
	}
	return;
};

module.exports = {
	resolveChannel,
	resolveMember,
	resolveRole
};
