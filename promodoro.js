let timer;
let isRunning = false;
let time = 25 * 60;
let currentMode = "pomodoro";

const timeDisplay = document.getElementById("timeDisplay");
const startBtn = document.getElementById("startBtn");
const resetBtn = document.getElementById("resetBtn");

const pomodoroBtn = document.getElementById("pomodoroBtn");
const shortBreakBtn = document.getElementById("shortBreakBtn");
const longBreakBtn = document.getElementById("longBreakBtn");

const addTaskBtn = document.getElementById("addTaskBtn");
const taskInput = document.getElementById("taskInput");
const tasksList = document.getElementById("tasksList");

/* ---------- TIMER FUNCTIONS ---------- */

function updateDisplay() {
  let minutes = Math.floor(time / 60);
  let seconds = time % 60;
  timeDisplay.textContent =
    `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
}

function startTimer() {
  timer = setInterval(() => {
    if (time > 0) {
      time--;
      updateDisplay();
    } else {
      clearInterval(timer);
      alert("Time's up!");
      startBtn.textContent = "Start";
      isRunning = false;
    }
  }, 1000);
}

/* ---------- BUTTON ACTIVE STATE ---------- */

function setActiveButton(activeBtn) {
  document.querySelectorAll(".mode-btn").forEach(btn => {
    btn.classList.remove("active");
  });
  activeBtn.classList.add("active");
}

/* ---------- MODE SWITCH ---------- */

function switchMode(mode, minutes, button) {
  clearInterval(timer);
  isRunning = false;
  startBtn.textContent = "Start";
  currentMode = mode;
  time = minutes * 60;
  updateDisplay();
  setActiveButton(button);
}

/* ---------- MODE BUTTON EVENTS ---------- */

pomodoroBtn.addEventListener("click", () => {
  switchMode("pomodoro", 25, pomodoroBtn);
});

shortBreakBtn.addEventListener("click", () => {
  switchMode("shortBreak", 5, shortBreakBtn);
});

longBreakBtn.addEventListener("click", () => {
  switchMode("longBreak", 15, longBreakBtn);
});

/* ---------- START / PAUSE ---------- */

startBtn.addEventListener("click", () => {
  if (!isRunning) {
    startTimer();
    startBtn.textContent = "Pause";
    isRunning = true;
  } else {
    clearInterval(timer);
    startBtn.textContent = "Start";
    isRunning = false;
  }
});

/* ---------- RESET ---------- */

resetBtn.addEventListener("click", () => {
  clearInterval(timer);
  isRunning = false;
  startBtn.textContent = "Start";

  if (currentMode === "pomodoro") time = 25 * 60;
  if (currentMode === "shortBreak") time = 5 * 60;
  if (currentMode === "longBreak") time = 15 * 60;

  updateDisplay();
});

/* ---------- TASKS ---------- */

addTaskBtn.addEventListener("click", () => {
  if (taskInput.value.trim() === "") return;

  const li = document.createElement("li");
  li.textContent = taskInput.value;
  tasksList.appendChild(li);
  taskInput.value = "";
});

/* ---------- INIT ---------- */
updateDisplay();
