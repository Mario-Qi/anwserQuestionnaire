/**
 * Created by Amy on 2018/8/7.
 */
$(function () {
    isLoginFun();
    header();
    $("#ctl01_lblUserName").text(getCookie('userName'));
    createTimePicker();
    getInfo();


});

// 查看项目详细信息
function getInfo() {
    let projectName = getCookie("projectName");
    let questionnaireName = getCookie("questionnaireName");
    $("#questionnaireNameSpan").text(questionnaireName);
    $("#projectNameSpan").text(projectName);
}


// 创建时间区域选择
function createTimePicker() {
    var beginTimeStore = '';
    var endTimeStore = '';
    var nowTime = getFormatDateSecond();
    var date = new Date();
    var milliseconds = date.getTime() + 1000 * 60 * 60 * 24 * 30;  //n代表天数,加号表示未来n天的此刻时间,减号表示过去n天的此刻时间   n:7
    var newDate = new Date(milliseconds);
    var dateAfterNow = timeFormat(newDate);

    $('#config-demo').daterangepicker({
        "minDate": nowTime,
        "startDate": nowTime,
        "endDate": dateAfterNow,
        "timePicker": true,
        "timePicker24Hour": true,
        "linkedCalendars": false,
        // "autoUpdateInput": false,
        "locale": {
            "resetLabel": "重置",
            "format": 'YYYY/MM/DD HH:mm:ss',
            "separator": " ~ ",//
            "applyLabel": "确定",
            "cancelLabel": "取消",
            "fromLabel": "起始时间",
            "toLabel": "结束时间'",
            "customRangeLabel": "自定义",
            "weekLabel": "W",
            "daysOfWeek": ["日", "一", "二", "三", "四", "五", "六"],
            "monthNames": ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
            "firstDay": 1
        }
    })
}