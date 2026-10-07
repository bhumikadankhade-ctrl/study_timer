// TIMER VARIABLES
let study = 25 * 60;
let breakTime = 5 * 60;
let timeLeft = study;
let totalTime = study;
let running = false;
let studyMode = true;
let interval;

let sessions = 0;
let minutes = 0;
let streak = 0;


// ELEMENTS
const time = document.getElementById("time");
const start = document.getElementById("start");
const reset = document.getElementById("reset");
const studyBtn = document.getElementById("studyBtn");
const breakBtn = document.getElementById("breakBtn");
const label = document.getElementById("label");
const message = document.getElementById("message");

const sessionsBox = document.getElementById("sessions");
const minutesBox = document.getElementById("minutes");
const streakBox = document.getElementById("streak");


// DISPLAY TIME
function showTime() {
    let min = Math.floor(timeLeft / 60);
    let sec = timeLeft % 60;

    time.textContent =
        String(min).padStart(2, "0") +
        ":" +
        String(sec).padStart(2, "0");
}


// START / PAUSE
function startTimer() {

    if (running) {
        pauseTimer();
        return;
    }

    running = true;
    start.textContent = "⏸ Pause";

    interval = setInterval(() => {

        timeLeft--;
        showTime();

        if (timeLeft <= 0) {
            finishTimer();
        }

    }, 1000);
}


// PAUSE
function pauseTimer() {

    running = false;
    clearInterval(interval);

    start.textContent = "▶ Resume";
    message.textContent = "⏸ Timer paused.";
}


// RESET
function resetTimer() {

    clearInterval(interval);

    running = false;

    timeLeft = studyMode ? study : breakTime;
    totalTime = timeLeft;

    start.textContent = "▶ Start";

    message.textContent =
        studyMode
        ? "🎯 Stay focused and do your best!"
        : "☕ Take a relaxing break.";

    showTime();
}


// FINISH
function finishTimer() {

    clearInterval(interval);
    running = false;

    if (studyMode) {

        sessions++;
        minutes += Math.floor(study / 60);
        streak++;

        alert("🎉 Study session complete!");

        switchBreak();

    } else {

        alert("☕ Break complete!");

        switchStudy();
    }

    updateStats();
}


// STUDY MODE
function switchStudy() {

    studyMode = true;

    studyBtn.classList.add("active");
    breakBtn.classList.remove("active");

    timeLeft = study;
    totalTime = study;

    label.textContent = "Study Time";
    start.textContent = "▶ Start";

    message.textContent =
        "🎯 Ready for another focused session!";

    showTime();
}


// BREAK MODE
function switchBreak() {

    studyMode = false;

    breakBtn.classList.add("active");
    studyBtn.classList.remove("active");

    timeLeft = breakTime;
    totalTime = breakTime;

    label.textContent = "Break Time";
    start.textContent = "▶ Start";

    message.textContent =
        "☕ Relax and recharge.";

    showTime();
}


// UPDATE STATS
function updateStats() {

    sessionsBox.textContent = sessions;
    minutesBox.textContent = minutes;
    streakBox.textContent = streak + " 🔥";

}


// APPLY SETTINGS
document.getElementById("apply").onclick =
function () {

    let s =
        Number(document.getElementById("studyTime").value);

    let b =
        Number(document.getElementById("breakTime").value);

    if (s < 1 || b < 1) {
        alert("Enter valid time!");
        return;
    }

    study = s * 60;
    breakTime = b * 60;

    resetTimer();

    message.textContent =
        "⚙ Settings applied successfully!";
};


// TIMER BUTTONS
start.onclick = startTimer;
reset.onclick = resetTimer;

studyBtn.onclick = function () {
    clearInterval(interval);
    running = false;
    switchStudy();
};

breakBtn.onclick = function () {
    clearInterval(interval);
    running = false;
    switchBreak();
};


// DARK MODE
document.getElementById("theme").onclick =
function () {

    document.body.classList.toggle("dark");

    this.textContent =
        document.body.classList.contains("dark")
        ? "☀️"
        : "🌙";
};


// STUDY TIPS
const tips = [
    "Keep your phone away while studying.",
    "Take short breaks between study sessions.",
    "Set one clear goal before studying.",
    "Keep your study table organized.",
    "Drink water during your study session.",
    "Avoid social media while focusing.",
    "Revise what you learned after studying.",
    "Break big topics into smaller tasks."
];

let tipIndex = 0;

document.getElementById("newTip").onclick =
function () {

    tipIndex++;

    if (tipIndex >= tips.length) {
        tipIndex = 0;
    }

    document.getElementById("tipText").textContent =
        tips[tipIndex];
};


// ADD TASK
document.getElementById("add").onclick =
addTask;

document.getElementById("task").addEventListener(
    "keydown",
    function (e) {

        if (e.key === "Enter") {
            addTask();
        }
    }
);


function addTask() {

    const input =
        document.getElementById("task");

    const text =
        input.value.trim();

    if (text === "") {
        alert("Enter a task first!");
        return;
    }

    const li =
        document.createElement("li");

    li.innerHTML = `
        <label>
            <input type="checkbox">
            <span>${text}</span>
        </label>
        <button class="delete">✕</button>
    `;

    const checkbox =
        li.querySelector("input");

    const span =
        li.querySelector("span");

    const deleteBtn =
        li.querySelector(".delete");


    checkbox.onchange = function () {

        span.classList.toggle(
            "done",
            checkbox.checked
        );
    };


    deleteBtn.onclick = function () {
        li.remove();
    };


    document
        .getElementById("taskList")
        .appendChild(li);

    input.value = "";
}


// INITIAL DISPLAY
showTime();
updateStats();