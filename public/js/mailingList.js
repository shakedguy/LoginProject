import { getUsers } from './users.js';

export let contacts;
let counter = 0;

const onChangeHandler = (event) => {
  const index = Number(event.originalEvent.target.id.replace('contact', '')) - 1;
  contacts[index].send = !contacts[index].send;
  contacts[index].send ? counter++ : counter--;
  const mailingList = $('.mailing-list-checkbox').toArray();
  const mailingFeedback = $(`#contact-feedback-${contacts.length}`);
  if (counter) {
    mailingList.forEach((checkbox) => {
      checkbox.removeAttribute('required');
      checkbox.classList.remove('is-invalid');
      checkbox.classList.add('is-valid');
    });

    if (mailingFeedback.length > 0) {
      mailingFeedback.empty().append('Looks good!👌');
      mailingFeedback.removeClass('invalid-feedback').addClass('valid-feedback');
      mailingFeedback.css('color', 'green');
    }
  } else {
    mailingList.forEach((checkbox) => {
      checkbox.removeAttribute('required', 'true');
      checkbox.classList.remove('is-valid');
      checkbox.classList.add('is-invalid');
    });
    if (mailingFeedback.length > 0) {
      mailingFeedback.empty().append('You must select at least one contact');
      mailingFeedback.removeClass('valid-feedback').addClass('invalid-feedback');
      mailingFeedback.css('color', 'red');
    }
  }
};

const createMessagesList = (list) =>
  list.map((item, index) => {
    const container = $(
      `<div class="form-check ms-3 mailing-list-containers" id="contact-container-${item.id}"></div>`
    );
    const input = $(`<input class="form-check-input mailing-list-checkbox border-dark is-invalid"
      type="checkbox"
      name="radio-stacked"
      id="contact${item.id}"
      required></input>`);
    input.on('input', onChangeHandler);
    container.append(input);
    container.append(`<label class="form-check-label text-black" style="padding: 0 10px" for="contact${item.id}"
      >${item.name}</label>`);

    if (index === list.length - 1) {
      container.append(
        `<div class="invalid-feedback contacts-feedback" id="contact-feedback-${item.id}">Required</div>`
      );
    }
    return container;
  });

export const getHtmlMessagesList = async () => {
  contacts = await getUsers();
  return createMessagesList(contacts);
};
