import React from "react";
import ReactDOM  from "react-dom/client";
import App from "./App";
import { createBrowserRouter ,RouterProvider } from "react-router-dom";
import Body from "./components/Body";
import About from "./components/About";
import ErrorPage from "./components/ErrorPage";
import Support from "./components/Support";
import RestaurantDetails from "./components/RestaurantDetails";
import Cart from "./components/Cart";

const appRouter = createBrowserRouter([
    {
      path : "/",
      element : <App/>,
      errorElement:<ErrorPage/>,
      children: [
      {
        path:"/",
        element:<Body/>
      },
      {
        path : "about",
        element :<About/>
      },
      {
        path:"/support",
        element:<Support/>
      },
      {
        path:"/restaurant/:resId",
        element:<RestaurantDetails/>
      },
      {
        path:"/cart",
        element:<Cart/>
      },
    ] 
    },
    
  ])

const root =ReactDOM.createRoot( document.getElementById("root"));
root.render(<RouterProvider router={appRouter}/>)