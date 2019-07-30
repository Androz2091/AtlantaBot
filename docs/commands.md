# Commands  
Here's the list of Atlanta commands. This one contains more than **90 commands** in **8 categories**!  

#### Contents of the table  
**Name**: The name of the command  
**Description**: A brief explanation of the purpose of the command  
**Usage**: The arguments/options that the command takes in parameters  
**Cooldown**: The time that must elapse between each command so that it can be executed again by the user

### General (20 commands)

| Name            | Description                                                              | Usage                          | Cooldown  |
| --------------- | ------------------------------------------------------------------------ | ------------------------------ | --------- |
| **calc**        | A calculator capable of solving complex operations and converting units! | calc [calculation]             | 1 seconds |
| **fortnite**    | Displays a player's Fortnite stats!                                      | fortnite [psn/xbl/pc] [pseudo] | 1 seconds |
| **github**      | Displays the information from the Atlanta github!                        | github                         | 5 seconds |
| **hastebin**    | Upload your text on hastebin !                                           | hastebin [text]                | 5 seconds |
| **help**        | Displays the help of commands or the help of a particular command        | help (command)                 | 5 seconds |
| **invitations** | Displays the number of people you have invited to the server!            | invitations (@member)          | 3 seconds |
| **invite**      | Displays the links of Atlanta!                                           | invite (copy)                  | 5 seconds |
| **minecraft**   | Displays information about the Minecraft server!                         | minecraft [ip]                 | 3 seconds |
| **minimize**    | Shorten your link!                                                       | minimize [url]                 | 5 seconds |
| **permissions** | Displays the member's permissions in the channel                         | permissions (@member)          | 1 seconds |
| **ping**        | Displays bot latency                                                     | ping                           | 1 seconds |
| **quote**       | Quote a message in the channel!                                          | quote [messageID] [channel]    | 5 seconds |
| **remindme**    | Define a reminder!                                                       | remindme [reason]              | 3 seconds |
| **serverinfo**  | Displays information about the server!                                   | serverinfo [ID/Name]           | 3 seconds |
| **setafk**      | Become an AFK (members who mention you will receive a message)           | setafk [reason]                | 3 seconds |
| **someone**     | Pick a random member on the server!                                      | someone                        | 1 seconds |
| **stats**       | Display the stats of the bot!                                            | stats                          | 3 seconds |
| **suggest**     | Send your suggestion to the channel defined for this!                    | suggest [message]              | 5 seconds |
| **translate**   | I'm translating your text!                                               | translate [language] [message] | 8 seconds |
| **userinfo**    | Displays user information!                                               | userinfo (@user/userID)        | 5 seconds |

### Administration (16 commands)

| Name              | Description                                                   | Usage                            | Cooldown   |
| ----------------- | ------------------------------------------------------------- | -------------------------------- | ---------- |
| **addcommand**    | Add a custom command to the server!                           | addcommand [name] [answer]       | 3 seconds  |
| **addemote**      | Add an emoji to the server!                                   | addemote [URL] [name]            | 5 seconds  |
| **automod**       | Enables or disables automatic deletion of discord invitations | automod [on/off] (#channel)      | 5 seconds  |
| **autorole**      | Enable or disable the autorole on the server!                 | autorole [on/off] (role)         | 5 seconds  |
| **backup**        | Manage your server backups in an ergonomic and efficient way! | backup [create/load/infos]       | 30 seconds |
| **configuration** | Displays the server configuration                             | configuration                    | 3 seconds  |
| **delcommand**    | Remove a custom command from the server!                      | delcommand [name-of-the-command] | 3 seconds  |
| **goodbye**       | Send a goodbye message to a pre-defined channel!              | goodbye                          | 3 seconds  |
| **ignore**        | Disables or activates commands in the mentioned channel       | ignore [#channel]                | 3 seconds  |
| **purge**         | Kick out inactive members!                                    | purge [days]                     | 5 seconds  |
| **setlang**       | Change the server language!                                   | setlang [french/english]         | 3 seconds  |
| **setlogs**       | Define the log channel!                                       | setlogs (#channel)               | 3 seconds  |
| **setprefix**     | Changes the server prefix                                     | setprefix [prefix]               | 3 seconds  |
| **setsuggests**   | Define the suggestion channel!                                | setsuggests (#channel)           | 3 seconds  |
| **slowmode**      | Define a cooldown in a channel                                | slowmode [#channel] (time)       | 3 seconds  |
| **welcome**       | Send a welcome message to a pre-defined channel!              | welcome                          | 3 seconds  |

### Moderation (13 commands)

| Name             | Description                                                                             | Usage                                                              | Cooldown  |
| ---------------- | --------------------------------------------------------------------------------------- | ------------------------------------------------------------------ | --------- |
| **announcement** | Send an announcement in the current channel!                                            | announcement [text]                                                | 3 seconds |
| **ban**          | Banished the mentioned member!                                                          | ban [@user] (reason)                                               | 3 seconds |
| **checkinvites** | Check if members do not have an ad for their Discord server in their presence!          | checkinvites                                                       | 3 seconds |
| **clear**        | Deletes messages very quickly!                                                          | clear[number-of-messages] (@member)                                | 3 seconds |
| **giveaway**     | Manage your giveaways simply!                                                           | giveaway [create/reroll/delete/end] (time) (winners count) (prize) | 5 seconds |
| **kick**         | Kick out the mentioned member!                                                          | kick [@user] (reason)                                              | 3 seconds |
| **mute**         | Prevents the member from sending messages and connecting by voice for a period of time! | mute [@member] [time]                                              | 3 seconds |
| **poll**         | Launch a survey in the current channel!                                                 | poll [question]                                                    | 3 seconds |
| **sanctions**    | Displays the list of infractions committed by a member!                                 | sanctions [@member]                                                | 3 seconds |
| **setwarns**     | Define the sanctions that members will get after a certain number of warns!             | setwarns [kick/ban] [number/reset]                                 | 3 seconds |
| **unban**        | Unban the user from the server!                                                         | unban [userID/user#0000]                                           | 3 seconds |
| **unmute**       | Unmute the mentioned member!                                                            | unmute [@member]                                                   | 3 seconds |
| **warn**         | Warn a member in private messages                                                       | warn [@member] [reason]                                            | 3 seconds |

### Images (13 commands)

| Name          | Description                                             | Usage                      | Cooldown  |
| ------------- | ------------------------------------------------------- | -------------------------- | --------- |
| **avatar**    | Displays the avatar of the mentionned member            | avatar (@member)           | 5 seconds |
| **captcha**   | Generates a "triggered" image using the Nekobot API     | captcha (@member)          | 5 seconds |
| **clyde**     | Generates a "clyde" image using the Nekobot API         | clyde [text]               | 5 seconds |
| **facepalm**  | Generates a "facepalm" image using the Anidiots API     | facepalm (@member)         | 5 seconds |
| **garbage**   | Generates a "garbage" image using the Anidiots API      | garbage (@member)          | 5 seconds |
| **hates**     | Generates a "hates" image using the Anidiots API        | hates (@member)            | 5 seconds |
| **love**      | Generates a "love" image using the Nekobot API          | love [@user1] (@user2)     | 5 seconds |
| **phcomment** | Generates a "phcomment" image using the Nekobot API     | phcomment (@member) (text) | 5 seconds |
| **qrcode**    | Generates a QR Code with your text!                     | qrcode [text]              | 3 seconds |
| **respect**   | Generates a "respect" image using the Anidiots API      | respect (@member)          | 5 seconds |
| **shit**      | Generates a "respect" image using the Anidiots API      | shit (@member)             | 5 seconds |
| **triggered** | Generates a "triggered" image using the Anidiots API    | triggered (@member)        | 5 seconds |
| **tweet**     | Generate a tweet of a person of your choice on Twitter! | tweet [@twitter] [text]    | 5 seconds |

### Economy (12 commands)

| Name            | Description                                                               | Usage                            | Cooldown   |
| --------------- | ------------------------------------------------------------------------- | -------------------------------- | ---------- |
| **badge**       | Buy badges that will appear on your profile!                              | badge (name-of-the-badge)        | 3 seconds  |
| **birthdate**   | Set your birthday date (which will appear on your profile)                | birthdate (date)                 | 1 seconds  |
| **divorce**     | Divorce the person you are currently married to!                          | divorce                          | 3 seconds  |
| **leaderboard** | Displays users who have the most credits, levels or reputation points!    | leaderboard [rep/levels/credits] | 5 seconds  |
| **money**       | Displays your credits                                                     | money (@member)                  | 1 seconds  |
| **pay**         | Pay a member with credits!                                                | pay [@user#0000] [amount]        | 10 seconds |
| **profile**     | Displays the profile of the mentioned user (or the author of the message) | profile (@user#0000)             | 3 seconds  |
| **rep**         | Give a member a reputation point!                                         | rep [@user#0000]                 | 3 seconds  |
| **setbio**      |                                                                           |                                  | 5 seconds  |
| **slots**       | An equivalent to the Casino!                                              | slots [amount]                   | 3 seconds  |
| **wedding**     | Marry the person of your choice!                                          | wedding [@user#0000]             | 10 seconds |
| **work**        | Work and earn money!                                                      | work                             | 3 seconds  |

### Fun (9 commands)

| Name          | Description                                                                                   | Usage                           | Cooldown  |
| ------------- | --------------------------------------------------------------------------------------------- | ------------------------------- | --------- |
| **8ball**     | I'm telling you the truth!                                                                    | 8ball [question]                | 3 seconds |
| **ascii**     | Turn your text into ascii characters!                                                         | ascii [text]                    | 5 seconds |
| **findwords** | Start a game of findwords, a game where you have to find words!                               | findwords                       | 5 seconds |
| **flip**      | I roll the dice for you!                                                                      | flip                            | 1 seconds |
| **joke**      | Displays a joke in French                                                                     | joke                            | 3 seconds |
| **lmg**       | Returns a link to lmgtfy.com                                                                  | lmg [question]                  | 1 seconds |
| **lovecalc**  | How much love is there between two people? *This is a fun command, not to be taken seriously* | lovecalc [@member1] (@member2)  | 1 seconds |
| **number**    | Find the number I chose!                                                                      | number                          | 5 seconds |
| **random**    | Randomly pick one of the choices you give me!                                                 | random [choice1/choice2/etc...] | 5 seconds |

### Music (5 commands)

| Name      | Description                                  | Usage        | Cooldown  |
| --------- | -------------------------------------------- | ------------ | --------- |
| **np**    | Displays information about the current song! | np           | 5 seconds |
| **play**  | Play music!                                  | play [title] | 5 seconds |
| **queue** | Displays the queue                           | queue        | 5 seconds |
| **skip**  | Play the next song!                          | skip         | 5 seconds |
| **stop**  | Stop the music in progress!                  | stop         | 5 seconds |

### Owner (4 commands)

| Name             | Description                                                                                     | Usage               | Cooldown  |
| ---------------- | ----------------------------------------------------------------------------------------------- | ------------------- | --------- |
| **eval**         | Executes the code                                                                               | eval [code]         | 3 seconds |
| **getconf**      | Displays the configuration of a server                                                          | getconf [server ID] | 3 seconds |
| **getinvite**    | Generates an invitation to the server in question. Make sure you make good use of this command. | getinvite [ID/Name] | 3 seconds |
| **servers-list** | Displays the list of the servers of the bot!                                                    | servers-list        | 5 seconds |

