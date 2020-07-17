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

	const count = await guilds.countDocuments({ $or: [ { language: "english" }, { language: "french" } ] });
	console.log(chalk.yellow(`${count} guilds need to be migrated. Migrating...`));

	await guilds.updateMany({ language: "english" }, { $set: { language: "en-US"} });
	await guilds.updateMany({ language: "french" }, { $set: { language: "fr-FR"} });
    
	console.log(chalk.green(`${count} guilds migrated.`));
	console.log(chalk.blue("\n\nDatabase migrated from v4.6.4 to v4.7.0..."));
	process.exit(0);
}).catch(() => {
	console.log(chalk.red("Couldn't connect to mongoDB database..."));
	process.exit(1);
});