import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { type ReactNode } from "react";
import { Alert } from "react-bootstrap";

/**
 * The variant of the timeline alert, specifies the theme. See https://getbootstrap.com/docs/5.2/utilities/background/ for a list of all the backgrounds
 */
type TimelineAlertVariant =
	| "danger"
	| "dark"
	| "info"
	| "light"
	| "primary"
	| "secondary"
	| "success"
	| "warning";

/**
 * The props available to use with the TimelineAlert component
 */
type TimelineAlertProps = {
	/**
	 * The body of the timeline alert, can either be a string or an react component.
	 */
	body?: ReactNode | string;
	/**
	 * The custom class name that can be supplied to the body element of the TimelineAlert
	 */
	bodyClassName?: string;
	/**
	 * The custom class name that can be supplied to the 
	 */
	componentClassName?: string;
	/**
	 * Whether the alert should be dismissible or not, boolean value
	 */
	dismissible?: boolean;
	/**
	 * CSS override for the header of the alert
	 */
	headerClassName?: string;
	/**
	 * A link to an external resource, can either be an full React component or just a string to display
	 */
	link?: ReactNode | string;
	/**
	 * The CSS override for the link component
	 */
	linkClassName?: string;
	/**
	 * Callback that fires once the alert is removed
	 */
	onClose?: (_a: unknown, _b: unknown) => void;
	/**
	 * Boolean controlling whether the alert is showing or not
	 */
	show?: boolean;
	/**
	 * The subtitle of the alert, can either be a full React component or a string to be displayed
	 */
	subtitle?: ReactNode | string;
	/**
	 * The CSS override for the subtitle component
	 */
	subtitleClassName?: string;
	/**
	 * The title of the alert, can either be a ReactNode or a string to display
	 */
	title?: ReactNode | string;
	/**
	 * The CSS override for the title component
	 */
	titleClassName?: string;
	/**
	 * The theme of the alert, which color scheme to configure the alert in
	 */
	variant?: TimelineAlertVariant;
};

/**
 * Utility component to avoid repeated code and conform the styles/implementation to one shared component
 *
 * @param props - The properties of the component, specify the classnames for each individual part, and the content for each individual part
 * @param props.body - The main content of the alert
 * @param props.bodyClassName - The className of the body, used for styling purposes
 * @param props.componentClassName - The className for the overarching component
 * @param props.dismissible - Whether the alert is dismissible or not, defaults to false
 * @param props.headerClassName - The className for the alert's header, if a title is present
 * @param props.link - The content for the alert's link
 * @param props.linkClassName - The className for the alert's link
 * @param props.onClose - Function that fires when the alert closes, defaults to undefined
 * @param props.show - Whether the show the alert or not, defaults to true
 * @param props.subtitle - The subtitle content
 * @param props.subtitleClassName - The className for the alert's subtitle
 * @param props.title - The content for the Alert's title
 * @param props.titleClassName - The className for the Alert's title
 * @param props.variant - The variant for the alert component
 * @returns The modified alert for the consumer
 */
export const TimelineAlert = ({
	body,
	bodyClassName,
	componentClassName,
	dismissible = false,
	headerClassName,
	link,
	linkClassName,
	onClose = undefined,
	show = true,
	subtitle,
	subtitleClassName,
	title,
	titleClassName,
	variant,
}: TimelineAlertProps): JSX.Element => (
	<Alert
		className={componentClassName ?? ""}
		dismissible={dismissible}
		onClose={onClose}
		show={show}
		variant={variant ?? "primary"}
	>
		{title && (
			<Alert.Heading className={headerClassName ?? ""}>
				{subtitle ? (
					<div className="d-flex flex-column">
						<div className={titleClassName ?? ""}>{title}</div>
						<div className={subtitleClassName ?? ""}>{subtitle}</div>
					</div>
				) : (
					<div className={titleClassName ?? ""}>{title}</div>
				)}
			</Alert.Heading>
		)}
		{body && (
			<>
				<FontAwesomeIcon
					className="me-2"
					icon={faCircleInfo}
				/>
				<span className={bodyClassName ?? ""}>{body}</span>
			</>
		)}
		{link && <Alert.Link className={linkClassName ?? ""}>{link}</Alert.Link>}
	</Alert>
);
