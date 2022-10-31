import React from "react";
import Logo from '../assets/logo.svg'
import Swal from 'sweetalert2'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid, brands } from '@fortawesome/fontawesome-svg-core/import.macro' // <-- i

const Navigation = () => {
    return (
        <nav className="border-b-4 border-main sticky flex justify-between items-center h-[10vh] w-100 px-4">
            <img src={ Logo } alt="logo" className="h-[8.5vh] w-auto ml-2 inline"/>
            <div>
                <button type="submit" className="inline focus:outline-none" onClick={(e) => {
                    e.preventDefault(e)
                    Swal.fire({
                        title: 'This is The Gradeulator.',
                        confirmButtonColor: '#82754A',
                        color: '#5A4088',
                        html: 'A grade point average calculator made by Isaac W. <br/> To get started, enter your categories (assessments, classwork, etc.) and its weight. <br/> Then, enter the assignments that belong in that category. <br/> Once your are satisfied, hit the export data button.',

                    }
                )}}><FontAwesomeIcon icon={solid('circle-info')} size="3x" className=" text-main"/></button>
                <a target="_blank" href="https://github.com/the-eyesack/grade-calculator" rel="noreferrer" className="inline pl-4"> <FontAwesomeIcon icon={brands('github')} size="3x" className="text-main"/> </a>
            </div>

        </nav>)
}

export default Navigation;