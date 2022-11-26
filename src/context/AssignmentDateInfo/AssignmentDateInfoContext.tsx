import React from "react";
import type { iAssignmentDateInfoContext } from "src/@types/AssignmentDate/iAssignmentDateInfoContext";

/**
 * The context object, which contains either the AssignmentDateInfoContext or undefined. Read more here: https://reactjs.org/docs/context.html
 *
 * We provide the context to all children components using a component called `AssignmentDateInfoContext.Provider` and giving it the initial value to provide to all it's children in it's `value` prop.
 * All children of the `AssignmentDateInfoContext.Provider` component access/edit the context using the hook `useAssignmentDateInfoContext` within it's own internal logic, because it is a child, it has access to the context.
 *
 * AssignmentDateInfoContext is a state that consists an object that contains the following keys:
 * - addDate
 *      - Adds a date to the collection by using a function that takes in an date `_date` and mutating it's internal state, returns void
 * - changeFormat
 * 		- Changes the internal format of the dates via the `_fmt` value provided, can be one of hours, minutes, seconds. Internally mutates it's state, so returns void.
 * - changingDate
 * 		- Designates whether the user is changing the date, which signals that changes are preparing to be made to the tasks
 * - clearDates
 * 		- Clears all the dates from the internal dates collection, function that takes in no arguments and returns nothing due to internal mutation
 * - dates
 * 		- The array of `AssignmentDate` objects that the state internally uses to layout the timeline
 * - deleteDate
 * 		- Deletes a date at the index `_ind` within the internal array of dates
 * - editDate
 * 		- Edits a date using a partial date `_date` and the index `_ind` to specify which date is being edited
 * - end
 * 		- The end of the internal date collection, represents of the end of the "timeline"
 * - format
 * 		- The date format, which means whether we are calculating dates in respect to days only, weeks only, minutes only, etc.
 * - insertDate
 * 		- Inserts a date into the internal date collection using a function taking the arguments `_date` which is the inserted date, and `_ind` which is the index where we are inserting the date. Returns nothing due to internal mutation
 * - moveDate
 * 		- Moves a date within the internal date collection using a function taking the arguments `_from` which is the index where the date is currently located, and `_to` which is the index where we are moving the date to. Returns nothing due to internal mutation
 * - setEnd
 * 		- Sets the end of the internal date collection using a function taking the argument `_date` which is the end date. Returns nothing due to internal mutation
 * - setEndDate
 * 		- Sets the date field of the end date of the internal date collection, using a function that takes in the argument `_date` which is the date we are overriding the end date with. Returns nothing due to internal mutation
 * - setStart
 * 		- Sets the start of the internal date collection, using a function that takes in a start date `_date` which is used to set the start date of the collection. Returns nothing due to internal mutation
 * - setStartDate
 * 		- Sets the start date of the internal date collection, using a function that takes in the new date field of the start date, `_date`. Returns nothing due to internal mutation
 * - start
 * 		- The start of the internal date collection, represents the beginning of the "timeline"
 *
 */
export const AssignmentDateInfoContext: React.Context<iAssignmentDateInfoContext | undefined> =
	React.createContext<iAssignmentDateInfoContext | undefined>(undefined);
