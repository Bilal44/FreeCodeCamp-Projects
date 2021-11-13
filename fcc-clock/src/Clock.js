import React from 'react';

export class Clock extends React.Component {
    render() {
        return (
            <div>
                <div className="flex">
                    <h2 id="break-label">Break Label</h2>
                    <button id="break-decrement">-</button>
                    <div id="break-length">5</div>
                    <button id="break-increment">+</button>
                </div>
                <div className="flex">
                    <h2 id="session-label">Session Label</h2>
                    <button id="session-decrement">-</button>
                    <div id="session-length">25</div>
                    <button id="session-increment">+</button>
                </div>
                <h1 id="timer-label">Session Timer</h1>
                <h1 id="time-left">25:00</h1>
                <button id="start_stop">START/STOP</button>
                <button id="reset">RESET</button>
            </div>
        )
    }
}