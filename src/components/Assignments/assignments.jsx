import React from "react";

const Assignment = React.memo(props => {
    console.log("ASSIGNMENT " + JSON.stringify(props))
    return (
        <div>
            <p className="Assignment">{props.name} - Grade: {props.yourGrade}/{props.maxGrade} ({Math.round((props.yourGrade/props.maxGrade) * 100)}%) </p>
            ***************
        </div>
    )
})

export default Assignment;