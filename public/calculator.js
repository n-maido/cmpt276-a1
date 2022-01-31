//-----------Grade calculations-----------
/**
 * Calculates the grade, rounded to 2 decimal places
 */
function calculateGrade(num, denom) {
    return (num / denom).toFixed(4) * 100;
}

// Detect grade inputs
/**
 * When a grade input is detected, extract the numerator and denominator from the row and calculate the grade
 */
function handleGradeRow(input) {
    let num = -1;
    let denom = -1;
    let grade = -1;

    // id's are named as such: "denom_a1, denom_a2" etc
    // extract the row number of the id
    let input_id = input.path[0].id;
    let row_number = input_id.charAt(input_id.length - 1);

    // extract denominator
    denom_id = "denom_a" + row_number; 
    denom = document.getElementById(denom_id).value;

    // extract numerator
    num_id = "num_a" + row_number;
    num = document.getElementById(num_id).value;

    // calculate grade, only if we have both numerator and denominator
    if (num > -1 && denom > 0) {
        grade = calculateGrade(num, denom);
    }

    // display grade
    if (grade > -1) {
        let grade_id = "percent-a" + row_number;
        let grade_display = document.getElementById(grade_id);
        grade_display.innerHTML = grade + "%";
    }
}

// Add event listeners to grade inputs
let grade_inputs = document.getElementsByClassName("grade-input");

for (let i = 0; i < grade_inputs.length ; i++) {
    row = document.getElementById(grade_inputs[i].id);
    row.addEventListener('input', handleGradeRow);
}

// ------------- Mean grades ---------------
function handleMean(input) {
    let sum = 0.0;
    let gradeCount = 0;
    let mean = 0.0;
    let grade_results = document.getElementsByClassName("grade-result");

    for (let i = 0; i < grade_results.length; i++) {
        grade = document.getElementById(grade_results[i].id).innerHTML;

        if (grade.length == 0) {
            console.log("no grade")
        } else {
            gradeCount++;
            sum += parseFloat(grade.substring(0, grade.length - 1));
            mean = (sum / gradeCount).toFixed(2);
            console.log("mean: " + mean);
            
        }
    }

}

let mean_button = document.getElementById("mean-btn");
console.log(mean_button);
mean_button.addEventListener('click', handleMean);