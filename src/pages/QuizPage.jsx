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
      setCurrQuestion(quizList[index]);
    }
  }, [quizList, index]);

  const decodeHTML = (html) => {
    const textarea = document.createElement('textarea');
    textarea.innerHTML = html;
    return textarea.value;
  };

  const answerSubmission = (event) => {
    const answer = event.target.value;
    setIndex((prevIndex) => prevIndex + 1);

    if (answer === currQuestion.correct_answer) {
      setQuizScore((prevScore) => prevScore + 1);
    }

    if (index + 1 >= quizList.length) {
      setQuizEnd(true);
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
              <div>{currQuestion && decodeHTML(currQuestion.question)}</div>
              <button
                onClick={answerSubmission}
                value={currQuestion.correct_answer}
              >
                Submit Answer
              </button>
            </>
          )}
        </div>
      )}
    </>
  );
}

export default QuizPage;
