import React, { lazy, Suspense } from "react";
import "./App.css";
import Header from "./components/Header";
import Body from "./components/Body";
import Error from "./components/Error";
import About from "./components/About";
import ContactUs from "./components/ContactUs";
import { createBrowserRouter, Outlet } from "react-router-dom";
import RestaurantMenu from "./components/RestaurantMenu";
import OfflinePage from "./components/OfflinePage";

const Grocery = lazy(() => import("./components/Grocery"));

function AppLayout() {
  return (
    <>
      <div className="header">
        <Header />
      </div>
      <div className="body">
        <Outlet />
      </div>
      <div className="footer"></div>
    </>
  );
}

export const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <Body />,
      },
      {
        path: "/grocery",
        element: (
          <Suspense fallback={<h1>Grocery is loading</h1>}>
            <Grocery />
          </Suspense>
        ),
      },
      {
        path: "/about",
        element: <About />, 
      },
      {
        path: "/contact",
        element: <ContactUs />,
      },
      {
        path: "/restaurant/:resId",
        element: <RestaurantMenu />,
      },
      {
        path: "/offline",
        element: <OfflinePage />,
      },
    ],
    errorElement: <Error />,
  },
]);

export default AppLayout;
