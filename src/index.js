import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import App from './App';
import Navigation from "./components/navigation";

import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <>
        <Navigation/>
        <App />
        <p className="fixed left-[95%] top-[97%]">Build: 1.0.0</p>
    </>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
