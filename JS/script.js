//Global variables
let currQuesNum = 0;
let progressBarLength = 0;
let quizTime = 120; //sec
let timeInterval;

// Elements
const welcomeTextEl = document.querySelector(".welcome-text");
const timerEl = document.querySelector(".timer");
const main = document.querySelector(".main");
const questionEl = document.querySelector(".question");
const optionsEl = document.querySelectorAll(".option");
const QA_containerEl = document.querySelector(".QA-container");
const windowEl = document.querySelector(".window");
const rulesEl = document.querySelector(".rules");

const next_btn = document.querySelector(".next");
const prev_btn = document.querySelector(".previous");
const submit_btn = document.querySelector(".submit");
const start_btn = document.querySelector(".startBtn");
const progressBar = document.querySelector(".progress-bar");
const progressCont = document.querySelector(".progress");

const allOpnInputs = document.querySelectorAll(".optnInput");
const allCheckboxes = document.querySelectorAll('input[type = "checkbox"]');

// ----------------------------

// functions
const startQuiz = function () {
  rulesEl.classList.add("hide-and-remove");
  html = `<span class="timer">2:00</span>`;
  welcomeTextEl.textContent = "All the best!!";
  welcomeTextEl.insertAdjacentHTML("beforeend", html);
  timeInterval = setInterval(updateTimer, 1000);
  main.classList.remove("hide-and-remove");

  renderQues();
};

const renderQues = function (a = 0) {
  if (currQuesNum + a < 0 || currQuesNum + a > 4) return;
  currQuesNum += a;
  questionEl.innerHTML = `${questions[currQuesNum].numb}. ${questions[currQuesNum].question}`;
  renderOptns();
  renderProgressBar(a);
  toggleBtns();
};

const updateTimer = function () {
  const minutes = String(Math.trunc(quizTime / 60));
  const seconds = String(quizTime % 60);

  document.querySelector(".timer").textContent = `${minutes}:${seconds.padStart(
    2,
    0
  )}`;

  if (quizTime === -1) {
    clearInterval(timeInterval);
    submitQuiz();
  }
  if (quizTime <= 5) blinkTime();
  quizTime--;
};

const blinkTime = function () {
  document.querySelector(".timer").classList.toggle("red-color");
};

const renderOptns = function () {
  for (const [i, optn] of optionsEl.entries()) {
    optn.textContent = ` ${questions[currQuesNum].options[i]}`;
  }

  clearAllCkeckboxes();

  // remembering the selected option
  if (questions[currQuesNum].selectedOptn != -1)
    document.querySelector(
      `#optn${questions[currQuesNum].selectedOptn}`
    ).checked = true;
};

const renderProgressBar = function (a) {
  if (a == -1 && progressBarLength > 0) {
    progressBarLength -= 20;
    progressBar.style.width = `${progressBarLength}%`;
  } else if (progressBarLength < 100) {
    progressBarLength += 20;
    progressBar.style.width = `${progressBarLength}%`;
  }
};

//toggling submit, next and previous buttons
const toggleBtns = function () {
  if (currQuesNum == 4) {
    next_btn.classList.add("hidden");
    submit_btn.classList.remove("hidden");
  } else if (currQuesNum == 0) {
    prev_btn.classList.add("hidden");
  } else {
    prev_btn.classList.remove("hidden");
    next_btn.classList.remove("hidden");
    submit_btn.classList.add("hidden");
  }
};

const clearAllCkeckboxes = function () {
  allCheckboxes.forEach((checkbox) => {
    checkbox.checked = false;
  });
};

const submitQuiz = function () {
  let points = 0;
  for (q of questions) {
    if (q.options[q.selectedOptn - 1] === q.answer) points++;
  }

  QA_containerEl.classList.add("hide-and-remove");
  progressCont.classList.add("hide-and-remove");
  main.classList.add("hide-and-remove");

  document.querySelectorAll("button").forEach((btn) => {
    btn.classList.add("hide-and-remove");
  });

  welcomeTextEl.textContent = "Thanks for answering the Quiz.";

  const greeting =
    points >= 3 ? `Congratulations 🎉` : "Better luck next time.";

  const html = `<div class="finalMessage d-flex flex-column justify-content-around align-items-around"> <h1 class = "m-5">You Scored ${
    points * 20
  }% <br> ${greeting} </h1>
    <button class="try-again btn btn-warning mx-auto " onClick = location.reload()>Try Again</button></div>`;

  windowEl.insertAdjacentHTML("beforeend", html);
};

// ------------------------------------------

// Event Handlers
start_btn.addEventListener("click", () => startQuiz());

QA_containerEl.addEventListener("click", function (e) {
  if (e.target.type != "checkbox") return;

  clearAllCkeckboxes();

  questions[currQuesNum].selectedOptn = e.target.id.at(-1);
  document.querySelector(`#${e.target.id}`).checked = true;
});

next_btn.addEventListener("click", () => renderQues(1));
prev_btn.addEventListener("click", () => renderQues(-1));

submit_btn.addEventListener("click", submitQuiz);

//
//
//
// startQuiz();
// submitQuiz();
