import type { FieldError } from "react-hook-form";

const CONSTANTS = {
	IS_INVALID_KEYS_MIN_LENGTH: 1,
};

type ErrorValidity = {
	valid: boolean;
	invalid: boolean;
};

/**
 * Utility function for determining whether an errors object is deemed as invalid
 *
 * @param error - output from the `formState` value which is returned by the `useForm` hook call
 * @returns Whether the errors object passed in results in a valid input or invalid input
 */
export const isErrorsValid = (error?: FieldError): ErrorValidity =>
	error
		? Object.keys(error).length >= CONSTANTS.IS_INVALID_KEYS_MIN_LENGTH
			? { invalid: true, valid: false }
			: { invalid: false, valid: true }
		: { invalid: false, valid: true };
