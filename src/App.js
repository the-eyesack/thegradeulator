import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import React, {useState} from "react";
import CategoryTemplate from "./components/Categories/categoryTemplate";
import {faPlus} from '@fortawesome/free-solid-svg-icons'
import "./App.css"

function App(props) {
    const [catName, setcatName] = useState("");
    const [catWeight, setcatWeight] = useState("");
    const [categories, setCategories] = useState([]);

    const totalWeight = categories.reduce((acc, curr) => acc + parseInt(curr.weight), 0)
    // console.log("totalWeight = ", totalWeight)
    // console.log("catWeight = ", catWeight)
    const handleSubmit = (e) => {
        e.preventDefault()

        const shouldUpdate = totalWeight <= 100 && catWeight <= 100 && totalWeight + parseInt(catWeight) <= 100
        if (shouldUpdate) {
            let newCat = {
                name: catName,
                weight: catWeight,
                average: 0,
            };

            //adding it into array
            setCategories((oldList) => [newCat, ...oldList]);
            console.log(newCat)
            setcatName("");
            setcatWeight("");

            console.log("Total Weight = ", totalWeight)
        } else {
            alert("Something went wrong!");
        }
    };

    const [updatedCats, setUpdatedCats] = useState([]);
    const [fg, sfg] = useState(0);

    let finalGrade = 0;

    function handleCalculate() {
        //removing duplicates from updatedCats

        const uniqueCats = [];

        const unique = updatedCats.filter((element) => {
            const isDuplicate = uniqueCats.includes(element.name);

            if (!isDuplicate) {
                uniqueCats.push(element.name);

                return true;
            }

            return false;
        });

        console.log("unique = ", unique);

        finalGrade = 0;
        console.log("calculating final grade...");
        for (let i = 0; unique.length; i++) {
            let categoryAverage = unique[i]["average"];
            let categoryWeight = unique[i]["weight"];
            finalGrade += categoryAverage * categoryWeight * 0.01;
            console.log("finalGrade = ", finalGrade);
            sfg(Math.round(100 * finalGrade) / 100)
        }
    }

    const [datakey, setDatakey] = useState("")
    const [assignmentList, setassignmentList] = useState([])
    const handleLoad = (e) => {
        e.preventDefault()
        //TODO: datakey should be in the format of categories [{"name": "2312","weight": "2","average": 0},{"name": "tr","weight": "22","average": 0}]
        console.log("Parsing ", datakey, "...")
        const dktest = {
            name: datakey,
            weight: 100,
            average: 0,
        }
        setCategories([dktest])

        const aListTest = [{
            assignmentName: "assignment1",
            yourGrade: "10",
            maxGrade: "15",
        },
        {
            assignmentName: "assignment2",
            yourGrade: "19",
            maxGrade: "20",
        }
        ]

        console.log(aListTest)
        setassignmentList(aListTest)
    }

    return (
        <div className="BIGONE">

            <div className="categoryForm">
                <div className="totalGrade">{fg}%</div>
                <form onSubmit={handleSubmit}>
                    <label className="enterCategory">
                        <input
                            id="catNameInput"
                            required
                            maxLength="50"
                            placeholder="Enter Category Name"
                            autoCapitalize="words"
                            autoComplete="off"
                            type="text"
                            name="cat-name"
                            value={catName}
                            onChange={(e) => {
                                setcatName(e.target.value);
                                e.preventDefault();
                            }}
                        />
                        <input
                            id="catWeightInput"
                            required
                            maxLength="3"
                            placeholder="Weight (% of 100)"
                            autoComplete="off"
                            type="number"
                            name="cat-name"
                            value={catWeight}
                            onChange={(e) => setcatWeight(e.target.value)}
                        />
                    </label>
                    <button id="addCategory" type="submit"><FontAwesomeIcon icon={faPlus}/></button>
                    <button id="calculate" type="button" onClick={handleCalculate}>
                        Calculate!
                    </button>
                </form>
            </div>

            {/* "saving" */}
            <div>
                <form onSubmit={handleLoad}>
                    <input
                        required
                        placeholder="Enter data key"
                        type="text"
                        value={datakey}
                        onChange={(e) => setDatakey(e.target.value)}
                    />
                    <button id="" type="submit"><FontAwesomeIcon icon={faPlus}/></button>
                </form>
            </div>
            <div id="display-categories">
                {/* Displaying the newly made category */}
                {categories.map((cat) => {
                    return (
                        <CategoryTemplate
                            key={cat.key}
                            name={cat.name}
                            weight={cat.weight}
                            getNewCat={setUpdatedCats}
                            assignmentList={assignmentList}
                            className="category"
                        />
                    );
                })}
            </div>
        </div>
    );
}

export default App;