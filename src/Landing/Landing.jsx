import { useState } from "react";
import DiscordCard from "./Components/Cards/DiscordCard/DiscordCard";
import AccountCard from "./Components/Cards/AccountCard/AccountCard";
import LinkCard from "./Components/Cards/LinkCard/LinkCard";
import { GoGlobe } from "react-icons/go";
import { FaGithub, FaUser } from "react-icons/fa6";
import Header from "./Components/Header/Header";

const version = import.meta.env.VITE_VERSION;

import "./Landing.css";
function App() {
  return (
    <div className='landing'>
      <div className='landing-top'>
        <Header />
        <DiscordCard />
        <AccountCard />
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
      <p className='landing-footer'>
        {version} | Made by Flamality | Powered by Appwrite
      </p>
    </div>
  );
}

export default App;
