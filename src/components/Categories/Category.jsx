import React, { useRef, useState } from "react";
import EnterAssignment from "../Assignments/enterAssignment";

const Category = React.memo(props => {
    
    const [assignmentAvg, exportAssignmentAvg] = useState(0)
    props.setAverage(assignmentAvg)
    return (
        <div>
            <h1 className="categoryHeader">Name: {props.name}</h1>
            <h2>Weight: {props.weight}%</h2>
            <EnterAssignment exportAssignmentAvg={exportAssignmentAvg}/>
            <br/>-----------
        </div>
    )
})

export default Category;