import React from 'react';

export class Clock extends React.Component {
    state = {
        breakLength: 5,
        sessionLength: 25,
        timeLeft: 25 * 60,
        isPlaying: false,
        currentTimer: "Session"
    }

    componentDidMount() {
        this.audio = document.getElementById("beep");
    }

    convertToTime = (count) => {
        let minutes = Math.floor(count / 60);
        let seconds = count % 60;

        minutes = minutes < 10 ? ('0' + minutes) : minutes;
        seconds = seconds < 10 ? ('0' + seconds) : seconds;

        return `${minutes}:${seconds}`;
    }

    handleReset = () => {
        const audio = this.audio;

        this.setState({
            breakLength: 5,
            sessionLength: 25,
            timeLeft: 25 * 60,
            isPlaying: false,
            currentTimer: "Session"
        });

        clearInterval(this.loop);
        audio.pause();
        audio.currentTime = 0;
    }

    handleLengthChange = (item, change) => {
        const breakValue = this.state.breakLength;
        const sessionValue = this.state.sessionLength;
        const currentTimer = this.state.currentTimer;
        const isPlaying = this.state.isPlaying;

        let newTimer;
        if (item === "break") {
            if ((change > 0 && breakValue < 60) || (change < 0 && breakValue > 1)) {
                newTimer = breakValue + change
                this.setState({
                    breakLength: newTimer
                });
            }
        } else {
            if ((change > 0 && sessionValue < 60) || (change < 0 && sessionValue > 1)) {
                newTimer = sessionValue + change
                this.setState({
                    sessionLength: newTimer
                });
            }
        }

        if (newTimer > 0 && newTimer < 61 && !isPlaying) {
            if (item === currentTimer.toLowerCase()) {
                this.setState({
                    timeLeft: newTimer * 60
                })
            }
        }
    }

    handlePlayPause = () => {
        const { isPlaying } = this.state;
        const audio = this.audio;

        if (isPlaying) {
            clearInterval(this.loop);

            this.setState({
                isPlaying: false
            });
        } else {
            this.setState({
                isPlaying: true
            });

            this.loop = setInterval(() => {
                const {
                    timeLeft,
                    currentTimer,
                    breakLength,
                    sessionLength
                } = this.state;

                if (timeLeft === 0) {
                    this.setState({
                        currentTimer: (currentTimer === 'Session') ? 'Break' : 'Session',
                        timeLeft: (currentTimer === 'Session') ? (breakLength * 60) : (sessionLength * 60)
                    });
                    audio.play();

                } else {
                    this.setState({
                        timeLeft: timeLeft - 1
                    });
                }

            }, 1000);
        }
    }

    render() {
        const convertToTime = this.convertToTime.bind(this);
        const handleReset = this.handleReset.bind(this);
        const handleChange = this.handleLengthChange.bind(this);
        const handlePlayPause = this.handlePlayPause.bind(this);

        const {
            breakLength,
            sessionLength,
            timeLeft,
            currentTimer
        } = this.state;

        return (
            <div>
                <div className="flex">
                    <h2 id="break-label">Break Length</h2>
                    <button id="break-decrement" onClick={(e) => handleChange("break", -1)}><i className="fas fa-angle-down"></i></button>
                    <div id="break-length">{breakLength}</div>
                    <button id="break-increment" onClick={(e) => handleChange("break", 1)}><i className="fas fa-angle-up"></i></button>
                </div>
                <div className="flex">
                    <h2 id="session-label">Session Length</h2>
                    <button id="session-decrement" onClick={(e) => handleChange("session", -1)}><i className="fas fa-angle-down"></i></button>
                    <div id="session-length">{sessionLength}</div>
                    <button id="session-increment" onClick={(e) => handleChange("session", 1)}><i className="fas fa-angle-up"></i></button>
                </div>
                <div className="clock-wrapper">
                    <h1 id="timer-label">{currentTimer}</h1>
                    <h1 id="time-left">{convertToTime(timeLeft)}</h1>
                    <button id="start_stop" onClick={handlePlayPause}><i className="fas fa-play"></i><i className="fas fa-pause"></i></button>
                    <button id="reset" onClick={handleReset}><i className="fas fa-history"></i></button>
                    <audio id="beep" src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav" />
                </div>
            </div>
        )
    }
}