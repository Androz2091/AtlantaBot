const AtlantaFunction = require("../structures/Function");

module.exports = class AsyncForEach extends AtlantaFunction {
    async execute(array, callback) {
        for (let index = 0; index < array.length; index++) {
            await callback(array[index], index, array);
        }
    }
};
