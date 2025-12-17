import React from "react";
import styles from "./MediaBadge.module.css";
export default function MediaBadge({ Badge, link }) {
	return (
		<a href={link} target="__blank" className={styles.media_badge}>
			<Badge />
		</a>
	);
}
