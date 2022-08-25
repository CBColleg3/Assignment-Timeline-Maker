/* eslint-disable @typescript-eslint/no-magic-numbers -- not needed for this */
import React, { type ReactNode } from "react";
import type { AssignmentDate } from "src/@types";
import type { iAssignmentDateInfoContext } from "src/@types/AssignmentDate/iAssignmentDateInfoContext";
import type { iAssignmentDateInfoContextFormat } from "src/@types/AssignmentDate/iAssignmentDateInfoContextFormat";
import { AssignmentDateInfoContext } from "src/context";

type AssignmentInfoProviderProps = {
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
	const [dates, setDates] = React.useState<AssignmentDate[]>([]);
	const [format, setFormat] = React.useState<iAssignmentDateInfoContextFormat>("day");

	const memoProps: iAssignmentDateInfoContext = React.useMemo(
		() => ({
			addDate: (date: AssignmentDate): void => {
				setDates((oldDates) => [...oldDates, date]);
			},
			changeFormat: (fmt: iAssignmentDateInfoContextFormat) => setFormat(fmt),
			clearDates: () => setDates([]),
			dates,
			deleteDate: (ind: number) => setDates((oldDates) => oldDates.filter((_, i) => i !== ind)),
			editDate: (date: Partial<AssignmentDate>, ind: number): void => {
				setDates((oldDates) =>
					oldDates.map((eachDate, dateInd) => (dateInd === ind ? { ...eachDate, ...date } : eachDate)),
				);
			},
			end: dates[dates.length - 1],
			format,
			getEnd: () => dates[dates.length - 1],
			getStart: () => dates[0],
			insertDate: (date: AssignmentDate, ind: number): void => {
				const datesClone = [...dates];
				datesClone.splice(ind, 0, date);
				setDates(datesClone);
			},
			isEmpty: () => dates.length === 0,
			moveDate: (from: number, to: number): void => {
				const fromDate = dates[from];
				const datesClone = [...dates];
				datesClone.splice(from, 1);
				if (to < from) {
					datesClone.splice(to, 0, fromDate);
				} else if (to > from) {
					datesClone.splice(to - 1, 0, fromDate);
				}
				setDates(datesClone);
			},
			setEnd: (date: AssignmentDate): void => {
				setDates((oldDates) => [...oldDates.slice(0, oldDates.length - 1), date]);
			},
			setEndDate: (date: Date): void => {
				setDates((oldDates) =>
					oldDates.map((eachDate, ind) => (ind === oldDates.length - 1 ? { ...eachDate, date } : eachDate)),
				);
			},
			setStart: (date: AssignmentDate): void => {
				setDates((oldDates) => [date, ...oldDates.slice(1)]);
			},
			setStartDate: (date: Date): void => {
				setDates((oldDates) => oldDates.map((eachDate, ind) => (ind === 0 ? { ...eachDate, date } : eachDate)));
			},
			start: dates[0],
		}),
		[dates, format],
	);

	return <AssignmentDateInfoContext.Provider value={memoProps}>{children}</AssignmentDateInfoContext.Provider>;
};
