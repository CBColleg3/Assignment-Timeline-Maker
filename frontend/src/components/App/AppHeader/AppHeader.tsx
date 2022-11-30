import React from "react";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { faTimeline } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./AppHeader.module.css";

/**
 * This is the header component that is displayed persistently on the application page
 * 
 * @returns The application header component
 */
export const AppHeader = (): JSX.Element => (
	<div className={`d-flex flex-column justify-content-center align-items-center ${styles.app_header}`}>
		<div className="d-flex flex-row justify-content-between position-relative">
			<div>
				<span className={`fs-3 ${styles.app_header_title}`}>{"Assignment Timeline Maker"}</span>
				<span className="ms-2">
					<FontAwesomeIcon
						icon={faTimeline}
						size="2x"
					/>
				</span>
			</div>
		</div>
		<div className="d-flex flex-row justify-content-center mt-3">
			<a
				className={` ${styles.author_link} mx-2`}
				href="https://github.com/CBColleg3"
			>
				{"Christopher Bennett"}
			</a>
			<a
				className={` ${styles.author_link} mx-2`}
				href="https://github.com/bgallamoza"
			>
				{"Brennan Gallamoza"}
			</a>
			<a
				className={` ${styles.author_link} mx-2`}
				href="https://github.com/cthacker-udel"
			>
				{"Cameron Thacker"}
			</a>
		</div>
		<span
			className={`${styles.github_icon}`}
			role="button"
		>
			<a
				className="text-dark"
				href="https://github.com/CBColleg3/Assignment-Timeline-Maker"
				rel="noopener noreferrer"
				target="_blank"
			>
				<FontAwesomeIcon
					icon={faGithub}
					size="2x"
				/>
			</a>
		</span>
	</div>
);
