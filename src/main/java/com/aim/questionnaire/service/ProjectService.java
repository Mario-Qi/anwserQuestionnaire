package com.aim.questionnaire.service;

import com.aim.questionnaire.common.utils.DateUtil;
import com.aim.questionnaire.common.utils.UUIDUtil;
import com.aim.questionnaire.dao.ProjectEntityMapper;
import com.aim.questionnaire.dao.UserEntityMapper;
import com.aim.questionnaire.dao.entity.ProjectEntity;
import com.github.pagehelper.PageInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.*;

/**
 * Created by wln on 2018\8\6 0006.
 */
@Service
public class ProjectService {

    @Autowired
    private ProjectEntityMapper projectEntityMapper;
    @Autowired
    private UserEntityMapper userEntityMapper;



    /**
     * 添加项目
     * @param projectEntity
     * @return
     */
    public int addProjectInfo(ProjectEntity projectEntity,String username) {
        String userId = userEntityMapper.selectIdByName(username);
        if(userId.isEmpty()){
            //用户不存在或用户id为空
            System.out.println("333");
            return 3;
        }

        String id = UUIDUtil.getOneUUID();
        projectEntity.setId(id);
        //创建时间
        Date date = DateUtil.getCreateTime();
        projectEntity.setCreationDate(date);
        projectEntity.setLastUpdateDate(date);
        //创建人
        projectEntity.setCreatedBy(username);
        projectEntity.setLastUpdatedBy(username);
        //创建人ID
        projectEntity.setUserId(userId);

       // System.out.println("123");
        int result = projectEntityMapper.insert(projectEntity);

        return result;
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

        String id=projectEntity.getId();//null
        int result=projectEntityMapper.deleteProjectById(id);
        return result;
    }

    /**
     * 查询项目列表
     * @param map
     * @return
     */
    public PageInfo<Map<String, Object>> queryProjectList(Map<String,Object> map) {
        List<Map<String,Object>> projectemapList = projectEntityMapper.queryProjectList(map);
        PageInfo pageInfo = new PageInfo();
        pageInfo.setList(projectemapList);
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
