import { dateTimeValidation, toSendNow } from './schedule.js';
import { contacts } from './mailingList.js';
const liveToast = $('#notification');
const toastText = $('#toast-text');
const scheduleSwitch = $('#schedule-switch');
const messageText = $('#message-input');

const checkCheckboxes = () => {
  const checkboxes = $('.mailing-list-checkbox').toArray();
  checkboxes.forEach((checkbox) => {
    if (checkbox.checked) return true;
  });
  return checkboxes;
};

const formValidation = () => {
  if (!checkCheckboxes()) {
    if (liveToast.length > 0) {
      liveToast.removeClass('bg-primary bg-seccess').addClass('bg-danger');
      const toast = new bootstrap.Toast(liveToast);
      toastText.empty().append('You must select at least one contact ‼️😬');
      toast.show();
    }
    return false;
  }
  if (!$('#message-switch').is(':checked') && !messageText.text()) {
    if (liveToast.length > 0) {
      liveToast.removeClass('bg-primary bg-seccess').addClass('bg-danger');
      const toast = new bootstrap.Toast(liveToast);
      toastText.empty().append('Message body can not be emty‼️😬');
      toast.show();
    }
    return false;
  }

  if (!scheduleSwitch.is(':checked') && !dateTimeValidation(datePicker.value)) {
    if (liveToast.length > 0) {
      liveToast.removeClass('bg-primary bg-seccess').addClass('bg-danger');
      const toast = new bootstrap.Toast(liveToast);
      const msg = datePicker.value ? 'Must be at least 1 hour ahead‼️😬' : 'You must pick date and time‼️😬';
      toastText.empty().append(msg);
      toast.show();
    }
    return false;
  }
  return true;
};

export const submitHandler = async (event) => {
  console.log('submit');
  const now = toSendNow();
  event.preventDefault();
  if (formValidation()) {
    const sendAt = new Date(datePicker.value);

    const message = messageText.text() || null;
    await fetch('/messages', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'CSRF-Token': Cookies.get('XSRF-TOKEN'),
      },
      body: JSON.stringify({ contacts, message, now, sendAt, via: event.originalEvent.submitter.id }),
    });

    if (liveToast.length > 0) {
      liveToast.removeClass('bg-danger bg-primary').addClass('bg-success');
      const toast = new bootstrap.Toast(liveToast);
      if (now) {
        toastText.empty().append('Message successfully sent. 🎉');
      } else {
        toastText
          .empty()
          .append(
            `Message scheduled to  ${sendAt.getDate()}/${
              sendAt.getMonth() + 1
            }/${sendAt.getFullYear()}  at  ${sendAt.getHours()}:${sendAt.getMinutes()} 🎉`
          );
      }
      toast.show();
    }
  }
};
