import React from 'react';

import firebaseui from 'firebaseui';
import 'firebaseui/dist/firebaseui.css';
import { firebase } from '../firebase/init.js';

const uiConfig = {
	// signInSuccessUrl: 'http://localhost:3000',
	signInOptions: [
		// Leave the lines as is for the providers you want to offer your users.
		firebase.auth.GoogleAuthProvider.PROVIDER_ID,
		firebase.auth.FacebookAuthProvider.PROVIDER_ID,
		firebase.auth.EmailAuthProvider.PROVIDER_ID,
		// firebase.auth.TwitterAuthProvider.PROVIDER_ID,
		// firebase.auth.GithubAuthProvider.PROVIDER_ID,
		// firebase.auth.EmailAuthProvider.PROVIDER_ID,
		// firebase.auth.PhoneAuthProvider.PROVIDER_ID
	],
	// Terms of service url.
	// tosUrl: '<your-tos-url>'
};

export default class Login extends React.Component {
	// constructor(props) {
	// 	super(props);
	// }

	componentWillMount() {
		const ui = new firebaseui.auth.AuthUI(firebase.auth());
		ui.start('#firebaseui-auth-container', uiConfig);
	}

	render() {
		return (
			<div>
				Please log in to access Our Big Kitchen!
				<div id="firebaseui-auth-container" />
			</div>
		);
	}
}
