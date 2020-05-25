const mongodb = require("mongodb");

// database
const MongoClient = mongodb.MongoClient;

async function connectDB () {
	const uri = "mongo+srv://" + process.env.DB_USER + ":" + process.env.DB_PASSWORD + "@" + process.env.DB_HOSTNAME + "/test?retryWrites=true&w=majority";
	const client = new MongoClient(uri);
	try {
		await client.connect();
		return client.db("liev");
	} catch (err) {
		console.error(err);
	} 
	// finally {
	// 	await client.close();
	// }
}

// connectDB();

module.exports = connectDB;