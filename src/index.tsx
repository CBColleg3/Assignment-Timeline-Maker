import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./components/App";
import { AssignmentDateInfoProvider, TaskProvider } from "./provider";

ReactDOM.render(
	<React.StrictMode>
		<TaskProvider>
			<AssignmentDateInfoProvider>
				<App />
			</AssignmentDateInfoProvider>
		</TaskProvider>
	</React.StrictMode>,
	document.getElementById("root"),
);
