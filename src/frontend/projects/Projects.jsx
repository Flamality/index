import React from "react";
import { Route, Routes } from "react-router-dom";
import Index from "./clicker";

export default function Projects() {
  return (
    <>
      <Routes>
        <Route path="/clicker" element={<Index />} />
      </Routes>
    </>
  );
}
