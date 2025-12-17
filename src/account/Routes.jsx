import React, { useContext, useEffect } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import Account from "./Account";
import { Auth } from "../contexts/auth";
import Verify from "./tabs/Verify/Verify";
import NotFound from "../components/core/screens/NotFound";

export default function AccountRoutes() {
  const { user, loading, userData } = useContext(Auth);
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    if (!user && !loading) {
      const currentPath = location.pathname;
      const currentParams = location.search;
      const redirect = `${currentPath}${currentParams}`;

      navigate(`/auth?redirect=${encodeURIComponent(redirect)}`);
    }
    document.title = "Manange Your Account (" + userData?.username + ")"
  }, [user, loading, location]);
  return (
    <>
      <Routes>
        <Route path='' element={<Account />} />
        <Route path='/verify-email' element={<Verify />} />
        <Route path='/:tab' element={<Account />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </>
  );
}
