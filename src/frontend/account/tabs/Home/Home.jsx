import React, { useContext } from "react";
import "./Home.css";
import TopBanner from "./components/TopBanner/TopBanner";
import TabCard from "./components/TabCard/TabCard";
import { FaBrush } from "react-icons/fa6";
import { FaUserLock } from "react-icons/fa";
import { Notifications } from "../../../contexts/notifications";

export default function Home() {
  const { createNotification } = useContext(Notifications);
  return (
    <div className='account-tab-home account-tab'>
      <TopBanner />
      <div className='account-tab-home-tabcards'>
        <TabCard
          text='Customize Profile'
          desc='View and customize how others see your profile. Including your username, profile picture, and more.'
          link='profile'
          icon={<FaBrush />}
        />
        <TabCard
          text='Security'
          desc='Make sure your account is secure.'
          link='security'
          icon={<FaUserLock />}
        />
      </div>
    </div>
  );
}
