import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./components/App";
import { AssignmentDateInfoProvider, TaskProvider } from "./provider";
import { TimelineToastProvider } from "./provider/TimelineToastProvider";

ReactDOM.render(
	<React.StrictMode>
		<TimelineToastProvider>
			<TaskProvider>
				<AssignmentDateInfoProvider>
					<App />
				</AssignmentDateInfoProvider>
			</TaskProvider>
		</TimelineToastProvider>
	</React.StrictMode>,
	document.getElementById("root"),
);
