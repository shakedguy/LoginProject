const mailingList = document.querySelectorAll('.mailing-list-checkbox');
const contactsFeedback = document.querySelectorAll('.contacts-feedback');
const mailingFeedback = document.getElementById(`contact-feedback-${contactsFeedback.length}`);

const getContacts = async () => {
  const responseJson = await fetch('/api/contacts');
  const response = JSON.parse(await responseJson.text());
  return response.data.contacts;
};

let contacts;
let counter = 0;

window.addEventListener('DOMContentLoaded', async () => {
  contacts = await getContacts();
});

if (contactsFeedback) {
  contactsFeedback.forEach((feedback, index) => {
    if (contactsFeedback.length - 1 !== index) {
      feedback.remove();
    }
  });
}

const onChangeHandler = (event) => {
  const index = Number(event.target.id.replace('contact', '')) - 1;
  contacts[index].send = !contacts[index].send;
  contacts[index].send ? counter++ : counter--;
  if (counter) {
    mailingList.forEach((checkbox) => {
      checkbox.removeAttribute('required');
      checkbox.classList.remove('is-invalid');
      checkbox.classList.add('is-valid');
    });

    if (mailingFeedback) {
      mailingFeedback.innerHTML = 'Looks good!👌';
      mailingFeedback.classList.add('valid-feedback');
      mailingFeedback.classList.remove('invalid-feedback');
      mailingFeedback.style.color = 'green';
    }
  } else {
    mailingList.forEach((checkbox) => {
      checkbox.setAttribute('required', 'true');
      checkbox.classList.remove('is-valid');
      checkbox.classList.add('is-invalid');
    });
    if (mailingFeedback) {
      mailingFeedback.innerHTML = 'You must select at least one contact';
      mailingFeedback.classList.add('invalid-feedback');
      mailingFeedback.classList.remove('valid-feedback');
      mailingFeedback.style.color = 'red';
    }
  }
};
