import React, { Component } from 'react';
import reactDom from 'react-dom';

//import './App.css';
// why this not work ^


function LandingPageFunction() 
{
  return (
    <div id = "Main Page" class = "main-div"> 
    <p>So if it's in a Div, then everything works? Why can't you put JS elements next to each otehr without a div? </p>

    <button on click = "TestChangeDisplay()"> change what's displayed</button>
      <h1>Landing Page</h1>
      <h2>Second</h2>
      </div>
  )
}

function TestChangeDisplay() 
{
    window.alert (" you changed display")
}

export default LandingPageFunction;