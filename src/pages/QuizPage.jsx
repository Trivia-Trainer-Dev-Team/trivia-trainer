import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

function QuizPage() {
  // quizGenre is the category of
  const { quizGenre } = useParams();
  // create state object for entire list of quiz questions
  // create state for current quiz question object
  const [quizList, setQuizList] = useState([]);
  const [currQuestion, setCurrQuestion] = useState({});
  const [quizScore, setQuizScore] = useState(0);
  // create generic index variable to track moving through the quiz array
  const index = 0;
  // fetch request to server for list of quiz questions based on quiz category type on page load
  // sets the state of entire quiz list and sets current question to first element of list
  const fetchQuizList = async () => {
    try {
      const response = await fetch(`/questions/${quizGenre}`);
      const data = response.json();
      if (response.ok) {
        setQuizList(data);
        setCurrQuestion(quizList[index]);
      }
      return data;
    } catch (err) {
      return `Error fetching quiz list in QuizPage.jsx. Error: ${err}`;
    }
  };

  const updateUserScore = async () => {
    // put request to user's datbase profile that updates their lifetime score
    // *** UNFINISHED FETCH REQUEST ***
    try {
      const response = await fetch('/users', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(1),
      });
      return response.json();
    } catch (err) {
      return `Error sending put request to server in QuizPage.jsx. Error: ${err}`;
    }
  };

  // universal function to handle button clicks from any quiz answer choice
  const answerSubmission = (event) => {
    // pull the data from the selected button
    const answer = event.target.value;
    // if the data matches the real answer, update quizScore and userScore state
    if (answer === currQuestion.correct_answer) {
      setQuizScore(quizScore + 1);
    }
  };
  // set currentQuestion to the quizList[++index]
  // render a quiz question from currentQuestion information

  return (
    <div id='question-card'>
      <div id='question-header'>{currQuestion.question}</div>
      <div id='question-body'>
        <button id='answer1' type='button'>
          {currQuestion.correct_answer}
        </button>
        <button id='answer2' type='button'>
          {currQuestion.incorrect_answers[0]}
        </button>
        <button id='answer3' type='button'>
          {currQuestion.incorrect_answers[1]}
        </button>
        <button id='answer4' type='button'>
          {currQuestion.incorrect_answers[2]}
        </button>
      </div>
      <div id='question-footer'>
        <button id='quit-question' type='button'>
          Quit
        </button>
      </div>
    </div>
  );
}

export default QuizPage;

/* {
  category: 'science: computers',
  type: 'multiple',
  diffulty: 'medium',
  question: 'On which day did the World Wide Web go online?',
  correct_answer: 'December 20, 1990',
  incorrect_answers: [
  'December 17, 1996',
  'November 12, 1990',
  'November 24, 1995',
  ]
  }, */
