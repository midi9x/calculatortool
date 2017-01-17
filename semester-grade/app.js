function semGrade(form) {
    var allOK = checkForm();
    if (allOK == false) return;
    if (document.GradePercents.semGrd.value != "") {
        if (blankFields != 0) {
            alert("Every field EXCEPT the semester grade field must contain a number for this calculation to work.");
            return;
        }
    }
    var frstQrtPrcnt = eval(form.frstQrt.value);
    var frstQrtPrcntSem = eval(form.frstPrcntSem.value);
    var scndQrtPrcnt = eval(form.scndQrt.value);
    var scndQrtPrcntSem = eval(form.scndPrcntSem.value);
    var examPrcnt = eval(form.exam.value);
    var examPrcntSem = eval(form.examPrcntSem.value);
    form.semGrd.value = Math.round((frstQrtPrcntSem / 100 * frstQrtPrcnt + scndQrtPrcntSem / 100 * scndQrtPrcnt + examPrcntSem / 100 * examPrcnt) * 100) / 100;
}

function finalExamGrade(form) {
    var allOK = checkForm();
    if (allOK == false) return;
    if (document.GradePercents.exam.value != "") {
        if (blankFields != 0) {
            alert("Every field EXCEPT the final exam grade field must contain a number for this calculation to work.");
            return;
        }
    }
    var frstQrtPrcnt = eval(form.frstQrt.value);
    var frstQrtPrcntSem = eval(form.frstPrcntSem.value);
    var scndQrtPrcnt = eval(form.scndQrt.value);
    var scndQrtPrcntSem = eval(form.scndPrcntSem.value);
    var examPrcntSem = eval(form.examPrcntSem.value);
    var semGrd = eval(form.semGrd.value);
    form.exam.value = Math.round(((semGrd - frstQrtPrcnt * frstQrtPrcntSem / 100 - scndQrtPrcnt * scndQrtPrcntSem / 100) / (examPrcntSem / 100)) * 100) / 100;
}

function checkForm() {
    var readyToGo = true
    blankFields = 0
    var errMsg1 = "You must have a number in all but 1 field."
    var errMsg2 = "All grades must be entered in as percentages (numbers)."
    for (i = 0; i < 7; i++) {
        if (document.GradePercents.elements[i].value == "") blankFields += 1
        if (blankFields == 2) {
            readyToGo = false
            alert(errMsg1)
            break
        }
    }
    for (j = 0; j < 7; j++) {
        if (isNaN(document.GradePercents.elements[j].value) && document.GradePercents.elements[j].value != "") {
            readyToGo = false
            alert(errMsg2)
            break
        }
    }
    return readyToGo
}

function semGrade(form) {
    var allOK = checkForm();
    if (allOK == false) return;
    if (document.GradePercents.semGrd.value != "") {
        if (blankFields != 0) {
            alert("Every field EXCEPT the semester grade field must contain a number for this calculation to work.");
            return;
        }
    }
    var frstQrtPrcnt = eval(form.frstQrt.value);
    var frstQrtPrcntSem = eval(form.frstPrcntSem.value);
    var scndQrtPrcnt = eval(form.scndQrt.value);
    var scndQrtPrcntSem = eval(form.scndPrcntSem.value);
    var examPrcnt = eval(form.exam.value);
    var examPrcntSem = eval(form.examPrcntSem.value);
    form.semGrd.value = Math.round((frstQrtPrcntSem / 100 * frstQrtPrcnt + scndQrtPrcntSem / 100 * scndQrtPrcnt + examPrcntSem / 100 * examPrcnt) * 100) / 100;
}

function finalExamGrade(form) {
    var allOK = checkForm();
    if (allOK == false) return;
    if (document.GradePercents.exam.value != "") {
        if (blankFields != 0) {
            alert("Every field EXCEPT the final exam grade field must contain a number for this calculation to work.");
            return;
        }
    }
    var frstQrtPrcnt = eval(form.frstQrt.value);
    var frstQrtPrcntSem = eval(form.frstPrcntSem.value);
    var scndQrtPrcnt = eval(form.scndQrt.value);
    var scndQrtPrcntSem = eval(form.scndPrcntSem.value);
    var examPrcntSem = eval(form.examPrcntSem.value);
    var semGrd = eval(form.semGrd.value);
    form.exam.value = Math.round(((semGrd - frstQrtPrcnt * frstQrtPrcntSem / 100 - scndQrtPrcnt * scndQrtPrcntSem / 100) / (examPrcntSem / 100)) * 100) / 100;
}

function checkForm() {
    var readyToGo = true
    blankFields = 0
    var errMsg1 = "You must have a number in all but 1 field."
    var errMsg2 = "All grades must be entered in as percentages (numbers)."
    for (i = 0; i < 7; i++) {
        if (document.GradePercents.elements[i].value == "") blankFields += 1
        if (blankFields == 2) {
            readyToGo = false
            alert(errMsg1)
            break
        }
    }
    for (j = 0; j < 7; j++) {
        if (isNaN(document.GradePercents.elements[j].value) && document.GradePercents.elements[j].value != "") {
            readyToGo = false
            alert(errMsg2)
            break
        }
    }
    return readyToGo
}