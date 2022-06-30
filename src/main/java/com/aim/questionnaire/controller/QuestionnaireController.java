package com.aim.questionnaire.controller;


import com.aim.questionnaire.beans.HttpResponseEntity;
import com.aim.questionnaire.common.Constans;
import com.aim.questionnaire.common.utils.UUIDUtil;
import com.aim.questionnaire.dao.QuestionnaireEntityMapper;
import com.aim.questionnaire.dao.UserEntityMapper;
import com.aim.questionnaire.dao.entity.QuestionnaireEntity;
import com.alibaba.fastjson.JSON;
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
import java.util.List;
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
//    @RequestMapping(value = "/addQuestionnaire",method = RequestMethod.POST, headers = "Accept=application/json")
//    public HttpResponseEntity addUserInfo(@RequestBody Map<String,Object> map) {
//        HttpResponseEntity httpResponseEntity = new HttpResponseEntity();
//        try {
//            int result = questionnaireservice.addQuestionnaire((HashMap<String, Object>) map);
//            if(result == 3) {
//
//                httpResponseEntity.setCode(Constans.USER_USERNAME_CODE);
//                httpResponseEntity.setMessage(Constans.NAME_EXIT_MESSAGE);
//            }else {
//                httpResponseEntity.setMessage(Constans.ADD_MESSAGE);
//                httpResponseEntity.setCode(Constans.SUCCESS_CODE);
//            }
//        } catch (Exception e) {
//            httpResponseEntity.setMessage(Constans.EXIST_MESSAGE);
//            logger.info("addQuestionnaireInfo 创建问卷的基本信息>>>>>>>>>" + e.getLocalizedMessage());
//            httpResponseEntity.setCode(Constans.EXIST_CODE);
//        }
//        return httpResponseEntity;
//    }

    /**
     * 根据id删除问卷
     * @param QuestionnaireEntity
     * @return
     * 1
     */
//    @RequestMapping(value = "/deleteQuestionnaireById",method = RequestMethod.POST, headers = "Accept=application/json")
//    public HttpResponseEntity deleteProjectById(String id) {
//        HttpResponseEntity httpResponseEntity = new HttpResponseEntity();
//
//        try {
//            int result = questionnaireservice.deleteByPrimaryKey(id);
//            if(result == 3) {
//                httpResponseEntity.setCode(Constans.USER_USERNAME_CODE);
//                httpResponseEntity.setMessage(Constans.USER_USERNAME_MESSAGE);
//            }else {
//                httpResponseEntity.setMessage(Constans.DELETE_MESSAGE);
//                httpResponseEntity.setCode(Constans.SUCCESS_CODE);
//            }
//        } catch (Exception e) {
//            httpResponseEntity.setMessage(Constans.EXIST_MESSAGE);
//            logger.info("deleteQuestionnaireInfo 删除问卷>>>>>>>>>" + e.getLocalizedMessage());
//            httpResponseEntity.setCode(Constans.EXIST_CODE);
//        }
//
//        return httpResponseEntity;
//    }

    /**
     * 修改问卷状态
     * @param QuestionnaireEntity
     * @return
     * 1
     */


    @RequestMapping(value = "/modifyQuestionnaireStatus",method = RequestMethod.POST, headers = "Accept=application/json")
    public HttpResponseEntity modifyQuestionnaireStatus(@RequestBody Map<String,Object> map) {
        HttpResponseEntity httpResponseEntity = new HttpResponseEntity();
      //  System.out.println("zheliddd ");
//关闭问卷
        try {
            int result = questionnaireservice.modifyQuestionnaireStatus((HashMap<String, Object>) map);
            if(result == 3) {

                httpResponseEntity.setCode(Constans.USER_USERNAME_CODE);
                httpResponseEntity.setMessage(Constans.USER_USERNAME_MESSAGE);
            }else {
                httpResponseEntity.setMessage(Constans.QUESTIONNAIRE_STATUS_CLOES);
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
                httpResponseEntity.setMessage(Constans.QUESTIONNAIRE_STATUS_OPEN);
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
     * 设置问卷起止时间
     *
     * @param map
     * @return
     */
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


    /**
     *根据项目id查询项目下的所有问卷
     */
    @RequestMapping(value = "/queryQuestionnaireByProjectID", method = RequestMethod.POST, headers = "Accept=application/json")
    public HttpResponseEntity queryQuestionnaireByProjectID(@RequestBody Map<String, Object> map) {
        HttpResponseEntity httpResponseEntity = new HttpResponseEntity();
        PageInfo pageInfo = questionnaireservice.queryQuestionnaireByProjectID(map);
        httpResponseEntity.setCode(Constans.SUCCESS_CODE);
        httpResponseEntity.setData(pageInfo);
        httpResponseEntity.setMessage(Constans.STATUS_MESSAGE);
        return httpResponseEntity;
    }

    /**
     *查询此人创建并且未关联项目的问卷
     */
    @RequestMapping(value = "/queryQuestionnaireByCreated", method = RequestMethod.POST, headers = "Accept=application/json")
    public HttpResponseEntity queryQuestionnaireByCreated(@RequestBody Map<String, Object> map) {
        HttpResponseEntity httpResponseEntity = new HttpResponseEntity();
        PageInfo pageInfo = questionnaireservice.queryQuestionnaireByCreated(map);
        httpResponseEntity.setCode(Constans.SUCCESS_CODE);
        httpResponseEntity.setData(pageInfo);
        httpResponseEntity.setMessage(Constans.STATUS_MESSAGE);
        return httpResponseEntity;
    }


    /**
     *将问卷从项目中删除
     */
    @RequestMapping(value = "/removeProjectId", method = RequestMethod.POST, headers = "Accept=application/json")
    public HttpResponseEntity removeProjectId(@RequestBody Map<String, Object> map) {
        HttpResponseEntity httpResponseEntity = new HttpResponseEntity();

        int result = questionnaireservice.removeProjectId(map);
        if(result ==1){
            httpResponseEntity.setCode(Constans.SUCCESS_CODE);
//            httpResponseEntity.setMessage(Constans.DELETE_MESSAGE);
        }
        else {
            httpResponseEntity.setMessage(Constans.MODEL_DELETE_FAIL);
        }

        return httpResponseEntity;
    }

    /**
     * 将1个问卷与项目关联
     * @param
     * @return
     */

    @RequestMapping(value = "/addProjectId", method = RequestMethod.POST, headers = "Accept=application/json")
    public HttpResponseEntity addProjectId(@RequestBody Map<String, Object> map) {
        HttpResponseEntity httpResponseEntity = new HttpResponseEntity();

        int result = questionnaireservice.addProjectId(map);
        if(result ==1){
            httpResponseEntity.setCode(Constans.SUCCESS_CODE);
//            httpResponseEntity.setMessage(Constans.DELETE_MESSAGE);
        }
        else {
            httpResponseEntity.setMessage(Constans.QUEST_MOTIFY_FAIL);
        }

        return httpResponseEntity;
    }



    /**
     * 根据问卷id查询问卷的详细信息
     * @param
     * @return
     */
    @RequestMapping(value = "/queryQuestionnaireById", method = RequestMethod.POST, headers = "Accept=application/json")
    public HttpResponseEntity queryQuestionnaireById(@RequestBody Map<String, Object> map) {
        HttpResponseEntity httpResponseEntity = new HttpResponseEntity();
        try {
            httpResponseEntity.setData(questionnaireservice.queryQuestionnaireById(String.valueOf(map.get("questionId"))));
            httpResponseEntity.setCode(Constans.SUCCESS_CODE);
        } catch (Exception e) {
            httpResponseEntity.setMessage(Constans.EXIST_MESSAGE);
            logger.info("deleteQuestionnaireInfo 查询问卷信息>>>>>>>>>" + e.getLocalizedMessage());
            httpResponseEntity.setCode(Constans.EXIST_CODE);
        }

        return httpResponseEntity;
    }

    /**
     * 查询历史问卷
     * @param map
     * @return
     */
    @RequestMapping(value = "/queryHistoryQuestionnaire", method = RequestMethod.POST, headers = "Accept=application/json")
    public HttpResponseEntity queryHistoryQuestionnaire(@RequestBody Map<String, Object> map) {
        HttpResponseEntity httpResponseEntity = new HttpResponseEntity();

        httpResponseEntity.setData(questionnaireservice.queryHistoryQuestionnaire((HashMap<String, Object>) map));
        httpResponseEntity.setCode(Constans.SUCCESS_CODE);

        return httpResponseEntity;
    }


    /**
     * 查询问卷模板
     * @param map
     * @return
     */
    @RequestMapping(value = "/queryQuestionnaireMould", method = RequestMethod.POST, headers = "Accept=application/json")
    public HttpResponseEntity queryQuestionnaireMould(@RequestBody Map<String, Object> map) {
        HttpResponseEntity httpResponseEntity = new HttpResponseEntity();

        List<Map<String, Object>> list = questionnaireservice.queryQuestionnaireMould((String) map.get("dataId"));

        httpResponseEntity.setData(list);
        httpResponseEntity.setCode(Constans.SUCCESS_CODE);

        return httpResponseEntity;
    }

    /**
     * 添加问卷
     * @param map
     * @return
     */
    @RequestMapping(value = "/addQuestionnaire", method = RequestMethod.POST, headers = "Accept=application/json")
    public HttpResponseEntity addQuestionnaire(@RequestBody Map<String, Object> map) {
        HttpResponseEntity httpResponseEntity = new HttpResponseEntity();
        try {
            String id = UUIDUtil.getOneUUID();
            map.put("id",id);
            int result =  questionnaireservice.addQuestionnaire((HashMap<String, Object>) map);
            if(result ==1){
                httpResponseEntity.setData(id);
                httpResponseEntity.setCode(Constans.SUCCESS_CODE);
                httpResponseEntity.setMessage(Constans.ADD_MESSAGE);
            }
            else {
                httpResponseEntity.setMessage(Constans.QUEST_MOTIFY_FAIL);
            }
        } catch (Exception e) {
            httpResponseEntity.setMessage(Constans.EXIST_MESSAGE);
            logger.info("deleteQuestionnaireInfo 添加问卷>>>>>>>>>" + e.getLocalizedMessage());
            httpResponseEntity.setCode(Constans.EXIST_CODE);
        }

        return httpResponseEntity;
    }

    /**
     * 删除问卷
     * @param map
     * @return
     */
    @RequestMapping(value = "/deleteQuestionnaireById", method = RequestMethod.POST, headers = "Accept=application/json")
    public HttpResponseEntity deleteByPrimaryKey(@RequestBody Map<String, Object> map) {
        HttpResponseEntity httpResponseEntity = new HttpResponseEntity();

        int result = questionnaireservice.deleteByPrimaryKey((String) map.get("modalId"));

        if(result==1){
            httpResponseEntity.setCode(Constans.SUCCESS_CODE);
        }

        return httpResponseEntity;
    }

    /**
     * 根据问卷id修改问卷
     * @param questionnaireEntity
     * @return
     */
    @RequestMapping(value = "/modifyQuestionnaireInfo", method = RequestMethod.POST, headers = "Accept=application/json")
    public HttpResponseEntity modifyQuestionnaireInfo(@RequestBody QuestionnaireEntity questionnaireEntity) {
        HttpResponseEntity httpResponseEntity = new HttpResponseEntity();

        int result = questionnaireservice.modifyQuestionnaireInfo(questionnaireEntity);

        if(result==1){
            httpResponseEntity.setCode(Constans.SUCCESS_CODE);
            httpResponseEntity.setMessage(Constans.QUEST_MOTIFY_SUCCESS);
        }

        return httpResponseEntity;
    }

    /**
     * 根据问卷id修改问卷所有信息
     * @param
     * @return
     */
    @RequestMapping(value = "/modifyQuestionnaire", method = RequestMethod.POST, headers = "Accept=application/json")
    public HttpResponseEntity modifyQuestionnaire(@RequestBody Map<String, Object> map) {
        HttpResponseEntity httpResponseEntity = new HttpResponseEntity();

        map.put("questionList" , JSON.toJSONString(map.get("questionList")));
        int result = questionnaireservice.modifyQuestionnaire((HashMap<String, Object>) map);

        if(result==1){
            httpResponseEntity.setCode(Constans.SUCCESS_CODE);
            httpResponseEntity.setMessage(Constans.QUEST_MOTIFY_SUCCESS);
        }

        return httpResponseEntity;
    }

}

