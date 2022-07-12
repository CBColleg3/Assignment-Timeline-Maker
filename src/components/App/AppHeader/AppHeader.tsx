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
	<div
		className={
			"text-center d-flex flex-column justify-content-center pb-4 border-bottom bg-light"
		}
	>
		<div
			className={`mt-5 h-100 ml-auto d-flex flex-row ${styles.header_title} justify-content-between`}
		>
			<div>
				<span className="fs-4 me-3">{"Assignment Timeline Maker"}</span>
				<span>
					<FontAwesomeIcon icon={faTimeline} size="2x" />
				</span>
			</div>
			<span className="float-right pe-5 pt-1" role="button">
				<a
					className="text-dark"
					href="https://github.com/CBColleg3/Assignment-Timeline-Maker"
				>
					<FontAwesomeIcon icon={faGithub} size="2x" />
				</a>
			</span>
		</div>
		<div className="text-muted text-wrap w-50 mx-auto text-center mt-3">
			<span className="fw-bolder">{"Authors:"}</span>
			<a
				className={` ${styles.author_link} text-decoration-none mx-2 text-secondary`}
				href="https://github.com/CBColleg3"
			>
				{"Christopher Bennett"}
			</a>
			<a
				className={` ${styles.author_link} text-decoration-none mx-2 text-secondary`}
				href="https://github.com/bgallamoza"
			>
				{"Brennan Gallamoza"}
			</a>
			<a
				className={` ${styles.author_link} text-decoration-none mx-2 text-secondary`}
				href="https://github.com/cthacker-udel"
			>
				{"Cameron Thacker"}
			</a>
		</div>
	</div>
);
