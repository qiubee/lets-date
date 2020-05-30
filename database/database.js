const MongoClient = require("mongodb").MongoClient;

async function connect (callback) {
	const uri = "mongodb+srv://" + process.env.DB_USER + ":" + process.env.DB_PASSWORD + "@" + process.env.DB_HOST + "/" + process.env.DB_NAME;
	const client = new MongoClient(uri, {
		useNewUrlParser: true,
		useUnifiedTopology: true
	});
	console.log("\u001b[1m\u001b[37m-- \u001b[32mConnecting to " + process.env.DB_HOST + " \u001b[37m--\u001b[0m");
	try {
		await client.connect();
		console.log("\u001b[1m\u001b[37m-- \u001b[32mConnected \u001b[37m--\u001b[0m");
		console.log("\u001b[37mAccess granted to " + process.env.DB_HOST + "\u001b[0m");
		const db = client.db(process.env.DB_NAME);
		console.log("\u001b[37mYou have access to database: " + process.env.DB_NAME + "\u001b[0m");
		console.log("\u001b[37mPerforming action...\u001b[0m");
		await callback(db);
		console.log("\u001b[32mAction completed\u001b[0m");
	} catch (err) {
		console.log(err);
	} finally {
		console.log("\u001b[37mEnding connection...\u001b[0m");
		await client.close();
		console.log("\u001b[1m\u001b[37m-- \u001b[31mDisconnected \u001b[37m--\u001b[0m");
	}
}

function add (collectionName, data) {
	connect(async function(db) {
		console.log("[--Adding object to database--]");
		await db.collection(collectionName).insertOne(data);
	});
}

function remove (collectionName, query) {
	connect(async function(db) {
		console.log("[--Removing object from database--]");
		await db.collection(collectionName).deleteOne(query);
	});
}

exports.connect = connect;
exports.add = add;
exports.remove = remove;