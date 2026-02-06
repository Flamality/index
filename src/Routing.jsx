import React, { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Loading from "./components/core/screens/Loading";
import NotFound from "./components/core/screens/NotFound";
// import TermsOfService from "./docs/Terms.jsx";
// import Docs from "./docs/Docs.jsx";
import Admin from "./admin/Admin.jsx";

// Landing
const App = lazy(() => import("./Landing/Landing"));

// Account
const AccountRoutes = lazy(() => import("./account/Routes"));

// Auth
const AuthRoutes = lazy(() => import("./auth/Routes"));

// BirthdayBash
const BirthdayBashRoutes = lazy(() => import("./birthdaybash/Routes"));

// Connections
const ConnectRoutes = lazy(() => import("./connect/Routes"));
const AppwriteConnect = lazy(
  () => import("./components/core/screens/AppwriteConnect"),
);

// Flamalite/ZZ
const Flamalite = lazy(() => import("./zero/frontend/Index.jsx"));

// Docs
const Docs = lazy(() => import("./docs/Docs.jsx"));
const TermsOfService = lazy(
  () => import("./docs/components/builtin/Terms.mdx"),
);
const Privacy = lazy(() => import("./docs/components/builtin/Privacy.mdx"));

export default function Routing() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Suspense fallback={<Loading />}>
            <App />
          </Suspense>
        }
      />
      <Route
        path="/account/*"
        element={
          <Suspense fallback={<Loading />}>
            <AccountRoutes />
          </Suspense>
        }
      />
      <Route
        path="/auth/*"
        element={
          <Suspense fallback={<Loading />}>
            <AuthRoutes />
          </Suspense>
        }
      />
      <Route
        path="/birthdaybash/*"
        element={
          <Suspense fallback={<Loading />}>
            <BirthdayBashRoutes />
          </Suspense>
        }
      />
      <Route
        path="/connect/*"
        element={
          <Suspense fallback={<Loading />}>
            <ConnectRoutes />
          </Suspense>
        }
      />
      <Route
        path="/app/*"
        element={
          <Suspense fallback={<Loading />}>
            <Flamalite />
          </Suspense>
        }
      />
      <Route
        path="/terms"
        element={
          <Suspense fallback={<Loading />}>
            <Docs />
          </Suspense>
        }
      />
      <Route
        path="/privacy"
        element={
          <Suspense fallback={<Loading />}>
            <Docs />
          </Suspense>
        }
      />
      <Route
        path="/docs"
        element={
          <Suspense fallback={<Loading />}>
            <Docs />
          </Suspense>
        }
      />
      <Route
        path="/docs/:id"
        element={
          <Suspense fallback={<Loading />}>
            <Docs />
          </Suspense>
        }
      />
      <Route
        path="/appwrite-connect"
        element={
          <Suspense fallback={<Loading />}>
            <AppwriteConnect />
          </Suspense>
        }
      />
      <Route
        path="/admin/*"
        element={
          <Suspense fallback={<Loading />}>
            <Admin />
          </Suspense>
        }
      />
      <Route path="loading" element={<Loading />} />
      {/* FALLBACK */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
