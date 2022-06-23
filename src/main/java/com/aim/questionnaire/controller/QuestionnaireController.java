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
import com.aim.questionnaire.service.QuestionnaireService;
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
    @RequestMapping(value = "/modifyHistoryQuestionnaireStatus",method = RequestMethod.POST, headers = "Accept=application/json")
    public HttpResponseEntity modifyHistoryQuestionnaireStatus(@RequestBody Map<String,Object> map) {
        HttpResponseEntity httpResponseEntity = new HttpResponseEntity();

        try {
            int result = questionnaireservice.modifyHistoryQuestionnaireStatus((HashMap<String, Object>) map);
            if(result == 3) {

                httpResponseEntity.setCode(Constans.USER_USERNAME_CODE);
                httpResponseEntity.setMessage(Constans.USER_USERNAME_MESSAGE);
            }else {
                httpResponseEntity.setMessage(Constans.DELETE_MESSAGE);
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
}

