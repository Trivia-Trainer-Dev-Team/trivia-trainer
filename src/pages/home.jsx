import React, { Component, useEffect, useState } from 'react';
import { useNavigate, NavLink, useLocation } from 'react-router-dom';

//------>Full Page<-----
function HomeElement() {
  const location = useLocation();
  const { data } = location.state;
  console.log(data);

  return (
    <div id='fullHomepage'>
      <QuizSelectionBar />
      <UserContainer name={data.name} />
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
      <h3>This is the title</h3>
    </div>
  );
}

function QuizElements() {
  // reformat this to use elements that can navigate to specific urls.
  const elements = ['Sports', 'Mathematics', 'Computers'];

  return (
    <div id='Quizzes'>
      {elements.map((el, i) => {
        return (
          <NavLink key={i} to={`/quiz/${el}`}>
            <span>{el}</span>
          </NavLink>
        );
      })}
    </div>
  );
}

//------->Left Nav Bar<-------

//------->Center Element<--------
function UserContainer({ name }) {
  const [right, setRight] = useState('');

  return (
    <div>
      <CenterUserData right={right} />
      <UserNav name={name} />
    </div>
  );
}

function CenterUserData({ right }) {
  return (
    <div>
      {/* These will be used as get requests later on. */}
      <span>{right}</span>
      <h5>Questions Correct</h5>
    </div>
  );
}

//------->Center/Right Element<--------

function UserNav({ name }) {
  return (
    <div>
      <UserImage />
      <UserBody name={name} />
      <ResetScore />
    </div>
  );
}

function UserImage() {
  return <img src='#'></img>;
}

function UserBody({ name }) {
  return <p>{name}</p>;
}

function ResetScore(){
  return <button id="resetScoreButton">Reset Me</button>
}

export default HomeElement;
