import './App.css';
import axios from 'axios'
import { useEffect, useState } from 'react';

const App = () => {
  const [quote, setQuote] = useState("");
  const[author, setAuthor] = useState("");

  const quoteAPI = async () => {
    let quoteArray = [];
    try {
      const data = axios.get("http://quotes.stormconsultancy.co.uk/random.json");
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    quoteAPI();
  },[])

  return<div className="App"> Hello World!</div>
}

export default App;
