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
        return postIdTokenToSessionLogin(
          '/login',
          idToken,
          user.displayName,
          user.email,
          user.phoneNumber,
          user.photoURL
        ).then(
          () => {
            window.location.assign('/profile');
          },
          (error) => {
            window.location.assign('/');
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

export const firebaseInit = () =>
  window.addEventListener('DOMContentLoaded', async () => {
    const firebaseConfig = await getFirebaseConfig();

    firebase.initializeApp(firebaseConfig);

    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.NONE);

    uiConfig.callbacks.uiShown = () => {
      document.getElementById('loader').style.display = 'none';
    };

    const ui = new firebaseui.auth.AuthUI(firebase.auth());
    ui.disableAutoSignIn();
    const widget = document.getElementById('firebaseui-auth-container');
    if (widget) {
      ui.start(widget, uiConfig);
    }
  });
