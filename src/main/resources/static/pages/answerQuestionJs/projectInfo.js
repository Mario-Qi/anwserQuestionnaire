/**
 * Created by Amy on 2018/8/7.
 */
$(function () {
    isLoginFun();
    header();
    $("#ctl01_lblUserName").text(getCookie('userName'));
    getProjectInfo();

});

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
        var projectInfo = result.data.list[0];
        $("#projectNameSpan").text(projectInfo.projectName);
        $("#createTimeSpan").text(projectInfo.creationDate.replace(/-/g, '/'));
        $("#adminSpan").text(projectInfo.createdBy);
        $("#projectContentSpan").text(projectInfo.projectContent);


        let text = "";
        let questionnaireList = projectInfo.questionnaireList;
        if(questionnaireList.length === 0){
            text += "<tr>";
            text += "    <td style=\"text-align: center;color: #d9534f\" colspan=\"4\">暂无调查问卷</td>";
            text += "</tr>";
        }
        else{
            for (let j = 0; j < questionnaireList.length; j++) {
                text += "<tr>";
                text += "    <td style=\"text-align: center;\">" + (j + 1) + "</td>";
                text += "    <td style=\"text-align: center;\">" + questionnaireList[j].question_name + "</td>";
                text += "    <td style=\"text-align: center;\">" + questionnaireList[j].release_time + "</td>";
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
    console.log(row);
    btnText += "<button type=\"button\" id=\"btn_look\" onclick=\"setStartAndEnd(" + "'" + row.id + "'" + ")\" style='width: 80px;height: 30px;' class=\"btn btn-default ajax-link\"><text style='font-size: 15px;text-align: center'>设置时间</text></button>&nbsp;&nbsp;";

    btnText += "<button type=\"button\" id=\"btn_look\" style='width: 87px;height: 30px;' onclick=\"editQuestionnaire(" + "'" + row.id + "')\" class=\"btn btn-default ajax-link\"><text style='font-size: 15px;text-align: center'>查看/修改</text></button>&nbsp;&nbsp;";
    if (row.question_stop === "1") {//开启中
        btnText += "<button type=\"button\" id=\"btn_stop" + row.id + "\" style='width: 50px;height: 30px;' class=\"btn btn-danger ajax-link\" onclick=\"closeAction(" +row.id +','+row.question_stop+ ")\" ><text style='font-size: 15px'>关闭</text></button>&nbsp;&nbsp;";
    } else if (row.question_stop === "2" || row.question_stop === "0") {//关闭中或者过期
        btnText += "<button type=\"button\" id=\"btn_stop" + row.id + "\" style='width: 50px;height: 30px;' class=\"btn btn-success ajax-link\" onclick=\"openAction(" +row.id +','+row.question_stop+','+row.start_time+")\"><text style='font-size: 15px'>开启</text></button>&nbsp;&nbsp;"
    }
    btnText += "<button type=\"button\" id=\"btn_stop" + row.id + "\" style='width: 50px;height: 30px;' onclick=\"deleteQuestionFromProject(" + "'" + row.id + "'" + ")\" class=\"btn btn-danger ajax-link\"><text style='font-size: 15px'>移除</text></button>&nbsp;&nbsp;";
    btnText += "<button type=\"button\" id=\"btn_release" + row.id + "\"  style='width: 50px;height: 30px;' class=\"btn btn-success ajax-link\"><text style='font-size: 15px'>发布</text></button>&nbsp;&nbsp;";

    return btnText;
}
function setStartAndEnd(id){//设置问卷开始和结束时间

}
function closeAction(id,status){//关闭问卷
    console.log(id);
    console.log(status)
    let data = {"id":id,
                "action":"close"}
    let url = "xxx";
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
function openAction(id,status,startTime){
        console.log(startTime)
        console.log(id)
        console.log(status)
        if(status === "0"){
            alert("问卷已过期。");
        }
        else if(startTime === undefined){
            alert("问卷起止时间未设置。");
        }
        else if(status === "2"){
            let data = {"id":id,
                "action":"open"}
            let url = "xxx";
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
function deleteQuestionFromProject(id){//从项目中移除问卷
    data = {"id":id}
    url = "xxx";
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
