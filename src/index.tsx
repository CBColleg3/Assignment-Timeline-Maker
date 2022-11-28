import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { App } from "./components";
import { AssignmentDateInfoProvider, TaskProvider } from "./provider";
import { FilesProvider } from "./provider/FilesProvider";

ReactDOM.render(
	<React.StrictMode>
		<FilesProvider>
			<TaskProvider>
				<AssignmentDateInfoProvider>
					<App />
				</AssignmentDateInfoProvider>
			</TaskProvider>
		</FilesProvider>
	</React.StrictMode>,
	document.getElementById("root"),
);
