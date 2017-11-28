const functions = require('firebase-functions');
const firebase = require("firebase-admin");

firebase.initializeApp(functions.config().firebase);

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

exports.addUserToDatabase = functions.auth.user().onCreate(event => {
	const user = event.data;
	const userData = firebase.database().ref(`/users/${user.uid}/profile`);

	return userData
		.set(user)
		.catch(e => {
			console.error(e);
			throw e;
		});
});

// exports.deleteUserFromDatabase = functions.auth.user().onDelete(event => {
// 	const user = event.data;

// 	return firebase.database().ref(`/users/${user.uid}`).remove().catch(e => {
// 		console.error(e);
// 		throw e;
// 	});
// });
