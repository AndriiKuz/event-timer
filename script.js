"use strict";
document.addEventListener("DOMContentLoaded", () => {
  const btnMenuEl = document.querySelector(".btn-menu");
  const containerEl = document.querySelector(".container");
  const eventEl = document.querySelector("input[id=deadline-target]");
  const dateEl = document.querySelector("input[id=date]");
  const urlEl = document.querySelector("input[id=image]");
  const btnSetTimer = document.querySelector(".btn-set-timer");
  const btnClearTimer = document.querySelector(".btn-clear-timer");
  const deadlineTargetEl = document.querySelector(".title");

  const TARGET = "Until the New Year left:";
  const URL = `background-image: linear-gradient(
    rgba(34, 34, 34, 0.2),
    rgba(34, 34, 34, 0.2)
    ), url(image/image.jpg);`;
  const currentYear = new Date().getFullYear();
  const DATE = `${currentYear + 1}-01-01`;

  function getTimeRemaining(endTime = DATE) {
    const t = Date.parse(endTime) - Date.parse(new Date());
    const days = Math.floor(t / (1000 * 60 * 60 * 24));
    const hours = Math.floor((t / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((t / 1000 / 60) % 60);
    const seconds = Math.floor((t / 1000) % 60);

    return {
      total: t,
      days: days,
      hours: hours,
      minutes: minutes,
      seconds: seconds,
    };
  }

  function getZero(num) {
    if (num >= 0 && num < 10) {
      return `0${num}`;
    } else {
      return num;
    }
  }

  function setClock(selector, deadline) {
    const timerEl = document.querySelector(selector);
    const daysEl = timerEl.querySelector("#days");
    const hoursEl = timerEl.querySelector("#hours");
    const minutesEl = timerEl.querySelector("#minutes");
    const secondsEl = timerEl.querySelector("#seconds");

    const timeInterval = setInterval(() => {
      let obj;
      if (dateEl.value) {
        obj = getTimeRemaining(dateEl.value);
      } else {
        obj = getTimeRemaining();
      }

      daysEl.innerHTML = getZero(obj.days);
      hoursEl.innerHTML = getZero(obj.hours);
      minutesEl.innerHTML = getZero(obj.minutes);
      secondsEl.innerHTML = getZero(obj.seconds);

      if (obj.total <= 0) {
        clearInterval(timeInterval);
        daysEl.innerHTML = "00";
        hoursEl.innerHTML = "00";
        minutesEl.innerHTML = "00";
        secondsEl.innerHTML = "00";
      }
    }, 1000);
  }
  if (dateEl.value == "" || dateEl.value == DATE) {
    setClock(".timer", DATE);
  } else if (dateEl.value) {
    setClock(".timer", dateEl.value);
  }

  btnMenuEl.addEventListener("click", () => {
    containerEl.classList.toggle("menu-open");
  });

  function setTimer() {
    if (eventEl.value !== "") {
      deadlineTargetEl.innerHTML = eventEl.value;
    } else {
      deadlineTargetEl.textContent = TARGET;
    }
    if (urlEl.value !== "") {
      containerEl.style.cssText = `background-image: linear-gradient(
      rgba(34, 34, 34, 0.2),
      rgba(34, 34, 34, 0.2)
      ), url(${urlEl.value});`;
    } else {
      containerEl.style.cssText = URL;
    }
    if (dateEl.value !== "" && dateEl.value !== DATE) {
      setClock(".timer", dateEl.value);
    } else {
      setClock(".timer", DATE);
    }
  }

  function clearTimer() {
    eventEl.value = "";
    deadlineTargetEl.textContent = TARGET;
    urlEl.value = "";
    containerEl.style.cssText = URL;
    dateEl.value = "";
    setClock(".timer", DATE);
  }

  btnSetTimer.addEventListener("click", setTimer);
  btnClearTimer.addEventListener("click", clearTimer);
});
