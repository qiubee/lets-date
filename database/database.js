const MongoClient = require("mongodb").MongoClient;

async function connectDB (callback) {
	const uri = "mongodb+srv://" + process.env.DB_USER + ":" + process.env.DB_PASSWORD + "@" + process.env.DB_HOSTNAME + "/test?retryWrites=true&w=majority";
	const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
	try {
		console.log("\u001b[1m\u001b[37m-- \u001b[32mConnecting to " + process.env.DB_HOSTNAME + " \u001b[37m--\u001b[0m");
		await client.connect();
		console.log("\u001b[1m\u001b[37m-- \u001b[32mConnected to database \u001b[37m--\u001b[0m");
		console.log("\u001b[37mAccess granted to " + process.env.DB_HOSTNAME + "\u001b[0m");
		const db = client.db(process.env.DB_NAME);
		console.log("\u001b[37mAccessing " + process.env.DB_NAME + " database\u001b[0m");
		await callback(db);
	} catch (err) {
		console.log(err);
	} finally {
		await client.close();
	}
}

exports.test = async function test (callback) {
	// const client = createClient();
	// console.log(client);
	// const db = await connect(client);
	// await close(client);
	
	const uri = "mongodb://"+ process.env.DB_NAME + ":" + process.env.DB_PASSWORD + "@" + process.env.DB_HOSTNAME + ":27017/?authSource=admin";
	const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
	try {
		client.connect(function (err) {
			console.log("connected");
			const db = client.db(process.env.DB_NAME);
			console.log(db);
		});
	} catch (err) {
		console.log(err);
	} finally {
		client.close();
	}
};

function createClient () {
	const uri = "mongodb+srv://" + process.env.DB_USER + ":" + process.env.DB_PASSWORD + "@" + process.env.DB_HOSTNAME + "/test?retryWrites=true&w=majority";
	return new MongoClient(uri, { useNewUrlParser: true });
}

async function close (client) {
	await client.close();
}

async function connect (client) {
	try {
		await client.connect();
		console.log("connected");
		return client.db(process.env.DB_NAME);
	} catch (err) {
		console.error(err);
	}
}

async function add (collectionName, data) {
	const client = createClient();
	const db = await connect(client);
	try {
		await db.collection(collectionName).insertOne(data);
	} catch (err) {
		console.error(err);
	} finally {
		await close(client);
	}
}

async function remove (collectionName, query) {
	const client = createClient();
	const db = await connect(client);
	try {
		await db.collection(collectionName).deleteOne(query);
	} catch (err) {
		console.error(err);
	} finally {
		await close(client);
	}
}

async function find (collectionName, query) {
	const client = createClient();
	const db = await connect(client);
	try {
		await db.collection(collectionName).deleteOne(query);
	} catch (err) {
		console.error(err);
	} finally {
		await close(client);
	}
}

exports.connect = connectDB;