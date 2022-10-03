import React, { useState, useTransition } from "react";
import Assignment from "./assignments";
import {v4 as uuid} from "uuid";

const EnterAssignment = props => {
    const [assignmentInput, setassignmentInput] = useState('');
    const [yourGrade, setyourGrade] = useState('');
    const [maxGrade, setmaxGrade] = useState('');
    let allGood = false;
    const [assigments, setAssignments] = useState([]);
    let catAvg
    
    //calculating avg. grade
    const [totalGrade, settotalGrade] = useState(0);
    const [totalMaxGrade, settotalMaxGrade] = useState(0);
    const handleSubmit = (e) => {
        e.preventDefault()
        allGood = true
        if(allGood) {
            const newAssignment = {
                key: uuid(),
                assignmentInput: assignmentInput,
                yourGrade: yourGrade,
                maxGrade: maxGrade
            }

            setAssignments((oldList) => [newAssignment, ...oldList])
            setassignmentInput("");
            setyourGrade("");
            setmaxGrade("");

            setAssignments([{ assignmentInput, yourGrade, maxGrade }, ...assigments])
            settotalGrade(parseInt(yourGrade) + totalGrade)
            settotalMaxGrade(parseInt(maxGrade) + totalMaxGrade)
        }
    }
    catAvg = Math.round((totalGrade/totalMaxGrade) * 100)
    props.exportAssignmentAvg(catAvg)
    return (
        <div>
            <h3>Category Average: <h3 className="catAvg">{catAvg}</h3></h3>
            <form onSubmit={handleSubmit}>
            <label>
                Add Assignment:
                <input
                    required
                    autoCapitalize="words"
                    autoComplete="off"
                    type="text"
                    name="assigment=task"
                    placeholder="Assignment Name"
                    value={assignmentInput}
                    onChange={(e) => setassignmentInput(e.target.value)}
                />
                <input
                    required
                    autoCapitalize="words"
                    autoComplete="off"
                    type="number"
                    name="assigment=task"
                    placeholder="Your Grade"
                    value={yourGrade}
                    onChange={(e) => setyourGrade(e.target.value)}
                />
                <input
                    required
                    autoCapitalize="words"
                    autoComplete="off"
                    type="number"
                    name="assigment=task"
                    placeholder="Max Grade"
                    value={maxGrade}
                    onChange={(e) => setmaxGrade(e.target.value)}
                />
                <input type="submit" value="+"/>
            </label>
        </form>
            {/* displaying new assignment */}
            {assigments.map(a => {
                return (
                    <Assignment key={a.key} name={a.assignmentInput} yourGrade={a.yourGrade} maxGrade={a.maxGrade} className="assignment"/>
                )
            })}
        </div>
    )
}

export default EnterAssignment
