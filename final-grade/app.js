$('.wg-final-grade-calc').each(function() {
    var $calc = $(this);
    $calc.html('\
        <div class="main-wrapper">\
          <div class="wg-calc-row">\
            <span class="desired-grade small-column">Desired Grade (%)</span>\
            <input class="desired-grade small-column" type="text" placeholder="e.g. 80">\
            <span class="small-column">Out of</span>\
            <input class="desired-grade-out-of small-column" type="text" value="100" placeholder="e.g. 100">\
          </div>\
          <div class="wg-calc-row">\
            <span class="current-grade small-column">Current Grade (%)</span>\
            <input class="current-grade small-column" type="text" placeholder="e.g. 82.3">\
            <span class="small-column">Out of</span>\
            <input class="current-grade-out-of small-column" type="text"  value="100" placeholder="e.g. 100">\
          </div>\
          <div class="wg-calc-row">\
            <span class="weight-grade small-column">Weight of Final (%)</span>\
            <input class="weight-grade small-column" type="text" placeholder="e.g. 40">\
            <span class="small-column">Out of</span>\
            <input class="weight-grade-out-of small-column" type="text"  value="100" placeholder="e.g. 100">\
          </div>\
        </div>\
        <div class="result-wrapper">\
          <div class="sidebar sidebar-score">\
              <div class="score-circle" style="display: none;">\
                  <h4 style="background-color: rgb(83, 183, 35);" class="score-outer">\
                      <span class="score-inner">\
                          <span>Grade Needed on Final Exam</span>\
                          <span class="score">70.00%</span>\
                      </span>\
                  </h4>\
              </div>\
          </div>\
          <div class="additional-info">\
          </div>\
        </div>\
      ');
    if (location.hash !== '') {
        var currentGrade = parseFloat(location.hash.replace(/^#/, ''));
        $calc.find('input.current-grade').val(currentGrade);
        doCalc();
    }
    $calc.on('keyup', 'input[type=text]', function() {
        doCalc();
    });

    function doCalc() {
        var $score = $calc.find('.score-circle');
        var $additionalInfo = $calc.find('.additional-info');
        var desired = parseFloat($calc.find('input.desired-grade').val());
        var desiredOutOf = parseFloat($calc.find('input.desired-grade-out-of').val());
        var current = parseFloat($calc.find('input.current-grade').val());
        var currentOutOf = parseFloat($calc.find('input.current-grade-out-of').val());
        var weight = parseFloat($calc.find('input.weight-grade').val());
        var weightOutOf = parseFloat($calc.find('input.weight-grade-out-of').val());
        var desiredCorrected = desired / desiredOutOf * 100;
        var currentCorrected = current / currentOutOf * 100;
        var weightCorrected = weight / weightOutOf * 100;
        var finalGrade = (100 * desiredCorrected - (100 - weightCorrected) * currentCorrected) / weightCorrected;
        var finalGradeOutOfDesired = finalGrade / desiredOutOf * 100;
        var finalWeightPC = weight / weightOutOf;
        var currentWeightPC = 1 - finalWeightPC;
        var currentGradePC = current / currentOutOf;
        var perfectFinalPC = currentGradePC * currentWeightPC + finalWeightPC;
        var perfectFinal = perfectFinalPC * desiredOutOf;
        if (isNaN(finalGrade)) {
            $score.hide();
            $additionalInfo.hide();
        } else {
            $score.show();
            $additionalInfo.show();
            $score.find('.score').html(Math.round(finalGrade) + '%');
            $additionalInfo.html('\
            <p>Your current grade is <b>' + current + '/' + currentOutOf + ' (' + roundNumber(currentCorrected, 1) + '%)</b>.\
            <p>You need to earn at least <b>' + roundNumber(finalGrade, 1) + '/' + desiredOutOf + ' (' + roundNumber(finalGradeOutOfDesired, 1) + '%)</b> on your remaining work to have an overall grade of <b>' + desired + '/' + desiredOutOf + ' (' + roundNumber(desiredCorrected, 1) + '%)</b>.\
            <p>If you score <b>100%</b> on your remaining work, you will have an overall grade of <b>' + roundNumber(perfectFinal, 1) + '/100 (' + roundNumber(perfectFinalPC * 100, 1) + '%)</b>.\
          ');
        }
    }

    function roundNumber(val, precision) {
        var rounded = Math.round(val * Math.pow(10, precision)) / Math.pow(10, precision);
        rounded = rounded + '';
        if (rounded.indexOf('.') < 0) {
            return rounded + '.' + Array(precision + 1).join('0');
        } else if (rounded.length - rounded.indexOf('.') - 1 < precision) {
            var delta = rounded.length - rounded.indexOf('.') - 1;
            return rounded + Array(precision - delta + 1).join('0');
        } else {
            return rounded;
        }
    }
});