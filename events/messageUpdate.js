// The MESSAGE event runs anytime a message is received
// Note that due to the binding of client to every event, every event
// goes `client, other, args` when this function is run.

module.exports = class {
    constructor (client) {
        this.client = client;
    }

    async run (oldMessage, newMessage) {
        this.client.emit('message', newMessage);
    }
};
