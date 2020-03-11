const { Collection } = require("discord.js");

module.exports = class Member {
    constructor(userID, guildID, data = {}, handler) {
        this.id = userID;
        this.guildID = guildID
        this.handler = handler;
        this.inserted = Object.keys(data).length !== 0;
        this.data = data;
        // Whether the member is fetched
        this.fetched = false;
        // Member exp
        this.exp = data.exp || 0;
        // Member work streak
        this.workStreak = data.work_streak || 0;
    }

    async fetch() {
        if (this.fetched) return;
        this.transactions = [];
        await this.fetchTransactions();
        this.calcMoney();
        this.cooldowns = {};
        await this.fetchCooldowns();
        this.expCached = false;
        this.fetched = true;
    }

    get level() {
        const checkIfAbleTo = (level, xp) => {
            return (5 / 6 * level * (2 * level * level + 27 * level + 91)) <= xp;
        }
        let lvl = 0;
        while(checkIfAbleTo(lvl, this.exp)) lvl++;
        return lvl;
    }

    async addXP(exp) {
        this.expCached = true;
        this.exp += exp;
    }

    async updateExp() {
        await this.handler.query(`
            UPDATE members
            SET exp = ${this.exp}
            WHERE user_id = '${this.id}'
            AND guild_id = '${this.guildID}';
        `);
        this.expCached = false;
        return this;
    }

    async setWorkStreak(value){
        await this.handler.query(`
            UPDATE members
            SET work_streak = ${value}
            WHERE user_id = '${this.id}'
            AND guild_id = '${this.guildID}';
        `);
        this.workStreak = value;
        return this;
    }

    async addCooldown(commandName, endDate){
        const alreadyCreated = this.cooldowns.hasOwnProperty(commandName);
        if (alreadyCreated) {
            await this.handler.query(`
                UPDATE member_cmd_cooldown
                SET end_date = '${endDate.toUTCString()}'
                WHERE cmd_name = '${commandName}'
                AND user_id = '${this.id}'
                AND guild_id = '${this.guildID}';
            `);
        } else {
            await this.handler.query(`
                INSERT INTO member_cmd_cooldown
                (user_id, guild_id, cmd_name, end_date) VALUES
                ('${this.id}', '${this.guildID}', '${commandName}', '${endDate.toUTCString()}');
            `);
        }
        this.cooldowns[commandName] = new Date(endDate).getTime();
        return this;
    }

    async fetchCooldowns() {
        const { rows } = await this.handler.query(`
            SELECT * FROM member_cmd_cooldown
            WHERE user_id = '${this.id}'
            AND guild_id = '${this.guildID}';
        `);
        rows.forEach(cooldownData => {
            this.cooldowns[cooldownData.cmd_name] = new Date(cooldownData.end_date).getTime();
        });
        return this;
    }

    async createTransaction({ action, date = new Date(), debit = 0, credit = 0, relatedMemberID }) {
        await this.handler.query(`
            INSERT INTO member_transactions
            (user_id, guild_id, transac_action, transac_date, transac_debit, transac_credit  ${relatedMemberID ? ", transac_related_member_id" : ""}) VALUES
            ('${this.id}', '${this.guildID}', '${action}', '${date.toUTCString()}', ${debit}, ${credit} ${relatedMemberID ? `, '${relatedMemberID}'` : ""});
        `);
        
        this.transactions.push({
            action,
            date,
            debit,
            credit,
            relatedMemberID
        });
        this.calcMoney();
        return this;
    }

    async fetchTransactions() {
        const { rows } = await this.handler.query(`
            SELECT * FROM member_transactions
            WHERE user_id = '${this.id}'
            AND guild_id = '${this.guildID}';
        `);
        rows.sort((a, b) => a.transac_date - b.transac_date).forEach(transactionData => {
            this.transactions.push({
                action: transactionData.transac_action,
                date: transactionData.transac_date,
                debit: transactionData.transac_debit,
                credit: transactionData.transac_credit,
                relatedMemberID: transactionData.transac_related_member_id
            });
        });
    }

    calcMoney() {
        this.cash = (this.transactions.map((t) => t.credit - t.debit).length > 0 ? this.transactions.map((t) => t.credit-t.debit) : [0]).reduce((p, c) => p + c);
        this.bank = (this.transactions.filter((t) => t.action === "bank_transfer").map((t) => t.debit + t.credit).length ? this.transactions.filter((t) => t.action === "bank_transfer").map((t) => t.debit + t.credit) : [0]).reduce((p, c) => p + c);
    }

    // Insert the member in the db if it doesn't exist
    async insert() {
        if (!this.inserted) {
            await this.handler.query(`
                INSERT INTO members
                (user_id, guild_id, exp, work_streak) VALUES
                ('${this.id}', '${this.guildID}', ${this.exp}, ${this.workStreak});
            `);
            this.inserted = true;
        }
        return this;
    }
};
