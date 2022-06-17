import React, { useState } from 'react';
//import logo from './logo.svg';
import './App.css';
import {SetDateTime} from "./components/SetDateTime"


import "react-datepicker/dist/react-datepicker.css";

function App() {

  
  return (
    <div className="Timeline-site">
      <header className="App-header">
        <p>
          Assignment Timeline Maker
        </p>
      </header>
      <SetDateTime></SetDateTime>
    </div>
  );
}

export default App;
