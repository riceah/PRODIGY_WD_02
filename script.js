const starContainer = document.getElementById("star-container");

if (starContainer) {
    for (let i = 0; i < 40; i++) {

        const star = document.createElement("div");

        star.classList.add("star");

        star.style.left = Math.random() * 100 + "%";
        star.style.top = Math.random() * 100 + "%";

        star.style.opacity = Math.random();

        star.style.animationDelay = Math.random() * 3 + "s";

        starContainer.appendChild(star);
    }
}


let seconds = 0;
let timer = null;
let lapNumber = 0;
let lapTimes = [];


const display = document.getElementById("display");
const timerRing = document.querySelector(".timer-ring");

const lapList = document.getElementById("laps");
const lapCount = document.getElementById("lapCount");

const fastestLap = document.getElementById("fastestLap");
const slowestLap = document.getElementById("slowestLap");
const totalLaps = document.getElementById("totalLaps");
const currentTime = document.getElementById("currentTime");


function formatTime(totalSeconds) {

    const hrs = Math.floor(totalSeconds / 3600);
    const mins = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;

    return (
        String(hrs).padStart(2, "0") + ":" +
        String(mins).padStart(2, "0") + ":" +
        String(secs).padStart(2, "0")
    );
}


function updateDisplay() {

    const time = formatTime(seconds);

    display.textContent = time;

    if (currentTime) {
        currentTime.textContent = time;
    }
}


document.getElementById("start").addEventListener("click", function () {

    if (timer !== null) return;

    timerRing.classList.add("active");

    timer = setInterval(function () {

        seconds++;

        updateDisplay();

    }, 1000);

});


document.getElementById("pause").addEventListener("click", function () {

    clearInterval(timer);

    timer = null;

    timerRing.classList.remove("active");

});


document.getElementById("reset").addEventListener("click", function () {

    clearInterval(timer);

    timer = null;

    seconds = 0;
    lapNumber = 0;
    lapTimes = [];

    timerRing.classList.remove("active");

    updateDisplay();

    lapList.innerHTML = "";

    lapCount.textContent = "0 Laps";

    if (totalLaps)
        totalLaps.textContent = "0";

    if (fastestLap)
        fastestLap.textContent = "N/A";

    if (slowestLap)
        slowestLap.textContent = "N/A";

});


document.getElementById("lap").addEventListener("click", function () {

    if (seconds === 0 || timer === null) return;

    lapNumber++;

    lapTimes.push(seconds);

    const lap = document.createElement("li");

    lap.innerHTML = `
        <span class="lap-name">🏁 Lap ${String(lapNumber).padStart(2, "0")}</span>
        <span class="lap-time">${formatTime(seconds)}</span>
    `;

    lapList.prepend(lap);

    lapCount.textContent = `${lapNumber} Laps`;

    if (totalLaps)
        totalLaps.textContent = lapNumber;

    if (lapTimes.length > 0) {

        const fastest = Math.min(...lapTimes);
        const slowest = Math.max(...lapTimes);

        if (fastestLap)
            fastestLap.textContent = formatTime(fastest);

        if (slowestLap)
            slowestLap.textContent = formatTime(slowest);

    }

});
document.getElementById("stop").addEventListener("click", function () {

    clearInterval(timer);

    timer = null;

    timerRing.classList.remove("active");

});


updateDisplay();
document.getElementById("scrollUp").addEventListener("click", function(){

    window.scrollTo({

        top:0,

        behavior:"smooth"

    });

});

document.getElementById("scrollDown").addEventListener("click", function(){

    window.scrollTo({

        top:document.body.scrollHeight,

        behavior:"smooth"

    });

});