function calculateGrade() {
    // 1. Get Input Values
    const prelim = parseFloat(document.getElementById('prelim').value);
    const midterm = parseFloat(document.getElementById('midterm').value);
    const prefinals = parseFloat(document.getElementById('prefinals').value);
    const finals = parseFloat(document.getElementById('finals').value);

    // 2. Input Validation
    if (isNaN(prelim) || isNaN(midterm) || isNaN(prefinals) || isNaN(finals) || 
        prelim < 0 || prelim > 100 || midterm < 0 || midterm > 100 || 
        prefinals < 0 || prefinals > 100 || finals < 0 || finals > 100) {
        
        document.getElementById('percentageResult').textContent = "---";
        document.getElementById('equivalentResult').textContent = "---";
        document.getElementById('remarksResult').textContent = "Please enter valid grades (0-100).";
        return;
    }

    // 3. Compute Weighted Average
    // Weights: Prelim=20%, Midterm=20%, Pre-Finals=20%, Finals=40%
    const finalPercentageGrade = (prelim * 0.20) + 
                                 (midterm * 0.20) + 
                                 (prefinals * 0.20) + 
                                 (finals * 0.40);

    // Round the result to two decimal places
    const roundedGrade = finalPercentageGrade.toFixed(2);

    // 4. Determine Equivalent Grade and Remarks
    const { equivalent, remarks } = getEquivalentGrade(roundedGrade);

    // 5. Display Results
    document.getElementById('percentageResult').textContent = `${roundedGrade}%`;
    document.getElementById('equivalentResult').textContent = equivalent;
    document.getElementById('remarksResult').textContent = remarks;
}

function getEquivalentGrade(percentage) {
    let equivalent = "N/A";
    let remarks = "N/A";
    const p = parseFloat(percentage);

    if (p >= 97.50 && p <= 100.00) {
        equivalent = "1.00";
        remarks = "Excellent";
    } else if (p >= 94.50 && p <= 97.49) {
        equivalent = "1.25";
        remarks = "Very Good";
    } else if (p >= 91.50 && p <= 94.49) {
        equivalent = "1.50";
        remarks = "Very Good";
    } else if (p >= 86.50 && p <= 91.49) {
        equivalent = "1.75";
        remarks = "Very Good";
    } else if (p >= 81.50 && p <= 86.49) {
        equivalent = "2.00";
        remarks = "Satisfactory";
    } else if (p >= 76.00 && p <= 81.49) {
        equivalent = "2.25";
        remarks = "Satisfactory";
    } else if (p >= 70.50 && p <= 75.99) {
        equivalent = "2.50";
        remarks = "Satisfactory";
    } else if (p >= 65.00 && p <= 70.49) {
        equivalent = "2.75";
        remarks = "Fair";
    } else if (p >= 59.50 && p <= 64.99) {
        equivalent = "3.00";
        remarks = "Fair";
    } else if (p < 59.50) {
        equivalent = "5.00";
        remarks = "Failed";
    }

    return { equivalent, remarks };
}