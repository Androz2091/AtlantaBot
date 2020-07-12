# Changelog

All notable changes to this project will be documented in this file.

## [4.7.0]

### Added

* Atlanta now uses i18next and can be translated on the [Crowdin project page](https://crowdin.com/project/atlantabot).
* Simple cache system was added, to reduce latency. (c73d1d6b)

### Fixed

* The play command is now playing the right song instead of a random one. (be4f497c)
* Dashboard authentication has been fixed. (ad3d84a6)
* Birthdate input on the dashboard has been fixed and is now saving the right date. (b885ccc7)
* `addemote` command has been renamed to `addemoji`. (e8b3b969)
* `tcl` command has been removed, as it was not used. (c3309663)
* `purge` command was removed, as it was not used. (07e0d55d)
* `api-token` command has been removed, as it was useless. (5857aab1)
* `partners` command has been removed, as it was not used. (dec093fa)
* `mention-role` command was removed, as Discord now has a mention permissions. (3fb32d7d)
* `getconf` and `getinvite` commands were temporarily removed. (aa998c58)
* `help` command now generate an invite link with administrator permissions. (b64114a6)
* `weeding` command has been renamed to `marry`. (dd89ab8b)
* Dashboard selector (the grid with servers) is now working for accounts with +30 servers. (2149b903)
* Dashboard now accepts prefixes of one character. (2fac3b82)
* New `h` and `commands` aliases to `help` command. (081d0ead)
* New `lc` alias to `lovecalc` command. (8e612a4a)
* `userinfo` command now sends an error message if the provided ID is not valid. (9ebfd866)
* `skip` command is now working when the voice channel includes bots that can't vote. (095dac3d)
* Atlanta now uses the `discord-canvas` library for fortnite related commands and greeting images. (aaf785b5)
* Atlanta now uses the `moment` library to show dates and times. (f46edf00)
* Atlanta now uses the last version of the `discord.js` library. (b33f4e20)
* Atlanta now uses the last version of the `discord-giveaways` library. (1a57cebb)
* Atlanta now uses the last version of the `discord-player` library (YouTube API key is no longer required). (80335aa8)
* Sentry.io has been setup, and errors are now saved and reported. (8bfbb03a)

## [4.6.0]

### Added

* `serverinfo` command now displays the number of boosts of the server
* New `achievements` command
* `images` commands have been fixed

## [4.5.10]

### Added

* New `mention-role` command

### Fixed

* If a member is muted and leaves and returns, he will always be muted
* User game is now displayed in the userinfo command
* Fix `invitations` command
* Rep cooldown is now user based and not member based
* `steal` command was renamed to `rob`
* `minimize` command was renamed to `shorturl`
* `ban` command now accepts ids
* Fixes some other minor bugs

## [4.5.0]

### Added

* New `fortniteshop` command
* New Fornite Shop channel, in which a shop image made with canvas is sent every morning
* New `staff` command to get the staff members list of a guild
* New `deletemod` command if you want that the moderation commands will be deleted automatically
* New `clearwarns` command to delete all warns of a member

### Dashboard

* New `Statistics` tab
    * New `Guild Stats` page to get the stats of a specific guild
    * New `Stats` button on the selector page
* New `settings` page to configure your profile and the website (language, logout, etc...)

### Economy

* Economy is now guild based
* New `steal` command
* New `deposit` command
* New `withdraw` command
* `profile` command was edited
* `work` and `rep` cooldown is now 6h instead of 12h
* Add `work` streak

## [4.0.0] - 2019-01-08

### Added

* Welcome and goodbye images were improved (using Canvas)
* Fortnite stats are now displayed in images (using Canvas)
* New `calc` command
* 13 new commands in `images` category
* `*clear all` to clear all the messages in a channel
* `vote` alias has come back

### Fixed

* Now no longer considers that you are over 80 years old with the `birthdate` command
* `clear` command now checks if the parameter is a number
* `announcement` command now checks if the message length is higher than 1030
* `warn` command now checks if the mentionned member is not a bot
* `setlogs` command renamed to `setmodlogs`
* `ignore`, `slowmode`, `automod`, `goodbye`, `welcome`, `setmodlogs` and `setsuggests` now check if the mentionned channel is a text channel and if the channel is in the current guild
* The design of the `help` command has been improved
* The `help` command now displays the number of commands executed in the last 7 days
* And many other small bugs!

### Dashboard

* Dashboard is back in the same repository as Atlanta to make things easier
* Support for almost all server settings (welcome messages, goodbye messages, prefix, language, etc...)
* English **and** French support
* Page for displaying the ranking
* Page to display a user's profile
* Page to edit the profile
* Server search form

## [3.5.0] - 2019-11-07

### Added

* New `backup` command
* New `announcement` command
* New `giveaway` command
* Users commands cooldown
* Vote system for `skip` and `stop` commands
* `-g` option to the help command
* Translation for commands usage and commands examples
* The `minecraft` command supports Minecraft Pocket Edition servers

### Changed

* Now use Discord.js v12.0.0 instead of Discord.js v11.5.0
* Now use DeepL Translate instead of Yandex Translate
* Now use MongoDB instead of quick.db
* Now use Node-Fetch instead of Snekfetch
* Now use of `let` instead of `var` for a better scoping
* Clarification of language files
* Discordbots.org vote is now rewarded with 40 credits
* Most commands are now available in private messages
* The `help` command is now paginated
* `leave` command renamed to `goodbye` command
* `credits` command renamed to `money` command
* `warns` command renamed to `sanctions` command
* All the emojis were updated
* Update links in the `invite` command
* Best parse of time

### Removed

* Blacklist command and blacklist system
* Dashboard (now in another repository)

## [3.0.0] - 2018-17-04

### Added

* New `slots` command
* New `badge` command
* Welcome and goodbye images
* New Music category
    * New `play` command
    * New `stop` command
    * New `skip` command
    * New `np` (now playing) command
    * New `pause` command
    * New `resume` command
* New informations on the `stats` command
* Support for command aliases
* Support for translations (english and french)
* Support for commands in direct messages
* Two new prefixes: `@Atlanta` and `Atlanta`
* Warns logs (to have a history of the warns)
* New available parameters for the `leaderboard` command

### Changed

* The bot is now 100% open source
* Cooldown of the work command is now 24h
* Simplification of the flip command
* The moderation logs are now more accurate and more beautiful
* The `ban` command now checks if the user/member is already banned
* Updates of some controls from an appearance point of view

### Removed

* Premium version
* Taxes on the command paid

### Fixed

* Improved loading speed of the invite command
* Fix bugs that allowed you to get married to yourself and to get married to two people are fixed
* Fixed bugs that allowed you to enter any date with the `birthdate` command
