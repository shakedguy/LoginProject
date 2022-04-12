/* eslint-disable */

const getFirebaseConfig = async () => {
  const responseJson = await fetch('/api/firebase');
  const response = JSON.parse(await responseJson.text());
  return response.data.firebaseConfig;
};

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

const uiConfig = {
  callbacks: {
    signInSuccess: (user, credential, redirectUrl) => {
      user.getIdToken().then((idToken) => {
        const isAdmin = window.location.pathname.includes('admin');
        const url = isAdmin ? '/admin/login' : '/login';
        return postIdTokenToSessionLogin(
          url,
          idToken,
          user.displayName,
          user.email,
          user.phoneNumber,
          user.photoURL
        ).then(
          (response) => {
            if (response.status === 200) {
              const name = user.displayName.replaceAll(' ', '');
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
    },
    uiShown: () => {},
  },

  signInFlow: 'popup',
  signInSuccessUrl: '/profile',
  signInOptions: [
    {
      provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
      requireDisplayName: false,
    },
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.FacebookAuthProvider.PROVIDER_ID,
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
  ],

  tosUrl: 'https://www.google.com',

  privacyPolicyUrl: 'https://www.google.com',
};

export const firebaseInit = async () => {
  const firebaseConfig = await getFirebaseConfig();

  firebase.initializeApp(firebaseConfig);

  firebase.auth().setPersistence(firebase.auth.Auth.Persistence.NONE);

  uiConfig.callbacks.uiShown = () => {
    $('#loader').css('display', 'none');
  };

  const ui = new firebaseui.auth.AuthUI(firebase.auth());
  ui.disableAutoSignIn();
  const widget = $('#firebaseui-auth-container');
  if (widget.length > 0) {
    ui.start(widget[0], uiConfig);
  }
};
