const liveToast = document.getElementById('notification');
const toastText = document.getElementById('toast-text');
const messageSwitch = document.getElementById('message-switch');
const scheduleSwitch = document.getElementById('schedule-switch');

const checkDateTimeValidation = (dateTime) => {
  const millisecondsToHours = 1000 * 60 * 60;
  const now = new Date();
  const distance = new Date(dateTime) - now;
  return distance >= millisecondsToHours;
};

const formValidation = () => {
  if (!counter) {
    if (liveToast) {
      liveToast.classList.remove('bg-primary', 'bg-seccess');
      liveToast.classList.add('bg-danger');
      const toast = new bootstrap.Toast(liveToast);
      toastText.innerText = 'You must select at least one contact ‼️😬';
      toast.show();
    }
    return false;
  }
  if (!messageSwitch.checked && !message) {
    if (liveToast) {
      liveToast.classList.remove('bg-primary', 'bg-seccess');
      liveToast.classList.add('bg-danger');
      const toast = new bootstrap.Toast(liveToast);
      toastText.innerText = 'Message body can not be emty‼️😬';
      toast.show();
    }
    return false;
  }

  if (!scheduleSwitch.checked && !checkDateTimeValidation(datePicker.value)) {
    if (liveToast) {
      liveToast.classList.remove('bg-primary', 'bg-seccess');
      liveToast.classList.add('bg-danger');
      const toast = new bootstrap.Toast(liveToast);
      const msg = datePicker.value ? 'Must be at least 1 hour ahead‼️😬' : 'You must pick date and time‼️😬';
      toastText.innerText = msg;
      toast.show();
    }
    return false;
  }
  console.log('true');
  return true;
};

const submitHandler = async (event) => {
  event.preventDefault();
  if (formValidation()) {
    const sendAt = new Date(datePicker.value);

    message = message || null;
    await fetch('/sender', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'CSRF-Token': Cookies.get('XSRF-TOKEN'),
      },
      body: JSON.stringify({ contacts, message, now, sendAt, via: event.submitter.id }),
    });

    if (liveToast) {
      liveToast.classList.remove('bg-danger', 'bg-primary');
      liveToast.classList.add('bg-success');
      const toast = new bootstrap.Toast(liveToast);
      if (now) {
        toastText.innerText = 'Message successfully sent. 🎉';
      } else {
        toastText.innerText = `Message scheduled to  ${sendAt.getDate()}/${
          sendAt.getMonth() + 1
        }/${sendAt.getFullYear()}  at  ${sendAt.getHours()}:${sendAt.getMinutes()} 🎉`;
      }
      toast.show();
    }
  }
};
