import React from "react";
import { AiOutlineDiscord } from "react-icons/ai";
import styles from "./DiscordCard.module.css";
export default function DiscordCard() {
	return (
		<div className={styles.card}>
			<div>
				<img src="https://flamality.com/images/256/Mizu1.jpg" />
				<div className={styles.status} />
				<div className={styles.info}>
					<h2>Remi</h2>
					<p>flamality</p>
				</div>
				<a
					href={"https://discord.com/users/995390725388771438"}
					target="_blank"
					rel="noopener noreferrer"
				>
					View on Discord
				</a>
			</div>
		</div>
	);
}
