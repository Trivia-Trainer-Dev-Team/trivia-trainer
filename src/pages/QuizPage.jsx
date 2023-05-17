import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function QuizPage() {
  const { genre } = useParams();

  // create state object for entire list of quiz questions
  // create state for current quiz question object
  const [quizList, setQuizList] = useState([]);
  const [currQuestion, setCurrQuestion] = useState({});
  const [quizScore, setQuizScore] = useState(0);

  // create generic index variable to track moving through the quiz array
  let index = 0;

  // universal function to handle button clicks from any quiz answer choice
  const answerSubmission = (event) => {
    // pull the data from the selected button
    const answer = event.target.value;
    // if the data matches the real answer, update quizScore and userScore state
    if (answer === currQuestion.correct_answer) {
      setQuizScore((prevState) => (prevState += 1));
      updateUserScore();
    }
  };
  // set currentQuestion to the quizList[++index]
  // render a quiz question from currentQuestion information
  useEffect(async () => {
    try {
      const response = await fetch(`/questions/${genre}`);
      const data = await response.json();
      if (response.ok) {
        setQuizList(data);
      }
      console.log(quizList);
    } catch (err) {
      return `Error fetching quiz list in QuizPage.jsx. Error: ${err}`;
    }
  });

  // useEffect(() => {
  //   setCurrQuestion(quizList[index]);
  // }, [quizList]);

  return (
    <div id='question-card'>
      <div id='question-header'>{currQuestion?.question}</div>
      <div id='question-body'>
        <button id='answer1' onClick={answerSubmission}>
          {currQuestion?.correct_answer}
        </button>
        <button id='answer2' onClick={answerSubmission}>
          {currQuestion?.incorrect_answers}
        </button>
      </div>
      <div id='question-footer'>
        <button id='quit-question'>Quit</button>
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
