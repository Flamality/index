import React, { Suspense, useMemo, useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Loading from "../components/core/screens/Loading";
import NavBar from "./components/NavBar/NavBar";
import { Auth } from "../contexts/auth";

import "./Account.css";
import ActionBar from "./components/ActionBar/ActionBar";

const tabs = {
  "": React.lazy(() => import("./tabs/Home/Home")),
  home: React.lazy(() => import("./tabs/Home/Home")),
  profile: React.lazy(() => import("./tabs/Profile/Profile")),
  security: React.lazy(() => import("./tabs/Security/Security")),
  admin: React.lazy(() => import("./tabs/Admin/Admin")),
  connections: React.lazy(() => import("./tabs/Connections/Connections")),
  friends: React.lazy(() => import("./tabs/Friends/Friends")),
};

export default function Account() {
  const { userData, dataDiff } = useContext(Auth);
  const { tab = "" } = useParams();
  const [ActiveTab, setActiveTab] = useState(() => Loading);

  useEffect(() => {
    setActiveTab(tabs[tab] || (() => <div>Tab not found</div>));
  }, [tab])

  return (
    <div className='account'>
      {userData ? (
        <>
          <NavBar />
          <Suspense fallback={<Loading />}>
            <ActiveTab />
            {/* {dataDiff?.length > 0 ?  : <></>} */}
            <ActionBar />
          </Suspense>
        </>
      ) : (
        <Loading />
      )}
    </div>
  );
}
