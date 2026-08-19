import React from "react";
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
