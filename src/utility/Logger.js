const chalk = require("chalk");

const dateTimePad = (value, digits) => {
    let number = value;
    while (number.toString().length < digits) number = "0" + number;
    return number;
};

const getDate = (tDate = new Date()) => {
    return (
        tDate.getFullYear() +
        "-" +
        dateTimePad(tDate.getMonth() + 1, 2) +
        "-" +
        dateTimePad(tDate.getDate(), 2) +
        " " +
        dateTimePad(tDate.getHours(), 2) +
        ":" +
        dateTimePad(tDate.getMinutes(), 2) +
        ":" +
        dateTimePad(tDate.getSeconds(), 2) +
        "." +
        dateTimePad(tDate.getMilliseconds(), 3)
    );
};

const log = (message, type, tDate) => {
    let date = getDate(tDate);
    switch (type) {
        case "debug":
            return console.log(
                `${date} ${chalk.green(type.toUpperCase())} ${message} `
            );
        case "info":
            return console.log(
                `${date} ${chalk.bgBlue(type.toUpperCase())} ${message} `
            );
        case "warn":
            return console.log(
                `${date} ${chalk.black.bgYellow(type.toUpperCase())} ${message} `
            );
        case "error":
            return console.log(
                `${date} ${chalk.black.bgRed(type.toUpperCase())} ${message} `
            );
        case "ipc":
            return console.log(
                `${date} ${chalk.bgHex("#8A2BE2")(type.toUpperCase())} ${message}`
            );
        default:
            throw new TypeError(
                "Log type must be either debug, info, ipc, warn or error."
            );
    }
};

const debug = (message, date) => log(message, "debug", date);
const info = (message, date) => log(message, "info", date);
const warn = (message, date) => log(message, "warn", date);
const error = (message, date) => log(message, "error", date);

module.exports = {
    log,
    debug,
    info,
    warn,
    error
};
