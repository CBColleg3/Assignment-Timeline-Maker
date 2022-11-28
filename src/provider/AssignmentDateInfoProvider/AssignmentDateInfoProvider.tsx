/* eslint-disable @typescript-eslint/no-magic-numbers -- not needed for this */
import React, { type ReactNode } from "react";
import type {
	AssignmentDate,
	iAssignmentDateInfoContextFormat,
	iAssignmentDateInfoContext,
} from "src/@types";
import { AssignmentDateInfoContext, useTaskContext } from "src/context";
import {
	updateDueDates,
	generateInitialAssignmentDateInfoDates,
	updateDateRange,
	calcDayRange,
	generateAssignmentDatesFromStartEnd,
} from "src/helpers";

type AssignmentInfoProviderProps = {
	// React component that is "wrapped" by the parent, aka <div><random /></div> (random is the "children" of div)
	children: ReactNode;
};

/**
 * HOC wrapper providing initial values of the context to the child component
 *
 * @param props The properties of the HOC context provider
 * @param props.children The children of the HOC context provider
 * @returns Children wrapped with AssignmentDateInfoContext initial value
 */
export const AssignmentDateInfoProvider = ({ children }: AssignmentInfoProviderProps): JSX.Element => {
	const [dates, setDates] = React.useState<AssignmentDate[]>(generateInitialAssignmentDateInfoDates());
	const [format, setFormat] = React.useState<iAssignmentDateInfoContextFormat>("day");

	const functionalProps = React.useMemo(
		() => ({
			addDate: (date: AssignmentDate): void => {
				setDates((oldDates) => [...oldDates, date]);
			},
			changeFormat: (fmt: iAssignmentDateInfoContextFormat): void => {
				setFormat(fmt);
			},
			clearDates: () => setDates([]),
			deleteDate: (ind: number) => setDates((oldDates) => oldDates.filter((_, i) => i !== ind)),
			editDate: (date: Partial<AssignmentDate>, ind: number): void => {
				setDates((oldDates) =>
					oldDates.map((eachDate, dateInd) => (dateInd === ind ? { ...eachDate, ...date } : eachDate)),
				);
			},
			insertDate: (date: AssignmentDate, ind: number): void => {
				setDates((oldDates) => {
					if (oldDates) {
						const datesClone = [...oldDates];
						datesClone.splice(ind, 0, date);
						return datesClone;
					}
					return oldDates;
				});
			},
			moveDate: (from: number, to: number): void => {
				setDates((oldDates) => {
					if (oldDates) {
						const fromDate = oldDates[from];
						const datesClone = [...oldDates];
						datesClone.splice(from, 1);
						if (to < from) {
							datesClone.splice(to, 0, fromDate);
						} else if (to > from) {
							datesClone.splice(to - 1, 0, fromDate);
						}
						return datesClone;
					}
					return oldDates;
				});
			},
			setEnd: (date: AssignmentDate): void => {
				setDates((oldDates) => generateAssignmentDatesFromStartEnd(oldDates[0], date));
			},
			setEndDate: (date: Date): void => {
				setDates((oldDates: AssignmentDate[]) =>
					generateAssignmentDatesFromStartEnd({ ...oldDates[0] }, { ...oldDates[oldDates.length - 1], date }),
				);
			},
			setStart: (date: AssignmentDate): void => {
				setDates((oldDates) => generateAssignmentDatesFromStartEnd(oldDates[0], date));
			},
			setStartDate: (date: Date): void => {
				setDates((oldDates: AssignmentDate[]) =>
					generateAssignmentDatesFromStartEnd({ ...oldDates[0], date }, oldDates[oldDates.length - 1]),
				);
			},
		}),
		[],
	);

	const memoProps: iAssignmentDateInfoContext = React.useMemo(
		() => ({
			...functionalProps,
			dates,
			end: dates.length === 1 ? dates[0] : dates[dates.length - 1],
			format,
			start: dates[0],
		}),
		[dates, format, functionalProps],
	);

	return (
		<AssignmentDateInfoContext.Provider value={memoProps}>{children}</AssignmentDateInfoContext.Provider>
	);
};
