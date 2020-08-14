/*
Logger class for easy and aesthetically pleasing console logging
*/
const { bgBlue, black, green } = require("chalk");

function dateTimePad(value, digits){
	let number = value;
	while (number.toString().length < digits) {
		number = "0" + number;
	}
	return number;
}

function format(tDate){
	return (tDate.getFullYear() + "-" +
    dateTimePad((tDate.getMonth() + 1), 2) + "-" +
    dateTimePad(tDate.getDate(), 2) + " " +
    dateTimePad(tDate.getHours(), 2) + ":" +
    dateTimePad(tDate.getMinutes(), 2) + ":" +
    dateTimePad(tDate.getSeconds(), 2) + "." +
    dateTimePad(tDate.getMilliseconds(), 3));
}

module.exports = class Logger {
	static log (content, type = "log") {
		const date = `[${format(new Date(Date.now()))}]:`;
		switch (type) {
			// Check the message type and then print him in the console
			case "log": {
				return console.log(`${date} ${bgBlue(type.toUpperCase())} ${content} `);
			}
			case "warn": {
				return console.log(`${date} ${black.bgYellow(type.toUpperCase())} ${content} `);
			}
			case "error": {
				return console.log(`${date} ${black.bgRed(type.toUpperCase())} ${content} `);
			}
			case "debug": {
				return console.log(`${date} ${green(type.toUpperCase())} ${content} `);
			}
			case "cmd": {
				return console.log(`${date} ${black.bgWhite(type.toUpperCase())} ${content}`);
			}
			case "ready": {
				return console.log(`${date} ${black.bgGreen(type.toUpperCase())} ${content}`);
			} 
			default: throw new TypeError("Logger type must be either warn, debug, log, ready, cmd or error.");
		}
	}
};