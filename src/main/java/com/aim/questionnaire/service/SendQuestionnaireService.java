package com.aim.questionnaire.service;

import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class SendQuestionnaireService {
    public String sendByQQ(Map<String,Object> map){
        List<Map<String,String>> studentList = (List<Map<String, String>>)map.get("studentsData");
        for(Map<String,String> m : studentList){
            String qq = String.valueOf(m.get("studentQQNum"));
            //发送问卷
        }
        return "通过QQ发送成功";
    }

    public String sendByWeiXin(Map<String,Object> map){
        List<Map<String,String>> studentList = (List<Map<String, String>>)map.get("studentsData");
        for(Map<String,String> m : studentList){
            String qq = m.get("studentWeiNum");
            //发送问卷
        }
        return "通过微信发送成功";
    }

    public String sendByEmail(Map<String,Object> map){
        List<Map<String,String>> studentList = (List<Map<String, String>>)map.get("studentsData");
        for(Map<String,String> m : studentList){
            String qq = m.get("studentEmail");
            //发送问卷
        }
        return "通过邮箱发送成功";
    }
}
