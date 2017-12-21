(function () {
    var datepicker = window.datepicker;
    var monthData;
    var $wrapper;
    datepicker.buildUi = function (year, month) {
        monthData = datepicker.getMonthData(year, month);

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
            if(date.month == monthData.month){
                html += '<td data-date="' + date.date + '">' + date.showDate + '</td>'
            }else{
            html += '<td class="ui-datepicker-overflow" data-date="' + date.date + '">' + date.showDate + '</td>'
            }
            if (i % 7 === 6) {
                html += '</tr>'
            }
        };

        html += '</tbody></table></div>'
        return html;
    }

    datepicker.render = function (direction) {
        var year, month;
        if (monthData) {
            year = monthData.year;
            month = monthData.month;
        }
        if(year == undefined || month == undefined){
            // 如果没有传值就获取当前日期
            var today = new Date();
            year = today.getFullYear();
            month = today.getMonth() + 1;
            }
        if (direction === 'prev') {
            month = month - 1;
            // if (month === 0) {
            //     month = 12;
            //     year--;
            // }
        }
        if (direction === 'next') {
            month = month + 1
        }
        var html = datepicker.buildUi(year, month);
        $wrapper = document.querySelector('ui-datepicker-wrapper');
    if (!$wrapper) {
         $wrapper = document.createElement('div');
        document.body.appendChild($wrapper);
        $wrapper.className = 'ui-datepicker-wrapper';
        $wrapper.id = 'ui-datepicker-wrapper';
    }

        	
set_innerHTML('ui-datepicker-wrapper',html); 
   }
    
    datepicker.init = function (input) {

        datepicker.render();
        var $input = document.querySelector(input);
        var isopen = false;

        $input.addEventListener('click', function () {
            if (isopen) {
                $wrapper.classList.remove('ui-datepicker-wrapper-show');
                isopen = false;
            } else {
                $wrapper.classList.add('ui-datepicker-wrapper-show');
                var left = $input.offsetLeft;
                var top = $input.offsetTop;
                var height = $input.offsetHeight;
                $wrapper.style.top = top + height + 'px';
                $wrapper.style.left = left + 'px';
                isopen = true;
            }
        }, false)
        $wrapper.addEventListener('click', function (e) {
            var target = e.target;
            if (!target.classList.contains('ui-datepicker-btn'))
                return;
            if (target.classList.contains('ui-datepicker-prevbtn')) {
                datepicker.render('prev')
            } else if (target.classList.contains('ui-datepicker-nextbtn')) {
                datepicker.render('next')
            }
        }, false)
        $wrapper.addEventListener('click', function (e) {
            var $target = e.target;
            if ($target.tagName.toLowerCase() != 'td') return;
            if ($target.classList.contains('ui-datepicker-overflow')) return;
            var newDate = new Date(monthData.year, monthData.month - 1, $target.dataset.date);
            $input.value = format(newDate);
            if (isopen) {
                $wrapper.classList.remove('ui-datepicker-wrapper-show');
                isopen = false;
            }
        }, false)

    }
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
    ret = '';
    monthData = ''
})()




