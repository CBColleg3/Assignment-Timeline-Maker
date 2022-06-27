import React from "react";
//import logo from './logo.svg';
import "./App.css";
import "react-datepicker/dist/react-datepicker.css";
import { Timeline } from "./components/Timeline";

function App() {
  return (
    <div className="Timeline-site">
      <header className="App-header">
        <p>Assignment Timeline Maker</p>
      </header>
      <Timeline></Timeline>
    </div>
  );
}

export default App;
