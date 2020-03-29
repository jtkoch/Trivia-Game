import React, {useState, useEffect} from 'react';
import { Route } from 'react-router-dom';
import './App.scss';
import axios from 'axios';
import Header from './components/Header/Header';

const App = () => {
  const [question, setQuestion] = useState({ results: [] });
  const [answer,setAnswer] = useState();

  const APIcall = () => {
    axios
      .get('https://opentdb.com/api.php?amount=1&difficulty=medium&type=boolean')
      .then(res => {
        setQuestion(res.data.results[0]);
      })
      .catch(err => console.log(err));
  }

  useEffect(() => {
    APIcall();
  }, [])

  const answerChoice = (choice) => {
    setAnswer(choice);

    if (answer === question.correct_answer) {
      console.log("correct");
      alert("correct");
      APIcall();
    } else {
      console.log("wrong");
      alert("Better luck next time")
      APIcall();
    }
  };

  return(
    <div className="App">
      <Route path="/" component={Header} />
      <div className="trivia">
        <h1 className="intro">Choose Wisely</h1>
        <div className="question-section">
          <p className="category">{question.category}</p>
          <h2 className="question">{question.question}</h2>
        </div>
        <div className="answer-section">
          <button className="answer-button" onClick={() => answerChoice("True")}>True</button>
          <button className="answer-button" onClick={() => answerChoice("False")}>False</button>
        </div>
      </div>
    </div>
  );
}

export default App;