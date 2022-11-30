import React from "react";
import { Form } from "react-bootstrap";

type ContentSwitchProps = {
	useSimpleContent: boolean;
	setUseSimpleContent: (_newVal: boolean) => void;
	originalContent: string[];
	simpleContent: string[] | undefined;
	setCurrentContent: (_newVal: string[] | undefined) => void;
};

/**
 * Renders the document imported, or an empty div if not imported
 *
 * @param props Properties of the component
 * @param props.useSimpleContent Boolean state to check if the ML-simplified text should be used
 * @param props.setUseSimpleContent Setter for useSimpleContent
 * @param props.originalContent text
 * @param props.simpleContent text
 * @param props.setCurrentContent text
 * @returns {JSX.Element} ContentSwitch component
 */
export const ContentSwitch = ({
	useSimpleContent,
	setUseSimpleContent,
	originalContent,
	simpleContent,
	setCurrentContent,
}: ContentSwitchProps): JSX.Element => (
	<Form>
		<Form.Check
			checked={useSimpleContent}
			id="content-switch"
			label="Toggle Simplified Text"
			onChange={(): void => {
				useSimpleContent ? setCurrentContent(originalContent) : setCurrentContent(simpleContent);
				setUseSimpleContent(!useSimpleContent);
			}}
			type="switch"
		/>
	</Form>
);
