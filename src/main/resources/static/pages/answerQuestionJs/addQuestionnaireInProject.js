/**
 * Created by Amy on 2018/8/7.
 */
$(function () {
    isLoginFun();
    header();
    $("#ctl01_lblUserName").text(getCookie('userName'));
    projectName = getCookie('projectName');
    $('#belongProject').val(projectName);
    initPage();


});

// 查看项目详细信息
function initPage() {
    let projectId = getCookie('projectId');
    let url1 = '/queryQuestionnaireByProjectID';
    let url2 = '/queryQuestionnaireByCreated';
    let username = getCookie("userName");
    let data1 = {"projectId": projectId, "pageNum":1,"pageSize":10};
    let data2 = {"username":username,"pageNum":1,"pageSize":10};
    commonAjaxPost(true, url1, data1, getQuestionnairesInProjectSuccess);
    commonAjaxPost(true,url2,data2,getQuestionnairesOutOfProjectSuccess);


}

// 查看在项目中的问卷信息成功
function getQuestionnairesInProjectSuccess(result) {
    if (result.code == "666") {
        let questionnaireList = result.data.list;
        let text = "";
        if (questionnaireList.length === 0) {
            text += "<tr>";
            text += "    <td style=\"text-align: center;color: #d9534f\" colspan=\"4\">暂无调查问卷</td>";
            text += "</tr>";
        } else {
            for (let j = 0; j < questionnaireList.length; j++) {
                text += "<tr>";
                text += "    <td style=\"text-align: center;\">" + (j + 1) + "</td>";
                text += "    <td style=\"text-align: center;\">" + questionnaireList[j].questionName + "</td>";
                text += "    <td style=\"text-align: center;\">" +
                    addBtnInTable1(questionnaireList[j]) + "</td>";
                text += "</tr>";
            }
        }

        $("#questTableBody1").empty();
        $("#questTableBody1").append(text)

    } else if (result.code == "333") {
        layer.msg(result.message, {icon: 2});
        setTimeout(function () {
            window.location.href = 'login.html';
        }, 1000)
    } else {
        layer.msg(result.message, {icon: 2})
    }
}

function getQuestionnairesOutOfProjectSuccess(result){
    console.log(result);
    if (result.code == "666") {
        let text = "";
        let questionnaireList = result.data.list;
        if (questionnaireList.length === 0) {
            text += "<tr>";
            text += "    <td style=\"text-align: center;color: #d9534f\" colspan=\"4\">暂无调查问卷</td>";
            text += "</tr>";
        } else {
            for (let j = 0; j < questionnaireList.length; j++) {
                text += "<tr>";
                text += "    <td style=\"text-align: center;\">" + (j + 1) + "</td>";
                text += "    <td style=\"text-align: center;\">" + questionnaireList[j].questionName + "</td>";
                text += "    <td style=\"text-align: center;\">" +
                    addBtnInTable2(questionnaireList[j]) + "</td>";
                text += "</tr>";
            }
        }

        $("#questTableBody2").empty();
        $("#questTableBody2").append(text)

    } else if (result.code == "333") {
        layer.msg(result.message, {icon: 2});
        setTimeout(function () {
            window.location.href = 'login.html';
        }, 1000)
    } else {
        layer.msg(result.message, {icon: 2})
    }
}


function addBtnInTable1(row) {
    var btnText = '';

    btnText += "<button type=\"button\" id=\"btn_look\" style='width: 50px;height: 30px;' onclick=\"checkQuestionnaire(" + "'" + row.id + "'" + "," + "'" + row.question_name + "'" + ")\" class=\"btn btn-default ajax-link\"><text style='font-size: 15px;text-align: center'>查看</text></button>&nbsp;&nbsp;";
    btnText += "<button type=\"button\" id=\"btn_stop" + row.id + "\" style='width: 50px;height: 30px;' onclick=\"removeQuestionFromProject(" + "'" + row.id + "'" + ")\" class=\"btn btn-danger ajax-link\"><text style='font-size: 15px'>移除</text></button>&nbsp;&nbsp;";
    return btnText;
}

function addBtnInTable2(row) {
    var btnText = '';
    btnText += "<button type=\"button\" id=\"btn_look\" style='width: 50px;height: 30px;' onclick=\"checkQuestionnaire(" + "'" + row.id + "'" + "," + "'" + row.question_name + "'" + ")\" class=\"btn btn-default ajax-link\"><text style='font-size: 15px;text-align: center'>查看</text></button>&nbsp;&nbsp;";
    btnText += "<button type=\"button\" id=\"btn_stop" + row.id + "\" style='width: 50px;height: 30px;' onclick=\"addQuestionnaireToProject(" + "'" + row.id + "'" + ")\" class=\"btn btn-success ajax-link\"><text style='font-size: 15px'>加入</text></button>&nbsp;&nbsp;";
    return btnText;
}


function removeQuestionFromProject(id) {//从项目中移除问卷
    data = {"id": id};
    url = "/removeProjectId";
    commonAjaxPost(true, url, data, function (result) {
        if (result.code == "666") {
            // layer.msg(result.message, {icon: 1});
            initPage();
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

function addQuestionnaireToProject(id){
    data = {"id": id}
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