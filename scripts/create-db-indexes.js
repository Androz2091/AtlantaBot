const chalk = require("chalk");
console.log(chalk.blue("Migrating database from v4.6.4 to v4.7.0...\n\n"));

let MongoClient;
try {
	MongoClient = require("mongodb").MongoClient;
} catch (e) {
	console.log(chalk.red("Cannot find module mongodb. Please install it using \"npm install mongodb\" before executing migration scripts."));
	process.exit(1);
}

const config = require("../config.js");
const dbName = config.mongoDB.split("/").pop();
const baseURL = config.mongoDB.substr(0, config.mongoDB.length - dbName.length);
const client = new MongoClient(baseURL, {
	useUnifiedTopology: true
});
client.connect().then(async () => {
	console.log(chalk.green("Connected successfully to mongoDB database."));
   
	const db = client.db(dbName);
	const guilds = db.collection("guilds");
	const members = db.collection("members");
	const users = db.collection("users");
    
	console.log(chalk.yellow("Creating guilds index..."));
	await guilds.createIndex({ id: 1 });
	console.log(chalk.green("Guilds index created."));
    
	console.log(chalk.yellow("Creating members index..."));
	await members.createIndex({ guildID: 1, id: -1 });
	console.log(chalk.green("Members index created."));
    
	console.log(chalk.yellow("Creating users index..."));
	await users.createIndex({ id: 1 });
	console.log(chalk.green("Users index created."));
    
	console.log(chalk.blue("\n\nIndexes created."));

	process.exit(0);
}).catch(() => {
	console.log(chalk.red("Couldn't connect to mongoDB database..."));
	process.exit(1);
});