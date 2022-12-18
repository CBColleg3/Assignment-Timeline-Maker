import type { FieldError } from "react-hook-form";

/**
 * Constants for the useFormHelpers file
 */
const CONSTANTS = {
	/**
	 * The minimum number of object keys to determine if an error is invalid
	 */
	IS_INVALID_KEYS_MIN_LENGTH: 1,
};

/**
 * Whether the error type is a valid error or invalid error (valid meaning the user entered the correct value, invalid meaning the user entered incorrect values)
 */
type ErrorValidity = {
	/**
	 * The user entered in the correct value
	 */
	valid: boolean;
	/**
	 * The user entered in the wrong values
	 */
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
