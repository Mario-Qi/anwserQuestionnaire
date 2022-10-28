/**
 * Created by Amy on 2018/8/7.
 */
$(function () {
    isLoginFun();
    header();
    $("#ctl01_lblUserName").text(getCookie('userName'));
    getProjectInfo();


});

function addQuestionnaireBtnAction(){
    layer.open({
        title:"选择加入方式",
        content: '加入创建好的问卷还是创建新的问卷？'
        ,btn: ['加入', '创建新的',]
        ,btn1: function(index, layero){
            //按钮【加入】的回调
            window.location.href = "addQuestionnaireInProject.html"
            //return false 开启该代码可禁止点击该按钮关闭
        }
        ,btn2: function(index, layero){
            window.location.href = "createQuestionnaireInProject.html"
        }
        ,cancel: function(){
            //右上角关闭回调

            //return false 开启该代码可禁止点击该按钮关闭
        }
    });
}
// 查看项目详细信息
function getProjectInfo() {
    var projectId = getCookie('projectId');

    var url = '/getProjectInfo';
    var data = {"projectId": projectId}
    commonAjaxPost(true, url, data, getProjectInfoSuccess);

}

// 查看项目详细信息成功
function getProjectInfoSuccess(result) {
    console.log(result)
    if (result.code == "666") {
        console.log(result);
        var projectInfo = result.data.list[0];
        $("#projectNameSpan").text(projectInfo.projectName);
        let createdDate = timeFormat(projectInfo.creationDate);
        $("#createTimeSpan").text(createdDate.replace(/-/g, '/'));
        $("#adminSpan").text(projectInfo.createdBy);
        $("#projectContentSpan").text(projectInfo.projectContent);


        let text = "";
        let questionnaireList = projectInfo.questionnaireList;
        if (questionnaireList.length === 0) {
            text += "<tr>";
            text += "    <td style=\"text-align: center;color: #d9534f\" colspan=\"4\">暂无调查问卷</td>";
            text += "</tr>";
        } else {
            for (let j = 0; j < questionnaireList.length; j++) {
                text += "<tr>";
                text += "    <td style=\"text-align: center;\">" + (j + 1) + "</td>";
                text += "    <td style=\"text-align: center;\">" + questionnaireList[j].question_name + "</td>";
                if(typeof(questionnaireList[j].release_time) == "undefined"){
                    text += "    <td style=\"text-align: center;\"> 未发布 </td>";
                }
                else {
                    let releaseTime = timeFormat(questionnaireList[j].release_time);
                    text += "    <td style=\"text-align: center;\">" + releaseTime + "</td>";
                }

                text += "    <td style=\"text-align: center;\">" +
                    addBtnInTable(questionnaireList[j]) + "</td>";
                text += "</tr>";
            }
        }

        $("#questTableBody").empty();
        $("#questTableBody").append(text)

    } else if (result.code == "333") {
        layer.msg(result.message, {icon: 2});
        setTimeout(function () {
            window.location.href = 'login.html';
        }, 1000)
    } else {
        layer.msg(result.message, {icon: 2})
    }
}

//编辑问卷
function editQuest(id, name, content, endTime, creationDate, dataId) {
    var data = {
        "id": id
    };
    commonAjaxPost(true, '/selectQuestionnaireStatus', data, function (result) {
        // if (result.code == "666") {
        //     if (result.data != "5") {
        //         layer.msg('问卷已发布，不可修改', {icon: 2});
        //     } else if (result.data == "5") {
        //         deleteCookie("questionId");
        //         deleteCookie("questionName");
        //         deleteCookie("questionContent");
        //         deleteCookie("endTime");
        //         setCookie("questionId", id);
        //         setCookie("questionName", name);
        //         setCookie("questionContent", content);
        //         setCookie("endTime", endTime);
        //         setCookie("creationDate", creationDate);
        //         setCookie("dataId", dataId);
        //         window.location.href = 'editQuestionnaire.html'
        //     }
        // }
        if (result.code == "666") {
            // if (result.data == "1") {
            //     if ($("#operationAll" + m + n).children("a:first-child").text() == '开启') {
            //         judgeIfChangeStatus(m, n);
            //     }
            //     layer.msg('问卷运行中，不可修改', {icon: 2});
            // } else

            // if (result.data != "1") {
            commonAjaxPost(true, '/selectQuestSendStatus', {id: id}, function (result) {
                //发送过问卷
                if (result.code == "40003") {
                    setCookie("ifEditQuestType", "false");
                } else if (result.code == "666") {         //未发送过问卷
                    setCookie("ifEditQuestType", "true");
                }
            });
            deleteCookie("questionId");
            deleteCookie("questionName");
            deleteCookie("questionContent");
            deleteCookie("endTime");
            setCookie("questionId", id);
            setCookie("questionName", name);
            setCookie("questionContent", content);
            setCookie("endTime", endTime);
            setCookie("creationDate", creationDate);
            setCookie("dataId", dataId);
            window.location.href = 'editQuestionnaire.html'
            // }
        } else if (result.code == "333") {
            layer.msg(result.message, {icon: 2});
            setTimeout(function () {
                window.location.href = 'login.html';
            }, 1000)
        } else {
            layer.msg(result.message, {icon: 2})
        }
    });
}

function addBtnInTable(row) {
    var btnText = '';
    btnText += "<button type=\"button\" id=\"btn_look\"  style='width: 80px;height: 30px;' onclick=\"setStartAndEnd(" + "'" + row.id + "'" + "," + "'" + row.question_name + "'" + ")\" class=\"btn btn-default ajax-link\" ><text style='font-size: 15px;text-align: center'>设置时间</text></button>&nbsp;&nbsp;";
    btnText += "<button type=\"button\" id=\"btn_look\" style='width: 50px;height: 30px;' onclick=\"previewQuestionnaire(" + "'" + row.id + "'" + ")\" class=\"btn btn-default ajax-link\"><text style='font-size: 15px;text-align: center'>预览</text></button>&nbsp;&nbsp;";
    btnText += "<button type=\"button\" id=\"btn_look\" style='width: 50px;height: 30px;' onclick=\"editQuestionnaire(" + "'" + row.id + "'" + "," + "'" + row.question_stop + "'"+ "," + "'" + row.release_status + "'" + ")\" class=\"btn btn-default ajax-link\"><text style='font-size: 15px;text-align: center'>修改</text></button>&nbsp;&nbsp;";
    if (row.question_stop === "1") {//开启中
        btnText += "<button type=\"button\" id=\"btn_stop" + row.id + "\" style='width: 80px;height: 30px;' class=\"btn btn-danger ajax-link\" onclick=\"closeAction(" + "'" + row.id + "'" + "," + "'" + row.question_stop + "'" + ")\" ><text style='font-size: 15px'>关闭问卷</text></button>&nbsp;&nbsp;";
    } else if (row.question_stop === "2" || row.question_stop === "0") {//关闭中或者过期
        btnText += "<button type=\"button\" id=\"btn_stop" + row.id + "\" style='width: 80px;height: 30px;' class=\"btn btn-success ajax-link\" onclick=\"openAction(" + "'" + row.id + "'" + "," + "'" + row.question_stop + "'" +","+ "'"+row.start_time + "'"+ ")\"><text style='font-size: 15px'>开启问卷</text></button>&nbsp;&nbsp;"
    }
    btnText += "<button type=\"button\" id=\"btn_stop" + row.id + "\" style='width: 50px;height: 30px;' onclick=\"deleteQuestionFromProject(" + "'" + row.id + "'" + "," + "'" + row.release_status + "'"  + ")\" class=\"btn btn-danger ajax-link\"><text style='font-size: 15px'>移除</text></button>&nbsp;&nbsp;";
    btnText += "<button type=\"button\" id=\"btn_release" + row.id + "\"  style='width: 50px;height: 30px;' onclick=\"sendQuestionaire(" + "'" + row.id + "'" + "," + "'" + row.start_time + "'" + "," + "'" + row.end_time + "'" + "," + "'" + row.question_stop + "'" + "," + "'" + row.question_name + "'" + ")\" class=\"btn btn-success ajax-link\"><text style='font-size: 15px'>发布</text></button>&nbsp;&nbsp;";

    return btnText;
}

function sendQuestionaire(id,start_time,end_time,question_stop,question_name){
    var now = new Date();
    var start = start_time.split(/[- T :]/);
    var end = end_time.split(/[- T :]/);
    var startstr = start[0]+"-"+start[1]+"-"+start[2]+" "+start[3]+":"+start[4]+":"+start[5];
    var endstr = end[0]+"-"+end[1]+"-"+end[2]+" "+end[3]+":"+end[4]+":"+end[5];
    var startDate = new Date(startstr.replace(/-/g, "/"));
    var endDate = new Date(endstr.replace(/-/g, "/"));
    if(now>=startDate&&now<=endDate){
        if(question_stop ==='1'){
            deleteCookie("questionId");
            setCookie("questionId", id);
            deleteCookie("questionName");
            setCookie("questionName",question_name);
            window.location.href = 'sendQuestionnaire.html';
        }else{
            alert("不能发布，请先开启问卷");
        }
    }else{
        alert("不能发布，问卷不在起止时间内");
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
            getProjectInfo();
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

function openAction(id, status, startTime) {
    console.log(startTime)
    console.log(id)
    console.log(status)
    if (status === "0") {
        alert("问卷已过期。");
    } else if (startTime === undefined) {
        alert("问卷起止时间未设置。");
    } else if (status === "2") {
        let data = {
            "id": id,
            "action": "open"
        }
        let url = "/modifyQuestionnaireStatus1";
        commonAjaxPost(true, url, data, function (result) {
            if (result.code == "666") {
                layer.msg(result.message, {icon: 1});
                getProjectInfo();
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

function deleteQuestionFromProject(id,releaseStatus) {//从项目中移除问卷

    if(releaseStatus === "1"){
        alert("问卷已被发布过，不能移除。");
    }
    else{
        data = {"id": id}
        url = "/removeProjectId";
        commonAjaxPost(true, url, data, function (result) {
            if (result.code == "666") {
                layer.msg(result.message, {icon: 1});
                getProjectInfo();
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

function setStartAndEnd(id,name) {//设置问卷开始和结束时间
    console.log(id)
    deleteCookie("questionnaireId");
    setCookie("questionnaireId",id);
    setCookie("questionnaireName",name);
    window.location.href = "setValidDateOfQuestionnaire.html"

}
//修改问卷
function editQuestionnaire(id,questionStop,releaseStatus){
    if(releaseStatus === "1"){
            alert("问卷已经被发布过，不能修改。");
    }
    else if(questionStop === "1"){
        alert("问卷正在开启中，请关闭后再修改。");
    }
    else{
        var url = "designQuestionnaire.html?qId="+id + "&requestType=1";//此处拼接内容
        window.open(url);
    }
    }
function previewQuestionnaire(id){
        let url = "previewQuestionnaire.html?i="+id;
        window.open(url);
}