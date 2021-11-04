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
      console.log(data);
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
    <div id="quote-box">
    <div id="text">{quote}</div>
    <div id="author">{author}</div>
    <a id="#tweet-quote" href="https://twitter.com/intent/tweet">Tweet it!</a>
    <button id="new-quote" onClick={quoteAPI}>One more</button>
    </div>
  </div>
  )}

export default App;
