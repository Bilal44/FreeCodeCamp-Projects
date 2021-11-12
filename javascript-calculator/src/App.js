import './App.css';
import React from 'react';

const nums = [7, 8, 9, 4, 5, 6, 1, 2, 3, 0];
const ops = ['/', '*', '-', '+'];
const ids = {
  7: 'seven',
  8: 'eight',
  9: 'nine',
  4: 'four',
  5: 'five',
  6: 'six',
  1: 'one',
  2: 'two',
  3: 'three',
  0: 'zero',
  '/': 'divide',
  '*': 'multiply',
  '-': 'subtract',
  '+': 'add'
}

class App extends React.Component {
  state = {
    lastPressed: undefined,
    calc: '0',
    operation: undefined
  }

  handleClick = (e) => {
    const { calc, lastPressed } = this.state;
    const { innerText } = e.target;

    switch (innerText) {
      case 'Clear': {
        this.setState({
          calc: '0',
        });
        break;
      }

      case '=': {
        const evaluated = eval(calc);
        this.setState({
          calc: evaluated
        });
        break;
      }

      case '.': {
        const splitted = calc.split(/[\+\-\*\/]/);
        const last = splitted.slice(-1)[0];

        if (!last.includes('.')) {
          this.setState({
            calc: calc + '.'
          })
        }
        break;
      }

      default: {
        let e = undefined;
        if (ops.includes(innerText)) {
          if (ops.includes(lastPressed) && innerText !== '-') {
            const lastNumberIdx = calc.split('').reverse()
              .findIndex(char => char !== ' ' && nums.includes(+char));
            e = calc.slice(0, calc.length - lastNumberIdx) + ` ${innerText} `;
          } else {
            e = `${calc} ${innerText} `;
          }
        } else {
          e = (calc === '0') ? innerText : (calc + innerText);
        }

        this.setState({
          calc: e
        });
      }
    }

    this.setState({
      lastPressed: innerText
    });
  }

  render() {
    const handleClick = this.handleClick.bind(this);
    const { calc } = this.state;

    return (
      <div className="calculator">
        <div id="display" className="display">
          {calc}
        </div>
        <div className="nums-container">
          <button
            className="clear"
            id="clear"
            onClick={handleClick}>
            Clear
          </button>
          {nums.map(num => (
            <button
              className={`dark-grey ${num === 0 && 'big-h'}`}
              key={num}
              id={ids[num]}
              onClick={handleClick}>
              {num}
            </button>
          ))}
          <button
            className="dark-grey"
            id="decimal"
            onClick={handleClick}>
            .
          </button>
        </div>
        <div className="ops-container">
          {ops.map(op => (
            <button
              className="yellow"
              key={op}
              id={ids[op]}
              onClick={handleClick}>
              {op}
            </button>
          ))}
          <button
            className="yellow"
            id="equals"
            onClick={handleClick}>
            =
          </button>
        </div>
      </div>
    );
  }
}

export default App;