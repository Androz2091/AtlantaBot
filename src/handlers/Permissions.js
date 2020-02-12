const { join, parse } = require("path");
const klaw = require("klaw");
const PermissionLevel = require("../structures/PermissionLevel");
const { Collection } = require("discord.js");

module.exports = class PermissionsHandler {
    constructor(client) {
        this.client = client;
        this.levels = new Collection();
        this.init();
    }

    init() {
        const start = Date.now();
        
        klaw(join(__dirname, "..", "permissions"))
            .on("data", item => {
                const file = parse(item.path);
                if (!file.ext || file.ext !== ".js") return;

                const Permission = (r => r.default || r)(
                    require(join(file.dir, file.base))
                );
                const perm = new Permission(this.client, {});

                this.levels.set(perm.level, perm);
            })
            .on("end", () => {
                this.levels = this.levels.sort((a, b) => b.level - a.level);
                this.client.logger.info(
                    `Loaded ${this.levels.size} Permissions in ${Date.now() - start}ms`
                );
            });
    }

    async fetch(guild, userID, ignoreStaff = false) {
        const member = await guild.members.fetch(userID);
        if (!member) return this.levels.get(0);

        for (const permLevel of this.levels.values()) {
            if (permLevel.level === 0) {
                const blacklistLevel = this.levels.get(-1);
                if (blacklistLevel && blacklistLevel.check(guild, member))
                    return this.levels.get(-1);
            }

            if (ignoreStaff && permLevel.staff && !permLevel.staffOverride)
                continue;

            if (permLevel.check(guild, member)) return permLevel;
        }

        return this.levels.get(0);
    }
};
