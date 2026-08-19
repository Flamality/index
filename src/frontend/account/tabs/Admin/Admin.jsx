import React, { useContext, useState } from "react";
import { Auth } from "../../../contexts/auth";
import RichText from "../../../components/core/elements/inputs/RichText";
import styles from "./Admin.module.css";
import { execute } from "../../../services/appwrite";

export default function Data() {
	const { userData, user, updUserData, dataDiff, loading, connections } =
		useContext(Auth);
	const [funcId, setFuncId] = useState("interaction")
	const [funcPath, setFuncPath] = useState("");
	const [funcData, setFuncData] = useState("");
	const [funcRes, setFuncRes] = useState({});
	
	const sendFunc = async () => {
		const res = await execute(funcId, funcPath, funcData);
		setFuncRes(res);
	}

	return (
		<div className="account-tab-data account-tab">
			<RichText />

			<p className={styles.header}>Function</p>
			<input placeholder="id" onChange={(e) => setFuncId(e.target.value)} />
			<input placeholder="path" onChange={(e) => setFuncPath(e.target.value)} />
			<input placeholder="data" onChange={(e) => setFuncData(e.target.value)} />
			<button onClick={sendFunc}>Send</button>

			<pre className={styles.code}>
				{JSON.stringify(funcRes, null, 2)}
			</pre>

			<p className={styles.header}>User</p>
			<pre className={styles.code}>
				{JSON.stringify(user, null, 2)}
			</pre>

			<p className={styles.header}>UserData</p>
			<pre className={styles.code}>
				{JSON.stringify(userData, null, 2)}
			</pre>

			<p className={styles.header}>Loading</p>
			<pre className={styles.code}>
				{JSON.stringify(loading, null, 2)}
			</pre>

			<p className={styles.header}>dataDiff</p>
			<pre className={styles.code}>
				{JSON.stringify(dataDiff, null, 2)}
			</pre>

			<p className={styles.header}>updUserData</p>
			<pre className={styles.code}>
				{JSON.stringify(updUserData, null, 2)}
			</pre>

			<p className={styles.header}>connections</p>
			<pre className={styles.code}>
				{JSON.stringify(connections, null, 2)}
			</pre>
		</div>
	);
}
