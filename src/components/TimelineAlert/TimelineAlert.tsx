import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { type ReactNode } from "react";
import { Alert } from "react-bootstrap";

type TimelineAlertVariant =
	| "danger"
	| "dark"
	| "info"
	| "light"
	| "primary"
	| "secondary"
	| "success"
	| "warning";

type TimelineAlertProps = {
	body?: ReactNode | string;
	bodyClassName?: string;
	componentClassName?: string;
	dismissible?: boolean;
	headerClassName?: string;
	link?: ReactNode | string;
	linkClassName?: string;
	onClose?: (_a: unknown, _b: unknown) => void;
	show?: boolean;
	subtitle?: ReactNode | string;
	subtitleClassName?: string;
	title?: ReactNode | string;
	titleClassName?: string;
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
