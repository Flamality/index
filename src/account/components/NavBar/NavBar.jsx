import React, { useContext } from "react";
import "./NavBar.css";
import TabButton from "./TabButton/TabButton";
import {
  FaCircleUser,
  FaDatabase,
  FaLock,
  FaPeopleArrows,
  FaPlug,
} from "react-icons/fa6";
import { FaPaintBrush, FaSignOutAlt } from "react-icons/fa";
import TabButtonLogout from "./TabButton/TabButtonLogout";
import { Auth } from "../../../contexts/auth";
export default function NavBar() {
  const { user } = useContext(Auth);
  return (
    <div className='account-navigation'>
      <TabButton text='Home' link='' icon={<FaCircleUser />} />
      <TabButton text='Profile' link='profile' icon={<FaPaintBrush />} />
      <TabButton text='Friends' link='friends' icon={<FaPeopleArrows />} />
      <TabButton text='Security' link='security' icon={<FaLock />} />
      <TabButton text='Conections' link='connections' icon={<FaPlug />} />
      {user.labels.includes("admin") ? (
        <TabButton text='Data' link='data' icon={<FaDatabase />} />
      ) : (
        <></>
      )}
      <TabButtonLogout icon={<FaSignOutAlt />} />
    </div>
  );
}
