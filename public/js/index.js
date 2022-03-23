import { onScheduledSwitchChangeHandler, onInputDateHandler, scheduleSwitch, datePicker } from './schedule.js';
import { submitHandler } from './sender.js';
import { firebaseInit } from './firebase.js';
import initMenu, { canvas, arrow } from './menu.js';
import { getHtmlMessagesList } from './mailingList.js';
import { onMessageSwitchChangeHandler, onInputHandler } from './message.js';

initMenu();
firebaseInit();

datePicker.on('input', onInputDateHandler);

scheduleSwitch.on('change', onScheduledSwitchChangeHandler);

$('#message-form')
  .ready(async () => {
    const contactList = await getHtmlMessagesList();
    $('#contacts-list').append(contactList);
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
