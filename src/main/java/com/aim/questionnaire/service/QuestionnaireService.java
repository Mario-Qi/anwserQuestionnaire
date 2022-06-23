package com.aim.questionnaire.service;

import com.aim.questionnaire.dao.QuestionnaireEntityMapper;
import com.aim.questionnaire.dao.entity.QuestionnaireEntity;
import com.github.pagehelper.PageInfo;
import org.apache.ibatis.annotations.Param;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

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


    /**
     * 将问卷与项目关联
     * @param
     * @return
     */
    public void connectProject(List<String> list, String projectId){
        for(String id : list){
            HashMap<String, Object> map = new HashMap<>();
            map.put("id",id);
            map.put("projectId", projectId);
            questionnaireEntityMapper.addProjectId(map);
        }
    }

    /**
     * 查询此人创建的所有问卷
     * @param map
     * @return
     */
    public PageInfo queryAllQuestionnaireByCreated(Map<String,Object> map) {
        PageInfo pageInfo = new PageInfo();
        pageInfo.setPageNum((Integer) map.get("pageNum"));
        pageInfo.setPageSize((Integer) map.get("pageSize"));
        List<Map<String,Object>> resultList = questionnaireEntityMapper.queryAllQuestionnaireByCreated(map);
        pageInfo.setList(resultList);
//        int total = userEntityMapper.getTotalCount((String) map.get("userName"));
//        pageInfo.setTotal(total);
        return pageInfo;
    }


    /**
     * 查询此人创建并且未关联项目的问卷
     * @param map
     * @return
     */
    public PageInfo queryQuestionnaireByCreated(Map<String,Object> map) {
        PageInfo pageInfo = new PageInfo();
        pageInfo.setPageNum((Integer) map.get("pageNum"));
        pageInfo.setPageSize((Integer) map.get("pageSize"));
        List<Map<String,Object>> resultList = questionnaireEntityMapper.queryQuestionnaireByCreated(map);
        pageInfo.setList(resultList);
//        int total = userEntityMapper.getTotalCount((String) map.get("userName"));
//        pageInfo.setTotal(total);
        return pageInfo;
    }


    /**
     *根据项目id查询项目下的所有问卷
     */
    public List<Map<String,Object>> queryQuestionnaireByProjectID(@Param("id") String id){
        return questionnaireEntityMapper.queryQuestionnaireByProjectID(id);
    }

    /**
     *根据项目id查询项目下的所有开放问卷
     */
    public int queryopenedQuestionnaireByProjectID(@Param("id") String id){
        return questionnaireEntityMapper.queryopenedQuestionnaireByProjectID(id);
    }


    /**
     * 修改问卷状态
     * @param map
     * @return
     */
    public int modifyQuestionnaireStatus(HashMap<String, Object> map){
        questionnaireEntityMapper.modifyQuestionnaireStatus(map);
        return 1;
    }


    /**
     * 根据项目id查询发布中问卷数量
     * @return
     */
    public int queryReleaseQuestionnaireCount(String projectId){
        return questionnaireEntityMapper.queryReleaseQuestionnaireCount(projectId);
    }

    public int modifyHistoryQuestionnaireStatus(HashMap<String, Object> map){
        questionnaireEntityMapper.modifyHistoryQuestionnaireStatus(map);
        return 1;

    }


}

