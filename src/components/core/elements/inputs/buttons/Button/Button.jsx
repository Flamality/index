import React from "react";

import styles from "./Button.module.css";

export default function Button({ leading, trailing, onClick, children }) {
	return (
		<div className={styles.button} onClick={onClick}>
			<p>{children}</p>
		</div>
	);
}
