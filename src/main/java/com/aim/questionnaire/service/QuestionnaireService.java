package com.aim.questionnaire.service;

import com.aim.questionnaire.common.utils.DateUtil;
import com.aim.questionnaire.common.utils.UUIDUtil;
import com.aim.questionnaire.dao.QuestionnaireEntityMapper;
import com.aim.questionnaire.dao.entity.QuestionnaireEntity;
import com.alibaba.fastjson.TypeReference;
import com.github.pagehelper.PageInfo;
import org.apache.ibatis.annotations.Param;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.alibaba.fastjson.JSON;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class QuestionnaireService {

    @Autowired
    private QuestionnaireEntityMapper questionnaireEntityMapper;

    /**
     * 查询历史问卷
     * @param map
     * @return
     */
    public List<Map<String,Object>> queryHistoryQuestionnaire(HashMap<String, Object> map){
        return questionnaireEntityMapper.queryHistoryQuestionnaire(map);
    }


    /**
     * 查询问卷模板
     * @param dataId
     * @return
     */
    public List<Map<String,Object>> queryQuestionnaireMould(String dataId){
        return questionnaireEntityMapper.queryQuestionnaireMould(dataId);
    }

    /**
     * 添加问卷
     * @param map
     * @return
     */
    public String addQuestionnaire(HashMap<String, Object> map){

        String id = UUIDUtil.getOneUUID();
        map.put("id",id);

        String startTimeStr = map.get("startTime").toString();
        String endTimeStr = map.get("endTime").toString();
        Date startTime = DateUtil.getMyTime(startTimeStr);
        Date endTime = DateUtil.getMyTime(endTimeStr);
        map.put("startTime",startTime);
        map.put("endTime",endTime);
        questionnaireEntityMapper.addQuestionnaire(map);
        return id;
    }

    /**
     * 通过id删除问卷
     * @param
     * @return
     */
    public int deleteByPrimaryKey(String id){
        questionnaireEntityMapper.deleteByPrimaryKey(id);
        return 1;
    }

    /**
     * 根据问卷id修改问卷
     * @param questionnaireEntity
     * @return
     */
    public int modifyQuestionnaireInfo(QuestionnaireEntity questionnaireEntity){
        questionnaireEntityMapper.modifyQuestionnaireInfo(questionnaireEntity);
        return 1;
    }

    /**
     * 根据问卷id修改问卷
     * @param map
     * @return
     */
    public int modifyQuestionnaire(HashMap<String, Object> map){
        questionnaireEntityMapper.modifyQuestionnaire(map);
        return 1;
    }

    /**
     * 将多个问卷与项目关联
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
     * 将1个问卷与项目关联
     * @param
     * @return
     */

    public int addProjectId(Map<String,Object> map){
        questionnaireEntityMapper.addProjectId(map);
        return 1;
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
    public PageInfo queryQuestionnaireByProjectID(Map<String,Object> map){
        PageInfo pageInfo = new PageInfo();
        pageInfo.setPageNum((Integer) map.get("pageNum"));
        pageInfo.setPageSize((Integer) map.get("pageSize"));
        String projectId = (String) map.get("projectId");
        List<Map<String,Object>> resultList = questionnaireEntityMapper.queryQuestionnaireByProjectID1(projectId);
        pageInfo.setList(resultList);
//        int total = userEntityMapper.getTotalCount((String) map.get("userName"));
//        pageInfo.setTotal(total);
        return pageInfo;
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

    public int modifyQuestionnaireStatus1(HashMap<String, Object> map) {
        questionnaireEntityMapper.modifyQuestionnaireStatus1(map);
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

    /**
     *通过问卷Id修改问卷起止时间
     */
    public int mofityTimebyQuestionnaireId(HashMap<String, Object> map){
        map.put("startTime",new Date(Long.valueOf(String.valueOf(map.get("startTime")))));
        map.put("stopTime",new Date(Long.valueOf(String.valueOf(map.get("stopTime")))));
        return questionnaireEntityMapper.modifyQuestionnaireTime(map);
    }

    /**
     * 查询问卷列表（模糊搜索）
     * @param map
     * @return
     */
    public PageInfo queryQuestionnaireList(Map<String,Object> map) {
        PageInfo pageInfo = new PageInfo();
        //System.out.println(map.get("pageNum"));
        pageInfo.setPageNum((Integer) map.get("pageNum"));
        pageInfo.setPageSize((Integer) map.get("pageSize"));
        List<Map<String,Object>> resultList = questionnaireEntityMapper.queryQuestionnaireList(map);
        pageInfo.setList(resultList);
        int total = questionnaireEntityMapper.getTotalCount((String) map.get("questionName"));//

        pageInfo.setTotal(total);
        return pageInfo;
    }

    /**
     * 将问卷从项目中删除
     * @param map
     * @return
     */
    public int removeProjectId(Map<String, Object> map){
        questionnaireEntityMapper.removeProjectId(map);
        return 1;
    }


    /**
     * 根据问卷id查询问卷的详细信息
     * @param
     * @return
     */
    public Map<String,Object> queryQuestionnaireById(String id){
        Map<String,Object> resultMap = questionnaireEntityMapper.queryQuestionnaireById(id);
        if(resultMap.get("questionList")!=null){
            String json = (String) resultMap.get("questionList");
            List<Map<String,Object>> questionList = JSON.parseObject(json, new TypeReference<List<Map<String, Object>>>() {});
            resultMap.put("questionList",questionList);
        }
        return resultMap;
    }


}

