const timer = document.getElementById('timer');

function parseTimeToSeconds(timeStr) {
    const [hours, minutes, seconds] = timeStr.split(':').map(Number);
    return hours * 3600 + minutes * 60 + seconds;
}

function formatSecondsToTime(totalSeconds) {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return [
        hours.toString().padStart(2, '0'),
        minutes.toString().padStart(2, '0'),
        seconds.toString().padStart(2, '0')
    ].join(':');
}

let totalSeconds = parseTimeToSeconds(timer.textContent);

const timerId = setInterval(() => {
    totalSeconds--;

    if (totalSeconds >= 0) {
        timer.textContent = formatSecondsToTime(totalSeconds);
    } else {
        clearInterval(timerId);
        alert('Вы победили в конкурсе!');
    }
}, 1000);