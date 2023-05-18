import React, { useState, useEffect } from 'react';
import { Navigate, useParams, useNavigate } from 'react-router-dom';
import he from 'he';

function QuizPage() {
  const navigate = useNavigate();
  const { genre } = useParams();

  const [quizList, setQuizList] = useState([]);
  const [currQuestion, setCurrQuestion] = useState({});
  const [loading, setLoading] = useState(false);
  const [quizScore, setQuizScore] = useState(0);
  const [index, setIndex] = useState(0);
  const [quizEnd, setQuizEnd] = useState(false);
  const [showAnswerFeedback, setShowAnswerFeedback] = useState(false);
  const [correctAnswer, setCorrectAnswer] = useState(null);

  const fetchQuizData = () => {
    setLoading(true);
    fetch(`/questions/${genre}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setQuizList(data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchQuizData();
  }, []);

  useEffect(() => {
    if (quizList.length > 0) {
      console.log('quizList:', quizList);
      console.log('index:', index);
      const currentQuestion = quizList[index];
      console.log('currentQuestion:', currentQuestion);
      const { correct_answer, incorrect_answers } = currentQuestion;

      // Shuffle the answer choices
      const shuffledAnswers = shuffle([correct_answer, ...incorrect_answers]);

      setCurrQuestion({
        ...currentQuestion,
        answers: shuffledAnswers,
      });
    }
  }, [quizList, index]);

  //helper functions
  const decodeHTML = (html) => {
    const textarea = document.createElement('textarea');
    textarea.innerHTML = html;
    return textarea.value;
  };

  function shuffle(array) {
    let currentIndex = array.length,
      randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex != 0) {
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }
    return array;
  }

  function resetShowFeedback() {
    setShowAnswerFeedback(false);
    setCorrectAnswer(null);
  }

  const answerSubmission = async (event) => {
    const answer = event.target.value;
    const nextIndex = index + 1;

    if (answer === currQuestion.correct_answer) {
      setQuizScore((prevScore) => prevScore + 1);
      setCorrectAnswer(true);
      setShowAnswerFeedback(true);
    } else {
      setCorrectAnswer(false);
      setShowAnswerFeedback(true);
    }

    if (nextIndex >= quizList.length) {
      await fetch('/users', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ correctAnswer: quizScore }),
      });
      setQuizEnd(true);
    } else {
      setIndex(nextIndex);
    }
  };

  const goBack = async function () {
    try {
      const response = await fetch('/users/cookie', {
        method: 'get',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const [data] = await response.json();
      console.log('This is the data', data);
      if (data) {
        navigate('/home', { state: { data } });
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      {loading ? (
        <div>...Data Loading...</div>
      ) : (
        <div id='question-card'>
          {quizEnd ? (
            <Congratulations correct={quizScore} goBackFunc={goBack} />
          ) : (
            <>
              <QuizCard
                question={currQuestion}
                answerSubmit={answerSubmission}
                decodeHTML={decodeHTML}
              />
            </>
          )}
        </div>
      )}
      <div id='feedbackModal'>
        {showAnswerFeedback ? (
          <AnswerFeedback
            correctAnswer={correctAnswer}
            resetShowFeedback={resetShowFeedback}
          />
        ) : null}
      </div>
    </>
  );
}

const QuizCard = ({ question, answerSubmit, decodeHTML }) => {
  const { question: encodedQuestion, answers } = question;
  const arrayOfLetters = ['A:    ', 'B:    ', 'C:    ', 'D:    '];

  return (
    <div id='quiz-card'>
      <div id='quiz-question'>{decodeHTML(encodedQuestion)}</div>
      {answers &&
        answers.map((answer, index) => (
          <button
            id='quiz-button'
            key={index}
            onClick={answerSubmit}
            value={decodeHTML(answer)}
          >
            {arrayOfLetters[index]}
            {decodeHTML(answer)}
          </button>
        ))}
    </div>
  );
};

const AnswerFeedback = ({ correctAnswer, resetShowFeedback }) => {
  // a modal displaying "Correct" or "Incorrect"
  return (
    <div id='feedbackContainer'>
      <div id='feedbackMessage'>
        {correctAnswer ? <h1>Correct! :)</h1> : <h1>Incorrect :(</h1>}
      </div>
      <button id='answerFeedbackButton' onClick={() => resetShowFeedback()}>
        OK
      </button>
    </div>
  );
};

const Congratulations = ({ correct, goBackFunc }) => {
  return (
    <div id='congrats-page'>
      <div id='congrats-message'>
        {' '}
        Congratulations! You got {correct} correct!
        <button id='home-button' onClick={goBackFunc}>
          Go Back to Home!
        </button>
      </div>
    </div>
  );
};

export default QuizPage;
