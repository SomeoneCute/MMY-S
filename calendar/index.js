//        2018/6/6
var that = this;
var calendarIpt = document.getElementById('calendar');
var detailsDiv = document.getElementById('details');

calendarIpt.onclick = function () {
    detailsDiv.style.display = 'block';
    var year = new Date().getFullYear();
    var month = new Date().getMonth() + 1;
    detailsDiv.innerHTML = buildui(year, month)
}
// 获取指定月份日期信息
function Calendar(year, month) {
    var ret = [];
    var first = new Date(year, month - 1, 1); // 当月第一天是周几?
    var firstDayWeekDay = first.getDay();
    if (firstDayWeekDay == 0) firstDayWeekDay = 7;

    year = first.getFullYear();
    month = first.getMonth() + 1;

    var lastDayofLastMonth = new Date(year, month - 1, 0);
    var lastDateofLastMonth = that.lastDateofLastMonth = lastDayofLastMonth.getDate(); // 上个月最后一天是哪一天？
    var preMonthDayCount = that.lastDateofLastMonth = firstDayWeekDay - 1; // 上个月需要展示多少天？
    var lastDay = that.lastDay = new Date(year, month, 0); // 本月的最后一天
    var lastDate = that.lastDate = lastDay.getDate();

    // 通过循环获取时间
    for (var i = 0; i < 7 * 6; i++) {
        // *6直接获取六周的数据，
        var date = i + 1 - preMonthDayCount;
        var showDate = date;
        var thisMonth = month;
        if (date <= 0) {
            thisMonth = month - 1;
            showDate = date + lastDateofLastMonth;
        } else if (date > lastDate) {
            thisMonth = month + 1;
            showDate = showDate - lastDate
        }
        if (thisMonth == 0) {
            thisMonth = 12
        }
        if (thisMonth == 13) {
            thisMonth = 1
        }
        ret.push({
            month: thisMonth,
            date: date,
            showDate: showDate
        })

    }
    return {
        year: year,
        month: month,
        days: ret
    }
}
// Calendar('2018','5');
function buildui(year, month) {
    var monthData = that.monthData = Calendar(year, month);
    var html = '<div class="ui-datepicker-header">' +
        '<a href="#" class="ui-datepicker-btn ui-datepicker-prevbtn">&lt;</a>' +
        '<a href="#" class="ui-datepicker-btn ui-datepicker-nextbtn">&gt;</a>' +
        '<span class="ui-datepicker-curr-month">' + monthData.year + '-' + monthData.month + '</span>' +
        '</div>' +
        '<div class="ui-datepicker-body">' +
        '<table>' +
        '<thead>' +
        '<tr>' +
        '<th>一</th>' +
        '<th>二</th>' +
        '<th>三</th>' +
        '<th>四</th>' +
        '<th>五</th>' +
        '<th>六</th>' +
        '<th>日</th>' +
        '</tr>' +
        '</thead>' +
        '<tbody>';
    for (var i = 0; i < monthData.days.length; i++) {
        var date = monthData.days[i];
        if (i % 7 === 0) {
            html += '<tr>'
        }
        if (date.month == monthData.month) {
            html += '<td data-date="' + date.date + '" data-month="' + date.month + '">' + date.showDate + '</td>'
        } else {
            html += '<td class="ui-datepicker-overflow" data-date="' + date.date + '" data-month="' + date.month + '">' + date.showDate + '</td>'
        }
        if (i % 7 === 6) {
            html += '</tr>'
        }
    };

    html += '</tbody></table></div>'
    return html;
}

function removeselected() {
    var selected = document.getElementsByClassName('selected');
    if (!selected.length) return
    for (item in selected) {
        selected[item].classList.remove('selected')
    }
}
detailsDiv.addEventListener('click', function (e) {
    removeselected()
    var $target = e.target;
    if ($target.tagName.toLowerCase() != 'td') return;
    var newDate = new Date(that.monthData.year, that.monthData.month - 1, $target.dataset.date);
    var clickDate = calendarIpt.value = format(newDate); // 改变input的值
    var arr = clickDate.split('-');
    detailsDiv.innerHTML = buildui(arr[0], arr[1]); //根绝ipt的值改变日历信息更方便
    // detailsDiv.style.display = 'none';
}, false)
detailsDiv.addEventListener('click', function (e) {
    var target = e.target;
    if (!target.classList.contains('ui-datepicker-btn'))
        return;
    if (target.classList.contains('ui-datepicker-prevbtn')) {
        if (that.monthData.month == 0) {
            that.monthData.year = that.monthData.year - 1;
            that.monthData.month = 11;
        }
        detailsDiv.innerHTML = buildui(that.monthData.year, that.monthData.month - 1)
    } else if (target.classList.contains('ui-datepicker-nextbtn')) {
        if (that.monthData.month > 11) {
            that.monthData.year = that.monthData.year + 1;
            that.monthData.month = 0;
        }
        detailsDiv.innerHTML = buildui(that.monthData.year, that.monthData.month + 1)
    }
}, false)

function pad(num) {
    if (num < 9) {
        return '0' + num;
    }
    return num;
}

function format(date) {
    var ret = '';
    ret += date.getFullYear() + '-';
    ret += pad(date.getMonth() + 1) + '-';
    ret += pad(date.getDate())
    return ret;
}