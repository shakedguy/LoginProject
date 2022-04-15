import { onScheduledSwitchChangeHandler, onInputDateHandler, scheduleSwitch, datePicker } from './schedule.js';
import { submitHandler } from './sender.js';
import { firebaseInit } from './firebase.js';
import initMenu, { canvas, arrow, menuBtn } from './menu.js';
import { getHtmlMessagesList } from './mailingList.js';
import { onMessageSwitchChangeHandler, onInputHandler } from './message.js';
import { dataTableInit } from './users.js';
import { body, darkModeBtn, setDarkMode, setLightMode } from './helpers.js';
import { tooltipsInit } from './tooltips.js';

const toggleDarkMode = () => {
	const darkMode = sessionStorage.getItem('theme') === 'dark';
	darkMode ? setLightMode() : setDarkMode();
};

const initTheme = () => {
	const sessionScheme = sessionStorage.getItem('theme');
	if (sessionScheme) {
		sessionScheme === 'dark' ? setDarkMode() : setLightMode();
	} else {
		const darkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
		darkMode ? setDarkMode() : setLightMode();
	}
};

window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (event) => {
	const sessionScheme = sessionStorage.getItem('theme');
	const systemScheme = event.matches ? 'dark' : 'light';
	sessionScheme !== systemScheme && toggleDarkMode();
});

const isAdmin = window.location.pathname.includes('admin');

if (isAdmin) {
	$('#nav-btn-home').attr('href', '/admin');
	$('#login-button').attr('href', '/admin/login');
}

// if (sessionStorage.getItem('color-scheme') === 'dark') {
//   setDarkMode();
// }
const mainSpinner = $('#main-spinner').first();

$(window).on('load', () => {
	if (mainSpinner.length > 0) {
		mainSpinner.css('visibility', 'hidden');
	}
});

$(window).ready(async () => {
	await initMenu();
	await firebaseInit();
	initTheme();
	tooltipsInit();
	const location = window.location.pathname;

	if (location.includes('messages')) {
		$('#message-form')
			.ready(async () => {
				mainSpinner.css('visibility', 'hidden');
				const contactList = await getHtmlMessagesList();
				$('#mailing-list-spinner').first().css('visibility', 'hidden');
				$('#contacts-list').first().append(contactList);
			})
			.submit(submitHandler);
		datePicker.on('input', onInputDateHandler);
		scheduleSwitch.on('change', onScheduledSwitchChangeHandler);
		$('#message-switch').change(onMessageSwitchChangeHandler);
		$('#message-input').on('input', onInputHandler);
	} else if (location.includes('users')) {
		dataTableInit();
	} else if (location.includes('profile')) {
		const alreadyLoggedToast = $('#already-logged-toast');
		if (alreadyLoggedToast.length > 0) {
			new bootstrap.Toast(alreadyLoggedToast).show();
		}
	}
});
darkModeBtn.click(() => {
	document.documentElement.classList.add('transition');
	setTimeout(() => {
		document.documentElement.classList.remove('transition');
	}, 1000);
	toggleDarkMode();
});
// logout toast

$('#btn-logout-toast').click(() => new bootstrap.Toast($('#logout-toast')).show());

// logout button
$('#btn-logout').click(() => window.location.replace('/logout'));

if (canvas.length > 0) {
	canvas.on('show.bs.offcanvas', () => {
		if (arrow.length > 0) {
			arrow.addClass('arrow-forward');
		}
	});
	canvas.on('hide.bs.offcanvas', () => {
		if (arrow.length > 0) {
			setTimeout(() => {
				arrow.removeClass('arrow-forward');
			}, 500);
		}
	});
}
