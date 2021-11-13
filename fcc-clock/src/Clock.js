import React from 'react';

export class Clock extends React.Component {
    render() {
        return (
            <div>
                <div id="break-label">Break Length</div>
                <button id="break-decrement">-</button>
                <div id="break-length">5</div>
                <button id="break-increment">+</button>
                <div id="session-label">Session Label</div>
                <button id="session-decrement">-</button>
                <div id="session-length">25</div>
                <button id="session-increment">+</button>
                <div id="timer-label">Session Timer</div>
                <div id="time-left">00:00</div>
                <button id="start_stop">START/STOP</button>
                <button id="reset">RESET</button>
            </div>
        )
    }
}