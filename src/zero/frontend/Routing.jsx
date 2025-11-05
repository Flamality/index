import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import DMPage from "./pages/DM/DMPage";

export default function Routing() {
  const location = useLocation();
  return (
    <>
      <Routes location={location}>
        <Route path="/" element={
          <DMPage />
        } />
        <Route path="/:dm" element={
          <DMPage />
        } />
      </Routes>
    </>
  );
}
