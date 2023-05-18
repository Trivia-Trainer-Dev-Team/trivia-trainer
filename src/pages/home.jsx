import React, { Component, useEffect, useState } from 'react';
import { useNavigate, NavLink, useLocation, Navigate } from 'react-router-dom';
import '../stylings/home-page.scss';
import DangerNoodle from '../../public/DangerNoodle.png';

//------>Full Page<-----
function HomeElement() {
  const location = useLocation();
  const { data } = location.state;
  const [ userScore, setUserScore ] = useState(data.score);
  console.log(data);

  return (
    <div id='fullHomepage'>
      <div className='quizSection'>
        <QuizSelectionBar />
      </div>
      <div className='userSection'>
        <UserContainer name={data.name} score={userScore} setScore={setUserScore}/>
      </div>
    </div>
  );
}

//------->Left Nav Bar<---------
function QuizSelectionBar() {
  return (
    <div id='QuizBar'>
      <QuizTitle />
      <QuizElements />
    </div>
  );
}

function QuizTitle() {
  return (
    <div id='QuizTitle'>
      <h3>Choose Category</h3>
    </div>
  );
}

function QuizElements() {
  // reformat this to use elements that can navigate to specific urls.
  const elements = [
    'Sports',
    'Mathematics',
    'Computers',
    'Music',
    'Games',
    'Television',
  ];

  return (
    <div id='Quizzes'>
      {elements.map((el, i) => {
        return (
          <NavLink key={i} to={`/quiz/${el}`}>
            <button>{el}</button>
          </NavLink>
        );
      })}
    </div>
  );
}

//------->Left Nav Bar<-------

//------->Center Element<--------
function UserContainer({ name, score, setScore }) {
  const [right, setRight] = useState('');

  return (
    <div className='userHolder'>
      <CenterUserData score={score} />
      <UserNav name={name} setScore={setScore} />
    </div>
  );
}

function CenterUserData({ score }) {
  return (
    <div className='center'>
      {/* These will be used as get requests later on. */}
      <div className='correctSection'>
        <h3>Questions Correct:</h3>
        <h3>{score}</h3>
      </div>
    </div>
  );
}

//------->Center/Right Element<--------

function UserNav({ name, setScore }) {
  const logOut = function () {
    fetch('/logout', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (response.ok) {
          navigate('/');
        }
      })
      .catch((err) => console.log(err));
  };

  const resetScore = function () {
    const payload = { resetValue: 0 };
    //console.log(payload); // Check the payload structure in the browser console
    fetch('/users/reset', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })
      .then((response) => {
        if (response.ok) {
          setScore(0);
          console.log('Score has been reset');
        }
      })
      .catch((err) => console.log("this is the error" + err));
  };

  return (
    <div className='userNav'>
      <div className='userInfo'>
        <UserImage />
        <UserBody name={name} />
      </div>
      <button id='logoutBtn' className='secondary-button' onClick={logOut}>
        Log Out
      </button>
      <button id='resetBtn' className='secondary-button' onClick={resetScore}>Reset Me</button>
    </div>
  );
}

function UserImage() {
  return <img src={DangerNoodle} alt='Danger Noodle' />;
}

function UserBody({ name }) {
  return <p>{name}</p>;
}

export default HomeElement;
