import React from "react";
import styles from "./AccountCard.module.css";
import { Auth } from "../../../../contexts/auth";
import GlintButton from "../../../../components/core/elements/inputs/buttons/GlintButton/GlintButton";
export default function AccountCard() {
	const { user, loading, userData } = React.useContext(Auth);

	return (
		<div className={styles.card}>
			<div className={styles.content}>
				<h2 className={styles.title}>
					My <span className={styles.highlight}>Flamality</span> Account
				</h2>

				{loading ? (
					<p className={styles.loading}>Loading...</p>
				) : user ? (
					<div className={styles.user}>
						<img src={userData?.avatar} alt="Avatar" />
						<p>Hey, {userData?.display || userData?.username}!</p>
						<a href="/account">
							<GlintButton>Manage Account</GlintButton>
						</a>
					</div>
				) : (
					<div className={styles.guest}>
						<p>Looks like you&apos;re not logged in.</p>
						<a href="/account">
							<GlintButton>Log In or Sign Up</GlintButton>
						</a>
					</div>
				)}
			</div>
		</div>
	);
}
