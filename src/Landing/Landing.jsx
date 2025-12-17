import { useContext, useEffect, useState } from "react";
import DiscordCard from "./Components/Cards/DiscordCard/DiscordCard";
import AccountCard from "./Components/Cards/AccountCard/AccountCard";
import LinkCard from "./Components/Cards/LinkCard/LinkCard";
import { GoGlobe } from "react-icons/go";
import { FaGithub, FaUser } from "react-icons/fa6";
import Header from "./Components/Header/Header";

import styles from "./Landing.module.css";
import ZoneZero from "./Components/Cards/ZoneZero/ZoneZero";
import Footer from "./Components/Footer/Footer";
import { Layers } from "../contexts/layers";
import Popup from "../components/core/elements/Modal/Modals/Popup/Popup";
import NavBar from "../components/ui/NavBar/NavBar";
function App() {
	const {showModal} = useContext(Layers)

	useEffect(() => {
		document.title = "Flamality";
		const width = window.innerWidth;
		const height = window.innerHeight;
		// showModal('center', <Popup title="Screen Size"  desc={`Width: ${width} | Height: ${height}`} />);
	}, []);
	return (
		<div className={styles.landing}>
			{/* <NavBar /> */}
			<div className={styles.top}>
				<div className={styles.background} />
				<Header />
				<DiscordCard />
				<AccountCard />
				<ZoneZero />
				<div className={styles.link_cards}>
					<LinkCard
						text={"My Portfolio"}
						link={"portfolio.flamality.com"}
						icon={GoGlobe}
					/>
					<LinkCard
						text={"My GitHub"}
						link={"github.com/Flamality"}
						icon={FaGithub}
					/>
					<LinkCard
						text={"Create a Flamality account"}
						link={"flamality.com/account"}
						icon={FaUser}
					/>
				</div>
			</div>
			<div className={styles.spacing} />
			<Footer />
		</div>
	);
}

export default App;
