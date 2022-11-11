import React from "react";
import type { iAssignmentDateInfoContext } from "src/@types/AssignmentDate/iAssignmentDateInfoContext";

export const AssignmentDateInfoContext = React.createContext<iAssignmentDateInfoContext | undefined>(
	undefined,
);
