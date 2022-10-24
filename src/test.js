
const dktest = [
    {
        name: 'test1',
        weight: 50,
        average: 0,
        assignmentList: [
            {
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
    },
    {
        name: 'test2',
        weight: 50,
        average: 0,
        assignmentList: [
            {
                assignmentName: "assignment3",
                yourGrade: "6",
                maxGrade: "9",
            },
            {
                assignmentName: "assignment4",
                yourGrade: "18",
                maxGrade: "22",
            }
        ]
    },

]

let x = dktest.find(obj => obj.name == "test1")
console.log(x["assignmentList"])