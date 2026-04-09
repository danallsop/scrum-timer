class ScrumTimer {
    constructor() {
        if (typeof SCRUM_CONFIG === 'undefined') {
            alert('Could not load attendees.js — make sure it is in the same folder as index.html.');
            return;
        }

        const parsedTimeLimit = Number(SCRUM_CONFIG.timeLimit);
        this.timeLimit = Number.isFinite(parsedTimeLimit) && parsedTimeLimit > 0
            ? parsedTimeLimit
            : 60;

        const configuredAttendees = Array.isArray(SCRUM_CONFIG.attendees)
            ? SCRUM_CONFIG.attendees
            : [];
        this.attendees = configuredAttendees
            .filter(a => a && typeof a.name === 'string' && a.name.trim() !== '')
            .filter(a => a.absent !== true);

        this.nextBtn = document.getElementById('nextBtn');
        this.timeDisplay = document.getElementById('timeDisplay');
        this.currentSpeaker = document.getElementById('currentSpeaker');
        this.timeElapsed = 0;
        this.currentSpeakerIndex = -1;

        this.shuffle(this.attendees);
        if (this.attendees.length === 0) {
            this.currentSpeaker.textContent = 'No attendees available';
            this.nextBtn.textContent = 'Done';
            this.nextBtn.disabled = true;
            this.nextBtn.classList.add('disabled');
        }
        this.nextBtn.addEventListener('click', () => this.nextSpeaker());
        this.updateDisplay();
    }

    shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    nextSpeaker() {
        if (this.timerInterval) {
            clearInterval(this.timerInterval);
        }

        this.currentSpeakerIndex++;

        if (this.currentSpeakerIndex >= this.attendees.length) {
            this.nextBtn.textContent = 'Done';
            this.nextBtn.disabled = true;
            this.nextBtn.classList.add('disabled');
            return;
        }

        const speaker = this.attendees[this.currentSpeakerIndex];
        this.timeElapsed = 0;
        this.startTime = performance.now();
        this.currentSpeaker.textContent = speaker.name;
        this.updateDisplay();
        this.timerInterval = setInterval(() => this.tick(), 100);
    }

    tick() {
        this.timeElapsed = (performance.now() - this.startTime) / 1000;
        this.updateDisplay();
    }

    updateDisplay() {
        const totalSeconds = Math.floor(this.timeElapsed);
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;
        const displayTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

        this.timeDisplay.textContent = displayTime;

        if (this.timeElapsed > this.timeLimit) {
            this.timeDisplay.classList.add('over-time');
        } else {
            this.timeDisplay.classList.remove('over-time');
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new ScrumTimer();
});
