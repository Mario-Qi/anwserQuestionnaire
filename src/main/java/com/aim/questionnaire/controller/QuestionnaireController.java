package com.aim.questionnaire.controller;


import com.aim.questionnaire.beans.HttpResponseEntity;
import com.aim.questionnaire.common.Constans;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
public class QuestionnaireController {
    private final Logger logger = LoggerFactory.getLogger(ProjectController.class);

    @Autowired
    private QuestionnaireService questionnaireservice;


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





}

