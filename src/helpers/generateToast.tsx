import React from "react";
import { Toast } from "react-bootstrap";

const CONSTANTS = {
	DEFAULT_DELAY: 3000,
};

const NOTIFICATION_MIN_LENGTH = 0;

const TOAST_CONTAINER_POSITION = "top-end";

type AVAILABLE_VARIANTS =
	| "danger"
	| "dark"
	| "info"
	| "light"
	| "primary"
	| "secondary"
	| "success"
	| "warning";

type generateToastParamTypes = {
	message: string;
	header?: string;
	variant?: AVAILABLE_VARIANTS;
	delay?: number;
};

/**
 * Utility function to make creating a toast for the root ToastContainer easy
 *
 * @param {generateToastParamTypes} args The arguments that constitute the toast
 * @returns The rendered Toast
 */
const generateToast = ({ message, header, variant, delay }: generateToastParamTypes): JSX.Element => (
	<Toast
		animation
		autohide
		bg={variant ?? "primary"}
		delay={delay ?? CONSTANTS.DEFAULT_DELAY}
		show
	>
		{header && <Toast.Header closeButton>{header}</Toast.Header>}
		<Toast.Body>{message ?? "No message supplied"}</Toast.Body>
	</Toast>
);

export { generateToast, type AVAILABLE_VARIANTS, NOTIFICATION_MIN_LENGTH, TOAST_CONTAINER_POSITION };
