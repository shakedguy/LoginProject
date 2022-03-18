const feedback = document.getElementById('message-feedback-id');
const messageInput = document.getElementById('message-input');
let message = '';
const onInputHandler = (event) => {
  message = event.target.value;
  if (message) {
    feedback.innerHTML = 'Looks good!👌';
    feedback.classList.add('valid-feedback');
    feedback.classList.remove('invalid-feedback');
    feedback.style.color = 'green';
    messageInput.classList.remove('is-invalid');
    messageInput.classList.add('is-valid');
  } else {
    feedback.innerHTML = 'Message cannot be empty';
    feedback.classList.add('invalid-feedback');
    feedback.classList.remove('valid-feedback');
    feedback.style.color = 'red';
    messageInput.classList.remove('is-valid');
    messageInput.classList.add('is-invalid');
  }
};

const onMessageSwitchChangeHandler = (event) => {
  if (event.target.checked) {
    messageInput.removeAttribute('required');
    messageInput.classList.remove('is-invalid');
  } else {
    messageInput.setAttribute('required', 'true');
    messageInput.classList.add('is-invalid');
  }
};
