$(document).ready(function() {
    var $frame = $('div#calcframe');
    $frame.html('<div class="input_block r_cgpa"><input type="text" style="background-color:#FFE;" id="start_gpa" /><br /><label for="start_gpa">Current GPA</label></div><div class="input_block r_credits"><input type="text" style="background-color:#FFE;" id="start_credits" /><br /><label for="start_credits">Current Total Credits</label></div><div style="clear:both;border-bottom: 1px solid rgba(155,179,202,0.45);margin-bottom:10px;" ></div>');
    $frame.append('<p id="q1">In order to raise my GPA <input type="text" id="q1_point_amount" value="0.2" /> points<span id="q1_point_amount_out"></span>, if I maintain a <input type="text" id="q1_gpa_average" /> average GPA, it will take <span class="out">??</span> additional credits.</p>');
    $frame.append('<p id="q2">I am taking <input type="text" id="q2_credits" value="12" /> credits this semester. If I want to raise my GPA <input type="text" id="q2_point_amount" value="0.2" /> points<span id="q2_point_amount_out"></span>, I need a <span class="out">??</span> GPA average on all my courses this semester.</p>');
    $frame.append('<p style="text-align:center; margin-bottom:0"><button id="calc-do">Calculate</button></p><p style="margin-bottom:0" id="errors"></p>');
    $(document).on('change', 'div#calcframe input', doCalc);
    $frame.children('#calc-do').click(doCalc);
    if (window.location.hash != '') window.location.hash = decodeURIComponent(window.location.hash);
    if (window.location.hash != '' && window.location.hash.indexOf('|') > 0) {
        var hash = window.location.hash.substring(1);
        var pipe = hash.indexOf('|');
        var GPA = hash.substring(0,pipe);
        var credits = hash.substring(pipe + 1);
        var $frame = $('div#calcframe');
        $frame.find('#start_gpa').val(GPA);
        $frame.find('#start_credits').val(credits);
        doCalc();
    }
});
function doCalc() {
    var $frame = $('div#calcframe');
    $frame.find('#errors').html('');
    var $inputs = $frame.find('input');
    if ($inputs.filter('#start_gpa').val() == '') return false;
    if ($inputs.filter('#start_credits').val() == '') return false;
    var startGPA = parseFloat($inputs.filter('#start_gpa').val());
    var startCredits = parseFloat($inputs.filter('#start_credits').val());
    if ($inputs.filter('#q1_point_amount').val() == '') $inputs.filter('#q1_point_amount').val('0.5');
    var targetGPA = parseFloat($inputs.filter('#q1_point_amount').val()) + parseFloat($inputs.filter('#start_gpa').val());
    if ($inputs.filter('#q1_gpa_average').val() == '') $inputs.filter('#q1_gpa_average').val(roundNumber(targetGPA + 0.1,2));
    $frame.find('span#q1_point_amount_out').html(' (' + roundNumber(targetGPA, 2) + ')');
    var GPAavg = parseFloat($inputs.filter('#q1_gpa_average').val());
    if(GPAavg <= targetGPA) { 
        $frame.find('#q1 span.out').html('??').removeClass('warning');
        $frame.find('#errors').html('Average GPA must be more than the target GPA. ');
    } else {
        var credits = (startCredits*(startGPA-targetGPA))/(targetGPA-GPAavg);
        $frame.find('#q1 span.out').html(roundNumber(credits, 1));
        if (credits>18) {
            $frame.find('#q1 span.out').addClass('warning');
            $frame.find('#errors').html('High number of credits required for that average. ');
        } else {
            $frame.find('#q1 span.out').removeClass('warning');
        }
    }

    if ($inputs.filter('#q2_credits').val() == '') $inputs.filter('#q2_credits').val('12');
    if ($inputs.filter('#q2_point_amount').val() == '') $inputs.filter('#q2_point_amount').val('0.5');
    var targetGPA = parseFloat($inputs.filter('#q2_point_amount').val()) + parseFloat($inputs.filter('#start_gpa').val());
    $frame.find('span#q2_point_amount_out').html(' ('+roundNumber(targetGPA,2)+')');
    var credits = parseFloat($inputs.filter('#q2_credits').val());
    var GPAavg = (targetGPA*(startCredits+credits)-startGPA*startCredits)/credits;
    $frame.find('#q2 span.out').html(roundNumber(GPAavg,2));
    if (GPAavg > 4) {
        $frame.find('#q2 span.out').addClass('warning');
        $frame.find('#errors').append('Impossibly high GPA needed to achieve that. ');
    } else {
        $frame.find('#q2 span.out').removeClass('warning');
    }
}

function roundNumber(val,precision) {
    var rounded = Math.round(val*Math.pow(10,precision)) / Math.pow(10, precision);
    rounded = rounded + '';
    if (rounded.indexOf('.') < 0) {
        return rounded + '.' + Array(precision+1).join('0');
    } else if(rounded.length - rounded.indexOf('.') - 1 < precision) {
        var delta = rounded.length - rounded.indexOf('.') - 1;
        return rounded + Array(precision-delta+1).join('0');
    } else {
        return rounded;
    }
}