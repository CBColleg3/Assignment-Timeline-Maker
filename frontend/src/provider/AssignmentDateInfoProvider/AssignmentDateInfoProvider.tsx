/* eslint-disable @typescript-eslint/no-magic-numbers -- not needed for this */
import React, { type ReactNode } from "react";
import type {
	AssignmentDate,
	iAssignmentDateInfoContextFormat,
	iAssignmentDateInfoContext,
} from "src/@types";
import { AssignmentDateInfoContext } from "src/context";
import {
	generateInitialAssignmentDateInfoDates,
	generateAssignmentDatesFromStartEnd,
} from "src/helpers";

type ChangingFormat = {
	changing: boolean;
	type: iAssignmentDateInfoContextFormat;
	updateTasks?: boolean;
	values?: AssignmentDate[];
};

type AssignmentInfoProviderProps = {
	// React component that is "wrapped" by the parent, aka <div><random /></div> (random is the "children" of div)
	children: ReactNode;
};

/**
 * HOC that passes down the task context to any child.
 * - **Read more about HOC components: https://reactjs.org/docs/higher-order-components.html.**
 * - **Read more about context: https://reactjs.org/docs/context.html**
 *
 * @param props The properties of the component, read more about properties here: https://reactjs.org/docs/components-and-props.html
 * @param props.children The child component that will be receiving the AssignmentDateInfo context, read more about the special children prop here: https://reactjs.org/docs/composition-vs-inheritance.html *(Containment section)*
 * @returns The wrapped child component
 */
const AssignmentDateInfoProvider = ({ children }: AssignmentInfoProviderProps): JSX.Element => {
	/**
	 * The currently selected date, which is selected via the table of contents
	 */
	const [currentSelectedDate, setCurrentSelectedDate] = React.useState<AssignmentDate | undefined>(
		undefined,
	);
	/**
	 * The array of dates the user generates by selecting an `start` and `end` date
	 */
	const [dates, setDates] = React.useState<AssignmentDate[]>(generateInitialAssignmentDateInfoDates());
	/**
	 * The format of the dates, can be set to either days, hours, minutes, seconds, etc. Specification of all formats available can be checked in the `iAssignmentDateInfoContextFormat` type
	 */
	const [format, setFormat] = React.useState<iAssignmentDateInfoContextFormat>("day");
	/**
	 * Changing the format of the AssignmentDates
	 */
	const [formatMutating, setFormatMutating] = React.useState<ChangingFormat>({
		changing: false,
		type: format,
	});

	/**
	 * This function propagates the changed dates up to the TaskProvider, without having any complex state
	 *
	 * @param newDates - The new assignment dates we must update the tasks with
	 */
	const updateTaskDates = (newDates: AssignmentDate[]): void => {
		setFormatMutating((oldFormatMutating: ChangingFormat) => ({
			...oldFormatMutating,
			updateTasks: true,
			values: newDates,
		}));
		setFormatMutating((oldFormatMutating: ChangingFormat) => ({
			...oldFormatMutating,
			updateTasks: false,
			values: undefined,
		}));
	};

	/**
	 * This is a little more complicated then the useEffects above. This is using the `useMemo` hook, which is a powerful hook if used correctly. The general standard practice is, when dealing with
	 * objects, and specifically using them to supply the Provider a value. You must memoize them or else it results in lots of unnecessary re-renders. This is basically, memoizing the functional props of
	 * the provider, and making it so whenever we try to recalculate the value of `functionalProps`, we check if the dependency is completely different from the past one, and that the value of the dependency is not
	 * the same as the one before the changed one. If that is the case, then we already have calculated the value, so therefore we just return the value without running any complex computations. This is especially helpful for
	 * objects. React has a tendency to treat values as different by examining their memory addresses, an object can have completely the same values, but if it differs in the memory address, then React treats it as a different value.
	 * You can read more about the useMemo hook here: https://reactjs.org/docs/hooks-reference.html#usememo
	 * --
	 * Specifically, this property is memoized to prevent unnecessary renders where the object is technically different but the contents are different, which is a common practice when utilizing objects
	 * and Provider values.
	 */
	const functionalProps: Partial<iAssignmentDateInfoContext> = React.useMemo(
		() => ({
			addDate: (date: AssignmentDate): void => {
				setDates((oldDates) => [...oldDates, date]);
			},
			changeFormat: (fmt: iAssignmentDateInfoContextFormat): void => {
				setFormatMutating({ changing: true, type: fmt });
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
			setCurrentlySelectedDate: (date: AssignmentDate | undefined): void => {
				setCurrentSelectedDate(date);
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

	/**
	 * We apply the same practice as described above, and make sure that we memoize our Provider value, **especially** if it is an object. This will save us a ton of unnecessary renders.
	 * --
	 * What this object, `filesMemo` is specifically doing, is combining both the `functionalProps` described above, with the local state of this provider. They combine together to form
	 * a fully complete iFilesContext value. Which we then pass into the Provider's value, for the children to consume it.
	 */
	const memoProps: iAssignmentDateInfoContext = React.useMemo(
		() => ({
			...(functionalProps as unknown as iAssignmentDateInfoContext),
			changingFormat: formatMutating,
			currentSelectedDate,
			dates,
			end: dates.length === 1 ? dates[0] : dates[dates.length - 1],
			format,
			start: dates[0],
		}),
		[currentSelectedDate, dates, formatMutating, format, functionalProps],
	);

	/**
	 * Triggers when the `fmtMutating` value is changed, which happens when the user changes the AssignmentDate format.
	 *
	 * The anonymous function sets `fmtMutating` to false, and also sets the dates according to the format
	 */
	React.useEffect(() => {
		if (formatMutating.changing) {
			setDates((oldDates) => {
				const newDates = generateAssignmentDatesFromStartEnd(
					oldDates[0],
					oldDates[oldDates.length - 1],
					false,
					formatMutating.type,
				);
				updateTaskDates(newDates);
				return newDates;
			});
			setFormat(formatMutating.type);
			setFormatMutating((oldMutating: ChangingFormat) => ({
				...oldMutating,
				changing: false,
				updateTasks: true,
			}));
		}
	}, [formatMutating]);

	/**
	 * Returning AssignmentDateInfoContext.Provider which is supplied the value of `memoProps` due to the reasons specified in the above documentation. That Provider is wrapping the `children` prop
	 * which is also described and linked to in the documentation above. Because we are rendering the children as a child of this provider, the entire value of that `children` prop is able to access the provider's value
	 * without any errors.
	 */
	return (
		<AssignmentDateInfoContext.Provider value={memoProps}>{children}</AssignmentDateInfoContext.Provider>
	);
};

export { AssignmentDateInfoProvider, type ChangingFormat };
