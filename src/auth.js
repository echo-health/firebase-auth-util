const admin = require('firebase-admin');

function getAuth(credentials) {
	const options = { credential: admin.credential.cert(credentials)};
	const app = admin.initializeApp(options, 'firebase-auth-util');
	return admin.auth(app);
}

/**
 * @param {String} credentials Firebase credentials.
 * @param {String} email The user's primary email. Must be a valid email address.
 * @param {String} uid The uid to assign to the newly created user. Must be a string between 1 and 128 characters long, inclusive. If not provided, a random uid will be automatically generated.
 * @param {Boolean} emailVerified Whether or not the user's primary email is verified. If not provided, the default is false.
 * @param {String} password The user's raw, unhashed password. Must be at least six characters long.
 * @param {String} displayName The users' display name.
 * @param {String}photoURL The user's photo URL.
 * @param {Boolean} disabled Whether or not the user is disabled. true for disabled; false for enabled. If not provided, the default is false.
 */
function add(credentials, options = {uid, email, emailVerified, password, displayName, photoURL, disabled}) {
	if (!options.email) {
		return Promise.reject('missing mandatory email key');
	}

	return getAuth(credentials).createUser(options);
}

/**
 * @param {String} credentials Firebase credentials.
 * @param {String} uid The uid of the user to update.
 * @param {String} email The user's primary email. Must be a valid email address.
 * @param {Boolean} emailVerified Whether or not the user's primary email is verified. If not provided, the default is false.
 * @param {String} password The user's raw, unhashed password. Must be at least six characters long.
 * @param {String} displayName The users' display name.
 * @param {String} photoURL The user's photo URL.
 * @param {Boolean} disabled Whether or not the user is disabled. true for disabled; false for enabled. If not provided, the default is false.
 */
function update(credentials, options = {uid, email, emailVerified, password, displayName, photoURL, disabled }) {
	const uid = options.uid;
	if (!options.uid) {
		return Promise.reject('missing mandatory uid key');
	}
	delete options.uid;
	return getAuth(credentials).updateUser(uid, options);
}

/**
 * @param {String} credentials Firebase credentials.
 * @param {String} uid The uid of the user to remove.
 */
function remove(credentials, { uid }) {
	if (!!uid) {
		return Promise.reject('missing mandatory uid key');
	}
	return getAuth(credentials).deleteUser(uid);
}

/**
 * @param {String} credentials Firebase credentials.
 * @param {String} uid The uid of the user to remove.
 * @param {String} email The user's primary email. 
 */
function get(credentials, { uid, email }) {
	if (!!uid) {
		return getAuth(credentials).getUser(uid);
	} else if (!!email) {
		return getAuth(credentials).getUserByEmail(email);
	} else {
		return Promise.reject('missing mandatory uid or email key');
	}
}

module.exports = { add, update, remove, get };