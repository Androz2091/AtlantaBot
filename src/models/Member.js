const { Collection } = require("discord.js");

module.exports = class Member {
    constructor(userID, guildID, data = {}, handler) {
        this.id = userID;
        this.handler = handler;
        this.inserted = data !== {};
        this.data = data;
        // Whether the member is fetched
        this.fetched = false;
        // Member guild id
        this.guildID = guildID;
        // Member exp
        this.exp = data.exp || 0;
    }

    async fetch() {
        if (this.fetched) return;
        this.transactions = [];
        await this.fetchTransactions();
        this.calcMoney();
        this.fetched = true;
    }

    async fetchTransactions() {
        const { rows } = await this.handler.query(`
            SELECT * FROM members_transactions
            WHERE user_id = '${this.id}'
            AND guild_id = '${this.guildID}';
        `);
        rows.sort((a, b) => a.trans_date - b.trans_date).forEach(transactionData => {
            this.transactions.push({
                action: transactionData.trans_action,
                date: transactionData.trans_date,
                money: transactionData.trans_value,
                sender: transactionData.trans_sender
            });
        });
    }

    calcMoney() {
        let cash = 0,
        bank = 0;
        this.transactions.forEach((transaction) => {
            switch(transaction.action){
                case "send":
                    cash -= t.money;
                    break;
                case "receive":
                    cash += t.money;
                    break;
                case "deposit":
                    cash -= t.money;
                    bank += t.money;
                    break;
                case "withdraw":
                    bank -= t.money;
                    cash += t.money;
                    break;
            }
        });
        this.cash = cash;
        this.bank = bank;
    }

    // Insert the member in the db if it doesn't exist
    async insert() {
        if (!this.inserted) {
            await this.handler.query(`
                INSERT INTO members
                (user_id, guild_id, exp) VALUES
                ('${this.id}', '${this.guildID}', ${this.exp});
            `);
            this.inserted = true;
        }
        return this;
    }
};
