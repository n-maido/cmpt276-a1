//-----------Grade calculations-----------
/**
 * Calculates the grade, rounded to 2 decimal places
 */
function calculateGrade(num, denom) {
    return ((num / denom) * 100).toFixed(2);
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
function handleMean() {
    let sum = 0.0;
    let grade_count = 0;
    let mean = 0.0;
    let missing_grades = [];
    let grade_results = document.getElementsByClassName("grade-result");

    for (let i = 0; i < grade_results.length; i++) {
        grade = document.getElementById(grade_results[i].id).innerHTML;

        if (grade.length == 0 || grade == "0.00%") {
            // add activity name to list of missing grades
            let grade_id = grade_results[i].id
            missing_grades.push("Activity " + grade_id.charAt(grade_id.length - 1));

        } else {
            grade_count++;
            sum += parseFloat(grade.substring(0, grade.length - 1));   
        }
    }

    // alert user of missing grades
    if (missing_grades.length > 0) {
        let alert_msg = "A grade is missing for: \n";
        for (let i = 0; i < missing_grades.length; i++) {
            alert_msg += missing_grades[i] + "\n";
        }
        window.alert(alert_msg);
    }

    // calculate mean
    mean = (sum / grade_count).toFixed(2);
    console.log("mean: " + mean);

    //display mean
    let result = document.getElementById("result");
    result.innerHTML = mean + "%";
}

let mean_button = document.getElementById("mean-btn");
console.log(mean_button);
mean_button.addEventListener('click', handleMean);