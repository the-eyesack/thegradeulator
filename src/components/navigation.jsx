import React from "react";
import Logo from '../assets/logo.svg'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid, brands } from '@fortawesome/fontawesome-svg-core/import.macro' // <-- i

const Navigation = () => {
    return (
        <nav className="sticky flex justify-between items-center h-[10vh] w-100 px-4">
            <img src={ Logo } alt="logo" className="h-[8.5vh] w-auto  ml-2 inline"/>
            <div>
                <a target="_blank" href="https://github.com/the-eyesack/grade-calculator" rel="noreferrer" className="inline"> <FontAwesomeIcon icon={solid('circle-info')} size="3x" className="pr-4 text-main"/> </a>
                <a target="_blank" href="https://github.com/the-eyesack/grade-calculator" rel="noreferrer" className="inline"> <FontAwesomeIcon icon={brands('github')} size="3x" className="text-main"/> </a>
            </div>

        </nav>)
}

export default Navigation;