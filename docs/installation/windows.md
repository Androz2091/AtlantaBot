## Before You Begin

1. Make sure you have installed [Node.js](https://www.guru99.com/download-install-node-js.html) v10 or higher, [Git](https://www.linode.com/docs/development/version-control/how-to-install-git-on-linux-mac-and-windows/) and [MongoDB](https://medium.com/@LondonAppBrewery/how-to-download-install-mongodb-on-windows-4ee4b3493514).
2. Clone this repository with `git clone https://github.com/Androz2091/AtlantaBot.git`.
3. Run `cd AtlantaBot` to move in the folder that Git has just created.

## Edit the configuration

You need to clone the `config.sample.js` file and to rename it to `config.js`. You will then have to complete it with your informations.

Obtain the necessary API keys:

*   [Blague.xyz](https://blague.xyz/login) API key is used for the `joke` command
*   [Amethyste](https://api.amethyste.moe/register) API key is used for some images command
*   [FortniteTracker](https://fortnitetracker.com/site-api) API key is used for the fortnite stats command
*   [FortniteFNBR](https://fnbr.co/oauth/discord) API key is used for the fortnite shop image
*   [Discordbots](https://discordbots.org/api/docs#mybots) API key is used for stats posting and votes rewards

{% hint style="info" %}
If you do not have some API keys, such as the Discordbots key, leave the fields empty, the commands/features that use them will be automatically disabled.
{% endhint %}

For emojis, you must add them on one of your bot's servers and enter the string of the emoji (<:emojiName:emojiID>). If you are lazy to add them, you can join [**this server**](https://www.atlanta-bot.fr/emojis) on which you will only have to add your bot to access a bank of emojis!

## Install dependencies

1. [Follow these instructions to install `ffmpeg`.](http://blog.gregzaal.com/how-to-install-ffmpeg-on-windows/)
2. Open an **ADMIN** command prompt, or PowerShell.
3. Run the following command `npm install -g --production windows-build-tools`.
4. And to install all the others dependencies, run `npm install --production`.

## Launch the bot

1. Run `npm install -g pm2` to install PM2.
2. Run `pm2 start atlanta.js` to run the bot.
3. Enjoy it!
