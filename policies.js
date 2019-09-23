const db = require('./database');
const crypto = require('./crypto');
const dotenv = require('dotenv');
dotenv.config();
class policies {
	static getEncryptedUserRights(username, callback) {
		
		db.getUserRightsFor(username, (permissions) => {
			callback(crypto.encrypt(permissions, process.env.PERMISSIONS_SECRET_KEY));
		});
	}

	static getResourceAccessToken(username, permissions, resource, callback) {
		const givenPermissions = crypto.decrypt(permissions, process.env.PERMISSIONS_SECRET_KEY);
		db.checkUserFor(givenPermissions, username, resource, (result) => {
			if(result != true)
				callback(null);
			var resourceAccessToken= {
				permissionAccessToken: crypto.encrypt(permissions, resource)
			};
			callback(resourceAccessToken);
		});
	}

	static checkPermissionOnResource(username, permissionAccessToken, resource, callback) {
		console.log(permissionAccessToken);
		const givenPermissions = crypto.decrypt(permissionAccessToken, resource);
		db.checkUserFor(givenPermissions, username, resource, (result) => {
			if(result == true)
				callback(resource);
			else
				callback(process.env.HOMEPAGE);	
		});
	}
}

module.exports = policies;

