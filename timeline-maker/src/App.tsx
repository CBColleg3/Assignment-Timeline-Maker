import React, { useState } from 'react';
//import logo from './logo.svg';
import './App.css';
import {SetDateTime} from "./components/SetDateTime"
import {FileImport} from "./components/FileImport"

import "react-datepicker/dist/react-datepicker.css";

function App() {

  
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Assignment Timeline Maker
        </p>
      </header>
      <SetDateTime></SetDateTime>
      <FileImport></FileImport>
    </div>
  );
}

export default App;
