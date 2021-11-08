import './App.css';
const nums = [7, 8, 9, 4, 5, 6, 1, 2, 3, 0];
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
}

function App() {
  return (
      <div className="calculator">              
        <div className="nums-container">        
          {nums.map(num => (
            <button 
              className={`dark-grey ${num === 0 && 'big-h'}`} 
              key={num} 
              id={ids[num]}
             >
              {num}
            </button>
          ))}
        </div>
      </div>
  );
}

export default App;