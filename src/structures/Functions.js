module.exports = class AtlantaFunction {
    constructor(client, name) {
        this.client = client;
        this.name = name;
    }

    execute() {
        throw new Error(`${this.name} doesn't have an execute method.`);
    }
};
