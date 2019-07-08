## Before You Begin

1. Make sure you have installed [Node.js](https://www.guru99.com/download-install-node-js.html) v10 or higher, [Git](https://www.linode.com/docs/development/version-control/how-to-install-git-on-linux-mac-and-windows/) and [MongoDB](https://medium.com/@LondonAppBrewery/how-to-download-install-mongodb-on-windows-4ee4b3493514).
2. Clone this repository with `git clone https://github.com/Androz2091/AtlantaBot.git`.
3. Run `cd AtlantaBot` to move in the folder that Git has just created.

## Edit the configuration

You need to clone the `config.sample.js` file and to rename it to `config.js`. You will then have to complete it with your informations.

Obtain the necessary API keys:

*   [Anidiots](https://discord.gg/PgCR8Rg) API key is used for welcome and goodbye images
*   [FortniteTracker](https://fortnitetracker.com/site-api) API key is used for the fortnite stats command
*   [Discordbots](https://discordbots.org/api/docs#mybots) API key is used for stats posting and votes rewards
*   [SimpleYoutube](https://console.developers.google.com/) API key is used to search videos on Youtube (play command)

{% hint style="info" %}
If you do not have some API keys, such as the Discordbots key, leave the fields empty, the commands/features that use them will be automatically disabled.
{% endhint %}

## Install dependencies

1. [Follow these instructions to install `ffmpeg`.](http://blog.gregzaal.com/how-to-install-ffmpeg-on-windows/)
2. Open an **ADMIN** command prompt, or PowerShell.
3. Run the following command `npm install -g --production windows-build-tools`.
4. And to install all the others dependencies, run `npm install --production`.

## Launch the bot

1. Run `npm install -g pm2` to install PM2.
2. Run `pm2 start atlanta.js` to run the bot.
3. Enjoy it!