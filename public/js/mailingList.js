import { getUsers } from './users.js';

export let contacts;
let counter = 0;

const checkPhoneNumbers = () => {
  const smsBtn = $('#sms');
  const whatsAppBtn = $('#whatsapp');

  const res = $('.mailing-list-checkbox')
    .toArray()
    .find((item, index) => item.checked && !contacts[index].phoneNumber);
  if (res) {
    smsBtn.prop('disabled', true);
    whatsAppBtn.prop('disabled', true);
  } else {
    smsBtn.prop('disabled', false);
    whatsAppBtn.prop('disabled', false);
  }
};
const checkEmails = () => {
  const emailBtn = $('#email');

  const res = $('.mailing-list-checkbox')
    .toArray()
    .find((item, index) => item.checked && !contacts[index].email);
  if (res) emailBtn.prop('disabled', true);
  else emailBtn.prop('disabled', false);
};

const onChangeHandler = (event) => {
  const smsBtn = $('#sms');
  const whatsAppBtn = $('#whatsapp');
  const emailBtn = $('#email');
  const index = Number(event.originalEvent.target.id.replace('contact', ''));
  contacts[index].send = !contacts[index].send;

  counter = 0;
  $('.mailing-list-checkbox')
    .toArray()
    .forEach((item) => {
      if (item.checked) {
        counter += 1;
      }
    });

  const mailingFeedback = $(`#contact-feedback-${contacts.length}`);
  if (counter) {
    $('.mailing-list-checkbox').prop('required', false).removeClass('is-invalid').addClass('is-valid');

    if (mailingFeedback.length > 0) {
      mailingFeedback.empty().append('Looks good!👌');
      mailingFeedback.removeClass('invalid-feedback').addClass('valid-feedback');
      mailingFeedback.css('color', 'green');
    }
    checkEmails();
    checkPhoneNumbers();
  } else {
    $('.mailing-list-checkbox').prop('required', true).removeClass('is-valid').addClass('is-invalid');

    if (mailingFeedback.length > 0) {
      mailingFeedback.empty().append('You must select at least one contact');
      mailingFeedback.removeClass('valid-feedback').addClass('invalid-feedback');
      mailingFeedback.css('color', 'red');
    }

    smsBtn.attr('disabled', true);
    whatsAppBtn.attr('disabled', true);
    emailBtn.attr('disabled', true);
  }
};

const createMessagesList = (list) => {
  if (list) {
    const htmlList = list.map((item, index) => {
      const container = $(
        `<div class="form-check ms-1 mailing-list-containers" id="contact-container-${index}"></div>`
      );
      const input = $(`<input class="form-check-input mailing-list-checkbox border-dark is-invalid"
      type="checkbox"
      name="radio-stacked"
      id="contact${index}"
      required ></input>`);
      input.on('input', onChangeHandler);
      container.append(input);
      container.append(`<label class="form-check-label text-black" style="padding: 0 10px; margin: 0" for="contact${
        item.id
      }"
      >${item.displayName || item.email || item.phoneNumber}</label>`);

      if (index === list.length - 1) {
        container.append(
          `<div class="invalid-feedback contacts-feedback" style="margin: 10px 0" id="contact-feedback-${item.id}">Required</div>`
        );
      }
      return container;
    });

    return htmlList;
  }
  return null;
};
export const getHtmlMessagesList = async () => {
  contacts = await getUsers();
  return createMessagesList(contacts);
};
