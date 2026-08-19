import React from "react";
import Main from "./containers/main";
import { Route, Routes } from "react-router-dom";

export default function Index() {
  return (
    <div>
      <Routes>
        <Route path="/:id" element={<Main />} />
      </Routes>
    </div>
  );
}
