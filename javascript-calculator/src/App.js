import './App.css';
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

function App() {
  return (
    <div className="calculator">
      <div id="display" className="display">
        001236876
      </div>
      <div className="nums-container">
        <button
          className="clear"
          id="clear">
          Clear
        </button>
        {nums.map(num => (
          <button
            className={`dark-grey ${num === 0 && 'big-h'}`}
            key={num}
            id={ids[num]}>
            {num}
          </button>
        ))}
        <button
          className="dark-grey"
          id="decimal">
          .
        </button>
      </div>
      <div className="ops-container">
        {ops.map(op => (
          <button
            className="yellow"
            key={op}
            id={ids[op]}>
            {op}
          </button>
        ))}
        <button
          className="yellow"
          id="equals">
          =
        </button>
      </div>
    </div>
  );
}

export default App;