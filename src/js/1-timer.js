import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

// =======================
// DOM elements
// =======================
const dateTimePicker = document.querySelector("#datetime-picker");
const startBtn = document.querySelector("[data-start]");

const daysEl = document.querySelector("[data-days]");
const hoursEl = document.querySelector("[data-hours]");
const minutesEl = document.querySelector("[data-minutes]");
const secondsEl = document.querySelector("[data-seconds]");

// =======================
// Initial state
// =======================
startBtn.disabled = true;

// =======================
// Selected date storage
// =======================
let userSelectedDate = null;
let timerId = null;

// =======================
// flatpickr initialization
// =======================
flatpickr(dateTimePicker, {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,

  onClose(selectedDates) {
    const selectedDate = selectedDates[0];

    if (selectedDate <= new Date()) {
      iziToast.error({
        message: "Please choose a date in the future",
        position: "topRight",
      });

      startBtn.disabled = true;
      userSelectedDate = null;
    } else {
      userSelectedDate = selectedDate;
      startBtn.disabled = false;
    }
  },
});

// =======================
// Helper functions
// =======================
function addLeadingZero(value) {
  return String(value).padStart(2, "0");
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function updateTimer({ days, hours, minutes, seconds }) {
  daysEl.textContent = days;
  hoursEl.textContent = addLeadingZero(hours);
  minutesEl.textContent = addLeadingZero(minutes);
  secondsEl.textContent = addLeadingZero(seconds);
}

// =======================
// Start button handler
// =======================
startBtn.addEventListener("click", () => {
  if (!userSelectedDate) return;

  startBtn.disabled = true;
  dateTimePicker.disabled = true;

  timerId = setInterval(() => {
    const currentTime = new Date();
    const deltaTime = userSelectedDate - currentTime;

    if (deltaTime <= 0) {
      clearInterval(timerId);

      updateTimer({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
      });

      dateTimePicker.disabled = false;
      return;
    }

    updateTimer(convertMs(deltaTime));
  }, 1000);
});
