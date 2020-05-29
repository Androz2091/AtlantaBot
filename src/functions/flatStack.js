const AtlantaFunction = require("../structures/Function");

/**
 * Allows you to create a new array containing the elements of the sub-arrays of the array passed in argument,
 * which are recursively concatenated to reach a depth 1.
 */
module.exports = class FlatStack extends AtlantaFunction {
    async execute(array) {
        const stack = [...array];
        const res = [];
        while (stack.length) {
            const next = stack.pop();
            if (Array.isArray(next)) {
            stack.push(...next);
            } else {
            res.push(next);
            }
        }
        return res.reverse();
    }
};
