"use strict";

const {EOL} = require("os");

module.exports = {
	"env": {
		"commonjs": true,
		"es6": true,
		"node": true
	},
	"extends": "eslint:recommended",
	"globals": {
		"Atomics": "readonly",
		"SharedArrayBuffer": "readonly"
	},
	"parserOptions": {
		"ecmaVersion": 2020
	},
	"rules": {
		"prefer-const": [
			"error"
		],
		"indent": [
			"error",
			"tab"
		],
		"linebreak-style": EOL === "\n" ? [
			"error",
			"unix"
		] : [
			"error",
			"windows",
		],
		"quotes": [
			"error",
			"double"
		],
		"semi": [
			"error",
			"always"
		],
		"require-atomic-updates": 0
	}
};