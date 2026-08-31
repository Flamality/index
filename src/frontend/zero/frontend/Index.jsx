import React from "react";
import { Route, Routes } from "react-router-dom";
import Main from "./containers/Main";

export default function Index() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/:id" element={<Main />} />
        <Route path="/d/:id" element={<Main dm={true} />} />
      </Routes>
    </div>
  );
}
