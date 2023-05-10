/* eslint-disable react-hooks/exhaustive-deps */
import "./App.css";
import { useState, useEffect } from "react";
import { FaTwitterSquare, FaQuoteLeft } from "react-icons/fa";

const App = () => {
  const [quote, setQuote] = useState("");
  const [author, setAuthor] = useState("");
  const [color, setColor] = useState("");

  const  getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';

    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }

    return color;
  }
  const fetchQuote = async () => {
    try {
      const response = await fetch("https://api.quotable.io/random");
      const data = await response.json();
      setQuote(data.content);
      setAuthor(data.author);
      setColor(getRandomColor)
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchQuote();
  },[]);

  const tweetText = encodeURIComponent(`"${quote}" - ${author}`);
  const tweetUrl = `https://twitter.com/intent/tweet?text=${tweetText}`;

  return (
    <div className="App" style={{backgroundColor: color}}>
      <div id="quote-box" >
      <h2 id="text" style={{color: color}}> <FaQuoteLeft id="quote" color={color} /> {quote} </h2>
      <p id="author" style={{color: color}}> - {author} </p>
      <button id="new-quote" style={{backgroundColor: color, color: '#fff'}}onClick={fetchQuote}>
        New Quote
      </button>
      <a id="tweet-quote" href={tweetUrl} target="_blank" rel="noreferrer">
        <FaTwitterSquare id="twitter" color={color} />
      </a>
      </div>
    </div>
  );
}

export default App;
