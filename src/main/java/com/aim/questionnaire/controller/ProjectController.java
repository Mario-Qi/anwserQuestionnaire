package com.aim.questionnaire.controller;

import com.aim.questionnaire.beans.HttpResponseEntity;
import com.aim.questionnaire.common.Constans;
import com.aim.questionnaire.dao.entity.ProjectEntity;
import com.aim.questionnaire.service.ProjectService;

import com.github.pagehelper.PageInfo;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

/**
 * Created by wln on 2018\8\6 0006.
 */
@RestController
public class ProjectController {

    private final Logger logger = LoggerFactory.getLogger(ProjectController.class);

    @Autowired
    private ProjectService projectService;


    /**
     * 查询全部项目的信息
     * @param projectEntity
     * @return
     */
    @RequestMapping(value = "/queryProjectList",method = RequestMethod.POST, headers = "Accept=application/json")
    public HttpResponseEntity queryProjectList(@RequestBody(required = false) Map<String,Object> map) {
        HttpResponseEntity httpResponseEntity = new HttpResponseEntity();
        PageInfo<Map<String,Object>> pageInfo = projectService.queryProjectList(map);
        httpResponseEntity.setMessage(Constans.SUCCESS_CODE);
        httpResponseEntity.setData(pageInfo);
        httpResponseEntity.setCode(Constans.SUCCESS_CODE);
        return httpResponseEntity;
    }

    /**
     * 根据项目id查询单个项目的信息
     * @param projectId
     * @return
     */
    @RequestMapping(value = "/getProjectInfo",method = RequestMethod.POST, headers = "Accept=application/json")
    public HttpResponseEntity getProjectInfo(@RequestBody(required = false) Map<String,Object> map) {
        String projectId = (String) map.get("projectId");
        HttpResponseEntity httpResponseEntity = new HttpResponseEntity();
        try {
            PageInfo pageInfo = projectService.getProjectInfo(projectId);
            httpResponseEntity.setMessage(Constans.SUCCESS_CODE);
            httpResponseEntity.setData(pageInfo);
            httpResponseEntity.setCode(Constans.SUCCESS_CODE);
        }
        catch (Exception e) {
            logger.info("addProjectInfo 获取项目信息>>>>>>>>>>>" + e.getLocalizedMessage());
            httpResponseEntity.setCode(Constans.EXIST_CODE);
            httpResponseEntity.setMessage(Constans.EXIST_MESSAGE);
        }
        return httpResponseEntity;
    }













    /**
     * 根据id删除项目
     * @param projectEntity
     * @return
     */
    @RequestMapping(value = "/deleteProjectById",method = RequestMethod.POST, headers = "Accept=application/json")
    public HttpResponseEntity deleteProjectById(@RequestBody ProjectEntity projectEntity) {
        HttpResponseEntity httpResponseEntity = new HttpResponseEntity();
        try {
            int result = projectService.deleteProjectById(projectEntity);
           if(result == 3) {

                httpResponseEntity.setCode(Constans.USER_USERNAME_CODE);
                httpResponseEntity.setMessage(Constans.PROJECST_STATUS_DELETFAIL);
            }else {
                httpResponseEntity.setMessage(Constans.DELETE_MESSAGE);
                httpResponseEntity.setCode(Constans.SUCCESS_CODE);
            }
        } catch (Exception e) {
            httpResponseEntity.setMessage(Constans.EXIST_MESSAGE);
            logger.info("deleteProjectInfo 删除项目>>>>>>>>>" + e.getLocalizedMessage());
            httpResponseEntity.setCode(Constans.EXIST_CODE);
        }

        return httpResponseEntity;
    }

    /**
     * 添加项目
     * @param projectEntity
     * @return
     */
    @RequestMapping(value = "/addProjectInfo",method = RequestMethod.POST, headers = "Accept=application/json")
    public HttpResponseEntity addProjectInfo(@RequestBody Map<String,Object> map) {
        HttpResponseEntity httpResponseEntity = new HttpResponseEntity();
        try {
            String user = (String) map.get("createdBy");
            ProjectEntity projectEntity = new ProjectEntity();
            projectEntity.setProjectName((String) map.get("projectName"));
            projectEntity.setProjectContent((String) map.get("projectContent"));
            int result = projectService.addProjectInfo(projectEntity,user);
            if(result==3){
                httpResponseEntity.setCode(Constans.EXIST_CODE);
                httpResponseEntity.setMessage("项目名称已存在，不能创建同名项目");
            }else{
                httpResponseEntity.setCode(Constans.SUCCESS_CODE);
                httpResponseEntity.setMessage(Constans.ADD_MESSAGE);
            }
        }catch (Exception e) {
            logger.info("addProjectInfo 创建项目>>>>>>>>>>>" + e.getLocalizedMessage());
            httpResponseEntity.setCode(Constans.EXIST_CODE);
            httpResponseEntity.setMessage(Constans.EXIST_MESSAGE);
        }
        return httpResponseEntity;
    }

    /**
     * 根据项目id修改项目
     * @param projectEntity
     * @return
     */
    @RequestMapping(value = "/modifyProjectInfo",method = RequestMethod.POST, headers = "Accept=application/json")
    public HttpResponseEntity modifyProjectInfo(@RequestBody Map<String,Object> map) {
        HttpResponseEntity httpResponseEntity = new HttpResponseEntity();
        try {

            ProjectEntity projectEntity=projectService.queryProjectNameById(map);
            String user=projectEntity.getCreatedBy();
            String projectname=(String)map.get("projectName");
            System.out.println("name:"+projectname);


           if(projectEntity.getProjectName().equals(projectname)){
               System.out.println("没改名");
               projectEntity.setProjectContent((String) map.get("projectContent"));
               projectService.modifyProjectInfo(projectEntity,user,0);

               httpResponseEntity.setCode(Constans.SUCCESS_CODE);
               httpResponseEntity.setMessage(Constans.ADD_MESSAGE);
               return httpResponseEntity;
           }


            System.out.println("改名");

            projectEntity.setProjectName(projectname);


            projectEntity.setProjectContent((String) map.get("projectContent"));

            int result = projectService.modifyProjectInfo(projectEntity,user,1);

            if(result==4){
                httpResponseEntity.setCode(Constans.EXIST_CODE);
                httpResponseEntity.setMessage(Constans.PROJECST_STATUS_EXISTOPENEDQUESTIONNAIRE);
            }
            else if(result==3){
                httpResponseEntity.setCode(Constans.EXIST_CODE);
                httpResponseEntity.setMessage(Constans.PROJECST_STATUS_EXIST);
            }else if(result!=3&&result!=4){
                httpResponseEntity.setCode(Constans.SUCCESS_CODE);
                httpResponseEntity.setMessage(Constans.ADD_MESSAGE);
            }
        }catch (Exception e) {
            logger.info("-modifyProjectInfo更新项目>>>>>>>>>>>" + e.getLocalizedMessage());
            httpResponseEntity.setCode(Constans.EXIST_CODE);
            httpResponseEntity.setMessage(Constans.EXIST_MESSAGE);
        }
        return httpResponseEntity;
    }



    /**
     * 查询全部项目的名字接口
     * @return
     */
    @RequestMapping(value = "/queryAllProjectName",method = RequestMethod.POST, headers = "Accept=application/json")
    public HttpResponseEntity queryAllProjectName() {
        HttpResponseEntity httpResponseEntity = new HttpResponseEntity();
          
        return httpResponseEntity;
    }
}
