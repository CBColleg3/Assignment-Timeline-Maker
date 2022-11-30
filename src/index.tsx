import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { App } from "./components";
import { AssignmentDateInfoProvider, TaskProvider } from "./provider";
import { FilesProvider } from "./provider/FilesProvider";

/**
 * The root component, where we render the entire application. As you can see, we are instantiating all the providers here so all the children of it, which is the entire application.
 * Is able to access the provider's state. Pay attention to the order of the provider's though, as the FilesProvider cannot access anything related to the AssignmentDateInfoContext,
 * and likewise for the AssignmentDateInfoProvider and accessing the TaskContext state.
 */
ReactDOM.render(
	<React.StrictMode>
		<FilesProvider>
			<AssignmentDateInfoProvider>
				<TaskProvider>
					<App />
				</TaskProvider>
			</AssignmentDateInfoProvider>
		</FilesProvider>
	</React.StrictMode>,
	document.getElementById("root"),
);
