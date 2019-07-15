/*
Logger class for easy and aesthetically pleasing console logging
*/
const { bgBlue, black, green } = require("chalk");
const moment = require("moment");

module.exports = class Logger {
  static log (content, type = "log") {
    const timestamp = `[${moment().format("YYYY-MM-DD HH:mm:ss")}]:`;
    switch (type) {
      // Check the message type and then print him in the console
      case "log": {
        return console.log(`${timestamp} ${bgBlue(type.toUpperCase())} ${content} `);
      }
      case "warn": {
        return console.log(`${timestamp} ${black.bgYellow(type.toUpperCase())} ${content} `);
      }
      case "error": {
        return console.log(`${timestamp} ${black.bgRed(type.toUpperCase())} ${content} `);
      }
      case "debug": {
        return console.log(`${timestamp} ${green(type.toUpperCase())} ${content} `);
      }
      case "cmd": {
        return console.log(`${timestamp} ${black.bgWhite(type.toUpperCase())} ${content}`);
      }
      case "ready": {
        return console.log(`${timestamp} ${black.bgGreen(type.toUpperCase())} ${content}`);
      } 
      default: throw new TypeError("Logger type must be either warn, debug, log, ready, cmd or error.");
    }
  }
};
