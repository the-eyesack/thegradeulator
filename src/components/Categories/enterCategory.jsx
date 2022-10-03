import React, {useRef, useState} from "react";
import Category from "./Category";
import {v4 as uuid} from "uuid"

function EnterCategory(props) {
    const [catName, setcatName] = useState('')
    const [catWeight, setcatWeight] = useState('')
    const [categories, setCategories] = useState([]);
    const [assignmentAvg, setAverage] = useState(0);
    console.log("SET AVERAGE: ", assignmentAvg)
    let newnewcat;
    let allGood = false;
    const handleSubmit = (e) => {
        e.preventDefault()
        if(catWeight <= 100) {
            allGood = true
        }
        if(catWeight < 1) {
            allGood = false
        }
        if(allGood) {
            //creating object to go into the array
            const newCat = {
                key: uuid(),
                name: catName,
                weight: catWeight,
                average: assignmentAvg
            }
            props.setcatInfo(newCat)

            //adding it into array
            setCategories((oldList) => [newCat, ...oldList])
            setcatName("");
            setcatWeight("");
        } else alert("Something went wrong!")
        
    }
 
    return (
        <div>
          <form onSubmit={handleSubmit}>
            <label>
                Enter Category Name:
                <input
                    required
                    autoCapitalize="words"
                    autoComplete="off"
                    type="text"
                    name="cat-name"
                    value={catName}
                    onChange={
                        (e) => {setcatName(e.target.value)
                        e.preventDefault()}
                    }
                />
                <br/>
                Enter Category Weight:
                <input
                    required
                    autoComplete="off"
                    type="number"
                    name="cat-name"
                    value={catWeight}
                    onChange={
                        (e) => setcatWeight(e.target.value)
                    }  
                />
            </label>
            <input type="submit" value="Submit"/>
          </form>
        
        <div id="display-categories">
            {/* Displaying the newly made category */}
            {categories.map(cat => {
                return (
                    <Category key={cat.key} name={cat.name} weight={cat.weight} setAverage={setAverage} className="category"/>
                )
            })}
        </div>

        </div>
      );
}
export default EnterCategory;