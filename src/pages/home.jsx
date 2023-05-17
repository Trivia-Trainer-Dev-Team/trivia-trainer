import React, { Component, useEffect, useState } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';

//------>Full Page<-----
function HomeElement() {
  return (
    <div id='fullHomepage'>
      <QuizSelectionBar />
      <UserContainer />
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
        <NavLink key={i} to={`/QuizPage/${el}`}>
          <span>{el}</span>
        </NavLink>;
      })}
    </div>
  );
}

//------->Left Nav Bar<-------

//------->Center Element<--------
function UserContainer() {
  const [name, setName] = useState('');
  const [right, setRight] = useState('');

  // useEffect(()=>{
  //     const retrieveUserData = async() =>{
  //         try {
  //             const response = await fetch('/users');
  //             const data = await response.json();
  //             const {questionsRight, name} = data;
  //             setName(name);
  //             setRight(questionsRight);
  //         } catch (err){
  //             console.log(err);
  //         }
  //     }
  // })

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
    </div>
  );
}

function UserImage() {
  return <img src='#'></img>;
}

function UserBody({ name }) {
  return <p>{name}</p>;
}

export default HomeElement;
