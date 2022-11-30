import React from "react";
import { Form } from "react-bootstrap";

import styles from "./ContentSwitch.module.css";

type ContentSwitchProps = {
	useSimpleContent: boolean;
	setUseSimpleContent: (_newVal: boolean) => void;
};

/**
 * Renders the document imported, or an empty div if not imported
 *
 * @param props Properties of the component
 * @param props.useSimpleContent Boolean state to check if the ML-simplified text should be used
 * @param props.setUseSimpleContent Setter for useSimpleContent
 * @returns {JSX.Element} ContentSwitch component
 */
export const ContentSwitch = ({
	useSimpleContent,
	setUseSimpleContent,
}: ContentSwitchProps): JSX.Element => (
	<div className={`${styles.content_switch_container}`}>
		<Form.Check
			checked={useSimpleContent}
			id="content-switch"
			label="Toggle Simplified Text"
			onChange={(): void => {
				setUseSimpleContent(!useSimpleContent);
			}}
			type="switch"
		/>
	</div>
);
