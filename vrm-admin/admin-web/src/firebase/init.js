var Rebase = require('re-base');
var firebase = require('firebase');
var app = false //process.env.NODE_ENV === 'development'
	? firebase.initializeApp({
			apiKey: 'AIzaSyCZBVjOVYUF8YGLdsr7Tp7JEXYGZwiCqbo',
			authDomain: 'obk-dev.firebaseapp.com',
			databaseURL: 'https://obk-dev.firebaseio.com',
			projectId: 'obk-dev',
			storageBucket: 'obk-dev.appspot.com',
			messagingSenderId: '559615516117',
		})
	: firebase.initializeApp({
			apiKey: 'AIzaSyC97oIiToe-R803x6NtTzTql4fU4t9QNgs',
			authDomain: 'voluncheering-c3ae7.firebaseapp.com',
			databaseURL: 'https://voluncheering-c3ae7.firebaseio.com',
			projectId: 'voluncheering-c3ae7',
			storageBucket: 'voluncheering-c3ae7.appspot.com',
			messagingSenderId: '150221963070',
		});
var db = firebase.database(app);
var base = Rebase.createClass(db);

export { firebase, base };
