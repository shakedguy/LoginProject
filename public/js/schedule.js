const datePicker = document.getElementById('datePicker');
const container = document.getElementById('collapse');
const scheduleFeedback = document.getElementById('schedule-feedback');
let now = true;

const onScheduledSwitchChangeHandler = () => {
  now = !now;
  if (now) {
    datePicker.removeAttribute('required');
    datePicker.classList.remove('is-invalid');
  } else {
    datePicker.setAttribute('required', 'true');
    datePicker.classList.add('is-invalid');
  }
};

const dateTimeValidation = (dateTime) => {
  const millisecondsToHours = 1000 * 60 * 60;
  const now = new Date();
  return dateTime - now >= millisecondsToHours;
};

const onInputDateHandler = (event) => {
  if (event.target.value.length === 0) {
    scheduleFeedback.innerHTML = 'Required';
    scheduleFeedback.classList.add('is-invalid');
    scheduleFeedback.style.color = 'red';
  }

  const date = new Date(event.target.value);
  if (dateTimeValidation(date)) {
    scheduleFeedback.innerHTML = 'Looks good!👌';
    scheduleFeedback.classList.add('valid-feedback');
    scheduleFeedback.style.color = 'green';
  } else {
    scheduleFeedback.innerHTML = 'Must be at least 1 hour ahead';
    scheduleFeedback.classList.add('is-invalid');
    scheduleFeedback.style.color = 'red';
  }
};
