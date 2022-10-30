import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro' // <-- i
import React, { useEffect, useRef, useState } from "react";
import Category from "./components/category";
import { v4 as uuid } from "uuid";
import Swal from 'sweetalert2'

const CryptoJS = require("crypto-js");

function App(props) {
  const [catName, setcatName] = useState("");
  const [catWeight, setcatWeight] = useState("");
  const [categories, setCategories] = useState([]);

  const SwalError =
      {
          title: 'Error!',
          confirmationButtonText: 'Ok',
          icon: 'warning',
          iconColor: '#5A4088',
          color: '#5A4088',
          confirmButtonColor: '#82754A'
      }

  const SwalToastSuccess = {
      toast: true,
      position: 'bottom-left',
      icon:'success',
      showConfirmButton: false,
      timer: 3000,
      background: '#5A4088',
      iconColor: '#FFFFFF',
      color: '#FFFFFF',
  }

  const totalWeight = categories.reduce(
    (acc, curr) => acc + parseInt(curr.weight),
    0
  );

  const handleSubmit = (e) => {
    e.preventDefault();

    const shouldUpdate =
      totalWeight <= 100 &&
      catWeight <= 100 &&
        catWeight > 0 &&
      totalWeight + parseInt(catWeight) <= 100;
    if (shouldUpdate) {
      let newCat = {
        id: uuid(),
        name: catName,
        weight: catWeight,
        yourGrade: 0,
        maxGrade: 0,
        average: 0,
        assignments: [],
      };
      //adding it into array
      setCategories((oldList) => [newCat, ...oldList]);
      setcatName("");
      setcatWeight("");
      Swal.fire({
        ...SwalToastSuccess,
          title: 'Added category!'
      })
    } else {
      Swal.fire({
          ...SwalError,
          text: 'Make sure your total weight is less than or equal to 100, and that your weight is a positive number.',
      })
    }
  };

  const [datakey, setDatakey] = useState();
  const secondPtSaveKey = "th4%k5p03Ta&";
  const handleLoad = (e) => {
    e.preventDefault();

    let decrypted = CryptoJS.AES.decrypt(datakey, saveKey + secondPtSaveKey);
    try {
      JSON.parse(decrypted.toString(CryptoJS.enc.Utf8));
    } catch (error) {
      Swal.fire({
          ...SwalError,
          title: 'Invalid credentials!',
          text: 'Make sure your key and passcode are correct.'
      })
    }
    let parsed = JSON.parse(decrypted.toString(CryptoJS.enc.Utf8));

    setCategories(
      parsed.map((category) => {
        let totalYourGrade = 0;
        let totalMaxGrade = 0;

        for (
          let assignment = 0;
          assignment < category["assignments"].length;
          assignment++
        ) {
          let currentAssignment = category["assignments"][assignment];
          totalYourGrade += parseInt(currentAssignment["yourGrade"]);
          totalMaxGrade += parseInt(currentAssignment["maxGrade"]);
        }

        return {
          ...category,
          average: Math.round((totalYourGrade / totalMaxGrade) * 10000) / 100,
          yourGrade: totalYourGrade,
          maxGrade: totalMaxGrade,
        };
      })
    );
  };

  const [saveKey, setSaveKey] = useState();
  const exportSave = (e) => {
    e.preventDefault();
    let genSaveKey = JSON.stringify(Math.round(Math.random() * 10000));

    let encrypted = CryptoJS.AES.encrypt(
      JSON.stringify(categories),
      genSaveKey + secondPtSaveKey
    ).toString();
    navigator.clipboard.writeText(encrypted);
    Swal.fire({
        title: 'Success!',
        icon: 'success',
        iconColor: '#5A4088',
        color: '#5A4088',
        confirmButtonColor: '#82754A',
        text: 'A new key has been copied to your clipboard. Please remember your key, which is ' + genSaveKey + '.',
    })
  };

  // adding / updating assignments
  const [totalGrade, setTotalGrade] = useState(0);
  const handleAssignmentUpdate = (
    id,
    yourGradeToAdd,
    maxGradeToAdd,
    assignmentName
  ) => {
      let yourGrade = parseInt(yourGradeToAdd)
      let maxGrade = parseInt(maxGradeToAdd)
      if(yourGrade > 0 || maxGrade > 0) {
          setCategories(
              categories.map((category) => {
                  let newYourGrade = category.yourGrade + yourGrade;
                  let newMaxGrade = category.maxGrade + maxGrade;
                  let newAssignment = {
                      key: uuid(),
                      name: assignmentName,
                      yourGrade: yourGrade,
                      maxGrade: maxGrade,
                  };
                  let newAverage = newYourGrade / newMaxGrade;

                  if (category.id === id) {
                      return {
                          ...category,
                          average: newAverage * 100,
                          yourGrade: newYourGrade,
                          maxGrade: newMaxGrade,
                          assignments: [newAssignment, ...category.assignments],
                      };
                  } else {
                      return category;
                  }
              })
          );
          Swal.fire({
              ...SwalToastSuccess,
              title: 'Added assignment!'
          })
      } else {Swal.fire({
          ...SwalError,
          text: 'Make sure you are entering positive numbers.',
      })}
  };

  const removeAssignment = (key, categoryId) => {
    setCategories(
      categories.map((category) => {
          if (category.id === categoryId) {
              const assignments = category.assignments;
              const index = assignments.map((e) => e.key).indexOf(key);

              let newYourGrade =
                  category.yourGrade - parseInt(assignments[index]["yourGrade"]);
              let newMaxGrade =
                  category.maxGrade - parseInt(assignments[index]["maxGrade"]);
              let newAverage = newYourGrade / newMaxGrade;

              if (isNaN(newAverage)) {
                  newAverage = 0;
              }
              if (isNaN(newYourGrade)) {
                  newYourGrade = 0;
              }
              if (isNaN(newMaxGrade)) {
                  newMaxGrade = 0;
              }

              Swal.fire({
                  ...SwalToastSuccess,
                  title: 'Deleted Assignment!'
              })

              return {
                  ...category,
                  average: newAverage * 100,
                  yourGrade: newYourGrade,
                  maxGrade: newMaxGrade,
                  assignments: assignments.filter(
                      (assignment) => assignment !== assignments[index]
                  ),
              };
          } else {return category}

      })
    );
  };

  //calculate final grade
  const firstUpdate = useRef(true);
  useEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }

    let grade = 0;
    for (let i = 0; i < categories.length; i++) {
      grade += Math.round(categories[i].average * categories[i].weight) / 100;
    }
    setTotalGrade(grade);
  }, [categories]);

  return (
    <div>
      <div className="border-t-4 border-main pt-4">
        <div className="text-[12em] inline-block text-main/70 font-black absolute right-10 top-40">
          {Math.round(totalGrade * 100) / 100}%
        </div>
        <form className=" ml-2 inline-block" onSubmit={handleSubmit}>
            <div className="input-group">
                <label>
                    <input
                        className="input"
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
                        className="input"
                        required
                        maxLength="3"
                        placeholder="Weight (% of 100)"
                        autoComplete="off"
                        type="number"
                        name="cat-name"
                        value={catWeight}
                        onChange={(e) => {
                            setcatWeight(e.target.value)
                            if(catWeight < 0) {setcatWeight(0)}
                        }}
                        onKeyDown={(e)=> { if (e.code === 'Minus') {e.preventDefault();}}}
                    />
                </label>
            </div>
          <button className="plus-button">
            <FontAwesomeIcon icon={solid('plus')} className="text-white" />
          </button>
        </form>
      </div>

      <div id="display-categories">
        {categories.map((category) => (
          <Category
            key={category.id}
            id={category.id}
            {...category}
            removeAssignment={removeAssignment}
            handleAssignmentUpdate={handleAssignmentUpdate}
            setCategories={setCategories}
          />
        ))}
      </div>

      {/* "saving" */}
      <div className="absolute text-center right-20 top-[10vh]">
        <form onSubmit={handleLoad}>
            <div className="input-group">
                <input
                    className="input"
                    required
                    placeholder="Enter Key"
                    type="text"
                    value={datakey}
                    onChange={(e) => setDatakey(e.target.value)}
                />
                <input
                    className="text-center focus:outline-none"
                    placeholder="Enter Passcode"
                    type="number"
                    value={saveKey}
                    onChange={(e) => setSaveKey(e.target.value)}
                    required
                />
            </div>
          <button className="plus-button">
            <FontAwesomeIcon icon={solid('plus')} />
          </button>
        </form>
        <button
          className=" plus-button mt-2 text-xl"
          type="button"
          onClick={exportSave}
        >
          Export Data!
        </button>
      </div>
    </div>
  );
}

export default App;