module.exports = class {
    constructor (client) {
      this.client = client;
    }
    
    async run () {
        
      // Wait one second, if the bot is not really ready
      await this.client.wait(1000);
      
      // Fetch discord app
      this.client.appInfo = await this.client.fetchApplication();
      setInterval( async () => {
        this.client.appInfo = await this.client.fetchApplication();
      }, 60000);

      // Logs some informations using the logger file
      this.client.logger.log(`Loading a total of ${this.client.commands.size} command(s).`, 'log');
      this.client.logger.log(`${this.client.user.tag}, ready to serve ${this.client.users.size} users in ${this.client.guilds.size} servers.`, "ready");
      
      // Update the game every 20s
      var games = [
        `${this.client.config.prefix}help on ${this.client.guilds.size} guilds`,
        `My website : atlanta-bot.fr`,
        `Add me with ${this.client.config.prefix}invite!`
      ];
      var client = this.client;
      var i = 0;
      setInterval(function(){
        client.user.setActivity(games[i]);
        if(games[parseInt(i + 1)]) i++;
        else i = 0;
      }, 20000);
    }
}  