import React, { Component, useEffect, useState } from 'react';
import { useNavigate, NavLink, useLocation, Navigate } from 'react-router-dom';
import '../stylings/home-page.scss';
//------>Full Page<-----
function HomeElement() {
  const location = useLocation();
  const { data } = location.state;
  console.log(data);

  return (
<<<<<<< HEAD
    <div id="fullHomepage">
      <QuizSelectionBar />
      <UserContainer name={data.name} score={data.score} />
=======
    <div id='fullHomepage'>
      <div className='quizSection'>
        <QuizSelectionBar />
      </div>
      <div className='userSection'>
        <UserContainer name={data.name} score={data.score} />
      </div>
>>>>>>> dev
    </div>
  );
}

//------->Left Nav Bar<---------
function QuizSelectionBar() {
  return (
    <div id="QuizBar">
      <QuizTitle />
      <QuizElements />
    </div>
  );
}

function QuizTitle() {
  return (
<<<<<<< HEAD
    <div id="QuizTitle">
      <h3>This is the title</h3>
=======
    <div id='QuizTitle'>
      <h3>Choose Category</h3>
>>>>>>> dev
    </div>
  );
}

function QuizElements() {
  // reformat this to use elements that can navigate to specific urls.
  const elements = ['Sports', 'Mathematics', 'Computers'];

  return (
    <div id="Quizzes">
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
function UserContainer({ name, score }) {
  const [right, setRight] = useState('');

  return (
    <div className='userHolder'>
      <CenterUserData score={score} />
      <UserNav name={name} />
    </div>
  );
}

function CenterUserData({ score }) {
  return (
    <div className='center'>
      {/* These will be used as get requests later on. */}
      <div className='correctSection'>
        <h3>Questions Correct</h3>
        <span>{score}</span>
      </div>
    </div>
  );
}

//------->Center/Right Element<--------

function UserNav({ name }) {
  const navigate = useNavigate();
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

  return (
    <div className='userNav'>
      <div className='userInfo'>
        <UserImage />
        <UserBody name={name} />
      </div>
      <button id='logoutBtn' className='secondary-button' onClick={logOut}>
        Log Out
      </button>
    </div>
  );
}

function UserImage() {
  return <img src="#"></img>;
}

function UserBody({ name }) {
  return <p>{name}</p>;
}

export default HomeElement;
