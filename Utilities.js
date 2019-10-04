class Utilities {
	
	static getMongoDBURL() {
		return process.enb.MONGODB_URI;
	}
	
	static getDBName() {
		return process.env.DATABASE_NAME;
	}

	static getUserInfoCollection() {
		return process.env.USER_INFO_COLLECTION;
	}
	
	static getResourceInfoCollection() {
		return process.env.RESOURCE_INFO_COLLECTION;
	}

	static getRoleInfoCollection() {
		return process.env.ROLE_INFO_COLLECTION;
	}

	static getRolePriorityCollection() {
		return process.env.ROLE_PRIORITY_COLLECTION;
	}
}

module.exports = Utilities
