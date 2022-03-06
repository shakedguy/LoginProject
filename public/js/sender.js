const liveToast = document.getElementById('notification');
const toastText = document.getElementById('toast-text');

const submitHandler = async (event) => {
  event.preventDefault();
  if (counter && event.submitter.id !== 'whatsapp') {
    const dateTime = new Date(datePicker.value);
    const sendAt = new Date(
      Date.UTC(
        dateTime.getFullYear(),
        dateTime.getMonth(),
        dateTime.getDay() - 1,
        dateTime.getHours(),
        dateTime.getMinutes(),
        dateTime.getSeconds()
      )
    );
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
        toastText.innerText = `Message scheduled to  ${
          dateTime.getDay() - 1
        }/${dateTime.getMonth()}/${dateTime.getFullYear()}  at  ${dateTime.getHours()}:${dateTime.getMinutes()} 🎉`;
      }
      toast.show();
    }
  } else if (counter) {
    if (liveToast) {
      console.log(liveToast.classList);
      liveToast.classList.remove('bg-danger', 'bg-seccess');
      liveToast.classList.add('bg-primary');
      const toast = new bootstrap.Toast(liveToast);
      toastText.innerText = 'Future feature, we are working on it 😉';
      toast.show();
    }
  } else {
    if (liveToast) {
      liveToast.classList.remove('bg-primary', 'bg-seccess');
      liveToast.classList.add('bg-danger');
      const toast = new bootstrap.Toast(liveToast);
      toastText.innerText = 'You must select at least one contact ‼️';
      toast.show();
    }
  }
};
