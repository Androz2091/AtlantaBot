const AtlantaFunction = require("../structures/Function");

module.exports = class ConvertTime extends AtlantaFunction {
    execute(guild, time) {
        const absoluteSeconds = Math.floor((time / 1000) % 60);
        const absoluteMinutes = Math.floor((time / (1000 * 60)) % 60);
        const absoluteHours = Math.floor((time / (1000 * 60 * 60)) % 24);
        const absoluteDays = Math.floor(time / (1000 * 60 * 60 * 24));

        const d = absoluteDays
            ? absoluteDays === 1
                ? guild.translate("time:ONE_DAY")
                : guild.translate("time:DAYS", { amount: absoluteDays })
            : null;
        const h = absoluteHours
            ? absoluteHours === 1
                ? guild.translate("time:ONE_HOUR")
                : guild.translate("time:HOURS", { amount: absoluteHours })
            : null;
        const m = absoluteMinutes
            ? absoluteMinutes === 1
                ? guild.translate("time:ONE_MINUTE")
                : guild.translate("time:MINUTES", { amount: absoluteMinutes })
            : null;
        const s = absoluteSeconds
            ? absoluteSeconds === 1
                ? guild.translate("time:ONE_SECOND")
                : guild.translate("time:SECONDS", { amount: absoluteSeconds })
            : null;

        const absoluteTime = [];
        if (d) absoluteTime.push(d);
        if (h) absoluteTime.push(h);
        if (m) absoluteTime.push(m);
        if (s) absoluteTime.push(s);

        return absoluteTime.join(", ");
    }
};
