import React from "react";
import { Toast } from "react-bootstrap";
// TODO: To be removed in future versions

const NOTIFICATION_DEFAULT_DELAY = 3000;

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

type GeneratedToastPropTypes = {
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
const GeneratedToast = ({ message, header, variant, delay }: GeneratedToastPropTypes): JSX.Element => {
	const [show, setShow] = React.useState<boolean>(true);
	return (
		<Toast
			animation
			autohide
			bg={variant ?? "primary"}
			delay={delay ?? NOTIFICATION_DEFAULT_DELAY}
			onClose={(): void => setShow(false)}
			show={show}
		>
			{header && (
				<Toast.Header
					className="d-flex flex-row justify-content-between"
					closeButton
				>
					{header}
				</Toast.Header>
			)}
			<Toast.Body>{message ?? "No message supplied"}</Toast.Body>
		</Toast>
	);
};

GeneratedToast.defaultProps = {
	delay: NOTIFICATION_DEFAULT_DELAY,
	header: undefined,
	variant: "primary",
};

export {
	GeneratedToast,
	type AVAILABLE_VARIANTS,
	NOTIFICATION_MIN_LENGTH,
	TOAST_CONTAINER_POSITION,
	NOTIFICATION_DEFAULT_DELAY,
};
