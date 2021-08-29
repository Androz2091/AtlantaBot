/* eslint-disable no-async-promise-executor */
const config = require("../config.js");
const fetch = require("node-fetch");

const chalk = require("chalk");
const success = (message) => console.log(`   ${chalk.green("✓")} ${message}`);
const error = (message, howToFix) => console.log(`   ${chalk.red("✗")} ${message}${howToFix ? ` : ${howToFix}` : ""}`);
const ignore = (message) => console.log(`   ${chalk.yellow("~")} ${message}`);

const delay = (ms) => new Promise((r) => setTimeout(r, ms));

const checks = [
	() => {
		console.log("\n\nEnvironnement");
		return new Promise((res) => {
			if(parseInt(process.version.split(".")[0].split("v")[1]) >= 12){
				success("node.js version should be equal or higher than v12");
			} else {
				error("node.js version should be equal or higher than v12");
			}
			res();
		});
	},
	() => {
		console.log("\n\nDiscord Bot");
		return new Promise((res) => {
			const Discord = require("discord.js");
			const client = new Discord.Client();
			let readyResolve;
			new Promise((resolve) => readyResolve = resolve);
			client.login(config.token).then(async () => {
				success("should be a valid bot token");
				await readyResolve();
				if(!client.guilds.cache.has("568120814776614924")){
					error("should be added to the emojis server", "please add your bot on this server: https://emojis.atlanta-bot.fr to make the emojis working");
				} else {
					success("should be added to the emojis server");
				}
				res();
			}).catch(() => {
				error("should be a valid bot token");
				res();
			});
			client.on("ready", readyResolve);
		});
	},
	() => {
		console.log("\n\nMongoDB");
		return new Promise((res) => {
			const MongoClient = require("mongodb").MongoClient;
			const dbName = config.mongoDB.split("/").pop();
			const baseURL = config.mongoDB.substr(0, config.mongoDB.length - dbName.length);
			const client = new MongoClient(baseURL, {
				useUnifiedTopology: true
			});
			client.connect().then(async () => {
				success("should be able to connect to Mongo database");
				res();
			}).catch(() => {
				error("should be able to connect to Mongo database", "please verify if the MongoDB server is started");
				res();
			});
		});
	},
	() => {
		console.log("\n\nAPI keys");
		return new Promise(async (resolve) => {
			if(!config.apiKeys.amethyste){
				ignore("amethyste API is not configured, key should not be checked.");
			} else {
				const res = await fetch("https://v1.api.amethyste.moe/generate/blurple", {
					method: "POST",
					headers: {
						Authorization: `Bearer ${config.apiKeys.amethyste}`
					}
				});
				const result = await res.json();
				if(result.status === 401){
					error("should be a valid Amethyste API key", "get your key here: https://api.amethyste.moe/");
				} else {
					success("should be a valid Amethyste API key");
				}
			}
			if(!config.apiKeys.blagueXYZ){
				ignore("blague.xyz API is not configured, key should not be checked.");
			} else {
				const res = await fetch("https://blague.xyz/api/joke/random", {
					headers: {
						Authorization: config.apiKeys.blagueXYZ
					}
				});
				const result = await res.json();
				if(result.status === 401){
					error("should be a valid blague.xyz key", "get your key here: https://blague.xyz/");
				} else {
					success("should be a valid blague.xyz key");
				}
			}
			if(!config.apiKeys.dbl){
				ignore("DBL API is not configured, key should not be checked.");
			} else {
				const res = await fetch("https://top.gg/api/bots/check?userId=test", {
					method: "POST",
					headers: {
						Authorization: config.apiKeys.dbl
					}
				});
				const result = await res.json();
				if(result.error && result.error === "Unauthorized"){
					error("should be a valid DBL key", "get your key here: https://top.gg/ OR delete the key from the config if you don't have a key");
				} else {
					success("should be a valid DBL key");
				}
			}
			if(!config.apiKeys.fortniteFNBR){
				ignore("fortniteFNBR API is not configured, key should not be checked.");
			} else {
				const res = await fetch("https://fnbr.co/api/stats", {
					headers: {
						"x-api-key": config.apiKeys.fortniteFNBR
					}
				});
				const result = await res.json();
				if(result.status && result.status === 401){
					error("should be a valid FNBR key", "get your key here: https://fnbr.co/api/docs");
				} else {
					success("should be a valid FNBR key");
				}
			}
			if(!config.apiKeys.sentryDSN){
				ignore("SentryDSN is not configured, key should not be checked.");
			} else {
				const Sentry = require("@sentry/node");
				try {
					Sentry.init({ dsn: config.apiKeys.sentryDSN });
					await delay(1000);
					success("should be a valid Sentry DSN key");
				} catch (e) {
					error("should be a valid Sentry DSN key", "Sentry is not recommended, delete the key from the config");
				}
			}
			resolve();
		});
	},
	() => {
		console.log("\n\nDashboard");
		return new Promise(async (resolve) => {
			if(!config.dashboard.enabled){
				ignore("Dashboard is not enabled, config shouldn't be checked.");
			} else {
				const checkPortTaken = (port) => {
					return new Promise((resolve) => {
						const net = require("net");
						const tester = net.createServer()
							.once("error", () => {
								resolve(true);
							})
							.once("listening", function() {
								tester
									.once("close", function() {
										resolve(false);
									})
									.close();
							})
							.listen(port);
					});
				};
				const isPortTaken = await checkPortTaken(config.dashboard.port);
				if(isPortTaken){
					error("dashboard port should be available", "you have probably another process using this port");
				} else {
					success("dashboard port should be available");
				}
			}
			resolve();
		});
	}
];

(async () => {
	console.log(chalk.yellow("This script will check if your config is errored, and some other important things such as whether your database is started, etc..."));
	for(const check of checks){
		await check();
	}
	console.log(chalk.yellow("\n\nThank you for using Atlanta. If you need more help, join our support server here: https://discord.atlanta-bot.fr"));
	process.exit(0);
})();
