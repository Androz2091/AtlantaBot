# AtlantaBot

A very complete Discord bot (more than 70 commands) that uses the Discordjs API! [Join the Discord](https://discord.gg/VTwHvdR)<br>
If you want to participate in the project, it is with great pleasure I am available on Discord as Androz#2091.

[![Discord Bots](https://discordbots.org/api/widget/status/557445719892688897.svg?noavatar=true)](https://discordbots.org/bot/557445719892688897)
[![Discord Bots](https://discordbots.org/api/widget/servers/557445719892688897.svg?noavatar=true)](https://discordbots.org/bot/557445719892688897)
[![Discord Bots](https://discordbots.org/api/widget/owner/557445719892688897.svg?noavatar=true)](https://discordbots.org/bot/557445719892688897)

# Edit the config file
You must clone the config.js.example to config.js and then edit it:
```Js
module.exports = {
	token:"", // The bot token
	support:{
		id:"", // The id of the support server
		logs:"" // The servers logs channel
	},
	prefix:"", // the bot's prefix
	embed:{
		color:"", // the default color of the embeds (#FF0000 for red)
		footer:"" // the footer of the embeds
	},
	default_language:"", // The default language of the new guilds ("fr" or "en")
	owner:"", // The ID of the owner of the bot,
	anidiots:"", // your anidiots api key (dev.anidtios.guide)
	yandex:"", // your yandex api key (https://passport.yandex.com/auth?retpath=https://tech.yandex.com/translate/)
	simple_youtube_api:"", // your simple youtube api key (https://console.developers.google.com)
	votes:{
		port:8080, // the port to use for the express server (for discordbots.org)
		auth:"", // the password for the discordbots.org webhook
		channel:"" // the channel for vote messages
	}
}
```

# Install dependencies
To automatically install all node modules type `npm install`!
But you still need to edit the quick.db handler.js file that is located in `node_modules/quick.db/bin/handler.js` with the following code : 
https://github.com/Androz2091/quick.db/blob/glitch/bin/handler.js, a fork of this node module.
This will allow you to access the quickdb.init() function.

# Start the bot
To start the bot, simply type `node atlanta.js` !

# Inviting to a guild
To add the bot to your guild, you have to get an oauth link for it.
You can use this site to help you generate a full OAuth Link, which includes a calculator for the permissions: https://finitereality.github.io/permissions-calculator/?v=0
