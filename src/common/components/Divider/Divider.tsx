import React from "react";

import styles from "./Divider.module.css";

/**
 * The properties of the Divider component
 */
type DividerProperties = {
	/**
	 * The className that overrides the default className, for user customization
	 */
	classNameOverride?: string;
};

/**
 * Reusable divider component
 *
 * @param props - The properties of the re-usable divider component
 * @param props.classNameOverride - The override if the user wants to modify the styling of the divider
 * @returns The common re-usable divider component
 */
export const Divider = ({ classNameOverride }: DividerProperties): JSX.Element => (
	<div className={`${styles.divider} ${classNameOverride ?? ""}`} />
);
