const Utilities = require('./Utilities');
const Connections = require('./Connections');


class DB {
	static checkUser(username, password, callback) {

	//connect to db and check if user is present or not
		var client = Connections.getMongoDBDatabaseClient(Utilities.getMongoDBURL());
		var dbName = Utilities.getDBName();
		client.connect(function(err, client) {
			if(err) {
				console.log(err);
			}
			const db = client.db(dbName);
			var query = {username: username, password: password};
			console.log(query);
			db.collection(Utilities.getUserInfoCollection()).find(query, { projection: {_id:1}}).toArray(function(err, result) {
				client.close();		
				if(err) callback(false);
				callback(true);
			})
		});
	}

	static checkUserFor(givenPermissions, username, resource, callback) {

	//check in the database wether user has stated permissions to the given resource or not return true or false
		var client = Connections.getMongoDBDatabaseClient(Utilities.getMongoDBURL());
		var dbName = Utilities.getDBName();
		client.connect(function(err, client) {
			if(err) {
				console.log(err);
			}
			const db = client.db(dbName);
			var query = {username: username};
			console.log(query);
			db.collection(Utilities.getUserInfoCollection()).find(query, {projection: {_id:0, role:1}}).toArray(function(err,result) {
				if(err) callback(false);
				var roleOfUser = result[0].role;
				db.collection(Utilities.getResourceInfoCollection()).find({name: resource}, {projection: {_id:0, role_with_access:1}}).toArray(function(err, result) {
					if(err) throw err;
					db.collection(Utilities.getRolePriorityCollection()).find({name: result[0].role_with_access}, {projection: {_id:0, priority:1}}).toArray(function(err,result) {
						if(err) callback(false);
						var priorityOfRoleWithAcess = result[0].priority;
						db.collection(Utilities.getRolePriorityCollection()).find({name: roleOfUser}, {projection: {_id:0, priority:1}}).toArray(function(err,result) {
							if(err) callback(false);
							if(priorityOfRoleWithAcess<=result[0].priority)
								callback(true)
						})
					})
				})
			});
		});
	}

	static getUserRightsFor(username, callback) {

	//get the permission a user has on the overall system
		var client = Connections.getMongoDBDatabaseClient(Utilities.getMongoDBURL());
		var dbName = Utilities.getDBName();
		client.connect(function(err, client) {
			if(err) {
				console.log(err);
			}
			const db = client.db(dbName);
			var query = {username: username};
			console.log(query);
			db.collection(Utilities.getUserInfoCollection()).find(query, { projection: {_id:0, role:1}}).limit(1).toArray(function(err, result) {
				if(err) console.log(err);
					callback(result[0].role);
			})
			client.close();
		});

	}


	static addJSONToDB(JSONObjectString, collectionName) {
		var client = Connections.getMongoDBDatabaseClient(Utilities.getMongoDBURL());
		var dbName = Utilities.getDBName();
		client.connect(function(err, client) {
			if(err) {
				console.log(err);	
			}
			const db = client.db(dbName);
			db.collection(collectionName).insertOne(JSONObjectString, function(err, result) {
				if(err) {
					console.log('Error');
				}
				else {
					console.log('Success');
				}
			});
			client.close();
		});
	}
}

module.exports = DB

