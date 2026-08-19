import React from "react";
import styles from "./LinkCard.module.css";

export default function LinkCard({ icon: Icon, link, text }) {
	return (
		<a
			className={styles.card}
			href={`https://${link}`}
			target="_blank"
			rel="noopener noreferrer"
		>
			<p className={styles.title}>{text}</p>
			<p className={styles.url}>{link}</p>
			<Icon className={styles.icon} />
		</a>
	);
}
