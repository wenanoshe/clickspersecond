const $clickZone = document.getElementById("clickZone");
const $clicks = document.getElementById("clicks");
const $cps = document.getElementById("cps");
const $timeout = document.getElementById("timer");
const $tryAgain = document.getElementById("tryAgain");

let count = 0;
let intervalId;
let time = 5000;
let isRunning = false;

/*
 *** Functions
 */

const hideTryAgainBtn = (hide = true) => {
  if (hide) {
    $tryAgain.style.display = "none";
  } else {
    $tryAgain.style.display = "block";
  }
};

const calcAverage = () => {
  $cps.textContent = count / 5;
};

const goAgain = () => {
  count = 0;
  time = 5000;

  $clickZone.style.pointerEvents = "auto";
  $clicks.textContent = count;

  hideTryAgainBtn();
};

const clickCounter = () => {
  count++;
  $clicks.textContent = count;
};

const stopClicks = () => {
  isRunning = false;
  $clickZone.style.pointerEvents = "none";
  calcAverage();

  clearInterval(intervalId);
  intervalId = null;

  hideTryAgainBtn(false);
};

const countdown = () => {
  if (!intervalId) {
    intervalId = setInterval(() => {
      if (time <= 0) {
        stopClicks();
        return;
      }
      time -= 10;

      $timeout.textContent = `${Math.round(time / 1000)}.${(time % 1000) / 10}`;
    }, 10);
  }
};

/*
 *** Code execution
 */

$clickZone.addEventListener("click", clickCounter);
$clickZone.addEventListener("click", countdown);
$tryAgain.addEventListener("click", goAgain);
