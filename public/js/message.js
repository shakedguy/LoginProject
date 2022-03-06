const feedback = document.getElementById('message-feedback-id');
const messageInput = document.getElementById('message-input');
let message = '';
const onInputHandler = (event) => {
  message = event.target.value;
  if (message.length > 0) {
    feedback.innerHTML = 'Looks good!👌';
    feedback.classList.add('valid-feedback');
    feedback.classList.remove('invalid-feedback');
    feedback.style.color = 'green';
  } else {
    feedback.innerHTML = 'Message cannot be empty';
    feedback.classList.add('invalid-feedback');
    feedback.classList.remove('valid-feedback');
    feedback.style.color = 'red';
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
