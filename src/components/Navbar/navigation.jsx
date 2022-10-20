import React from "react";
import "./navigation.style.css"

const Navigation = () => {
    return (<nav className="nav">
        <a href="/" id="title">THE GRADEULATOR</a>
        <ul>
            <li><a href="/about">About</a></li>
            <li><a href="/cool">Page2</a></li>
        </ul>
    </nav>)
}

export default Navigation;