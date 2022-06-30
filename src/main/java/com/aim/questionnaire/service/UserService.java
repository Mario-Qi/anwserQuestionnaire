package com.aim.questionnaire.service;

import com.aim.questionnaire.common.utils.DateUtil;
import com.aim.questionnaire.common.utils.UUIDUtil;
//import com.aim.questionnaire.config.shiro.SysUserService;
//import com.aim.questionnaire.config.shiro.entity.UserOnlineBo;
import com.aim.questionnaire.dao.QuestionnaireEntityMapper;
import com.aim.questionnaire.dao.UserEntityMapper;
import com.aim.questionnaire.dao.entity.UserEntity;
//import com.alibaba.fastjson.JSONArray;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import org.apache.commons.codec.digest.DigestUtils;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.session.Session;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

//import javax.xml.ws.Action;
import java.io.UnsupportedEncodingException;
import java.util.*;

/**
 * Created by wln on 2018\8\9 0009.
 */
@Service
public class UserService {

    @Autowired
    private UserEntityMapper userEntityMapper;

    //@Autowired
    //private SysUserService sysUserService;

    @Autowired
    private QuestionnaireEntityMapper questionnaireEntityMapper;

    /**
     * 查询用户列表（模糊搜索）
     * @param map
     * @return
     */
    public PageInfo queryUserList(Map<String,Object> map) {
        PageInfo pageInfo = new PageInfo();
        pageInfo.setPageNum((Integer) map.get("pageNum"));
        pageInfo.setPageSize((Integer) map.get("pageSize"));
        List<Map<String,Object>> list = userEntityMapper.queryUserList(map);
        List<Map<String,Object>> resultList = new ArrayList<>();
        for(Map<String , Object> m : list){
            byte[] decode = Base64.getDecoder().decode(String.valueOf(m.get("password")));
            try {
                m.put("password" , new String(decode, "UTF-8"));
            } catch (UnsupportedEncodingException e) {
                throw new RuntimeException(e);
            }
            resultList.add(m);
        }
        pageInfo.setList(resultList);
        int total = userEntityMapper.getTotalCount((String) map.get("userName"));
        pageInfo.setTotal(total);
        return pageInfo;
    }

    /**
     * 创建用户的基本信息
     * @param map
     * @return
     */
    public int addUserInfo(Map<String,Object> map) {
        if(map.get("username") != null) {
            int userResult = userEntityMapper.queryExistUser(map);
            if(userResult != 0) {
                //用户名已经存在
                return 3;
            }
        }

        String id = UUIDUtil.getOneUUID();
        map.put("id",id);

        String password = String.valueOf(map.get("password"));
        //
        try {
            map.put("password",Base64.getEncoder().encodeToString(password.getBytes("UTF-8")));
        } catch (UnsupportedEncodingException e) {
            throw new RuntimeException(e);
        }
        //创建时间
        Date date = DateUtil.getCreateTime();
        map.put("creationDate",date);
        map.put("lastUpdateDate",date);
        //创建人
        String user = "admin";
        map.put("createdBy",user);
        map.put("lastUpdatedBy",user);
        //前台传入的时间戳转换
        String startTimeStr = map.get("startTime").toString();
        String endTimeStr = map.get("stopTime").toString();
        Date startTime = DateUtil.getMyTime(startTimeStr);
        Date endTime = DateUtil.getMyTime(endTimeStr);
        map.put("startTime",startTime);
        map.put("stopTime",endTime);

        int result = userEntityMapper.addUserInfo(map);
        return result;
    }

    /**
     * 编辑用户的基本信息
     * @param map
     * @return
     */
    public int modifyUserInfo(Map<String, Object> map) {

        return 0;
    }

    /**
     * 修改用户状态
     * @param map
     * @return
     */
    public int modifyUserStatus(Map<String, Object> map) {
        return 0;
    }

    /**
     * 根据id查询用户信息
     * @param userEntity
     * @return
     */
    public Map<String,Object> selectUserInfoById(UserEntity userEntity) {
  
        return null;
    }

    /**
     * 删除用户信息
     * @param userEntity
     * @return
     */
    public int deteleUserInfoById(UserEntity userEntity) {

        return 0;
    }

    /**
     * 验证账号密码是否正确
     * @param userEntity
     * @return
     */
    public UserEntity queryProjectByUser(UserEntity userEntity){
//        String p = userEntity.getPassword();
//        String password = null;
//        try {
//            password = Base64.getEncoder().encodeToString(p.getBytes("UTF-8"));
//        } catch (UnsupportedEncodingException e) {
//            throw new RuntimeException(e);
//        }
//        userEntity.setPassword(password);
        List<UserEntity> hasUser = userEntityMapper.selectUserInfo(userEntity);
        for(UserEntity u: hasUser){
            if(u.getPassword().equals(userEntity.getPassword()))
                return u;
        }
        return null;
    }
}
