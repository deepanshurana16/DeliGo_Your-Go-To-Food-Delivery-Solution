import React from "react";
import "./App.css";
import Header from "./components/Header";
import Body from "./components/Body";
import {createBrowserRouter,Outlet,RouterProvider} from "react-router-dom";
import Error from "./components/Error";
import About from "./components/About";
import ContactUs from "./components/ContactUs";
import RestaurantMenu from "./components/RestaurantMenu";

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
    path:"/",
    element:<AppLayout/>,
    children:[
      {
        path:"/",
        element:<Body/>,
        errorElement : <Error/>
      },
      {
        path:"/about",
        element:<About/>,
        errorElement :<Error />
      },
      {
        path:"/contact",
        element:<ContactUs/>,
        errorElement:<Error/>
      },
      {
        path:"/restaurant/:resId",
        element:<RestaurantMenu />
      }
    ],
    errorElement:<Error/>
  }
])


export default AppLayout;
