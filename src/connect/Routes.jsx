import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Connect from './Connect';

export default function ConnectRoutes() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Connect />} />
        <Route path="/:app" element={<Connect />} />
      </Routes>
    </>
  );
}
