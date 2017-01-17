(function ($) {
    var gcToast = function (message, displayLength, className, completeCallback) {
        className = className || "";
        var container = document.getElementById('toast-container');
        if (container === null) {
            container = document.createElement('div');
            container.id = 'toast-container';
            document.body.appendChild(container);
        }
        var newToast = createToast(message);
        if (message) {
            container.appendChild(newToast);
        }
        newToast.style.top = '35px';
        newToast.style.opacity = 0;
        Vel(newToast, {
            "top": "0px",
            opacity: 1
        }, {
            duration: 300,
            easing: 'easeOutCubic',
            queue: false
        });
        var timeLeft = displayLength;
        var counterInterval;
        if (timeLeft != null) {
            counterInterval = setInterval(function () {
                if (newToast.parentNode === null) window.clearInterval(counterInterval);
                if (!newToast.classList.contains('panning')) {
                    timeLeft -= 20;
                }
                if (timeLeft <= 0) {
                    Vel(newToast, {
                        "opacity": 0,
                        marginTop: '-40px'
                    }, {
                        duration: 375,
                        easing: 'easeOutExpo',
                        queue: false,
                        complete: function () {
                            if (typeof (completeCallback) === "function") completeCallback();
                            this[0].parentNode.removeChild(this[0]);
                        }
                    });
                    window.clearInterval(counterInterval);
                }
            }, 20);
        }

        function createToast(html) {
            var toast = document.createElement('div');
            toast.classList.add('toast');
            if (className) {
                var classes = className.split(' ');
                for (var i = 0, count = classes.length; i < count; i++) {
                    toast.classList.add(classes[i]);
                }
            }
            if (typeof HTMLElement === "object" ? html instanceof HTMLElement : html && typeof html === "object" && html !== null && html.nodeType === 1 && typeof html.nodeName === "string") {
                toast.appendChild(html);
            } else if (html instanceof jQuery) {
                toast.appendChild(html[0]);
            } else {
                toast.innerHTML = html;
            }
            var hammerHandler = new Hammer(toast, {
                prevent_default: false
            });
            hammerHandler.on('pan', function (e) {
                var deltaX = e.deltaX;
                var activationDistance = 80;
                if (!toast.classList.contains('panning')) {
                    toast.classList.add('panning');
                }
                var opacityPercent = 1 - Math.abs(deltaX / activationDistance);
                if (opacityPercent < 0) opacityPercent = 0;
                Vel(toast, {
                    left: deltaX,
                    opacity: opacityPercent
                }, {
                    duration: 50,
                    queue: false,
                    easing: 'easeOutQuad'
                });
            });
            hammerHandler.on('panend', function (e) {
                var deltaX = e.deltaX;
                var activationDistance = 80;
                if (Math.abs(deltaX) > activationDistance) {
                    Vel(toast, {
                        marginTop: '-40px'
                    }, {
                        duration: 375,
                        easing: 'easeOutExpo',
                        queue: false,
                        complete: function () {
                            if (typeof (completeCallback) === "function") {
                                completeCallback();
                            }
                            toast.parentNode.removeChild(toast);
                        }
                    });
                } else {
                    toast.classList.remove('panning');
                    Vel(toast, {
                        left: 0,
                        opacity: 1
                    }, {
                        duration: 300,
                        easing: 'easeOutExpo',
                        queue: false
                    });
                }
            });
            return toast;
        }
    }


    $(document).ready(function () {
    'use strict';
    if ($('#grade-calculator').length) {
        var largeWindow;
        $(document).ready(function () {
            if (window.innerWidth > 958) {
                largeWindow = true;
            }
        });
        $(window).resize(function () {
            if (window.innerWidth > 958) {
                largeWindow = true;
            }
        });

        function mobilecheck() {
            var check = false;
            (function(a) {if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4)))check=true;})(navigator.userAgent||navigator.vendor||window.opera);
            return check;
        }
        var isMobile = mobilecheck();
        var grades = [{
            grade: 0,
            regular: 0.00,
            honors: 0.50,
            college: 1.00,
            ap: 1.00,
            ib: 1.00
        }, {
            grade: 60,
            regular: 0.67,
            honors: 1.17,
            college: 1.67,
            ap: 1.67,
            ib: 1.67
        }, {
            grade: 63,
            regular: 1.00,
            honors: 1.50,
            college: 2.00,
            ap: 2.00,
            ib: 2.00
        }, {
            grade: 67,
            regular: 1.33,
            honors: 1.83,
            college: 2.33,
            ap: 2.33,
            ib: 2.33
        }, {
            grade: 70,
            regular: 1.67,
            honors: 2.17,
            college: 2.67,
            ap: 2.67,
            ib: 2.67
        }, {
            grade: 73,
            regular: 2.00,
            honors: 2.50,
            college: 3.00,
            ap: 3.00,
            ib: 3.00
        }, {
            grade: 77,
            regular: 2.33,
            honors: 2.83,
            college: 3.33,
            ap: 3.33,
            ib: 3.33
        }, {
            grade: 80,
            regular: 2.67,
            honors: 3.17,
            college: 3.67,
            ap: 3.67,
            ib: 3.67
        }, {
            grade: 83,
            regular: 3.00,
            honors: 3.50,
            college: 4.00,
            ap: 4.00,
            ib: 4.00
        }, {
            grade: 87,
            regular: 3.33,
            honors: 3.83,
            college: 4.33,
            ap: 4.33,
            ib: 4.33
        }, {
            grade: 90,
            regular: 3.67,
            honors: 4.17,
            college: 4.67,
            ap: 4.67,
            ib: 4.67
        }, {
            grade: 93,
            regular: 4.00,
            honors: 4.50,
            college: 5.00,
            ap: 5.00,
            ib: 5.00
        }, {
            grade: 95,
            regular: 4.33,
            honors: 4.83,
            college: 5.33,
            ap: 5.33,
            ib: 5.33
        }];
        var toasts = ['Voila..', 'Good job..', 'Keep it up!', 'Awesome..', 'Bravo!', 'Radical!', 'Don\'t push it..', 'Way to go..', 'You are on a roll.'];
        var classTypes = [{
            value: 'regular',
            label: 'Regular'
        }, {
            value: 'honors',
            label: 'Honors'
        }, {
            value: 'ap',
            label: 'AP'
        }, {
            value: 'ib',
            label: 'IB'
        }, {
            value: 'college',
            label: 'College'
        }];
        Vue.filter('decimal', function (value) {
            return value.toFixed(2);
        });
        var initialClasses = ['Math'];
        if (!isMobile) {
            initialClasses = ['Math', 'Biology', 'History', 'English'];
        }
        var gradeCalculator = new Vue({
            el: '#grade-calculator',
            data: {
                includeCurrentGPA: false,
                currentGPA: {
                    gpa: null,
                    credits: null
                },
                semesters: [],
                semester: {
                    classes: [],
                    title: '',
                },
                classTypes: classTypes,
                letters: [{
                    'value': 95,
                    'label': 'A+'
                }, {
                    'value': 93,
                    'label': 'A'
                }, {
                    'value': 90,
                    'label': 'A-'
                }, {
                    'value': 87,
                    'label': 'B+'
                }, {
                    'value': 83,
                    'label': 'B'
                }, {
                    'value': 80,
                    'label': 'B-'
                }, {
                    'value': 77,
                    'label': 'C+'
                }, {
                    'value': 73,
                    'label': 'C'
                }, {
                    'value': 70,
                    'label': 'C-'
                }, {
                    'value': 67,
                    'label': 'D+'
                }, {
                    'value': 63,
                    'label': 'D'
                }, {
                    'value': 60,
                    'label': 'D-'
                }, {
                    'value': 0,
                    'label': 'F'
                }],
                credits: [1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5, 5.5],
                initialClasses: initialClasses,
                grades: grades,
                GPAType: 'weighted',
                gradeFormat: 'letters',
                validation: {
                    valid: true,
                    message: ''
                },
                originalImageSource: '',
                bottomOpen: false
            },
            mounted: function () {
                this.addSemester(null);
            },
            methods: {
                average: function (ary) {
                    return ary.reduce(function (sum, a) {
                        return sum + a
                    }, 0) / (ary.length || 1);
                },
                validateForm: function (semesterIndex) {
                    var index = this.semesters[semesterIndex].classes.length - 1;
                    var studentClass = this.semesters[semesterIndex].classes[index];
                    var valid;
                    if (!studentClass.name) {
                        valid = false;
                        this.validation.message = 'Please enter a course name';
                    }
                    if (!studentClass.grade && studentClass.grade !== 0) {
                        valid = false;
                        this.validation.message = 'Please enter a grade';
                    }
                    if (valid === false) {
                        this.validation.valid = false;
                    } else {
                        this.validation.valid = true;
                        this.validation.message = '';
                    }
                },
                addSemester: function (event) {
                    if (event) event.preventDefault();
                    var semester = {
                        classes: [],
                        title: '',
                    };
                    this.initialClasses.forEach(function (className) {
                        semester.classes.push({
                            name: null,
                            placeholder: className,
                            grade: null,
                            credits: 2,
                            classType: 'regular'
                        });
                    });
                    Vue.set(this.semesters, this.semesters.length, semester);
                },
                addClass: function (event, semesterIndex) {
                    event.preventDefault();
                    this.validateForm(semesterIndex);
                    if (this.validation.valid === false) return false;
                    var message = toasts[Math.floor(Math.random() * toasts.length)];
                    gcToast(message, 2500);
                    var newClass = {
                        name: null,
                        placeholder: 'Math',
                        grade: null,
                        credits: 2,
                        classType: 'regular'
                    };
                    this.semesters[semesterIndex].classes.push(newClass);
                },
                removeSemester: function (event, semesterIndex) {
                    if (this.semesters.length < 1) return;
                    this.semesters.splice(semesterIndex, 1);
                },
                removeClass: function (event, semesterIndex, classIndex) {
                    event.preventDefault();
                    if (this.semesters[semesterIndex].classes.length < 2) return;
                    this.semesters[semesterIndex].classes.splice(classIndex, 1);
                },
                triggerHover: function (event) {
                    var $ele = $(event.target);
                    this.originalImageSource = $ele.attr('src');
                    $ele.attr('src', $ele.attr('data-hover-src'));
                },
                untriggerHover: function (event) {
                    var $ele = $(event.target);
                    $ele.attr('src', this.originalImageSource);
                    this.originalImageSource = null;
                },
                setGradeFormat: function (format) {
                    this.gradeFormat = format;
                },
                setGPAType: function (event, type) {
                    event.preventDefault();
                    this.GPAType = type;
                },
                calculateSemesterGPA: function (semester) {
                    var self = this;
                    var gpa = {};
                    var weighted = [];
                    var unweighted = [];
                    var totalCredits = 0;
                    if (semester.classes.length < 1) return false;
                    semester.classes.forEach(function (c) {
                        var percentage = c.grade;
                        if (typeof percentage === 'string') {
                            percentage = parseInt(percentage);
                        }
                        var type = c.classType;
                        var credits = c.credits;
                        var unweightedGrade;
                        var weightedGrade;
                        grades.forEach(function (g) {
                            if (percentage >= g.grade) {
                                unweightedGrade = g.regular;
                                weightedGrade = g[type] * credits;
                            }
                        });
                        if (typeof percentage === 'number') {
                            totalCredits += credits;
                            weighted.push(weightedGrade);
                            unweighted.push(unweightedGrade);
                        }
                    });
                    weighted = weighted.reduce(function (a, b) {
                        return a + b;
                    }, 0);
                    gpa.weighted = (weighted / totalCredits).toFixed(2);
                    if (isNaN(gpa.weighted)) {
                        gpa.weighted = (0).toFixed(2);
                    }
                    gpa.unweighted = self.average(unweighted).toFixed(2);
                    if (weighted.length === 0) {
                        gpa = false;
                    }
                    return gpa;
                },
                validatePercentage: function (grade) {
                    var self = this;
                    var valid = true;
                    grade = grade.replace('%', '');
                    if (self.gradeFormat === 'percentage') {
                        var isnum = /^\d+$/.test(grade);
                        if (!isnum && grade !== '') {
                            self.validation.valid = false;
                            self.validation.message = 'Please enter the grade as a percentage';
                        } else {
                            self.validation.valid = true;
                            self.validation.message = '';
                        }
                    }
                }
            },
            computed: {
                SemesterGPA: {
                    get: function () {
                        var self = this;
                        if (self.semesters.length < 1) return false;
                        var semesters = [];
                        self.semesters.forEach(function (s, index) {
                            index++;
                            var semester = {};
                            semester.title = s.title || 'Semester ' + index;
                            var gpa = self.calculateSemesterGPA(s);
                            semester.weighted = gpa.weighted;
                            semester.unweighted = gpa.unweighted;
                            semesters.push(semester);
                        });
                        return semesters;
                    },
                    deep: true
                },
                CumulativeGPA: function () {
                    if (this.semesters.length < 1) return false;
                    var self = this;
                    var cumulativeGPA = {
                        weighted: (0).toFixed(2),
                        unweighted: (0).toFixed(2)
                    };
                    if (self.currentGPA.gpa) {
                        cumulativeGPA.weighted = self.currentGPA.gpa;
                        cumulativeGPA.unweighted = self.currentGPA.gpa;
                    }
                    var gpa;
                    var weighted = [];
                    var unweighted = [];
                    this.semesters.forEach(function (semester) {
                        if (semester.classes[0] && semester.classes[0].grade) {
                            gpa = self.calculateSemesterGPA(semester);
                            if (gpa) {
                                weighted.push(parseFloat(gpa.weighted));
                                unweighted.push(parseFloat(gpa.unweighted));
                            }
                        }
                    });
                    if (weighted.length > 0) {
                        var averageWeighted = self.average(weighted);
                        var averageUnweighted = self.average(unweighted);
                        if (self.currentGPA.gpa) {
                            averageWeighted = self.average([parseFloat(self.currentGPA.gpa), parseFloat(averageWeighted)]);
                            averageUnweighted = self.average([parseFloat(self.currentGPA.gpa), parseFloat(averageUnweighted)]);
                        }
                        cumulativeGPA.weighted = averageWeighted.toFixed(2);
                        cumulativeGPA.unweighted = averageUnweighted.toFixed(2);
                    }
                    return cumulativeGPA;
                }
            },
        });
    }
});
})(jQuery);

(function ($) {
    $(document).ready(function () {
    'use strict';
    if ($('#final-grade').length) {
        var finalGrade = new Vue({
            el: '#final-grade',
            data: {
                courses: [],
                grades: [],
                placeholders: ['Quiz', 'Homework', 'Midterm', 'Final'],
                letters: [{
                    'value': 95,
                    'label': 'A+'
                }, {
                    'value': 93,
                    'label': 'A'
                }, {
                    'value': 90,
                    'label': 'A-'
                }, {
                    'value': 87,
                    'label': 'B+'
                }, {
                    'value': 83,
                    'label': 'B'
                }, {
                    'value': 80,
                    'label': 'B-'
                }, {
                    'value': 77,
                    'label': 'C+'
                }, {
                    'value': 73,
                    'label': 'C'
                }, {
                    'value': 70,
                    'label': 'C-'
                }, {
                    'value': 67,
                    'label': 'D+'
                }, {
                    'value': 63,
                    'label': 'D'
                }, {
                    'value': 60,
                    'label': 'D-'
                }, {
                    'value': 0,
                    'label': 'F'
                }],
                validation: {
                    message: null
                },
                warning: null
            },
            beforeMount: function () {
                var self = this;
                for (var i = 100; i > 59; i--) {
                    self.grades.push(i);
                }
            },
            mounted: function () {
                var self = this;
                this.addCourse(4);
            },
            methods: {
                addCourse: function (assessments) {
                    var self = this;
                    var index = self.courses.length;
                    var course = {
                        title: null,
                        assessments: [],
                        finalWeight: 0,
                        desiredGrade: 0,
                        desiredLetterGrade: ''
                    };
                    Vue.set(self.courses, self.courses.length, course);
                    for (var i = 0; i < assessments; i++) {
                        self.addAssessment(index);
                    }
                },
                addAssessment: function (course) {
                    var assessment = {
                        name: null,
                        grade: null,
                        percentageOfClass: null,
                        letterGrade: null
                    };
                    Vue.set(this.courses[course].assessments, this.courses[course].assessments.length, assessment);
                },
                setNumberGrade: function (e, finalExam, course, assessment) {
                    var self = this;
                    console.log('INDEX: ' + e.target.options.selectedIndex);
                    var grade = self.letters[e.target.options.selectedIndex].value;
                    if (finalExam === true) {
                        self.courses[course].desiredGrade = grade;
                    } else {
                        self.courses[course].assessments[assessment].grade = grade;
                    }
                },
                setLetterGrade: function (percentage, finalExam, course, assessment) {
                    var self = this;
                    var letterGrade = self.letterFromPercentage(percentage);
                    if (finalExam === true) {
                        self.courses[course].desiredLetterGrade = letterGrade;
                        console.log(self.courses[course].desiredLetterGrade);
                    } else {
                        self.courses[course].assessments[assessment].letterGrade = letterGrade;
                    }
                },
                getPlaceholder: function (index) {
                    if (this.placeholders[index]) {
                        return 'e.g. ' + this.placeholders[index];
                    }
                    return null;
                },
                letterFromPercentage: function (percentage) {
                    var self = this;
                    var letter;
                    for (var i = 0; i < self.letters.length; i++) {
                        if (self.letters[i].value >= percentage) {
                            letter = self.letters[i].label;
                        }
                    }
                    if (percentage > 95) letter = 'A+';
                    if (percentage < 60) letter = 'F';
                    return letter;
                }
            },
            computed: {
                validate: {
                    get: function () {
                        var self = this;
                        self.courses.forEach(function (c) {
                            var totalPercentage = parseInt(c.finalWeight);
                            c.assessments.forEach(function (a) {
                                if (typeof a.percentageOfClass === 'number') {
                                    totalPercentage += parseInt(a.percentageOfClass);
                                }
                            });
                            if (totalPercentage < 0 || totalPercentage > 100) {
                                if (totalPercentage < 0) {
                                    self.validation.message = 'Total percentage cannot be less than zero';
                                } else {
                                    self.validation.message = 'Total percentage cannot be more than 100';
                                }
                            } else {
                                self.validation.valid = true;
                                self.validation.message = '';
                            }
                        });
                    },
                    deep: true
                },
                currentGrades: {
                    get: function () {
                        var self = this;
                        var grades = [];
                        if (self.validation.valid !== true) return;
                        self.courses.forEach(function (c) {
                            var assessments = c.assessments;
                            var points = 0;
                            var weights = [];
                            var grade = {};
                            weights = assessments.map(function (a) {
                                if (a.grade && a.percentageOfClass) {
                                    var percentageOfClass = parseInt(a.percentageOfClass);
                                    points = points + percentageOfClass;
                                    return a.grade * percentageOfClass;
                                } else {
                                    return 0;
                                }
                            }).reduce(function (a, b) {
                                return a + b;
                            }, 0);
                            grade.percentage = parseInt(weights / points);
                            if (isNaN(grade.percentage)) {
                                grade.percentage = 0;
                            }
                            grade.letter = self.letterFromPercentage(grade.percentage);
                            grades.push(grade);
                        });
                        return grades;
                    },
                    deep: true,
                },
                finalGrades: {
                    get: function () {
                        var self = this;
                        if (self.validation.valid !== true) return;
                        self.warning = null;
                        var grades = [];
                        self.courses.forEach(function (c, index) {
                            var currentGrade = self.currentGrades[index].percentage;
                            var grade = {};
                            grade.percentage = parseInt((100 * c.desiredGrade - (100 - c.finalWeight) * currentGrade) / c.finalWeight);
                            grade.letter = self.letterFromPercentage(grade.percentage);
                            if (grade.percentage > 100) {
                                var courseName;
                                c.title ? courseName = c.title : courseName = 'course ' + (index + 1);
                                self.warning = 'The required final exam grade for ' + courseName + ' is greater than 100%';
                            }
                            grades.push(grade);
                        });
                        return grades;
                    },
                    deep: true
                }
            }
        });
    }
});
})(jQuery);
(function ($) {
    $(document).ready(function () {
    'use strict';
    if ($('#ez-grader').length) {
        var ezGrader = new Vue({
            el: '#ez-grader',
            data: {
                gradeScaleOpen: false,
                usePlusMinus: true,
                grades: [{
                    letter: 'A',
                    upperBound: 100,
                    lowerBound: 93
                }, {
                    letter: 'B',
                    upperBound: 92,
                    lowerBound: 83
                }, {
                    letter: 'C',
                    upperBound: 82,
                    lowerBound: 73
                }, {
                    letter: 'D',
                    upperBound: 72,
                    lowerBound: 63
                }, {
                    letter: 'F',
                    upperBound: 62,
                    lowerBound: 0
                }],
                plusMinusgrades: [{
                    letter: 'A',
                    upperBound: 100,
                    lowerBound: 93
                }, {
                    letter: 'A-',
                    upperBound: 92,
                    lowerBound: 90
                }, {
                    letter: 'B+',
                    upperBound: 89,
                    lowerBound: 87
                }, {
                    letter: 'B',
                    upperBound: 86,
                    lowerBound: 83
                }, {
                    letter: 'B-',
                    upperBound: 82,
                    lowerBound: 80
                }, {
                    letter: 'C+',
                    upperBound: 79,
                    lowerBound: 77
                }, {
                    letter: 'C',
                    upperBound: 76,
                    lowerBound: 73
                }, {
                    letter: 'C-',
                    upperBound: 72,
                    lowerBound: 70
                }, {
                    letter: 'D+',
                    upperBound: 69,
                    lowerBound: 67
                }, {
                    letter: 'D',
                    upperBound: 66,
                    lowerBound: 63
                }, {
                    letter: 'D-',
                    upperBound: 62,
                    lowerBound: 60
                }, {
                    letter: 'F',
                    upperBound: 62,
                    lowerBound: 0
                }],
                answers: {
                    total: 0,
                    wrong: 0,
                    percentage: 0,
                    halfPoints: false
                },
            },
            mounted: function () {
                console.log('APP READY');
            },
            methods: {
                gradeType: function () {
                    if (this.usePlusMinus === true) {
                        return this.plusMinusgrades;
                    }
                    return this.grades;
                },
                validateQuestions($event) {
                    if ($event.target.value > this.answers.total) {
                        this.answers.wrong = this.answers.total;
                        return false;
                    }
                },
                getLetterForPercentage: function (percentage) {
                    var self = this;
                    var letter;
                    var grades;
                    if (self.usePlusMinus === true) {
                        grades = self.plusMinusgrades;
                    } else {
                        grades = self.grades;
                    }
                    grades = Array.prototype.slice.call(grades);
                    grades.reverse();
                    grades.forEach(function (grade) {
                        if (percentage >= grade.lowerBound) {
                            letter = grade.letter;
                        }
                    });
                    return letter;
                },
                highlightAnswer(percentage) {
                    var self = this;
                    var answers = self.answers;
                    var right = parseFloat(answers.total) - parseFloat(answers.wrong);
                    var percentCorrect = (right / parseFloat(answers.total)) * 100;
                    percentCorrect = Math.floor(percentCorrect / 10) * 10;
                    return percentCorrect;
                },
                resetGrading: function () {
                    this.answers.total = 0;
                    this.answers.wrong = 0;
                }
            },
            watch: {
                grades: {
                    handler: function (val, oldVal) {
                        var self = this;
                        self.grades.forEach(function (grade, index) {
                            if (grade.lowerBound < 1) {
                                grade.lowerBound = 0;
                            }
                            if (grade.lowerBound >= grade.upperBound) {
                                grade.lowerBound = grade.lowerBound - 1;
                            }
                            var position = index + 1;
                            if (position >= self.grades.length) {
                                return;
                            }
                            self.grades[position].upperBound = grade.lowerBound - 1;
                        });
                    },
                    deep: true
                },
                plusMinusgrades: {
                    handler: function (val, oldVal) {
                        var self = this;
                        self.plusMinusgrades.forEach(function (grade, index) {
                            if (grade.lowerBound < 1) {
                                grade.lowerBound = 0;
                            }
                            if (grade.lowerBound >= grade.upperBound) {
                                grade.lowerBound = grade.lowerBound - 1;
                            }
                            var position = index + 1;
                            if (position >= self.plusMinusgrades.length) {
                                return;
                            }
                            self.plusMinusgrades[position].upperBound = grade.lowerBound - 1;
                        });
                    },
                    deep: true
                }
            },
            computed: {
                results: {
                    get: function () {
                        var self = this;
                        var correct = self.answers.total - self.answers.wrong;
                        console.log(correct);
                        var percentage = (correct / self.answers.total) * 100;
                        if (isNaN(percentage) || !isFinite(percentage)) return null;
                        self.answers.percentage = parseInt(percentage);
                    }
                }
            }
        });
    }
});
})(jQuery);

(function ($) {
    $(document).ready(function () {
        // $('head').prepend('<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.2.0/css/bootstrap.min.css" type="text/css" />');
        // $('head').prepend('<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.2.0/js/bootstrap.min.js" type="text/javascript" />');
        var $frame = $('div#calcframebs');
        $frame.html('');
        addSemester();
        $frame.append('<div class="row col-xs-12 center-btn" style="margin: 0"><button id="calc-semester" class="calc-add calc-addh">Add another semester</button><br /><button id="calc-do" class="btn btn-success">Calculate</button></div><div class="output row col-xs-12"></div>');
        $(document).on('change', 'div#calcframebs select, div#calcframebs input', doCalc);
        $frame.find('#calc-do').click(doCalc);
        $frame.on('click', '.calc-add', function (e) {
            var $semester = $(this).parent().parent();
            var newnum = $semester.children('.input').children().last().data('index') + 1;
            var $calcrow = $('<div class="calcrow span2"></div>');
            $calcrow.data('index', newnum);
            $calcrow.append('<div class="row center-block"><h4 class="col-xs-12 col-sm-2"><input class="course-name" type="text" placeholder="e.g. Course ' + newnum + '"></h4> <label class="col-xs-4 col-sm-2 text-right">Grade:</label><div class="form-group col-sm-3 col-xs-8"> <span class="select-wrapper"><select class="grade form-control"><option value="-1">&mdash;</option><option value="4">A</option><option value="3.7">A-</option><option value="3.3">B+</option><option value="3">B</option><option value="2.7">B-</option><option value="2.3">C+</option><option value="2">C</option><option value="1.7">C-</option><option value="1.3">D+</option><option value="1">D</option><option value="0">F</option></select></span></div><label class="col-xs-4 col-sm-2 text-right">Credits:</label><div class="form-group col-sm-3 col-xs-8"><input type="text" class="credits form-control" /></div></div>');
            $semester.children('.input').append($calcrow);
        });
        $frame.find('#calc-semester').click(addSemester);
    });

    function addSemester() {
        function mobilecheck() {
            var check = false;
            (function(a) {if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4)))check=true;})(navigator.userAgent||navigator.vendor||window.opera);
            return check;
        }
        var isMobile = mobilecheck();
        var count;
        if (isMobile) {
            count = 2;
        } else {
            count = 4;
        }
        var $frame = $('div#calcframebs');
        var $existing = $frame.children('.semester');
        var newnum = $existing.size() + 1;
        var $sem = $('<div class="semester row"></div>');
        $sem.data('index', newnum);
        $sem.append('<div class="col-xs-12"><div class="form-horizontal panel panel-info"><div class="panel-heading">Semester ' + newnum + '</div><div class="panel-body"><div class="input row"></div><div class="row center-btn"><button class="calc-add calc-addh">Add another class</button></div><div class="inneroutput row"></div></div></div></div>');
        var $input = $sem.find('.input');
        for (var i = 1; i <= count; i++) {
            var $calcrow = $('<div class="calcrow span2"></div>');
            $calcrow.data('index', i);
            $calcrow.append('<div class="row center-block"><h4 class="col-xs-12 col-sm-2"><input class="course-name" type="text" placeholder="e.g. Course ' + i + '"></h4> <label class="col-xs-4 col-sm-2 text-right">Grade:</label><div class="form-group col-sm-3 col-xs-8"> <span class="select-wrapper"><select class="grade form-control"><option value="-1">&mdash;</option><option value="4">A</option><option value="3.7">A-</option><option value="3.3">B+</option><option value="3">B</option><option value="2.7">B-</option><option value="2.3">C+</option><option value="2">C</option><option value="1.7">C-</option><option value="1.3">D+</option><option value="1">D</option><option value="0">F</option></select></span></div><label class="col-xs-4 col-sm-2 text-right">Credits:</label><div class="form-group col-sm-3 col-xs-8"><input type="text" class="credits form-control" /></div></div>');
            $input.append($calcrow);
        }
        if ($existing.size() == 0) {
            $frame.append($sem);
        } else {
            $sem.insertAfter($existing.last());
        }
    }

    function doCalc() {
        var $frame = $('div#calcframebs');
        var $semesters = $frame.children('.semester');
        var grand_total = 0;
        var grand_count = 0;
        var semestersValuesCumulative = [];
        $semesters.each(function (i) {
            var $sem = $(this);
            var semesterValues = [];
            $sem.find('.input').children().each(function (i) {
                var $inputs = $(this).find('select, input');
                var credits = parseInt($inputs.filter('.credits').val());
                var grade = parseFloat($inputs.filter('.grade').val());
                if (credits > 0 && credits >= 0) {
                    semesterValues.push({
                        grade: grade,
                        credits: credits
                    });
                }
            });
            var $out = $sem.find('.inneroutput');
            if (semesterValues.length === 0) {
                $out.html('');
            } else {
                var total = semesterValues.reduce(function (a, b) {
                    return a + (b.grade * b.credits);
                }, 0);
                var count = semesterValues.reduce(function (a, b) {
                    return a + b.credits;
                }, 0);
                var semesterResult = roundNumber(total / count, 2);
                var semesterColor = '#B71919';
                if (semesterResult > 2.4) semesterColor = '#b7b400';
                if (semesterResult > 3.4) semesterColor = '#54B725';
                var semesterHtml = '\
                <div class="wg-result-wrapper">\
                    <div class="sidebar sidebar-score">\
                        <div class="score-circle">\
                            <h4 style="background-color: ' + semesterColor + '" class="score-outer">\
                                <span class="score-inner">\
                                    <span class="your-title">Your Semester GPA is</span>\
                                    <span class="score">' + semesterResult + '</span>\
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
                var overallResult = (grand_total / grand_count * 0.5) + (cumulative_gpa * 0.5);
            } else {
                var overallResult = grand_total / grand_count;
            }
            overallResult = roundNumber(overallResult, 2);
            var overallColor = '#B71919';
            if (overallResult > 2.4) overallColor = '#b7b400';
            if (overallResult > 3.4) overallColor = '#54B725';
            var overallHtml = '\
                <div class="wg-result-wrapper">\
                    <div class="sidebar sidebar-score">\
                        <div class="score-circle">\
                            <h4 style="background-color: ' + overallColor + '" class="score-outer">\
                                <span class="score-inner">\
                                    <span class="your-title">Your Overall GPA is</span>\
                                    <span class="score">' + overallResult + '</span>\
                                </span>\
                            </h4>\
                        </div>\
                    </div>\
                    <div class="row center-btn"><div class="raise-gpa">\
                        <a class="btn btn-primary" href="/how-to-raise-gpa/#' + overallResult + '|' + grand_count + '">Raise this GPA</a>\
                    </div>\
                </div>\
                ';
            $out.html(overallHtml);
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
})(jQuery);
