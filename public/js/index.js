import { onScheduledSwitchChangeHandler, onInputDateHandler, scheduleSwitch, datePicker } from './schedule.js';
import { submitHandler } from './sender.js';
import { firebaseInit } from './firebase.js';
import initMenu, { canvas, arrow, menuBtn } from './menu.js';
import { getHtmlMessagesList } from './mailingList.js';
import { onMessageSwitchChangeHandler, onInputHandler } from './message.js';
import { dataTableInit } from './users.js';

const isAdmin = window.location.pathname.includes('admin');

if (isAdmin) {
  $('#nav-btn-home').attr('href', '/admin');
}

const getCookieValue = (name) => document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)')?.pop() || '';

const mainSpinner = $('#main-spinner').first();

$(window).on('load', () => {
  if (mainSpinner.length > 0) {
    mainSpinner.css('visibility', 'hidden');
  }
});

initMenu();
firebaseInit();
dataTableInit();

datePicker.on('input', onInputDateHandler);
const loginButton = $('#login-button').first();
if (loginButton) {
  const href = isAdmin ? '/admin/login' : '/login';
  loginButton.attr('href', href);
}

scheduleSwitch.on('change', onScheduledSwitchChangeHandler);

$('#message-form')
  .ready(async () => {
    mainSpinner.css('visibility', 'hidden');
    const contactList = await getHtmlMessagesList();
    $('#mailing-list-spinner').first().css('visibility', 'hidden');
    $('#contacts-list').first().append(contactList);
  })
  .submit(submitHandler);

// logout toast
$('#liveToastBtn').click(() => new bootstrap.Toast($('#liveToast')).show());
// logout button
$('#logout').click(() => window.location.replace('/logout'));

$('#message-switch').change(onMessageSwitchChangeHandler);
$('#message-input').on('input', onInputHandler);

const alreadyLoggedToast = $('#already-logged-toast');
if (alreadyLoggedToast.length > 0) {
  new bootstrap.Toast(alreadyLoggedToast).show();
}

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
