package com.aim.questionnaire.service;

import com.aim.questionnaire.dao.QuestionnaireEntityMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;

@Service
public class QuestionnaireService {

    @Autowired
    private QuestionnaireEntityMapper questionnaireEntityMapper;

    public int addQuestionnaire(HashMap<String, Object> map){
        questionnaireEntityMapper.addQuestionnaire(map);
        return 1;
    }

    public int deleteByPrimaryKey(String id){
        questionnaireEntityMapper.deleteByPrimaryKey(id);
        return 1;
    }

}

