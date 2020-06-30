# Commands  
Here's the list of Atlanta commands. This one contains more than **80 commands** in **7 categories**!  

#### Contents of the table  
**Name**: The name of the command  
**Description**: A brief explanation of the purpose of the command  
**Usage**: The arguments/options that the command takes in parameters  
**Cooldown**: The time that must elapse between each command so that it can be executed again by the user

### General (17 commands)

| Name            | Description                                                              | Usage                          | Cooldown  |
| --------------- | ------------------------------------------------------------------------ | ------------------------------ | --------- |
| **api-token**   | Send your token back to use the Atlanta API!                             | apitoken (regenerate)          | 1 seconds |
| **calc**        | A calculator capable of solving complex operations and converting units! | calc [calculation]             | 1 seconds |
| **help**        | Displays the help of commands or the help of a particular command        | help (command)                 | 5 seconds |
| **permissions** | Displays the member's permissions in the channel                         | permissions (@member)          | 1 seconds |
| **ping**        | Displays bot latency                                                     | ping                           | 1 seconds |
| **quote**       | Quote a message in the channel!                                          | quote [messageID] [channel]    | 5 seconds |
| **remindme**    | Define a reminder!                                                       | remindme [reason]              | 3 seconds |
| **report**      | Send your report to the channel defined for this!                        | report [@user] [reason]        | 5 seconds |
| **serverinfo**  | Displays information about the server!                                   | serverinfo [ID/Name]           | 3 seconds |
| **setafk**      | Become an AFK (members who mention you will receive a message)           | setafk [reason]                | 3 seconds |
| **shorturl**    | Shorten your link!                                                       | shorturl [url]                 | 5 seconds |
| **someone**     | Pick a random member on the server!                                      | someone                        | 1 seconds |
| **staff**       | Displays the list of server staff members!                               | staff                          | 3 seconds |
| **stats**       | Display the stats of the bot!                                            | stats                          | 3 seconds |
| **suggest**     | Send your suggestion to the channel defined for this!                    | suggest [message]              | 5 seconds |
| **translate**   | I'm translating your text!                                               | translate [language] [message] | 8 seconds |
| **userinfo**    | Displays user information!                                               | userinfo (@user/userID)        | 5 seconds |

### Images (17 commands)

| Name              | Description                                               | Usage                      | Cooldown  |
| ----------------- | --------------------------------------------------------- | -------------------------- | --------- |
| **avatar**        | Displays the avatar of the mentionned member              | avatar (@member)           | 5 seconds |
| **captcha**       | Generates a "triggered" image using the Nekobot API       | captcha (@member)          | 5 seconds |
| **clyde**         | Generates a "clyde" image using the Nekobot API           | clyde [text]               | 5 seconds |
| **facepalm**      |                                                           |                            | 5 seconds |
| **fire**          | Generates a "fire" image using the Améthyste API          | fire (@member)             | 5 seconds |
| **jail**          | Generates a "jail" image using the Améthyste API          | jail (@member)             | 5 seconds |
| **love**          | Generates a "love" image using the Nekobot API            | love [@user1] (@user2)     | 5 seconds |
| **mission**       | Generates a "mission" image using the Améthyste API       | mission (@member)          | 5 seconds |
| **phcomment**     | Generates a "phcomment" image using the Nekobot API       | phcomment (@member) (text) | 5 seconds |
| **qrcode**        | Generates a QR Code with your text!                       | qrcode [text]              | 3 seconds |
| **rip**           | Generates a "rip" image using the Améthyste API           | rip (@member)              | 5 seconds |
| **scary**         | Generates a "scary" image using the Améthyste API         | scary (@member)            | 5 seconds |
| **tobecontinued** | Generates a "tobecontinued" image using the Améthyste API | tobecontinued (@member)    | 5 seconds |
| **triggered**     | Generates a "triggered" image using the Améthyste API     | triggered (@member)        | 5 seconds |
| **tweet**         | Generate a tweet of a person of your choice on Twitter!   | tweet [@twitter] [text]    | 5 seconds |
| **wanted**        | Generates a "wanted" image using the Améthyste API        | wanted (@member)           | 5 seconds |
| **wasted**        | Generates a "wasted" image using the Améthyste API        | wasted (@member)           | 5 seconds |

### Economy (15 commands)

| Name             | Description                                                               | Usage                            | Cooldown   |
| ---------------- | ------------------------------------------------------------------------- | -------------------------------- | ---------- |
| **achievements** | Displays the list of all the achievements!                                | achievements                     | 1 seconds  |
| **birthdate**    | Set your birthday date (which will appear on your profile)                | birthdate (date)                 | 1 seconds  |
| **deposit**      | Deposit your money at the bank                                            | deposit [amount]                 | 1 seconds  |
| **divorce**      | Divorce the person you are currently married to!                          | divorce                          | 3 seconds  |
| **leaderboard**  | Displays users who have the most credits, levels or reputation points!    | leaderboard [rep/levels/credits] | 5 seconds  |
| **money**        | Displays your credits                                                     | money (@member)                  | 1 seconds  |
| **pay**          | Pay a member with credits!                                                | pay [@user#0000] [amount]        | 10 seconds |
| **profile**      | Displays the profile of the mentioned user (or the author of the message) | profile (@user#0000)             | 3 seconds  |
| **rep**          | Give a member a reputation point!                                         | rep [@user#0000]                 | 3 seconds  |
| **rob**          | Try to rob a member!                                                      | rob [@membre] [amount]           | 1 seconds  |
| **setbio**       |                                                                           |                                  | 5 seconds  |
| **slots**        | An equivalent to the Casino!                                              | slots [amount]                   | 3 seconds  |
| **wedding**      | Marry the person of your choice!                                          | wedding [@user#0000]             | 10 seconds |
| **withdraw**     | Withdraw money!                                                           | withdraw [amount]                | 1 seconds  |
| **work**         | Work and earn money!                                                      | work                             | 3 seconds  |

### Administration (11 commands)

| Name              | Description                                                   | Usage                      | Cooldown   |
| ----------------- | ------------------------------------------------------------- | -------------------------- | ---------- |
| **backup**        | Manage your server backups in an ergonomic and efficient way! | backup [create/load/infos] | 30 seconds |
| **configuration** | Displays the server configuration                             | configuration              | 3 seconds  |
| **goodbye**       | Send a goodbye message to a pre-defined channel!              | goodbye                    | 3 seconds  |
| **ignore**        | Disables or activates commands in the mentioned channel       | ignore [#channel]          | 3 seconds  |
| **purge**         | Kick out inactive members!                                    | purge [days]               | 5 seconds  |
| **setmodlogs**    | Define the log channel!                                       | setmodlogs (#channel)      | 3 seconds  |
| **setprefix**     | Changes the server prefix                                     | setprefix [prefix]         | 3 seconds  |
| **setreports**    | Define the reports channel!                                   | setreports (#channel)      | 3 seconds  |
| **setsuggests**   | Define the suggestion channel!                                | setsuggests (#channel)     | 3 seconds  |
| **slowmode**      | Define a cooldown in a channel                                | slowmode [#channel] (time) | 3 seconds  |
| **welcome**       | Send a welcome message to a pre-defined channel!              | welcome                    | 3 seconds  |

### Fun (11 commands)

| Name          | Description                                                                                   | Usage                           | Cooldown  |
| ------------- | --------------------------------------------------------------------------------------------- | ------------------------------- | --------- |
| **8ball**     | I'm telling you the truth!                                                                    | 8ball [question]                | 3 seconds |
| **ascii**     | Turn your text into ascii characters!                                                         | ascii [text]                    | 5 seconds |
| **findwords** | Start a game of findwords, a game where you have to find words!                               | findwords                       | 5 seconds |
| **flip**      | I roll the dice for you!                                                                      | flip                            | 1 seconds |
| **fml**       | Displays a random FML                                                                         | fml                             | 3 seconds |
| **joke**      | Displays a joke in French                                                                     | joke                            | 3 seconds |
| **lmg**       | Returns a link to lmgtfy.com                                                                  | lmg [question]                  | 1 seconds |
| **lovecalc**  | How much love is there between two people? *This is a fun command, not to be taken seriously* | lovecalc [@member1] (@member2)  | 1 seconds |
| **number**    | Find the number I chose!                                                                      | number                          | 5 seconds |
| **random**    | Randomly pick one of the choices you give me!                                                 | random [choice1/choice2/etc...] | 5 seconds |
| **tcl**       | Display the last tweet of @thecodinglove !                                                    | tcl                             | 3 seconds |

### Music (8 commands)

| Name       | Description                                  | Usage              | Cooldown  |
| ---------- | -------------------------------------------- | ------------------ | --------- |
| **lyrics** | Displays the lyrics of a song                | lyrics [song-name] | 5 seconds |
| **np**     | Displays information about the current song! | np                 | 5 seconds |
| **pause**  |                                              | pause              | 5 seconds |
| **play**   | Play music!                                  | play [title]       | 5 seconds |
| **queue**  | Displays the queue                           | queue              | 5 seconds |
| **resume** |                                              | resume             | 5 seconds |
| **skip**   | Play the next song!                          | skip               | 5 seconds |
| **stop**   | Stop the music in progress!                  | stop               | 5 seconds |

### Owner (5 commands)

| Name             | Description                                                                                     | Usage                        | Cooldown  |
| ---------------- | ----------------------------------------------------------------------------------------------- | ---------------------------- | --------- |
| **eval**         | Executes the code                                                                               | eval [code]                  | 3 seconds |
| **getconf**      | Displays the configuration of a server                                                          | getconf [server ID]          | 3 seconds |
| **getinvite**    | Generates an invitation to the server in question. Make sure you make good use of this command. | getinvite [ID/Name]          | 3 seconds |
| **reload**       | Reload a bot command!                                                                           | reload [name-of-the-command] | 3 seconds |
| **servers-list** | Displays the list of the servers of the bot!                                                    | servers-list                 | 5 seconds |

