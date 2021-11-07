import './App.css';
import axios from 'axios'
import { useEffect, useState } from 'react';

const App = () => {
  const [quote, setQuote] = useState("");
  const[author, setAuthor] = useState("");

  const quoteAPI = async () => {
    let quoteArray = [];
    try {
      const data = await axios.get("http://quotes.stormconsultancy.co.uk/random.json");
      quoteArray = data.data;
    } catch (error) {
      console.error(error);
    }

    try {
      setQuote(quoteArray.quote);
      setAuthor(quoteArray.author);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    quoteAPI();
  },[])

  return (
    <div className="App">
      <div id="quote-box" className="card border-info mb-3">
        <div className="card-body">
        <div id="text" className="card-text">
          <i className="fas fa-quote-left"></i>
          {quote}
          <i className="fas fa-quote-right"></i>
        </div>
        <div id="author" className="card-title">- {author}</div>
        </div>
        <div className="btn btn-group">
          <a id="tweet-quote" type="button" className="btn btn-outline-primary" href="https://twitter.com/intent/tweet"><i className="fab fa-twitter"></i></a>
          <button id="new-quote" type="button" className="btn btn-outline-success" onClick={quoteAPI}>One more</button>
        </div>
      </div>
    </div>
  )
}

export default App;
