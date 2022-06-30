/**
 * Created by sc
 */
$(function () {
    isLoginFun();
    header();
    $("#ctl01_lblUserName").text(getCookie('userName'));
    var oTable = new TableInit();
    oTable.Init();
});

//回车事件
$(document).keydown(function (event) {
    if (event.keyCode == 13) {
        getQuestionnaireList();
    }
});

$('#questionnaireManager').on("keydown", function (event) {
    var keyCode = event.keyCode || event.which;
    if (keyCode == "13") {
        //console.log("1111")
        event.preventDefault();
    }
});

function getQuestionnaireList() {
    $("#questionnaireTable").bootstrapTable('refresh');
}

function TableInit() {

    var oTableInit = new Object();
    //初始化Table
    oTableInit.Init = function () {
        $('#questionnaireTable').bootstrapTable({
            url: httpRequestUrl + '/queryQuestionnaireList',         //请求后台的URL（*）
            method: 'POST',                      //请求方式（*）
            striped: true,                      //是否显示行间隔色
            cache: false,                       //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
            pagination: true,                   //是否显示分页（*）
            sortOrder: "asc",                   //排序方式
            queryParamsType: '',
            dataType: 'json',
            paginationShowPageGo: true,
            showJumpto: true,
            pageNumber: 1, //初始化加载第一页，默认第一页
            queryParams: queryParams,//请求服务器时所传的参数
            sidePagination: 'server',//指定服务器端分页
            pageSize: 10,//单页记录数
            pageList: [10, 20, 30, 40],//分页步进值
            search: false, //是否显示表格搜索，此搜索是客户端搜索，不会进服务端，所以，个人感觉意义不大
            silent: true,
            showRefresh: false,                  //是否显示刷新按钮
            showToggle: false,
            minimumCountColumns: 2,             //最少允许的列数
            uniqueId: "id",                     //每一行的唯一标识，一般为主键列

            columns: [{
                checkbox: true,
                visible: false
            }, {
                field: 'id',
                title: '序号',
                align: 'center',
                formatter: function (value, row, index) {
                    return index + 1;
                }
            },
                {
                    field: 'questionName',
                    title: '问卷名称',
                    align: 'center',
                    width: '230px'
                },
                {
                    field: 'projectName',
                    title: '所属项目',
                    align: 'center',
                    width: '120px'
                },

                {
                    field: 'answerTotal',
                    title: '回答总量',
                    align: 'center'
                }, {
                    field: 'startTime',
                    title: '问卷开始时间',
                    align: 'center'
                }, {
                    field: 'endTime',
                    title: '问卷结束时间',
                    align: 'center'
                },
                {
                    field: 'operation',
                    title: '操作',
                    align: 'center',
                    events: operateEvents,//给按钮注册事件
                    formatter: addFunctionAlty//表格中增加按钮
                }],
            responseHandler: function (res) {
                console.log(res);
                if(res.code == "666"){
                    var questionnaireInfo = res.data.list;
                    // console.log(res.data);
                    var NewData = [];
                    if (questionnaireInfo.length) {
                        for (var i = 0; i < questionnaireInfo.length; i++) {
                            var dataNewObj = {
                                'id': '',
                                "questionName": '',
                                "projectName": '',
                                'answerTotal': '',
                                "startTime": '',
                                'endTime': '',
                                'status':'',
                                'releaseStatus':''
                            };

                            dataNewObj.id =  questionnaireInfo[i].id;
                            dataNewObj.questionName =  questionnaireInfo[i].question_name;
                            dataNewObj.projectName = questionnaireInfo[i].project_name;
                            dataNewObj.answerTotal=  questionnaireInfo[i].answer_total;
                            dataNewObj.startTime = timestampToTime(questionnaireInfo[i].start_time);
                            dataNewObj.endTime = timestampToTime(questionnaireInfo[i].end_time);
                            dataNewObj.status = questionnaireInfo[i].question_stop;
                            dataNewObj.releaseStatus = questionnaireInfo[i].release_status;
                            NewData.push(dataNewObj);
                        }


                        // NewData.sort(compare("startTime"))

                    }
                    var data = {
                        total: res.data.total,
                        rows: NewData
                    };

                    return data;
                }

            }

        });
    };





//更改日期格式
    function timestampToTime(timestamp) {
        var date = new Date(timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
        Y = date.getFullYear() + '/';
        M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '/';
        D = date.getDate() + ' ';
        h = (date.getHours() < 10 ? '0'+(date.getHours()) : date.getHours()+1) + ':';
        m = (date.getMinutes() < 10 ? '0'+(date.getMinutes()) : date.getMinutes()+1) + ':';
        s = (date.getSeconds() < 10 ? '0'+(date.getSeconds() ) : date.getSeconds() +1);
        if(!date.getFullYear()){
            return  null;
        }
        return Y+M+D+" "+h+m+s;
    }

//根据创建时间对用户排序
/*    function compare(p){ //这是比较函数
        return function(m,n){
            var a = m[p];
            var b = n[p];
            return b.localeCompare(a,'zh-CN',{ numeric: true });
        }}*/


    // 得到查询的参数
    function queryParams(params) {
        var questionName = $("#keyWord").val();
        //console.log(userName);
        var temp = {   //这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
            pageNum: params.pageNumber,
            pageSize: params.pageSize,
            questionName: questionName
        };
        return JSON.stringify(temp);
    }

    return oTableInit;
}











window.operateEvents = {
    //编辑
    'click #btn_count': function (e, value, row, index) {
        id = row.id;
        $.cookie('questionId', id);
    }
};


// 表格中按钮
function addFunctionAlty(value, row, index) {
    var btnText = '';
    // console.log(row.question_stop)
    // console.log(row.id);
    //btnText += "<button type=\"button\" id=\"btn_look\" onclick=\"resetPassword(" + "'" + row.id + "'" + ")\" style='width: 77px;' class=\"btn btn-default-g ajax-link\">重置密码</button>&nbsp;&nbsp;";

    btnText += "<button type=\"button\" id=\"btn_look\" onclick=\"editQuestionnairePage(" + "'" + row.id + "')\" class=\"btn btn-default-g ajax-link\">编辑</button>&nbsp;&nbsp;";

    btnText += "<button type=\"button\" id=\"btn_look\" onclick=\"countQuestionnaire(" + "'" + row.questionName + "')\" class=\"btn btn-default-g ajax-link\">统计</button>&nbsp;&nbsp;";
 //   if (row.status === "1") {//开启中
 //       btnText += "<button type=\"button\" id=\"btn_stop" + row.id + "\" style='width: 50px;height: 30px;' class=\"btn btn-danger ajax-link\" onclick=\"closeAction(" + "'" + row.id + "'" + "," + "'" + row.status + "'" + ")\" ><text style='font-size: 15px'>关闭</text></button>&nbsp;&nbsp;";
 //   } else if (row.status === "2" || row.status === "0") {//关闭中或者过期
 //       btnText += "<button type=\"button\" id=\"btn_stop" + row.id + "\" style='width: 50px;height: 30px;' class=\"btn btn-success ajax-link\" onclick=\"openAction(" + "'" + row.id + "'" + "," + "'" + row.status + "'" + ")\"><text style='font-size: 15px'>开启</text></button>&nbsp;&nbsp;"
  //  }
    btnText += "<button type=\"button\" id=\"btn_stop" + row.id + "\" onclick=\"deleteQuestionnaire(" + "'" + row.id + "'" + "," + "'" + row.status + "'"+ "," + "'" + row.releaseStatus + "'" + ")\" class=\"btn btn-danger-g ajax-link\">删除</button>&nbsp;&nbsp;";

    return btnText;
}

//重置密码
//function resetPassword(id) {
  //  alert("重置密码")

//}

// 打开创建问卷页
function openCreateQuestionnairePage(id, value) {

    deleteCookie("userTitle");
    setCookie("userTitle", value);
    if (id != '') {
        deleteCookie("userId");
        setCookie("userId", id);
    }
    window.location.href = 'createQuestionnaireOutOfProject.html';
}

function editQuestionnairePage(questionId) {

    var url = "designQuestionnaire.html?qId="+questionId + "&requestType=1";//此处拼接内容
    window.open(url);

}

function countQuestionnaire(questionName) {

    setCookie("nameOfQuestionnaire",questionName);
    window.location.href = 'countQuestionnaire.html';
}



// 修改用户状态（禁用、开启）
function changeStatus(index) {

    alert("修改问卷状态")
}

//删除
function deleteQuestionnaire(id,questionStop,releaseStatus) {

    if(releaseStatus === "1"){
        alert("问卷已经被发布过，不能删除")
    }
    else if(questionStop === "1"){
        alert("问卷正在开启中，请关闭后再删除");
    }
    else {
        layer.confirm('您确认要删除此问卷吗？', {
            btn: ['确定', '取消'] //按钮
        }, function () {
            var url = '/deleteQuestionnaireById';
            var data = {
                "id": id
            };
            commonAjaxPost(true, url, data, function (result) {
                if (result.code == "666") {
                    layer.msg(result.message, {icon: 1});
                    getQuestionnaireList();
                } else if (result.code == "333") {
                    layer.msg(result.message, {icon: 2});
                    setTimeout(function () {
                        window.location.href = 'login.html';
                    }, 1000);
                } else {
                    layer.msg(result.message, {icon: 2});
                }
            });
        }, function () {
        });
    }
}

function closeAction(id, status) {//关闭问卷
    console.log(id);
    console.log(status)
    let data = {
        "id": id,
        "action": "close"
    }
    let url = "/modifyQuestionnaireStatus";
    commonAjaxPost(true, url, data, function (result) {
        if (result.code == "666") {
            layer.msg(result.message, {icon: 1});
           // getProjectInfo();
            getQuestionnaireList();
        } else if (result.code == "333") {
            layer.msg(result.message, {icon: 2});
            setTimeout(function () {
                window.location.href = 'login.html';
            }, 1000);
        } else {
            layer.msg(result.message, {icon: 2});
        }
    });
    // getProjectInfo();
}

function openAction(id, status) {
  //  console.log(startTime)
    console.log(id)
    console.log(status)
   if (status === "2") {
        let data = {
            "id": id,
            "action": "open"
        }
        let url = "/modifyQuestionnaireStatus1";
        commonAjaxPost(true, url, data, function (result) {
            if (result.code == "666") {
                layer.msg(result.message, {icon: 1});
                //getProjectInfo();
                getQuestionnaireList();
            } else if (result.code == "333") {
                layer.msg(result.message, {icon: 2});
                setTimeout(function () {
                    window.location.href = 'login.html';
                }, 1000);
            } else {
                layer.msg(result.message, {icon: 2});
            }
        });
    }
}