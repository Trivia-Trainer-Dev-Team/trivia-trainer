import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import he from 'he';

function QuizPage() {
  const { genre } = useParams();

  const [quizList, setQuizList] = useState([]);
  const [currQuestion, setCurrQuestion] = useState({});
  const [loading, setLoading] = useState(false);
  const [quizScore, setQuizScore] = useState(0);
  const [index, setIndex] = useState(0);
  const [quizEnd, setQuizEnd] = useState(false);

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

  const answerSubmission = (event) => {
    const answer = event.target.value;
    const nextIndex = index + 1;

    if (answer === currQuestion.correct_answer) {
      setQuizScore((prevScore) => prevScore + 1);
    }

    if (nextIndex >= quizList.length) {
      setQuizEnd(true);
      fetch('/users');
    } else {
      setIndex(nextIndex);
    }
  };

  return (
    <>
      {loading ? (
        <div>...Data Loading...</div>
      ) : (
        <div id='question-card'>
          {quizEnd ? (
            <div>{quizScore}</div>
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
    </>
  );
}

const QuizCard = ({ question, answerSubmit, decodeHTML }) => {
  const { question: encodedQuestion, answers } = question;

  return (
    <div>
      <div>{decodeHTML(encodedQuestion)}</div>
      {answers &&
        answers.map((answer, index) => (
          <button key={index} onClick={answerSubmit} value={answer}>
            {answer}
          </button>
        ))}
    </div>
  );
};

export default QuizPage;
