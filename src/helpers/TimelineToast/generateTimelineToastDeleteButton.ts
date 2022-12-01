import styles from "./generateTimelineToastDeleteButton.module.css";

/**
 * Creates an html span element consisting of the text X, and the styles
 * from the `generateTimelineToastDeleteButton.module.css`
 *
 * @returns - The delete button for the toast element
 */
export const generateTimelineToastDeleteButton = (): HTMLSpanElement => {
	const deleteButton = document.createElement("span");
	deleteButton.innerHTML = "x";
	deleteButton.className = `${styles.delete_button}`;
	return deleteButton;
};
