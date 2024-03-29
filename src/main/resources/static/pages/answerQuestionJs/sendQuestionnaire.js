var students = []; //传入调查人员信息
var teachers = [];
var sendTime = "";
var questionId = getCookie("questionId");
var dataId = getCookie("dataId");  // 在校生：2；毕业生：3；教师：4；用人单位：5
var nameOfQuestionnaire = getCookie("questionName");

document.getElementById("questPeople").innerText = "调查人员信息 — " + nameOfQuestionnaire;
// document.getElementById("ctl02_ContentPlaceHolder1_InviteEmail1_hrefSend").innerText = "批量发送问卷 — " + nameOfQuestionnaire;
var shortMessageGetTime = '0';


//按钮事件
window.operateEvents = {
    //删除
    'click #Tbtn_delete': function (e, value, row, index) {
        id = row.no;
        // //console.log(id);
        layer.confirm('您确认要删除此条人员信息吗？', {
            btn: ['确定', '取消'] //按钮
        }, function () {
            _$("#userInfoTable1").bootstrapTable('removeByUniqueId', row.no);
            _$("#userInfoTable2").bootstrapTable('removeByUniqueId', row.no);
            layer.msg("删除成功", {icon: 1});
        });
    }
};

//不是用人单位的列名
var columnsForStudents =[{
    checkbox: true,
    visible: false
}, {
    field: 'no',
    title: '序号',
    align: 'center',
}, {
    field: 'studentNum',
    title: '学号',
    align: 'center',
    width: '200px'
},
    {
        field: 'studentName',
        title: '姓名',
        align: 'center'
    }, {
        field: 'studentBelong',
        title: '所属学校',
        align: 'center'
    },
    {
        field: 'studentSubject',
        title: '专业',
        align: 'center'
    },
    {
        field: 'studentClass',
        title: '班级',
        align: 'center'
    },
    {
        field: 'studentSex',
        title: '性别',
        align: 'center'
    },
    {
        field: 'studentWeiNum',
        title: '微信号',
        align: 'center'
    },
    {
        field: 'studentQQNum',
        title: 'QQ号',
        align: 'center'
    },
    {
        field: 'studentPhone',
        title: '手机号',
        align: 'center'
    },
    {
        field: 'studentEmail',
        title: '邮箱',
        align: 'center'
    }, {
        field: 'operation',
        title: '操作',
        align: 'center',
        events: operateEvents,//给按钮注册事件
        formatter: addFunctionAlty//表格中增加按钮
    }]
columnsForTeachers = [{
    checkbox: true,
    visible: false
}, {
    field: 'no',
    title: '序号',
    align: 'center',
}, {
    field: 'teacherNum',
    title: '教师号',
    align: 'center',
    width: '200px'
}, {
        field: 'teacherName',
        title: '姓名',
        align: 'center'
}, {
        field: 'teacherBelong',
        title: '所属院校',
        align: 'center'
}, {
        field: 'teacherSex',
        title: '性别',
        align: 'center'
}, {
        field: 'WeiNum',
        title: '微信号',
        align: 'center'
}, {
        field: 'QQNum',
        title: 'QQ号',
        align: 'center'
}, {
        field: 'teacherEmail',
        title: '电子邮箱',
        align: 'center'
}, {
        field: 'operation',
        title: '操作',
        align: 'center',
        events: operateEvents,//给按钮注册事件
        formatter: addFunctionAlty//表格中增加按钮
}]


if (dataId == "2") {
    $("#getDownLoadBtn").prepend("<a style=\"margin-right: 20px;\" href=\"../在校生上传数据模板.xlsx\" class=\"add__batches pull-left\">下载模板</a>");
} else if (dataId == "3") {
    $("#getDownLoadBtn").prepend("<a style=\"margin-right: 20px;\" href=\"../毕业生上传数据模板.xlsx\" class=\"add__batches pull-left\">下载模板</a>");
} else if (dataId == "4") {
    $("#getDownLoadBtn").prepend("<a style=\"margin-right: 20px;\" href=\"../教师上传数据模板.xlsx\" class=\"add__batches pull-left\">下载模板</a>");
} else if (dataId == "5") {
    $("#getDownLoadBtn").prepend("<a style=\"margin-right: 20px;\" href=\"../用人单位上传数据模板.xlsx\" class=\"add__batches pull-left\">下载模板</a>");
    var columnsForStudents =[{
        checkbox: true,
        visible: false
    }, {
        field: 'no',
        title: '序号',
        align: 'center',
    }, {
        field: 'studentNum',
        title: '学号',
        align: 'center',
        width: '200px'
    }, {
            field: 'studentName',
            title: '姓名',
            align: 'center'
    }, {
            field: 'studentBelong',
            title: '所属学校',
            align: 'center'
    }, {
            field: 'studentSubject',
            title: '专业',
            align: 'center'
    }, {
            field: 'studentClass',
            title: '班级',
            align: 'center'
    }, {
            field: 'studentSex',
            title: '性别',
            align: 'center'
    }, {
            field: 'studentWeiNum',
            title: '微信号',
            align: 'center'
    }, {
            field: 'studentQQNum',
            title: 'QQ号',
            align: 'center'
    }, {
            field: 'studentPhone',
            title: '手机号',
            align: 'center'
    }, {
            field: 'studentEmail',
            title: '邮箱',
            align: 'center'
    }, {
            field: 'operation',
            title: '操作',
            align: 'center',
            events: operateEvents,//给按钮注册事件
            formatter: addFunctionAlty//表格中增加按钮
    }]
}

// 发送方式，短信：0； 邮件：1； 链接：2；
var sendType = '0';
var shortUrl = '';
var previewUrl = '';
var objLength;
var objLength1;
//默认顶部导航栏的显示
if(getCookie("changeTableType") == "shortMessageSend"){   //从已发问卷页面点击进入的问卷发布页面
    deleteCookie("changeTableType");
    document.getElementById('linkSendA').style.backgroundColor = "#fff";
    document.getElementById('linkSendA').removeAttribute("class", "inside-wrapper nav-show nav-items clicked linkCode-icon");
    document.getElementById('linkSendA').setAttribute("class", "inside-wrapper nav-show nav-items linkCode-icon");

    document.getElementById('shortMessageSendA').style.backgroundColor = "#1ea0fa";
    document.getElementById('shortMessageSendA').removeAttribute("class", "inside-wrapper nav-show nav-items sms-icon");
    document.getElementById('shortMessageSendA').setAttribute("class", "inside-wrapper nav-show nav-items clicked sms-icon");

    changeTab('shortMessageSend');

    // getQuestionInfo();
    if (document.getElementById('msg').value != "") {
        var msg = document.getElementById('msg');
        wordStatic(msg);
    }

}else{ //正常进入
    document.getElementById('linkSendA').style.backgroundColor = "#1ea0fa";
    document.getElementById('linkSendA').removeAttribute("class", "inside-wrapper nav-show nav-items linkCode-icon");
    document.getElementById('linkSendA').setAttribute("class", "inside-wrapper nav-show nav-items clicked linkCode-icon");

    document.getElementById('shortMessageSendA').style.backgroundColor = "#fff";
    document.getElementById('shortMessageSendA').removeAttribute("class", "inside-wrapper nav-show nav-items clicked sms-icon");
    document.getElementById('shortMessageSendA').setAttribute("class", "inside-wrapper nav-show nav-items sms-icon");
}

createDtePicker();
// getQuestionInfo();
var oTable = new TableInit();
oTable.Init();

function TableInit() {

    var oTableInit = new Object();
    //初始化Table
    oTableInit.Init = function () {
        $('#userInfoTable1').bootstrapTable({
            url: '',         //请求后台的URL（*）
            striped: true,                      //是否显示行间隔色
            pagination: true,                   //是否显示分页（*）
            sortOrder: "asc",                   //排序方式
            queryParamsType: '',
            dataType: 'json',
            paginationShowPageGo: true,
            showJumpto: true,
            pageNumber: 1, //初始化加载第一页，默认第一页
            queryParams: queryParams,//请求服务器时所传的参数
            sidePagination: 'client',
            pageSize: 10,//单页记录数
            pageList: [10, 20, 30, 40],//分页步进值
            search: false, //是否显示表格搜索，此搜索是客户端搜索，不会进服务端，所以，个人感觉意义不大
            silent: true,
            showRefresh: false,                  //是否显示刷新按钮
            showToggle: false,
            minimumCountColumns: 2,             //最少允许的列数
            uniqueId: "no",                     //每一行的唯一标识，一般为主键列
            columns: columnsForStudents
        });

        $('#userInfoTable2').bootstrapTable({
            url: '',         //请求后台的URL（*）
            striped: true,                      //是否显示行间隔色
            pagination: true,                   //是否显示分页（*）
            sortOrder: "asc",                   //排序方式
            queryParamsType: '',
            dataType: 'json',
            paginationShowPageGo: true,
            showJumpto: true,
            pageNumber: 1, //初始化加载第一页，默认第一页
            queryParams: queryParams,//请求服务器时所传的参数
            sidePagination: 'client',
            pageSize: 10,//单页记录数
            pageList: [10, 20, 30, 40],//分页步进值
            search: false, //是否显示表格搜索，此搜索是客户端搜索，不会进服务端，所以，个人感觉意义不大
            silent: true,
            showRefresh: false,                  //是否显示刷新按钮
            showToggle: false,
            minimumCountColumns: 2,             //最少允许的列数
            uniqueId: "no",                     //每一行的唯一标识，一般为主键列
            columns: columnsForTeachers
        });

    };

    // 得到查询的参数
    function queryParams(params) {
        var userName = $("#keyWord").val();
        // //console.log(userName);
        var temp = {   //这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
            pageNum: params.pageNumber,
            pageSize: params.pageSize,
            username: userName
        };
        return JSON.stringify(temp);
    }
    return oTableInit;
}


// 删除按钮
function addFunctionAlty(value, row, index) {
    return [
        '<button id="Tbtn_delete" style=" background-color: #f9f9f9;color: #f00;">删除</button>'
    ].join('');
}

//顶部导航栏切换
function changeTab(id) {
    if (id == 'linkSend') {
        document.getElementById('linkSendA').style.backgroundColor = "#1ea0fa";
        document.getElementById('linkSendA').removeAttribute("class", "inside-wrapper nav-show nav-items linkCode-icon");
        document.getElementById('linkSendA').setAttribute("class", "inside-wrapper nav-show nav-items clicked linkCode-icon");

        document.getElementById('shortMessageSendA').style.backgroundColor = "#fff";
        document.getElementById('shortMessageSendA').removeAttribute("class", "inside-wrapper nav-show nav-items clicked sms-icon");
        document.getElementById('shortMessageSendA').setAttribute("class", "inside-wrapper nav-show nav-items sms-icon");


        document.getElementById('linkSend').style.display = "block";
        document.getElementById('shortMessageSend').style.display = "none";
    } else if (id == 'shortMessageSend') {
        document.getElementById('linkSendA').style.backgroundColor = "#fff";
        document.getElementById('linkSendA').removeAttribute("class", "inside-wrapper nav-show nav-items clicked sms-icon");
        document.getElementById('linkSendA').setAttribute("class", "inside-wrapper nav-show nav-items sms-icon");

        document.getElementById('shortMessageSendA').style.backgroundColor = "#1ea0fa";
        document.getElementById('shortMessageSendA').removeAttribute("class", "inside-wrapper nav-show nav-items sms-icon");
        document.getElementById('shortMessageSendA').setAttribute("class", "inside-wrapper nav-show nav-items clicked sms-icon");

        document.getElementById('linkSend').style.display = "none";
        document.getElementById('shortMessageSend').style.display = "block";
        if (document.getElementById('msg').value != "") {
            var msg = document.getElementById('msg');
            wordStatic(msg);
        }
    }
}

function changeIdentity(id) {
    if (id == 'importStudentsBoxA') {
        // document.getElementById('linkSendA').style.backgroundColor = "#1ea0fa";
        // document.getElementById('linkSendA').removeAttribute("class", "inside-wrapper nav-show nav-items linkCode-icon");
        // document.getElementById('linkSendA').setAttribute("class", "inside-wrapper nav-show nav-items clicked linkCode-icon");

        // document.getElementById('shortMessageSendA').style.backgroundColor = "#fff";
        // document.getElementById('shortMessageSendA').removeAttribute("class", "inside-wrapper nav-show nav-items clicked sms-icon");
        // document.getElementById('shortMessageSendA').setAttribute("class", "inside-wrapper nav-show nav-items sms-icon");

        console.log(document.getElementById('linkSend').style);
        console.log(document.getElementById('importStudentsBox'));

        document.getElementById("importStudentsBoxA").removeAttribute("class","my-nav-unselect");
        document.getElementById("importStudentsBoxA").setAttribute("class","nav-items pull-left my-nav-select");
        document.getElementById("importTeachersBoxA").removeAttribute("class","my-nav-select");
        document.getElementById("importTeachersBoxA").setAttribute("class","nav-items pull-left my-nav-unselect");
        document.getElementById('onloadFile1').style.display = "block";
        document.getElementById('onloadFile2').style.display = "none";
        document.getElementById("importStudentsBox").style.display = "block";
        document.getElementById("importTeachersBox").style.display = "none";
    } else if (id == 'importTeachersBoxA') {
        // document.getElementById('linkSendA').style.backgroundColor = "#fff";
        // document.getElementById('linkSendA').removeAttribute("class", "inside-wrapper nav-show nav-items clicked sms-icon");
        // document.getElementById('linkSendA').setAttribute("class", "inside-wrapper nav-show nav-items sms-icon");
        //
        // document.getElementById('shortMessageSendA').style.backgroundColor = "#1ea0fa";
        // document.getElementById('shortMessageSendA').removeAttribute("class", "inside-wrapper nav-show nav-items sms-icon");
        // document.getElementById('shortMessageSendA').setAttribute("class", "inside-wrapper nav-show nav-items clicked sms-icon");

        document.getElementById("importStudentsBoxA").removeAttribute("class","my-nav-select");
        document.getElementById("importStudentsBoxA").setAttribute("class","nav-items pull-left my-nav-unselect");
        document.getElementById("importTeachersBoxA").removeAttribute("class","my-nav-unselect");
        document.getElementById("importTeachersBoxA").setAttribute("class","nav-items pull-left my-nav-select");
        document.getElementById('onloadFile1').style.display = "none";
        document.getElementById('onloadFile2').style.display = "block";
        document.getElementById('importStudentsBox').style.display = "none";
        document.getElementById('importTeachersBox').style.display = "block";
        // if (document.getElementById('msg').value != "") {
        //     var msg = document.getElementById('msg');
        //     wordStatic(msg);
        // }
    }
}

//判断选择的是定时方式  短信：0； 邮件：1； 链接：2；
function send(value) {
    if (value == 0) {
        sendType = '0';
        //短信内容显示

        document.getElementById('QQwayhand').style.display = 'block'
        document.getElementById('WXwayhand').style.display = 'none'
        document.getElementById('emailwayhand').style.display = 'none'
        document.getElementById('sendKind').style.display = 'block'
        document.getElementById('sendContent').style.display = 'block'
        if (document.getElementsByName('sendTime')[0].checked == true) {
            document.getElementById('sendTimeChoose').style.display = 'none'
        } else {
            document.getElementById('sendTimeChoose').style.display = 'block'
        }
        //    邮箱方式隐藏
        document.getElementById('sendMailContent').style.display = 'none'
        //    链接方式隐藏
        document.getElementById('sendUrlContent').style.display = 'none'
        //    发送按钮
        document.getElementById('sendButton').style.display = 'block'

        document.getElementById('myLittleTip').style.display = 'none';
        document.getElementById('ctl02_ContentPlaceHolder1_btnSend').style.display = '';
    } else if (value == 1) {

        sendType = '1';
        //短信内容隐藏
        document.getElementById('QQwayhand').style.display = 'none'
        document.getElementById('WXwayhand').style.display = 'block'
        // document.getElementById('sendKind').style.display = 'none'
        document.getElementById('emailwayhand').style.display = 'none'
        document.getElementById('sendContent').style.display = 'block'
        document.getElementById('sendTimeChoose').style.display = 'none'
        //    邮箱方式隐藏
        document.getElementById('sendMailContent').style.display = 'none'
        //    发送按钮
        document.getElementById('sendButton').style.display = 'block'
        document.getElementById('myLittleTip').style.display = '';
        document.getElementById('ctl02_ContentPlaceHolder1_btnSend').style.display = '';
    } else {
        sendType = '2';
        //短信内容隐藏
        document.getElementById('QQwayhand').style.display = 'none'
        document.getElementById('WXwayhand').style.display = 'none'
        document.getElementById('emailwayhand').style.display = 'block'

        document.getElementById('sendKind').style.display = 'block'
        document.getElementById('sendContent').style.display = 'none'
        document.getElementById('sendTimeChoose').style.display = 'none'
        //    邮箱方式显示
        document.getElementById('sendMailContent').style.display = 'block'
        //    链接方式隐藏
        document.getElementById('sendUrlContent').style.display = 'none'
        //    发送按钮
        document.getElementById('sendButton').style.display = 'block'
        document.getElementById('myLittleTip').style.display = 'none';
        document.getElementById('ctl02_ContentPlaceHolder1_btnSend').style.display = '';
    }
}

//判断选择的是定时发送还是立刻发送  1:定时发送
function test(value) {
    if (value == 1) {
        shortMessageGetTime = '1';
        document.getElementById('sendTimeChoose').style.display = 'block'
        document.getElementById("scheduledEndTime").value = getFormatDate(); //将currentdate赋值给页面id为kc_rksjStart的input输入框
        sendTime = document.getElementById("scheduledEndTime").valueOf()
        // //console.log(sendTime)
    } else {
        shortMessageGetTime = '0';
        document.getElementById('sendTimeChoose').style.display = 'none'
    }
}

function setEndtime(value) {
    if (value == 1) {
        shortMessageGetTime = '1';
        document.getElementById('chooseEndTime').style.display = 'block'
        document.getElementById("scheduledEndTime2").value = getendTime(3);
        tendTime = document.getElementById("scheduledEndTime").valueOf()
    } else {
        shortMessageGetTime = '0';
        document.getElementById('chooseEndTime').style.display = 'none'
    }
}


//上传文件
function addFile(id) {
    if(id=="image1")
        document.getElementById("image1").click();
    if(id=="image2")
        document.getElementById("image2").click();
}

//获取答题结束提示语、和短信内容
function getQuestionInfo() {
    var da = {
        'id': questionId
    };
    var url = '/queryQuestContextEnd';
    jQuery.ajax({
        url: httpRequestUrl + url,
        type: "POST",
        data: JSON.stringify(da),
        dataType: "json",
        contentType: "application/json",
        success: function (res) {
            // //console.log(res);
            if (!res.data) {

            } else {
                document.getElementById('tipT').value = res.data.questionEndContent;
                document.getElementById('msg').value = res.data.context;
            }
            objLength = document.getElementById('msg').value.length;
            objLength1 = 38 - objLength;
            document.getElementById('Lnum').innerText = objLength1
        },
        error: function (jqXHR, textStatus, errorThrown) {
            // alert(jqXHR);
        }
    });
}

//读取上传的excel表格中的内容
$('#image1').change(function (e) {
    debugger;
    var files = e.target.files;
    var fileReader = new FileReader();
    fileReader.onload = function (ev) {
        try {
            var data = ev.target.result,
                workbook = XLSX.read(data, {
                    type: 'binary'
                })// 以二进制流方式读取得到整份excel表格对象
            students = []; // 存储获取到的数据
        } catch (e) {
            layer.msg('文件类型不正确');
            return;
        }
        // 表格的表格范围，可用于判断表头是否数量是否正确
        var fromTo = '';
        // 遍历每张表读取
        for (var sheet in workbook.Sheets) {
            if (workbook.Sheets.hasOwnProperty(sheet)) {
                fromTo = workbook.Sheets[sheet]['!ref'];
                students = students.concat(XLSX.utils.sheet_to_json(workbook.Sheets[sheet]));
                break; // 如果只取第一张表，就取消注释这行
            }
        }
        if (students.length != 0) {
            if (!students[0].no || !students[0].studentNum || !students[0].studentName || !students[0].studentBelong || !students[0].studentSubject || !students[0].studentClass || !students[0].studentSex || !students[0].studentWeiNum || !students[0].studentQQNum || !students[0].studentPhone || !students[0].studentEmail) {
                layer.msg('数据模板不正确');

                return
            }
            _$("#userInfoTable1").bootstrapTable('removeAll');
            _$("#userInfoTable2").bootstrapTable('removeAll');
            //传入参数
            for (var i = 0; i < students.length; i++) {
                _$("#userInfoTable1").bootstrapTable('insertRow', {index: i, row: students[i]});
                if (i == students.length - 1) {
                    if (files) {
                        document.getElementById('image1').value = '';
                    }
                }
            }
        }
    };
    // 以二进制方式打开文件
    fileReader.readAsBinaryString(files[0]);
});

$('#image2').change(function (e) {
    debugger;
    var files = e.target.files;
    var fileReader = new FileReader();
    fileReader.onload = function (ev) {
        try {
            var data = ev.target.result,
                workbook = XLSX.read(data, {
                    type: 'binary'
                })// 以二进制流方式读取得到整份excel表格对象
            teachers = []; // 存储获取到的数据
        } catch (e) {
            layer.msg('文件类型不正确');
            return;
        }
        // 表格的表格范围，可用于判断表头是否数量是否正确
        var fromTo = '';
        // 遍历每张表读取
        for (var sheet in workbook.Sheets) {
            if (workbook.Sheets.hasOwnProperty(sheet)) {
                fromTo = workbook.Sheets[sheet]['!ref'];
                teachers = teachers.concat(XLSX.utils.sheet_to_json(workbook.Sheets[sheet]));
                break; // 如果只取第一张表，就取消注释这行
            }
        }
        if (teachers.length != 0) {
            if (!teachers[0].no || !teachers[0].teacherNum || !teachers[0].teacherName || !teachers[0].teacherBelong || !teachers[0].teacherSex || !teachers[0].WeiNum || !teachers[0].QQNum || !teachers[0].teacherEmail) {
                layer.msg('数据模板不正确');

                return
            }
            _$("#userInfoTable2").bootstrapTable('removeAll');
            //传入参数
            for (var i = 0; i < teachers.length; i++) {
                _$("#userInfoTable2").bootstrapTable('insertRow', {index: i, row: teachers[i]});
                if (i == teachers.length - 1) {
                    if (files) {
                        document.getElementById('image2').value = '';
                    }
                }
            }
        }
    };
    // 以二进制方式打开文件
    fileReader.readAsBinaryString(files[0]);
});

//发布问卷
function layOutSend() {
    var restime = document.getElementById("scheduledEndTime").value;
    var sender = document.getElementById("senderName").value;
    var senderQQ = document.getElementById("senderQQ").value;
    var senderWX = document.getElementById("senderWX").value;
    var senderEmail = document.getElementById("senderEmial").value;
    sendTime = document.getElementById("scheduledEndTime").value;
    sendTime = dateChange(sendTime);
    //发送QQ消息内容
    var sendContent = document.getElementById("msg").value;
    //发送问卷答题结束语
    var endContent = document.getElementById("tipT").value;
    //QQ发送方式
    if (sendType == '0') {
        if (shortMessageGetTime == '0') {
            sendTime = "";
        } else if (shortMessageGetTime == '1') {
            //定时发送短信的时间
            sendTime = document.getElementById("scheduledEndTime").value;
            sendTime = dateChange(sendTime);
        }


        if (students.length == 0&&teachers.length==0) {
            layer.msg("请添加调查人员信息", {icon: 2});
        } else if (endContent == "") {
            layer.msg("请添加答题结束语", {icon: 2});
        } else if (sendContent == "") {
            layer.msg("请添加QQ消息内容", {icon: 2});
        } else {
            layer.load(2, {time: 2 * 1000});
            var url = '/addSendQuestionnaire';
            var studentsData = _$('#userInfoTable1').bootstrapTable('getData');
            var teachersData = _$('#userInfoTable2').bootstrapTable('getData');
            //短信发送问卷
            var data = {
                "questionId": questionId,           //问卷id
                "releaseTime": sendTime,            //发送时间
                "senderName":sender,
                "senderQQ":senderQQ,
                "senderWX":senderWX,
                "senderEmail":senderEmail,
                "sendType": 0,                //发送类别，0QQ，1微信，2邮件
                "context": sendContent,                 //消息内容
                "questionEndContent": endContent,        //答卷结束语
                "studentsData": studentsData,                     //人员信息
                "teachersData":teachersData
            };
            setTimeout(function () {
                layer.msg("发送成功", {icon: 1});
            }, 2000);
            jQuery.ajax({
                "async": true,
                "url": httpRequestUrl + url,
                "type": "POST",
                "data": JSON.stringify(data),
                "dataType": "json",
                "contentType": "application/json",
                success: function (result) {
                    //console.log(result);
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    //console.log(jqXHR);
                    //console.log(textStatus);
                    //console.log(errorThrown);
                }
            })
        }
    } else if (sendType == "1") {
        if (students.length == 0&&teachers.length==0) {
            layer.msg("请添加调查人员信息", {icon: 2});
        } else if (endContent == "") {
            layer.msg("请添加答题结束语", {icon: 2});
        } else if (sendContent == "") {
            layer.msg("请添加微信消息内容", {icon: 2});
        } else {
            layer.load(2, {time: 2 * 1000});
            var url = '/addSendQuestionnaire';
            var studentsData = _$('#userInfoTable1').bootstrapTable('getData');
            var teachersData = _$('#userInfoTable2').bootstrapTable('getData');
            //短信发送问卷
            var data = {
                "questionId": questionId,           //问卷id
                "releaseTime": sendTime,            //发送时间
                "senderName":sender,
                "senderQQ":senderQQ,
                "senderWX":senderWX,
                "senderEmail":senderEmail,
                "sendType": 1,                //发送类别，0QQ，1微信，2邮件
                "context": sendContent,                 //消息内容
                "questionEndContent": endContent,        //答卷结束语
                "studentsData": studentsData,                     //人员信息
                "teachersData":teachersData
            };
            setTimeout(function () {
                layer.msg("发送成功", {icon: 1});
            }, 2000);
            jQuery.ajax({
                "async": true,
                "url": httpRequestUrl + url,
                "type": "POST",
                "data": JSON.stringify(data),
                "dataType": "json",
                "contentType": "application/json",
                success: function (result) {
                    //console.log(result);
                },
                error: function (jqXHR, textStatus, errorThrown) {

                }
            })
        }
    }
    else if (sendType == '2') {   //邮箱发送方式
        //邮件标题
        var emailTitle = document.getElementById("ctl02_ContentPlaceHolder1_txtEmailTitle").value;
        //邮件发送富文本内容
        var emailContent = document.getElementById("ctl02_ContentPlaceHolder1_fckEmailContent");
        emailContent = emailContent.value;
        //发送问卷答题结束语
        var endContent = document.getElementById("tipT").value;
        // //console.log(endContent);

        if (students.length == 0&&teachers.length==0) {
            layer.msg("请添加调查人员信息", {
                icon: 2
            });
        } else if (endContent == "") {
            layer.msg("请添加答卷结束语", {icon: 2});
        } else if (emailTitle == "") {
            layer.msg("请添加邮件标题", {icon: 2});
        } else if (emailContent == "") {
            layer.msg("请添加邮件内容", {icon: 2});
        } else if (emailContent.search("【联系人姓名】") == -1 || emailContent.search("【填写问卷地址】") == -1) {
            layer.msg("请不要修改'【】'里的内容，系统将会根据问卷自动进行替换！", {icon: 2});
        } else {
            layer.load(2, {time: 2 * 1000});
            var url = '/addSendQuestionnaire';
            var studentsData = _$('#userInfoTable1').bootstrapTable('getData');
            //邮件发送问卷
            var data = {
                "questionId": questionId,           //问卷id
                "releaseTime": sendTime,            //发送时间
                "senderName":sender,
                "senderQQ":senderQQ,
                "senderWX":senderWX,
                "senderEmail":senderEmail,
                "sendType": 2,                //发送类别，0短信，1邮件
                "emailTitle": emailTitle,                //邮件标题
                "context": emailContent,                 //邮件内容
                "questionEndContent": endContent,        //答卷结束语
                "studentsData": studentsData,                     //人员信息
                "teachersData":teachersData
            };
            setTimeout(function () {
                layer.msg("发送成功", {icon: 1});
            }, 2000);
            jQuery.ajax({
                "async": true,
                "url": httpRequestUrl + url,
                "type": "POST",
                "data": JSON.stringify(data),
                "dataType": "json",
                "contentType": "application/json",
                success: function (result) {
                   if (result.code == "333") {
                        layer.closeAll('loading');
                        layer.msg(result.message, {icon: 2});
                        setTimeout(function () {
                            window.location.href = 'login.html';
                        }, 1000)
                    }
                },
                error: function (jqXHR, textStatus, errorThrown) {

                }
            });
        }
    }
}

//保存问卷信息
function layOutHold(falg) {
    var url = '/addSendQuestionnaire';
    var data;

    //发送问卷答题结束语
    var endContent = document.getElementById("tipT").value;

    //短信
    if (sendType == "0") {
        //发送QQ内容
        var sendContent = document.getElementById("msg").value;
        data = {
            "questionId": questionId,           //问卷id
            "dataId": dataId,                    //问卷类型
            "releaseTime": "",            //发送时间
            "sendType": sendType,                //发送类别，0短信，1邮件
            "context": sendContent,                 //短信内容
            "questionEndContent": endContent,        //答卷结束语
            "student": students,                      //人员信息
            "teacher": teachers
        };

    }else if (sendType == "1") {
        var sendContent = document.getElementById("msg").value;
        data = {
            "questionId": questionId,           //问卷id
            "dataId": dataId,                    //问卷类型
            "releaseTime": "",            //发送时间
            "sendType": sendType,                //发送类别，0短信，1邮件
            "context": sendContent,                 //短信内容
            "questionEndContent": endContent,        //答卷结束语
            "student": students,                      //人员信息
            "teacher": teachers
        };

    }else if (sendType == "2") {     //邮件
        //邮件标题
        var emailTitle = document.getElementById("ctl02_ContentPlaceHolder1_txtEmailTitle").value;
        //邮件发送富文本内容
        var emailContent = document.getElementById("ctl02_ContentPlaceHolder1_fckEmailContent");
        emailContent = emailContent.value;
        //发送问卷答题结束语
        data = {
            "questionId": questionId,           //问卷id
            "releaseTime": sendTime,            //发送时间
            "sendType": sendType,                //发送类别，0QQ，1微信，2邮箱
            "emailTitle": emailTitle,                //邮件标题
            "context": emailContent,                 //邮件内容
            "questionEndContent": endContent,        //答卷结束语
            "student": students,                      //人员信息
            "teacher": teachers
        };

    }
    jQuery.ajax({
        "async": true,
        "url": httpRequestUrl + url,
        "type": "POST",
        "data": JSON.stringify(data),
        "dataType": "json",
        "contentType": "application/json",
        success: function (result) {
            if (result.code == "666") {
                if (falg == "true") {
                    layer.msg("保存成功！")
                }

            } else if (result.code == "333") {
                layer.msg(result.message, {icon: 2});
                setTimeout(function () {
                    window.location.href = 'login.html';
                }, 1000)
            } else {
                layer.msg(result.message, {icon: 2})
            }
        }
    })

}

//生成二维码
function getQrcode() {
    _$("#ctl02_ContentPlaceHolder1_imgQrcode").empty();
    var url = '/getShortUrlForLink';
    var da = {
        'id': questionId,
        'link': "222"
    };
    // //console.log(da);
    _$.ajax({
        url: httpRequestUrl + url,
        type: "POST",
        data: JSON.stringify(da),
        dataType: "json",
        contentType: "application/json",
        success: function (res) {
            // //console.log(res);
            var resData = JSON.parse(res.data);
            shortUrl = resData.tinyurl;
            document.getElementById('ctl02_ContentPlaceHolder1_txtLink').value = shortUrl;
            // $('#code').qrcode(); //任意字符串
            _$("#ctl02_ContentPlaceHolder1_imgQrcode").qrcode({
                width: 100, //宽度
                height: 100, //高度
                text: shortUrl    //任意内容
            })
        },
        error: function (jqXHR, textStatus, errorThrown) {
            // alert(jqXHR);
        },
    });
}

function gotoPreview() {
    window.open(previewUrl);
}

// 创建时间选择器
function createDtePicker() {
    var beginTimeTake;
    var nowTime = getFormatDateSecond();
    $('#scheduledEndTime').daterangepicker({
        minDate: nowTime,
        singleDatePicker: true,
        showDropdowns: true,
        timePicker24Hour: true,
        startDate: new Date(),
        timePicker: true,
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
    }, function (start, end, label) {
        // //console.log('New date range selected: ' + start.format('YYYY-MM-DD') + ' to ' + end.format('YYYY-MM-DD') + ' (predefined range: ' + label + ')');
        // sendTime = document.getElementById("scheduledEndTime").value;
        // console.log(sendTime);
        // var myDate= new Date(Date.parse(document.getElementById("scheduledEndTime").value.replace(/-/g,"/")));
        // console.log(("date"+myDate));
    });
}

//设计问卷
function designQuestionnaire() {
    var ifDesignQuestionnaire = _$.cookie("ifDesignQuestionnaire");
    if (ifDesignQuestionnaire == "false") {
        layer.msg("问卷处于运行状态或问卷已发布，不可设计问卷", {icon: 2})
    } else {
        _$.cookie("QuestionId", questionId);
        window.open('designQuestionnaire.html')
    }
}

//预览问卷
$('#ctl02_hrefView').click(function () {
    window.open('previewQuestionnaire.html?i=' + questionId)
});


function wordStatic(input) {
    // 获取要显示已经输入字数文本框对象
    var txtContent = document.getElementById("msg");
    var Lnum = document.getElementById("Lnum");
    if (input) {
        // 获取输入框输入内容长度并更新到界面
        value = input.value;
        // 将换行符不计算为单词数
        value = value.replace(/\n|\r/gi, "");
        Lnum.innerText = 38 - value.length;
        checkNum();
    }
}

var num = document.getElementById("num");

function checkNum() {
    var iRet = 0;
    //console.log(_$("#msg").val())
    if (_$("#msg").val().length > 0) {
        iRet = 1;
    } else {
        iRet = 0;
    }
    num.innerText = iRet;
}

function copyUrl2() {
    var Url2 = document.getElementById("quesLinkID");
    Url2.select(); // 选择对象
    document.execCommand("Copy"); // 执行浏览器复制命令
    layer.msg("已复制好，可贴粘。", {icon: 1, time: 1000});
}

function getendTime(it) {
    var nowDate = new Date();
    nowDate.setDate(nowDate.getDate()+it);
    var year = nowDate.getFullYear();
    var month = nowDate.getMonth() + 1 < 10 ? "0" + (nowDate.getMonth() + 1) : nowDate.getMonth() + 1;
    var date = nowDate.getDate() < 10 ? "0" + nowDate.getDate() : nowDate.getDate();
    var hour = nowDate.getHours() < 10 ? "0" + nowDate.getHours() : nowDate.getHours();
    var minute = nowDate.getMinutes() < 10 ? "0" + nowDate.getMinutes() : nowDate.getMinutes();
    var second = nowDate.getSeconds() < 10 ? "0" + nowDate.getSeconds() : nowDate.getSeconds();
    return year + "-" + month + "-" + date + " " + hour + ":" + minute+ ":" + second;
}
