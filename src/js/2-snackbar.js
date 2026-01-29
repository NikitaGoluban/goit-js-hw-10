import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

// =======================
// DOM element
// =======================
const formEl = document.querySelector('.form');

// =======================
// Submit handler
// =======================
formEl.addEventListener('submit', handleSubmit);

function handleSubmit(event) {
  event.preventDefault(); // stop page reload

  // Get values from form
  const delay = Number(formEl.delay.value);
  const state = formEl.state.value;

  // Create promise
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (state === 'fulfilled') {
        resolve(`Fulfilled promise in ${delay}ms`);
      } else {
        reject(`Rejected promise in ${delay}ms`);
      }
    }, delay);
  });

  // Handle promise result
  promise
    .then(message => {
      iziToast.success({
        title: 'OK',
        message: message,
        position: 'topRight',
      });
    })
    .catch(message => {
      iziToast.error({
        title: 'Error',
        message: message,
        position: 'topRight',
      });
    });

  // ✅ RESET FORM AFTER SUBMIT
  formEl.reset();
}
