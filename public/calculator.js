let activity_counter = 4; // use this to generate ids & activity numbers, starting with 4 activities as default
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
    let input_id = input.srcElement.id;
    
    let row_number = input_id.charAt(input_id.length - 1);

    // extract denominator
    denom_id = "denom_a" + row_number; 
    denom = document.getElementById(denom_id).value;

    // extract numerator
    num_id = "num_a" + row_number;
    num = document.getElementById(num_id).value;

    // display grade
    let grade_id = "percent-a" + row_number;
    let grade_display = document.getElementById(grade_id);

    if (num > -1 && denom > 0) {
        grade = calculateGrade(num, denom);
        if (grade > -1) {
            grade_display.innerHTML = grade + "%";
        }
    } else {
        // clear the percent display
        grade_display.innerHTML = "";
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

    //display mean
    let result = document.getElementById("result");
    result.innerHTML = mean + "%";
}

let mean_button = document.getElementById("mean-btn");
mean_button.addEventListener('click', handleMean);

// ------------ Weighted grades ---------------------
/**
 * Weighted grade = (sum of grades, each multiplied by their weights) / (sum of weights)
 */
function handleWeight() {
    let num = 0.0; // numerator
    let denom = 0.0; //denominator
    let weighted_grade = 0.0;
    let missing_grades = [];
    let missing_weights = [];
    let alert = false;
    let alert_msg = "";

    // extract grades and weights
    let grade_results = document.getElementsByClassName("grade-result");
    let grade_weights = document.getElementsByClassName("weight-input");

    for (let i = 0; i < grade_results.length; i++) {
        let grade_id = grade_results[i].id
        grade = document.getElementById(grade_results[i].id).innerHTML;
        weight = grade_weights[i].querySelector("input[type=number]").value;

        if (grade.length == 0 || grade == "0.00%") {
            // add activity name to list of missing grades
            missing_grades.push("Activity " + grade_id.charAt(grade_id.length - 1));

        }
        
        if (weight.length === 0) {
            // add activity to list of missing weights
            missing_weights.push("Activity " + grade_id.charAt(grade_id.length - 1));
        }

        if (grade.length > 0 && weight.length > 0) {
            let cur_grade = parseFloat(grade.substring(0, grade.length - 1));
            let cur_weight = parseFloat(weight);
            num += cur_grade * cur_weight;
            denom += cur_weight;
        }
    }

    // alert user of missing grades & weights
    if (missing_grades.length > 0) {
        alert = true;
        alert_msg = "A grade is missing for: \n";
        for (let i = 0; i < missing_grades.length; i++) {
            alert_msg += missing_grades[i] + "\n";
        }
    }

    if (missing_weights.length > 0) {
        alert = true;
        alert_msg += "\nA weight is missing for: \n";
        for (let i = 0; i < missing_weights.length; i++) {
            alert_msg += missing_weights[i] + "\n";
        }
    }

    if (alert) {
        window.alert(alert_msg);
    }

    // calculate weighted grades
    weighted_grade = (num / denom).toFixed(2);
    
    //display weighted grade
    let result = document.getElementById("result");
    result.innerHTML = weighted_grade + "%";
}

let weight_button = document.getElementById("weight-btn");
weight_button.addEventListener('click', handleWeight);

// ------------------ Add activity -------------------------
/**
 * Adds a new activity to the table
 */
function handleAdd() {
    activity_counter++;
    let table = document.getElementById("table");
    let row = table.insertRow(-1); // append to end of table

    let name = row.insertCell(0);
    name.innerHTML = "Activity " + activity_counter;

    let short_name = row.insertCell(1);
    short_name.innerHTML = "A" + activity_counter;

    let weight = row.insertCell(2);
    weight.classList.add("weight-input");
    weight.innerHTML = "<input type=\"number\" id=\"weight_a" + activity_counter + "\" min=\"0\">"

    let grade = row.insertCell(3);
    grade.id = "grade-input-" + activity_counter
    grade.classList.add("grade-input");
    grade.innerHTML =   "<input type=\"number\" id=\"num_a" + activity_counter +  "\" min=\"0\">" + "\n" +
                        "<p class=\"grade-slash\">/</p>" + "\n" +
                        "<input type=\"number\" id=\"denom_a" + activity_counter + "\" min=\"0\">"
    grade.addEventListener('input', handleGradeRow);
    
    let percent = row.insertCell(4);
    percent.classList.add("grade-result");
    percent.id = "percent-a" + activity_counter;
}

let add_button = document.getElementById("add-btn");
add_button.addEventListener('click', handleAdd);