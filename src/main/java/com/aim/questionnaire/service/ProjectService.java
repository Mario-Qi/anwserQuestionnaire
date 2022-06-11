package com.aim.questionnaire.service;

import com.aim.questionnaire.common.utils.DateUtil;
import com.aim.questionnaire.common.utils.UUIDUtil;
import com.aim.questionnaire.dao.ProjectEntityMapper;
import com.aim.questionnaire.dao.entity.ProjectEntity;
import com.github.pagehelper.PageInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

/**
 * Created by wln on 2018\8\6 0006.
 */
@Service
public class ProjectService {

    @Autowired
    private ProjectEntityMapper projectEntityMapper;


    /**
     * 添加项目
     * @param projectEntity
     * @return
     */
    public int addProjectInfo(ProjectEntity projectEntity,String user) {
        
        return 0;
    }

    /**
     * 修改项目
     * @param projectEntity
     * @return
     */
    public int modifyProjectInfo(ProjectEntity projectEntity,String user) {
       
        return 0;
    }

    /**
     * 删除项目
     * @param projectEntity
     * @return
     */
    public int deleteProjectById(ProjectEntity projectEntity) {
       
        return 0;
    }

    /**
     * 查询项目列表
     * @param projectEntity
     * @return
     */
    public PageInfo<Map<String, Object>> queryProjectList(ProjectEntity projectEntity) {
        List<Map<String,Object>> projectemapList = projectEntityMapper.queryProjectList(projectEntity);
        PageInfo<Map<String,Object>> pageInfo = new PageInfo<>(projectemapList);
        return pageInfo;
    }

    /**
     * 查询全部项目的名字接口
     * @return
     */
    public List<Map<String,Object>> queryAllProjectName() {
        return null;
    }
}
