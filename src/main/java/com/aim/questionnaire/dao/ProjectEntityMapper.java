package com.aim.questionnaire.dao;

import com.aim.questionnaire.dao.entity.ProjectEntity;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public interface ProjectEntityMapper {

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table project_info
     *
     * @mbg.generated
     */
    int insert(ProjectEntity record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table project_info
     *
     * @mbg.generated
     */
    int insertSelective(ProjectEntity record);


    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table project_info
     *
     * @mbg.generated
     */
    int updateByPrimaryKeySelective(ProjectEntity record);


    /**
     * 根据项目id删除项目
     * @param id
     * @return
     */
    int deleteProjectById(String id);

    /**
     * 查询项目列表
     * @param
     * @return
     */
    List<Map<String,Object>> queryProjectList(Map<String,Object> map);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table project_info
     * @mbg.generated
     */
    ProjectEntity queryProjectNameById(Map<String,Object> map);

    /**
     * 查询全部项目的名字接口
     * @return
     */
    List<Map<String,Object>> queryAllProjectName();
    /**
     * 获取项目信息
     * @return
     */
    Map<String,Object> getProjectInfo(@Param("id") String projectId);

    /**
     * 查询项目是否重名
     * @return
     */

    int queryExistProject(String projectName);
}