const db = require('./database.js');
const policies = require('./policies.js');
const sha256 = require('sha256');

const getAccessToken = (request, response) => {
	const { username, password } = request.body;
	const hashPassword = sha256(password);
	db.checkUser(username, password, (result) => {
		if(result==0) response.status(404).send('User Not found');
		policies.getEncryptedUserRights(username, (cipherOfPermissions) => {
			createJWTfor(username,hashPassword,cipherOfPermissions, (result)=>{
				response.status(200).send(result);
			});
		});
	});
};

function createJWTfor(username, hashPassword, cipherOfPermissions, callback) {
	var token = {
		id: sha256(username+process.env.SECRET_KEY),
		permissions: cipherOfPermissions	
	}
	callback(token);
}

const checkAccessToken = (request, response) => {
	const { username, id, permissions, resource } = request.body;
	const generatedId = sha256(username+process.env.SECRET_KEY);
	if(generatedId != id) {
		response.status(403).send('Permission Denied');	
	}
	console.log(permissions);
	policies.getResourceAccessToken(username, permissions, resource, (result) => {
		response.status(200).send(result);
	});
}

const checkResourceAccessToken = (request,response) => {
	const { username, permissionAccessToken, resource } = request.body;
	policies.checkPermissionOnResource(username, permissionAccessToken, resource, (result) => {
		response.redirect(result);	
	});
}

module.exports = {
	checkAccessToken,
	checkResourceAccessToken,
	getAccessToken
};
