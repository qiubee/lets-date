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
		console.log("\u001b[37mAccess granted\u001b[0m");
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

function add (collectionName, data, multiple = false) {
	connect(async function(db) {
		if (multiple === false) {
			console.log("[--Adding object to database--]");
			await db.collection(collectionName).insertOne(data);
		} else if (multiple === true && data instanceof Array === true) {
			console.log("[--Adding multiple objects to database--]");
			await db.collection(collectionName).insertMany(data);
		}
	});
}

function remove (collectionName, query, multiple = false) {
	connect(async function(db) {
		if (multiple === false) {
			console.log("[--Removing object from database--]");
			await db.collection(collectionName).deleteOne(query);
		} else if (multiple === true) {
			if (Object.keys(query).length === 0 && query.constructor === Object) { // check for empty object: https://stackoverflow.com/questions/679915/how-do-i-test-for-an-empty-javascript-object
				throw new Error("Deleting all documents is not allowed");
			} else {
				console.log("[--Removing multiple objects from database--]");
				await db.collection(collectionName).deleteMany(query);
			}
		}
	});
}

function update (collectionName, filterQuery, updateQuery,  multiple = false) {
	connect(async function(db) {
		if (multiple === false) {
			console.log("[--Updating object in database--]");
			await db.collection(collectionName).updateOne(filterQuery, updateQuery);
		} else if (multiple === true) {
			console.log("[--Updating multiple objects in database--]");
			await db.collection(collectionName).updateMany(filterQuery, updateQuery);
		}
	});
}

exports.connect = connect;
exports.add = add;
exports.update = update;
exports.remove = remove;