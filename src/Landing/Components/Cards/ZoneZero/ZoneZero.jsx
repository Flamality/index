import React, { useContext } from "react";

import styles from "./ZoneZero.module.css";
import { Link } from "react-router-dom";
import { Auth } from "../../../../contexts/auth";
import { FaArrowRight } from "react-icons/fa6";

export default function ZoneZero() {
	const { userData: user } = useContext(Auth);
	return (
		<div className={styles.card}>
			{/* <div className={styles.top}>
				<p className={styles.title}>Z0N3 Z3R0</p>
				<p className={styles.subtitle}>By Flamality</p>
			</div>
			<div className={styles.bottom}>
				<div className={styles.messages}>
					<div>
						<img
							src={user?.avatar || "https://flamality.com/images/Mizu1.jpg"}
						/>{" "}
						<div>
							<p>{user?.display || user?.username || "You"}</p>
							<p>Woah a chatting app?</p>
						</div>
					</div>
					<div>
						<img src="https://flamality.com/images/Mizu1.jpg" />{" "}
						<div>
							<p>Mizu</p>
							<p>Yep!</p>
						</div>
					</div>
					<div>
						<img
							src={user?.avatar || "https://flamality.com/images/Mizu1.jpg"}
						/>{" "}
						<div>
							<p>{user?.display || user?.username || "You"}</p>
							<p>Awesome!</p>
						</div>
					</div>
					<div>
						<img src="https://flamality.com/images/Mizu1.jpg" />{" "}
						<div>
							<p>Mizu</p>
							<p>Very awesome indeed!</p>
						</div>
					</div>
				</div>
				<div className={styles.links}>
					<a href="/app">
						<button>
							Open Zone Zero
							<FaArrowRight />
						</button>
					</a>
					<a href="https://portfolio.flamality.com/#projects">
						View my other projects
					</a>
				</div>
			</div> */}
			<p>COMING SOON</p>
		</div>
	);
}
