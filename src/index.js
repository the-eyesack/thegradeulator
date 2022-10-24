import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import App from './App';
import page1 from "./components/page1/page1";
import Navigation from "./components/Navbar/navigation";

import reportWebVitals from './reportWebVitals';
import {
    createBrowserRouter,
    RouterProvider,
    Route,
} from "react-router-dom";
import Page1 from "./components/page1/page1";
import Page2 from "./components/page2/page2";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
    },
    {
        path: "/about",
        element: <Page1/>
    },
    {
        path: "/cool",
        element: <Page2/>
    }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <>
        <Navigation/>
        <RouterProvider router={router} />
    </>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
