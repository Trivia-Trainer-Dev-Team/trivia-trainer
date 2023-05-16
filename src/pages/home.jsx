import React, { Component, useState } from 'react';
import { useNavigate } from 'react-router-dom';

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
  const elements = ['Movies', 'Science', 'c', 'd', 'e'];

  return (
    <div id='Quizzes'>
      {elements.map((el, i) => {
        <NavLink key={i} to={`/quizPage/${el}`}>
          <span>{el}</span>
        </NavLink>;
      })}
    </div>
  );
}

//------->Left Nav Bar<-------

//------->Center Element<--------
function UserContainer() {
  return (
    <div>
      <CenterUserData />
      <UserNav />
    </div>
  );
}

function CenterUserData() {
  return (
    <div>
      {/* These will be used as get requests later on. */}
      <span>5</span>
      <span>/</span>
      <span>10</span>
      <h5>Questions Correct</h5>
    </div>
  );
}

//------->Center/Right Element<--------

function UserNav() {
  return (
    <div>
      <UserImage />
      <UserBody />
    </div>
  );
}

function UserImage() {
  return <img src='#'></img>;
}

function UserBody() {
  return <p>Hello World!</p>;
}

export default HomeElement;
