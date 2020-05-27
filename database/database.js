const MongoClient = require("mongodb").MongoClient;

async function connectSRV (callback) {
	const uri = "mongodb+srv://" + process.env.DB_USER + ":" + process.env.DB_PASSWORD + "@" + process.env.DB_HOSTNAME + "/test?retryWrites=true&w=majority";
	const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
	console.log("\u001b[1m\u001b[37m-- \u001b[32mConnecting to " + process.env.DB_HOSTNAME + " \u001b[37m--\u001b[0m");
	try {
		await client.connect();
		console.log("\u001b[1m\u001b[37m-- \u001b[32mConnected \u001b[37m--\u001b[0m");
		console.log("\u001b[37mAccess granted to " + process.env.DB_HOSTNAME + "\u001b[0m");
		const db = client.db(process.env.DB_NAME);
		console.log("\u001b[37mYou have access to: " + process.env.DB_NAME + " database\u001b[0m");
		console.log("\u001b[37mPerforming action...\u001b[0m");
		await callback(db);
		console.log("\u001b[32mAction completed\u001b[37m\nEnding connection...\u001b[0m");
	} catch (err) {
		console.log(err);
	} finally {
		await client.close();
		console.log("\u001b[1m\u001b[37m-- \u001b[31mDisconnected \u001b[37m--\u001b[0m");
	}
}

async function connect (callback) {
	const uri = "mongodb://"+ process.env.DB_NAME + ":" + process.env.DB_PASSWORD + "@" + process.env.DB_HOSTNAME + ":27017/?authSource=admin";
	const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
	console.log("\u001b[1m\u001b[37m-- \u001b[32mConnecting to \u001b[37m" + process.env.DB_HOSTNAME + " \u001b[37m--\u001b[0m");
	try {
		client.connect(function() {
			console.log("\u001b[1m\u001b[37m-- \u001b[32mConnected \u001b[37m--\u001b[0m");
			console.log("\u001b[37mAccess granted to " + process.env.DB_HOSTNAME + "\u001b[0m");
			const db = client.db(process.env.DB_NAME);
			console.log("\u001b[37mYou have access to: " + process.env.DB_NAME + " database\u001b[0m");
			console.log("\u001b[37mPerforming action...\u001b[0m");
			callback(db);
			console.log("\u001b[32mAction completed\u001b[37m\nEnding connection...\u001b[0m");
		});
	} catch (err) {
		console.log(err);
	} finally {
		await client.close();
		console.log("\u001b[1m\u001b[37m-- \u001b[31mDisconnected \u001b[37m--\u001b[0m");
	}
}

function add (collectionName, data) {
	connect(function(db) {
		db.collection(collectionName).insertOne(data);
	});
}

function remove (collectionName, query) {
	connect(function(db) {
		db.collection(collectionName).deleteOne(query);
	});
}

exports.connectSRV = connectSRV;
exports.connect = connect;
exports.add = add;
exports.remove = remove;