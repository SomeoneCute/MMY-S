
(function(){
    var datepicker={};
    datepicker.getMonthData=function(year,month){
        var ret=[];
        // if(arguments.length == 0){
        //     var today=new Date();
        //     year=today.getFullYear();
        //     month=today.getMonth()+1;
        // };
        var first=new Date(year,month-1,1);// 当月第一天是周几?
        var firstDayWeekDay=first.getDay();
        if(firstDayWeekDay == 0) firstDayWeekDay =7;

        year = first.getFullYear();
        month=first.getMonth()+1;

        var lastDayofLastMonth = new Date(year,month-1,0);
        var lastDateofLastMonth=lastDayofLastMonth.getDate();// 上个月最后一天是哪一天？
        var preMonthDayCount=firstDayWeekDay - 1;// 上个月需要展示多少天？
        var lastDay = new Date(year, month, 0);// 本月的最后一天
        var lastDate=lastDay.getDate();

        // 通过循环获取时间
        for(var i=0;i<7*6;i++){
            // *6直接获取六周的数据，
            var date= i + 1 - preMonthDayCount;
            var showDate = date;
            var thisMonth = month;
            if(date <= 0){
                thisMonth = month -1;
                showDate= date + lastDateofLastMonth;
            }
            else if(date>lastDate){
                thisMonth = month +1;
                showDate= showDate - lastDate
            }
            if(thisMonth == 0){
                thisMonth = 12
            }
            if(thisMonth ==  13){
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
    
    window.datepicker=datepicker;
})();