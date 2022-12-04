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
			<div className={`${styles.app_header_title_container}`}>
				<div className={`${styles.app_header_icon_container}`}>
					<FontAwesomeIcon
						className={`${styles.app_header_icon}`}
						icon={faTimeline}
						size="2x"
					/>
				</div>
				<div className={`fs-3 ${styles.app_header_title} position-relative`}>
					<span className={`${styles.app_header_title_contents}`}>{"Assignment Timeline Maker"}</span>
				</div>
			</div>
		</div>
		<div className="d-flex flex-row justify-content-center mt-3">
			<a
				className={`${styles.author_one_link} ${styles.author_link} mx-2`}
				href="https://github.com/CBColleg3"
			>
				{"Christopher Bennett"}
			</a>
			<a
				className={`${styles.author_two_link} ${styles.author_link} mx-2`}
				href="https://github.com/bgallamoza"
			>
				{"Brennan Gallamoza"}
			</a>
			<a
				className={`${styles.author_three_link} ${styles.author_link} mx-2`}
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
