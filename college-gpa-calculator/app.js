$(document).ready(function() {
    var $frame = $('div#calcframebs');$frame.html('');
    addSemester();
    $frame.append('<div class="row col-xs-12 center-btn" style="margin: 0"><button id="calc-semester" class="calc-add calc-addh">Add another semester</button><br /><button id="calc-do" class="btn btn-success">Calculate</button></div><div class="output row col-xs-12"></div>');
    $(document).on('change','div#calcframebs select, div#calcframebs input', doCalc);
    $frame.find('#calc-do').click(doCalc);
    $frame.on('click', '.calc-add', function(e) {
        var $semester = $(this).parent().parent();
        var newnum = $semester.children('.input').children().last().data('index') + 1;
        var $calcrow=$('<div class="calcrow span2"></div>');
        $calcrow.data('index', newnum);
        $calcrow.append('<div class="row center-block"><h4 class="col-xs-12 col-sm-2"><input class="course-name" type="text" placeholder="e.g. Course ' + newnum + '"></h4> <label class="col-xs-4 col-sm-2 text-right">Grade:</label><div class="form-group col-sm-3 col-xs-8"> <span class="select-wrapper"><select class="grade form-control"><option value="-1">&mdash;</option><option value="4">A</option><option value="3.7">A-</option><option value="3.3">B+</option><option value="3">B</option><option value="2.7">B-</option><option value="2.3">C+</option><option value="2">C</option><option value="1.7">C-</option><option value="1.3">D+</option><option value="1">D</option><option value="0">F</option></select></span></div><label class="col-xs-4 col-sm-2 text-right">Credits:</label><div class="form-group col-sm-3 col-xs-8"><input type="text" class="credits form-control" /></div></div>');
        $semester.children('.input').append($calcrow);
    });

    $frame.find('#calc-semester').click(addSemester);

    function addSemester() {
        function mobilecheck() {
            var check = false;
            (function(a) {if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4)))check=true;})(navigator.userAgent||navigator.vendor||window.opera);
            return check;
        }

        var isMobile=mobilecheck();
        var count;
        if (isMobile) {
            count=2;
        } else {
            count=4;
        }

        var $frame = $('#calcframebs');
        var $existing = $frame.children('.semester');
        var newnum = $existing.size() + 1;
        var $sem = $('<div class="semester row"></div>');
        $sem.data('index', newnum);
        $sem.append('<div class="col-xs-12"><div class="form-horizontal panel panel-info"><div class="panel-heading">Semester ' + newnum + '</div><div class="panel-body"><div class="input row"></div><div class="row center-btn"><button class="calc-add calc-addh">Add another class</button></div><div class="inneroutput row"></div></div></div></div>');
        var $input = $sem.find('.input');
        for(var i = 1; i <= count; i++) {
            var $calcrow=$('<div class="calcrow span2"></div>');
            $calcrow.data('index', i);
            $calcrow.append('<div class="row center-block"><h4 class="col-xs-12 col-sm-2"><input class="course-name" type="text" placeholder="e.g. Course '+i+'"></h4> <label class="col-xs-4 col-sm-2 text-right">Grade:</label><div class="form-group col-sm-3 col-xs-8"> <span class="select-wrapper"><select class="grade form-control"><option value="-1">&mdash;</option><option value="4">A</option><option value="3.7">A-</option><option value="3.3">B+</option><option value="3">B</option><option value="2.7">B-</option><option value="2.3">C+</option><option value="2">C</option><option value="1.7">C-</option><option value="1.3">D+</option><option value="1">D</option><option value="0">F</option></select></span></div><label class="col-xs-4 col-sm-2 text-right">Credits:</label><div class="form-group col-sm-3 col-xs-8"><input type="text" class="credits form-control" /></div></div>');
            $input.append($calcrow);
        }
        if ($existing.size() == 0) {
            $frame.append($sem);
        } else {
            $sem.insertAfter($existing.last());
        }
    }

    function doCalc() {
        var $frame=$('div#calcframebs');
        var $semesters = $frame.children('.semester');
        var grand_total = 0;
        var grand_count = 0;
        var semestersValuesCumulative = [];
        $semesters.each(function(i) {
            var $sem = $(this);
            var semesterValues = [];
            $sem.find('.input').children().each(function(i) {
                var $inputs = $(this).find('select, input');
                var credits = parseInt($inputs.filter('.credits').val());
                var grade = parseFloat($inputs.filter('.grade').val());
                if (credits > 0 && credits >= 0) {
                    semesterValues.push({grade:grade,credits:credits});
                }
            });

            var $out = $sem.find('.inneroutput');
            if (semesterValues.length === 0) {
                $out.html('');
            } else {
                var total=semesterValues.reduce(function(a,b) { 
                    return a+(b.grade*b.credits);
                }, 0);

                var count = semesterValues.reduce(function(a, b) {
                    return a+b.credits;
                },0);

                var semesterResult = roundNumber(total / count, 2);
                var semesterColor='#B71919';
                if (semesterResult>2.4) semesterColor='#b7b400';
                if (semesterResult>3.4) semesterColor='#54B725';
                var semesterHtml='\
                <div class="wg-result-wrapper">\
                    <div class="sidebar sidebar-score">\
                        <div class="score-circle">\
                            <h4 style="background-color: '+semesterColor+'" class="score-outer">\
                                <span class="score-inner">\
                                    <span class="your-title">Your Semester GPA is</span>\
                                    <span class="score">'+semesterResult+'</span>\
                                </span>\
                            </h4>\
                        </div>\
                    </div>\
                </div>\
                ';
                $out.html(semesterHtml);
            }

            grand_total += total;
            grand_count += count;
            semestersValuesCumulative = semestersValuesCumulative.concat(semesterValues);
        });

        var cumulative_gpa = parseFloat($frame.find('.cumulative-gpa').val());
        var $out = $frame.find('.output');
        if (semestersValuesCumulative.length === 0) {
            $out.html('');
        } else {
            if (cumulative_gpa) {
                var overallResult = (grand_total/grand_count*0.5) + (cumulative_gpa*0.5);
            } else {
                var overallResult = grand_total/grand_count;
            }
            overallResult = roundNumber(overallResult,2);
            var overallColor='#B71919';
            if (overallResult > 2.4) overallColor='#b7b400';
            if (overallResult > 3.4) overallColor='#54B725';
            var overallHtml='\
                <div class="wg-result-wrapper">\
                    <div class="sidebar sidebar-score">\
                        <div class="score-circle">\
                            <h4 style="background-color: '+overallColor+'" class="score-outer">\
                                <span class="score-inner">\
                                    <span class="your-title">Your Overall GPA is</span>\
                                    <span class="score">'+overallResult+'</span>\
                                </span>\
                            </h4>\
                        </div>\
                    </div>\
                    <div class="row center-btn"><div class="raise-gpa">\
                        <a class="btn btn-primary" target="_blank" href="../raise-gpa/index.html?#'+overallResult+'|'+grand_count+'">Raise this GPA</a>\
                    </div>\
                </div>\
                ';
            $out.html(overallHtml);
        }
    }

    function roundNumber(val, precision) {
        var rounded = Math.round(val * Math.pow(10,precision)) / Math.pow(10,precision);
        rounded = rounded + '';
        if (rounded.indexOf('.') < 0) {
            return rounded + '.' + Array(precision+1).join('0');
        } else if (rounded.length-rounded.indexOf('.') - 1< precision ) { 
            var delta = rounded.length-rounded.indexOf('.') - 1;
            return rounded + Array(precision-delta+1).join('0');
        } else {
            return rounded;
        }
    }
});