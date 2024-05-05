import throttle from 'lodash.throttle';

const form = document.querySelector('.feedback-form');
const emailInput = form.querySelector('input[name="email"]');
const messageInput = form.querySelector('textarea[name="message"]');

const STORAGE_KEY = 'feedback-form-state';

const saveFormState = () => {
  const formData = {
    email: emailInput.value,
    message: messageInput.value,
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
};

const loadFormState = () => {
  const storedFormData = localStorage.getItem(STORAGE_KEY);
  if (storedFormData) {
    const formData = JSON.parse(storedFormData);
    emailInput.value = formData.email;
    messageInput.value = formData.message;
  }
};

const clearFormState = () => {
  localStorage.removeItem(STORAGE_KEY);
};

const throttledSaveFormState = throttle(saveFormState, 500);

form.addEventListener('input', throttledSaveFormState);

window.addEventListener('DOMContentLoaded', loadFormState);

form.addEventListener('submit', event => {
  event.preventDefault();
  clearFormState();
  console.log('Form submitted. Data:', {
    email: emailInput.value,
    message: messageInput.value,
  });
  form.reset();
});
