import React, { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Loading from "./components/core/screens/Loading";
import NotFound from "./components/core/screens/NotFound";
import TermsOfService from "./docs/Terms.jsx";
import Docs from "./docs/Docs.jsx";
import Admin from "./admin/Admin.jsx";
const App = lazy(() => import("./Landing/Landing"));
const AccountRoutes = lazy(() => import("./account/Routes"));
const AuthRoutes = lazy(() => import("./auth/Routes"));
const BirthdayBashRoutes = lazy(() => import("./birthdaybash/Routes"));
const ConnectRoutes = lazy(() => import("./connect/Routes"));
const AppwriteConnect = lazy(() =>
  import("./components/core/screens/AppwriteConnect")
);
const Flamalite = lazy(() => import("./zero/frontend/Index.jsx"));

export default function Routing() {
  return (
    <Routes>
      <Route
        path='/'
        element={
          <Suspense fallback={<Loading />}>
            <App />
          </Suspense>
        }
      />
      <Route
        path='/account/*'
        element={
          <Suspense fallback={<Loading />}>
            <AccountRoutes />
          </Suspense>
        }
      />
      <Route
        path='/auth/*'
        element={
          <Suspense fallback={<Loading />}>
            <AuthRoutes />
          </Suspense>
        }
      />
      <Route
        path='/birthdaybash/*'
        element={
          <Suspense fallback={<Loading />}>
            <BirthdayBashRoutes />
          </Suspense>
        }
      />
      <Route
        path='/connect/*'
        element={
          <Suspense fallback={<Loading />}>
            <ConnectRoutes />
          </Suspense>
        }
      />
      <Route
        path='/app/*'
        element={
          <Suspense fallback={<Loading />}>
            <Flamalite />
          </Suspense>
        }
      />
      <Route
        path='/terms'
        element={
          <Suspense fallback={<Loading />}>
            <TermsOfService />
          </Suspense>
        }
      />
      <Route
        path='/docs/*'
        element={
          <Suspense fallback={<Loading />}>
            <Docs />
          </Suspense>
        }
      />
      <Route
        path='/appwrite-connect'
        element={
          <Suspense fallback={<Loading />}>
            <AppwriteConnect />
          </Suspense>
        }
      />
      <Route
        path='/admin/*'
        element={
          <Suspense fallback={<Loading />}>
            <Admin />
          </Suspense>
        }
      />
      <Route path='loading' element={<Loading />} />
      {/* FALLBACK */}
      <Route path='*' element={<NotFound />} />
    </Routes>
  );
}
