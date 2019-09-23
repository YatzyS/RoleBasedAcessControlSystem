var MongoClient = require('mongodb').MongoClient;
class Connections {
	static getMongoDBDatabaseClient(url) {
		console.log(url);
		const client = new MongoClient(url, { useNewUrlParser: true },{ useUnifiedTopology: true });
		return client;
	}
}

module.exports = Connections
