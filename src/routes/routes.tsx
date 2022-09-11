import { BrowserRouter, Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";

import SuspenseLoading from "../components/SuspenseLoading";

const Home = lazy(() => import("../pages/Home"));
const Invoices = lazy(() => import("../pages/Invoices"));
const DashBoard = lazy(() => import("../pages/DashBoard"));

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Suspense fallback={<SuspenseLoading />}>
              <Home />
            </Suspense>
          }
        />
        <Route
          path="*"
          element={
            <Suspense fallback={<SuspenseLoading />}>
              <Home />
            </Suspense>
          }
        />
        <Route
          path="/invoices"
          element={
            <Suspense fallback={<SuspenseLoading />}>
              <Invoices />
            </Suspense>
          }
        />
        <Route
          path="/dashboard"
          element={
            <Suspense fallback={<SuspenseLoading />}>
              <DashBoard />
            </Suspense>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
