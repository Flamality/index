import React from "react";
import { Route, Routes } from "react-router-dom";
import Index from "./clicker/Index";
import Database from "./database/Database";

export default function Projects() {
  return (
    <>
      <Routes>
        <Route path="/clicker" element={<Index />} />
        <Route path="/db" element={<Database />} />
      </Routes>
    </>
  );
}
