package com.aim.questionnaire.controller;

import com.aim.questionnaire.beans.HttpResponseEntity;
import com.aim.questionnaire.service.SendQuestionnaireService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;
@RestController
public class SendQuestionnaireController {

    @Autowired
    private SendQuestionnaireService sendQuestionnaireservice;

    @RequestMapping(value = "/addSendQuestionnaire",method = RequestMethod.POST, headers = "Accept=application/json")
    public HttpResponseEntity queryProjectList(@RequestBody(required = false) Map<String,Object> map){
        HttpResponseEntity httpResponseEntity = new HttpResponseEntity();
        int type = (Integer) map.get("sendType");
        String message = "";
        if(type==0){
            message = sendQuestionnaireservice.sendByQQ(map);
        }
        else if(type==1){
            message = sendQuestionnaireservice.sendByWeiXin(map);
        }
        else if(type==2){
            message = sendQuestionnaireservice.sendByEmail(map);
        }
        httpResponseEntity.setMessage(message);
        httpResponseEntity.setCode("666");
        return httpResponseEntity;
    }
}
