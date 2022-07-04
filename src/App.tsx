import React from "react";
//import logo from './logo.svg';
import "./App.css";
import "react-datepicker/dist/react-datepicker.css";
import { Timeline } from "./components/Timeline";
import { Task } from "./templates/task";
import { SetDateTime } from "./components/SetDateTime";
import { FileImport } from "./components/FileImport";

function App() {

    //State
    const [startDate, setStartDate] = React.useState<Date>(new Date());
    const [endDate, setEndDate] = React.useState<Date>(new Date());
    const [taskArray, setTaskArray] = React.useState<Task[]>([]);
    const [fileImported, setFileImported] = React.useState<boolean>(false);

  return (
    <div className="Timeline-site">
      <header className="App-header">
        <p>Assignment Timeline Maker</p>
      </header>
      <SetDateTime
        startDate={startDate}
        setStartDate={(dates)=>setStartDate(dates)}
        endDate={endDate}
        setEndDate={(dates)=>setEndDate(dates)}
      />
      <FileImport
        taskArray={taskArray}
        setTaskArray={(dates)=>setTaskArray(dates)}
        fileImported={fileImported}
        setFileImported={(dates)=>setFileImported(dates)}
        startDate={startDate}
        endDate={endDate}
      />
      <Timeline        
        taskArray={taskArray}
        setTaskArray={(dates)=>setTaskArray(dates)}
        fileImported={fileImported}
        startDate={startDate}
        endDate={endDate}
      />
    </div>
  );
}

export default App;
