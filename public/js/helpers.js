export const body = $('body').first();
export const darkModeBtn = $('#btn-dark-mode').first();

export const setLightMode = () => {
	const lables = $('.form-check-label');
	document.documentElement.setAttribute('theme', 'light');
	sessionStorage.setItem('theme', 'light');
	lables.removeClass('text-light').addClass('text-dark');
	darkModeBtn.children().remove();
	darkModeBtn.append('<i class="bi bi-moon"></i>');
};

export const setDarkMode = () => {
	const lables = $('.form-check-label');
	document.documentElement.setAttribute('theme', 'dark');
	sessionStorage.setItem('theme', 'dark');
	lables.removeClass('text-dark').addClass('text-light');
	darkModeBtn.children().remove();
	darkModeBtn.append('<i class="bi bi-brightness-high"></i>');
};

const signInOptions = [
	{
		provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
		requireDisplayName: false,
	},
	firebase.auth.GoogleAuthProvider.PROVIDER_ID,
	firebase.auth.FacebookAuthProvider.PROVIDER_ID,
	'apple.com',
	'microsoft.com',
	firebase.auth.TwitterAuthProvider.PROVIDER_ID,
	firebase.auth.GithubAuthProvider.PROVIDER_ID,
	{
		provider: firebase.auth.PhoneAuthProvider.PROVIDER_ID,
		recaptchaParameters: {
			type: 'image',
			size: 'normal',
			badge: 'bottomright',
		},
		defaultCountry: 'IL',
		defaultNationalNumber: '1234567890',
		loginHint: '+11234567890',
	},
];

const postIdTokenToSessionLogin = (url, idToken, displayName, email, phoneNumber, photoURL) => {
	return fetch(url, {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
			'CSRF-Token': Cookies.get('XSRF-TOKEN'),
		},
		body: JSON.stringify({ idToken, displayName, email, phoneNumber, photoURL }),
	});
};

const signInSuccess = (user, credential, redirectUrl) => {
	user.getIdToken().then((idToken) => {
		const isAdmin = window.location.pathname.includes('admin');
		const url = isAdmin ? '/admin/login' : '/login';
		return postIdTokenToSessionLogin(url, idToken, user.displayName, user.email, user.phoneNumber, user.photoURL).then(
			(response) => {
				if (response.status === 200) {
					let name = user.email || user.phoneNumber;
					if (user.displayName) {
						name = user.displayName.replaceAll(' ', '');
					}
					const redirect = isAdmin ? '/admin' : '';
					window.location.assign(`${redirect}/profile?username=${name || user.email || user.phoneNumber}`);
				} else {
					window.location.assign('/error');
				}
			},
			(error) => {
				window.location.assign('/error');
			}
		);
	});

	return false;
};

export const uiConfig = {
	callbacks: {
		signInSuccessWithAuthResult: (authResult, redirectUrl) =>
			signInSuccess(authResult.user, authResult.credential, redirectUrl),
		signInSuccess,
		uiShown: () => {},
	},

	signInFlow: 'popup',
	signInSuccessUrl: '/profile',
	signInOptions,

	tosUrl: 'https://www.google.com',

	privacyPolicyUrl: 'https://www.google.com',
};
