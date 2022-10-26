import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import  { faGithub } from "@fortawesome/free-brands-svg-icons";
import Logo from '../../assets/logo.svg'
const Navigation = () => {
    return (
        <nav className="sticky flex justify-between h-[10vh]">
            <a href="/" id="title"><img src={ Logo } alt="logo" className="h-[4.5rem] my-2 ml-2 inline"/></a>
            <a target="_blank" href="https://github.com/the-eyesack/grade-calculator" rel="noreferrer" className="inline"><FontAwesomeIcon icon={faGithub} className="text-7xl my-2 mr-2 relative" /></a>
    </nav>)
}

export default Navigation;