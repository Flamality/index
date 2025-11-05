import { useState } from "react";
import DiscordCard from "./Components/Cards/DiscordCard/DiscordCard";
import AccountCard from "./Components/Cards/AccountCard/AccountCard";
import LinkCard from "./Components/Cards/LinkCard/LinkCard";
import { GoGlobe } from "react-icons/go";
import { FaGithub, FaUser } from "react-icons/fa6";
import Header from "./Components/Header/Header";

import "./Landing.css";
import ZoneZero from "./Components/Cards/ZoneZero/ZoneZero";
import Footer from "./Components/Footer/Footer";
function App() {
  return (
    <div className='landing'>
      <div className='landing-top'>
        <div className='landing-bg' />
        <Header />
        <DiscordCard />
        <AccountCard />
        <ZoneZero />
        <div className='link-cards'>
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
      <div className='landing-spacing' />
      <Footer />
    </div>
  );
}

export default App;
