package com.aim.questionnaire.controller;


import com.aim.questionnaire.beans.HttpResponseEntity;
import com.aim.questionnaire.common.Constans;
import com.aim.questionnaire.dao.QuestionnaireEntityMapper;
import com.aim.questionnaire.dao.UserEntityMapper;
import com.github.pagehelper.PageInfo;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import com.aim.questionnaire.service.QuestionnaireService;

import java.text.SimpleDateFormat;
import java.util.HashMap;
import java.util.Map;

@RestController

public class QuestionnaireController {
    private final Logger logger = LoggerFactory.getLogger(ProjectController.class);

    @Autowired
    private QuestionnaireService questionnaireservice;


    @Autowired
    private QuestionnaireEntityMapper questionnaireEntityMapper;

    /**
     * 创建问卷
     * @param map
     * @return
     */
    @RequestMapping(value = "/addQuestionnaire",method = RequestMethod.POST, headers = "Accept=application/json")
    public HttpResponseEntity addUserInfo(@RequestBody Map<String,Object> map) {
        HttpResponseEntity httpResponseEntity = new HttpResponseEntity();
        try {
            int result = questionnaireservice.addQuestionnaire((HashMap<String, Object>) map);
            if(result == 3) {

                httpResponseEntity.setCode(Constans.USER_USERNAME_CODE);
                httpResponseEntity.setMessage(Constans.NAME_EXIT_MESSAGE);
            }else {
                httpResponseEntity.setMessage(Constans.ADD_MESSAGE);
                httpResponseEntity.setCode(Constans.SUCCESS_CODE);
            }
        } catch (Exception e) {
            httpResponseEntity.setMessage(Constans.EXIST_MESSAGE);
            logger.info("addQuestionnaireInfo 创建问卷的基本信息>>>>>>>>>" + e.getLocalizedMessage());
            httpResponseEntity.setCode(Constans.EXIST_CODE);
        }
        return httpResponseEntity;
    }

    /**
     * 根据id删除问卷
     * @param QuestionnaireEntity
     * @return
     * 1
     */
    @RequestMapping(value = "/deleteQuestionnaireById",method = RequestMethod.POST, headers = "Accept=application/json")
    public HttpResponseEntity deleteProjectById(String id) {
        HttpResponseEntity httpResponseEntity = new HttpResponseEntity();

        try {
            int result = questionnaireservice.deleteByPrimaryKey(id);
            if(result == 3) {
                httpResponseEntity.setCode(Constans.USER_USERNAME_CODE);
                httpResponseEntity.setMessage(Constans.USER_USERNAME_MESSAGE);
            }else {
                httpResponseEntity.setMessage(Constans.DELETE_MESSAGE);
                httpResponseEntity.setCode(Constans.SUCCESS_CODE);
            }
        } catch (Exception e) {
            httpResponseEntity.setMessage(Constans.EXIST_MESSAGE);
            logger.info("deleteQuestionnaireInfo 删除问卷>>>>>>>>>" + e.getLocalizedMessage());
            httpResponseEntity.setCode(Constans.EXIST_CODE);
        }

        return httpResponseEntity;
    }

    /**
     * 修改问卷状态
     * @param QuestionnaireEntity
     * @return
     * 1
     */


    @RequestMapping(value = "/modifyQuestionnaireStatus",method = RequestMethod.POST, headers = "Accept=application/json")
    public HttpResponseEntity modifyQuestionnaireStatus(@RequestBody Map<String,Object> map) {
        HttpResponseEntity httpResponseEntity = new HttpResponseEntity();
        System.out.println("zheliddd ");

        try {
            int result = questionnaireservice.modifyQuestionnaireStatus((HashMap<String, Object>) map);
            if(result == 3) {

                httpResponseEntity.setCode(Constans.USER_USERNAME_CODE);
                httpResponseEntity.setMessage(Constans.USER_USERNAME_MESSAGE);
            }else {
                httpResponseEntity.setMessage(Constans.UPDATE_MESSAGE);
                httpResponseEntity.setCode(Constans.SUCCESS_CODE);
            }
        } catch (Exception e) {
            httpResponseEntity.setMessage(Constans.EXIST_MESSAGE);
            logger.info("deleteQuestionnaireInfo 更改问卷>>>>>>>>>" + e.getLocalizedMessage());
            httpResponseEntity.setCode(Constans.EXIST_CODE);
        }

        return httpResponseEntity;
    }



    /**
     * 修改问卷状态
     * @param QuestionnaireEntity
     * @return
     * 1
     */

    @RequestMapping(value = "/modifyQuestionnaireStatus1",method = RequestMethod.POST, headers = "Accept=application/json")
    public HttpResponseEntity modifyQuestionnaireStatus1(@RequestBody Map<String,Object> map) {
        HttpResponseEntity httpResponseEntity = new HttpResponseEntity();


        try {
            int result = questionnaireservice.modifyQuestionnaireStatus1((HashMap<String, Object>) map);
            if (result == 3) {

                httpResponseEntity.setCode(Constans.USER_USERNAME_CODE);
                httpResponseEntity.setMessage(Constans.USER_USERNAME_MESSAGE);
            } else {
                httpResponseEntity.setMessage(Constans.UPDATE_MESSAGE);
                httpResponseEntity.setCode(Constans.SUCCESS_CODE);
            }
        } catch (Exception e) {
            httpResponseEntity.setMessage(Constans.EXIST_MESSAGE);
            logger.info("deleteQuestionnaireInfo 更改问卷>>>>>>>>>" + e.getLocalizedMessage());
            httpResponseEntity.setCode(Constans.EXIST_CODE);
        }

        return httpResponseEntity;

    }




    @RequestMapping(value = "/motifyTimeOfQuestionnaire",method = RequestMethod.POST, headers = "Accept=application/json")
    public HttpResponseEntity motifyTime(@RequestBody Map<String,Object> map){
        HttpResponseEntity httpResponseEntity = new HttpResponseEntity();
        int count = questionnaireservice.mofityTimebyQuestionnaireId((HashMap<String, Object>) map);
        if(count==1) {
            httpResponseEntity.setCode(Constans.SUCCESS_CODE);
            httpResponseEntity.setMessage(Constans.QUEST_MOTIFY_SUCCESS);
        }else
            httpResponseEntity.setCode(Constans.QUEST_MOTIFY_CODE);
        httpResponseEntity.setMessage(Constans.QUEST_MOTIFY_FAIL);
        return httpResponseEntity;
    }




    /**
     * 查询问卷列表（模糊搜索）
     *
     * @param map
     * @return
     */
    @RequestMapping(value = "/queryQuestionnaireList", method = RequestMethod.POST, headers = "Accept=application/json")
    public HttpResponseEntity queryQuestionnaireList(@RequestBody Map<String, Object> map) {
        HttpResponseEntity httpResponseEntity = new HttpResponseEntity();
        PageInfo pageInfo = questionnaireservice.queryQuestionnaireList(map);
        httpResponseEntity.setCode(Constans.SUCCESS_CODE);
        httpResponseEntity.setData(pageInfo);
        httpResponseEntity.setMessage(Constans.STATUS_MESSAGE);
        return httpResponseEntity;
    }




}

