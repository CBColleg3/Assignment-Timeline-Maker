import React from "react";
import { Tooltip } from "react-bootstrap";
import type { OverlayInjectedProps } from "react-bootstrap/esm/Overlay";

/**
 * Utility function for generating a tooltip to display when the user hovers over an OverlayTrigger component
 *
 * @param props - The injected props from the OverlayTrigger component
 * @param text - The text to display in the Tooltip
 * @returns The Tooltip that will render when the user hovers over the OverlayTrigger area
 */
export const renderOverlayTriggerTooltip = (props: OverlayInjectedProps, text?: string): JSX.Element => (
	<Tooltip {...props}>{text ?? ""}</Tooltip>
);
