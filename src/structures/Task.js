module.exports = class Task {
    constructor(client, options) {
        this.client = client;
        this.id = options.id;
        this.type = options.type;
        this.end = options.end;
        this.data = options.data;
    }

    execute() {
        throw `${this.name} doesn't have an execute method.`;
    }
};
