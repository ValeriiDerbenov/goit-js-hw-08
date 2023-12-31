import throttle from 'lodash.throttle';

const form = document.querySelector('.feedback-form');
const emailInput = form.querySelector('input[name="email"]');
const messageInput = form.querySelector('textarea[name="message"]');
const STORAGE_KEY = 'feedback-form-state';

const saveState = () => {
  const state = {
    email: emailInput.value,
    message: messageInput.value,
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
};

const updateFormState = () => {
  const state = JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
  emailInput.value = state.email || '';
  messageInput.value = state.message || '';
};

const submitForm = event => {
  event.preventDefault();
  const state = {
    email: emailInput.value,
    message: messageInput.value,
  };

  if (emailInput.value === '' || messageInput.value === '') {
    return alert('Please fill in all the fields!');
  }

  console.log(state);
  localStorage.removeItem(STORAGE_KEY);
  emailInput.value = '';
  messageInput.value = '';
};

emailInput.addEventListener('input', throttle(saveState, 500));
messageInput.addEventListener('input', throttle(saveState, 500));
form.addEventListener('submit', submitForm);

updateFormState();
