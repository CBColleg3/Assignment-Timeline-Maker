import "./App.css";
import "react-datepicker/dist/react-datepicker.css";

import { FileImport } from "./components/FileImport";
import React from "react";
import { SetDateTime } from "./components/Date/SetDateTime";
import type { Task } from "./interfaces/task";
import { Timeline } from "./components/Timeline";

/** 
 * Root element
 * 
 * @returns {JSX.Element} The main app component
 */
const App = (): JSX.Element => {
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
				setStartDate={(dates) => setStartDate(dates)}
				endDate={endDate}
				setEndDate={(dates) => setEndDate(dates)}
			/>
			<FileImport
				taskArray={taskArray}
				setTaskArray={(dates) => setTaskArray(dates)}
				fileImported={fileImported}
				setFileImported={(dates) => setFileImported(dates)}
			/>
			<Timeline
				taskArray={taskArray}
				setTaskArray={(dates) => setTaskArray(dates)}
				fileImported={fileImported}
				startDate={startDate}
				endDate={endDate}
			/>
		</div>
	);
};

export default App;
