import React from 'react';
import { Route, Routes } from 'react-router-dom';
import BirthdayBash from './BirthdayBash';

export default function BirthdayBashRoutes() {
  return (
    <>
      <Routes>
        <Route path="/" element={<BirthdayBash />} />
      </Routes>
    </>
  );
}
