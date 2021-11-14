import React from 'react';

export class Clock extends React.Component {
    state = {
        breakLength: 5,
        sessionLength: 25,
        timeLeft: 25 * 60
    }

    convertToTime = (count) => {
        let minutes = Math.floor(count / 60);
        let seconds = count % 60;

        minutes = minutes < 10 ? ('0' + minutes) : minutes;
        seconds = seconds < 10 ? ('0' + seconds) : seconds;

        return `${minutes}:${seconds}`;
    }

    handleReset = () => {
        this.setState({
            breakLength: 5,
            sessionLength: 25,
            timeLeft: 25 * 60,
        });
    }

    handleLengthChange = (item, change) => {
        const breakValue = this.state.breakLength;
        const sessionValue = this.state.sessionLength
        if (item === "break") {
            if ((change > 0 && breakValue < 60) || (change < 0 && breakValue > 1))
                this.setState({
                    breakLength: this.state.breakLength + change
                });
        } else {
            if ((change > 0 && sessionValue < 60) || (change < 0 && sessionValue > 1))
                this.setState({
                    sessionLength: this.state.sessionLength + change
                });
        }
    }

    render() {
        const convertToTime = this.convertToTime.bind(this);
        const handleReset = this.handleReset.bind(this);
        const handleChange = this.handleLengthChange.bind(this);

        const {
            breakLength,
            sessionLength,
            timeLeft
        } = this.state;

        return (
            <div>
                <div className="flex">
                    <h2 id="break-label">Break Label</h2>
                    <button id="break-decrement" onClick={(e) => handleChange("break", -1)}>-</button>
                    <div id="break-length">{breakLength}</div>
                    <button id="break-increment" onClick={(e) => handleChange("break", 1)}>+</button>
                </div>
                <div className="flex">
                    <h2 id="session-label">Session Label</h2>
                    <button id="session-decrement" onClick={(e) => handleChange("session", -1)}>-</button>
                    <div id="session-length">{sessionLength}</div>
                    <button id="session-increment" onClick={(e) => handleChange("session", 1)}>+</button>
                </div>
                <h1 id="timer-label">Session Timer</h1>
                <h1 id="time-left">{convertToTime(timeLeft)}</h1>
                <button id="start_stop">START/STOP</button>
                <button id="reset" onClick={handleReset}>RESET</button>
            </div>
        )
    }
}