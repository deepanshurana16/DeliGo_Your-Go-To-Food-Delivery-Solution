import React, { lazy, Suspense, useEffect, useState } from "react";
import "./App.css";
import Header from "./components/Header";
import Body from "./components/Body";
import Error from "./components/Error";
import About from "./components/About";
import ContactUs from "./components/ContactUs";
import Cart from "./components/Cart";
import { createBrowserRouter, Outlet } from "react-router-dom";
import RestaurantMenu from "./components/RestaurantMenu";
import OfflinePage from "./components/OfflinePage";
import { useContext } from "react";
import UserContext from "./utils/UserContext";
import { Provider } from "react-redux";
import appStore from "./utils/appStore";

const Grocery = lazy(() => import("./components/Grocery"));

function AppLayout() {
  const[username,setusername] = useState();

  useEffect(()=>{
    const data = {
      name: "Dee Rana",
    }
    setusername(data.name);
  },[]);

  return (
    <>
    <Provider store={appStore}>
    <UserContext.Provider value={{loggedInUser:username,setusername}} >
      <div className="header">
        <Header />
      </div>
      <div className="body">
        <Outlet />
      </div>
      <div className="footer"></div>
      </UserContext.Provider>
      </Provider>
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
        path:"/cart",
        element:<Cart />
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
