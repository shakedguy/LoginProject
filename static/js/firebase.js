/* eslint-disable */
import { uiConfig } from './helpers.js';

const getFirebaseConfig = async () => {
	const response = await axios.get('/api/firebase');
	return response.data;
};

export const firebaseInit = async () => {
	const firebaseConfig = await getFirebaseConfig();

	firebase.initializeApp(firebaseConfig);

	// analytics = firebase.analytics();

	firebase.auth().setPersistence(firebase.auth.Auth.Persistence.NONE);

	uiConfig.callbacks.uiShown = () => {
		$('#loader').css('display', 'none');
	};

	const ui = new firebaseui.auth.AuthUI(firebase.auth());
	ui.disableAutoSignIn();
	const widget = $('#firebaseui-auth-container').first();
	if (widget.length > 0) {
		ui.start(widget[0], uiConfig);
	}
};
