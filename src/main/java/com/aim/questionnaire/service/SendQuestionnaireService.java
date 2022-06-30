package com.aim.questionnaire.service;

import com.aim.questionnaire.dao.QuestionnaireEntityMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class SendQuestionnaireService {

    @Autowired
    private QuestionnaireEntityMapper questionnaireEntityMapper;

    public String sendByQQ(Map<String,Object> map){
        List<Map<String,String>> studentList = (List<Map<String, String>>)map.get("studentsData");
        for(Map<String,String> m : studentList){
            String qq = String.valueOf(m.get("studentQQNum"));
            //发送问卷
            motitifyReleaseStatutsById((String)map.get("questionId"));
        }
        String str = "通过QQ发送成功";
        return str;
    }

    public String sendByWeiXin(Map<String,Object> map){
        List<Map<String,String>> studentList = (List<Map<String, String>>)map.get("studentsData");
        for(Map<String,String> m : studentList){
            String qq = m.get("studentWeiNum");
            //发送问卷
            motitifyReleaseStatutsById((String)map.get("questionId"));
        }
        String str = "通过微信发送成功";
        return str;
    }

    public String sendByEmail(Map<String,Object> map){
        List<Map<String,String>> studentList = (List<Map<String, String>>)map.get("studentsData");
        for(Map<String,String> m : studentList){
            String qq = m.get("studentEmail");
            //发送问卷
            motitifyReleaseStatutsById((String)map.get("questionId"));
        }
        String str = "通过邮箱发送成功";
        return str;
    }

    public void motitifyReleaseStatutsById(String id){
        HashMap<String,Object> map = new HashMap<>();
        map.put("id",id);
        map.put("releaseStatues",1);
        map.put("releaseTime",new Date());
        questionnaireEntityMapper.modifyReleaseStatueById(map);
    }
}
