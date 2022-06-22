/**
 * Created by Eric on 2022/6/11.
 */
    // onclick=\"getQuestionnaireByProject(" + "'" + projectInfo.id + "'"+ "," + "'" + i +"'"+")\"
var questIdModal = '';

$(function () {
    isLoginFun();
    var userName = getCookie('userName');
    header();
    $("#ctl01_lblUserName").html(userName);
    getProjectQuest();
});

//回车事件
$(document).keydown(function (event) {
    if (event.keyCode == 13) {
        getProjectQuest();
    }
});

// 查看项目及其包含的问卷列表
function getProjectQuest() {
    var keyWord = $("#keyWord").val();
    var userName = getCookie("userName");
    var url = '/queryProjectList';
    var data = {
        "projectName": keyWord,
        "userName": userName
    };
    commonAjaxPost(true, url, data, getProjectQuestSuccess);
    //var rr = JSON.parse('{"code":"666","data":[{"projectContent":"项目名","id":"708a580ce83c49c0a0cfc65b151d690e","projectName":"静态测试数据","createDate":"2022-05-13T15:05:40"}],"message":null}')
    //getProjectQuestSuccess(rr)
}

// 查看项目及其包含的问卷列表成功回调
responseHandler: function getProjectQuestSuccess(result) {
    console.log(result);
    if (result.code == "666") {
        var data = result.data.list;
        $("#panel-23802").empty();

        //遍历多个项目
        var text = "";

        if (data.length) {
            for (var i = 0; i < data.length; i++) {
                var projectInfo = data[i];
                var projectName = projectInfo.project_name;
                if (projectName.length >= 25) {
                    projectName = projectName.substring(0, 26) + "...";
                }
                text += " <div class=\"panel panel-default\" id=\"projectOne" + i + "\" >";
                text += "     <div class=\"panel-heading\">";

                text += "         <a class=\"panel-title\" data-toggle=\"collapse\" id=\"projectNumber" + i + "\" data-parent=\"#panel-23802\"  href=\"#panel-element-" + projectInfo.id + "\">" + projectName + "</a>";
                text += "";
                text += "         <div class=\"operation-box pull-right\" style=\"font-size: 16px;\">";
                text += "             <a href=\"javascript:void(0)\" class=\"pull-left release-items\" title=\"创建问卷\" onclick=\"createGetProjectInfo(" + "'" + projectInfo.id + "'" + "," + "'" + projectName + "'" + ")\">";
                text += "                 <i class=\"icon release-icon\"></i>加入问卷</a>";
                text += "             <a href=\"javascript:void(0)\" id=\"projectShow" + i + "\" class=\"pull-left copy-items\" onclick=\"getProjectInfo(" + "'" + projectInfo.id + "'" + ")\"><i class=\"icon copy-icon\"></i>详情</a>";
                text += "             <a class=\"pull-left item-remind\" id=\"projectUpdate" + i + "\" href=\"javascript:void(0)\" onclick=\"editProject(" + "'" + projectInfo.id + "'" + "," + "'" + projectName + "'" + "," + "'" + projectInfo.project_content + "'" + ")\"><i class=\"icon remind-icon\"></i>编辑</a>";
                text += "             <a href=\"javascript:void(0)\" class=\"pull-left cutout-items\" title=\"删除此项目\" onclick=\"deleteProject(" + "'" + projectInfo.id + "'" + ")\"><i class=\"icon cutout-icon\"></i>删除 </a>";
                text += "         </div>";
                text += "";
                text += "     </div>";

                if (i == 0) {
                    text += "     <div id=\"panel-element-" + projectInfo.id + "\" class=\"panel-collapse collapse in\">";

                } else {
                    text += "     <div id=\"panel-element-" + projectInfo.id + "\" class=\"panel-collapse collapse\">";

                }
                text += "         <div class=\"panel-body\">";
                text += "             <!--Anim pariatur cliche...-->";
                text += "";
                text += "";
                text += "<div id=\"tableDiv\" font-size:21px\"><div/>";
                text += "         </div>";
                text += "     </div>";
                text += " </div>";
                // }
            }
            //for循环结束
            $("#panel-23802").append(text);
            let tableDivList = [];
            tableDivList = document.querySelectorAll("#tableDiv");
            let text1 = "";
            let count = 0;
            for(let j = 0;j < data.length;j++){
                for(let k = 0;k < data[j].questionnaireList.length;k++){
                        count++;
                        let name = data[j].questionnaireList[k].question_name;
                        // let start = data[j].questionnaireList[k].start_time;
                        // let end = data[j].questionnaireList[k].end_time;
                        if(k === (data[j].questionnaireList.length - 1)){
                            text1 += "<div style='color: black;font-size: 18px;text-align: left;text-decoration: underline'>"+"问卷"+(k+1)+"："+name+"</div>"
                        }
                        else {
                            text1 += "<div style='color: black;font-size: 18px;text-align: left;text-decoration: underline'>"+"问卷"+(k+1)+"："+name+"</div>"+"</br>"
                        }

                }
                if(count === 0){
                    tableDivList.item(j).innerHTML = "<div style='color: red;font-size: 18px;text-align: left'>暂无调查问卷</div>"
                }
                else {
                    tableDivList.item(j).innerHTML = text1;
                }
               count = 0;
                text1="";
            }


        } else {
            layer.msg("暂无符合条件的项目", {icon: 0})
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


// 删除项目
function deleteProject(projectId) {
    layer.confirm('您确认要删除此项目吗？', {
        btn: ['确定', '取消'] //按钮
    }, function () {
        var url = '/deleteProjectById';
        var data = {
            "id": projectId
        };
        commonAjaxPost(true, url, data, function (result) {
            // //console.log(result);
            if (result.code == "666") {
                layer.msg(result.message, {icon: 1});
                getProjectQuest();
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


// 编辑项目，在问卷未发布的状态下才可以编辑项目信息
function editProject(id, name, content) {
    deleteCookie("projectId");
    deleteCookie("projectName");
    deleteCookie("projectContent");
    setCookie("projectId", id);
    setCookie("projectName", name);
    setCookie("projectContent", content);
    window.location.href = 'editProject.html'
}

// 查看项目详细信息
function getProjectInfo(id) {
    deleteCookie("projectId");
    setCookie("projectId", id);
    window.location.href = 'projectInfo.html'
}

// 为了创建问卷而获取项目id、项目名称
function createGetProjectInfo(id, name) {
    //alert("创建问卷")
    deleteCookie("projectId");
    deleteCookie("projectName");
    setCookie("projectId",id);
    setCookie("projectName",name);
    window.location.href = "addQuestionnaireInProject.html"
}

// function getQuestionnaireByProject(projectId, i) {
//     var url = '/queryQuestionnaireListByProject';
//     var data =
//     commonAjaxPost(true, url, data, getQuestionnaireByProjectSuccess);
// }
// function getQuestionnaireByProjectSuccess(result) {
//
// }



