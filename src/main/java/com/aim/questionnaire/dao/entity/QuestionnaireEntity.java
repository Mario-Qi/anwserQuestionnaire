package com.aim.questionnaire.dao.entity;

import java.util.Date;

public class QuestionnaireEntity {
    /**
     *
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column questionnaire_info.id
     *
     * @mbg.generated
     */
    private String id;

    /**
     *
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column questionnaire_info.project_id
     *
     * @mbg.generated
     */
    private String projectId;

    /**
     *
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column questionnaire_info.question_name
     *
     * @mbg.generated
     */
    private String questionName;

    /**
     *
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column questionnaire_info.question_content
     *
     * @mbg.generated
     */
    private String questionContent;

    /**
     *
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column questionnaire_info.data_id
     *
     * @mbg.generated
     */
    private String dataId;

    /**
     *
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column questionnaire_info.question_end_content
     *
     * @mbg.generated
     */
    private String questionEndContent;

    /**
     *
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column questionnaire_info.question_stop
     *
     * @mbg.generated
     */
    private String questionStop;

    /**
     *
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column questionnaire_info.release_time
     *
     * @mbg.generated
     */
    private Date releaseTime;

    /**
     *
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column questionnaire_info.start_time
     *
     * @mbg.generated
     */
    private Date startTime;

    /**
     *
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column questionnaire_info.end_time
     *
     * @mbg.generated
     */
    private Date endTime;

    /**
     *
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column questionnaire_info.answer_total
     *
     * @mbg.generated
     */
    private String answerTotal;

    /**
     *
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column questionnaire_info.created_by
     *
     * @mbg.generated
     */
    private String createdBy;

    /**
     *
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column questionnaire_info.creation_date
     *
     * @mbg.generated
     */
    private Date creationDate;

    /**
     *
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column questionnaire_info.last_updated_by
     *
     * @mbg.generated
     */
    private String lastUpdatedBy;

    /**
     *
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column questionnaire_info.last_update_date
     *
     * @mbg.generated
     */
    private Date lastUpdateDate;



    private String question;

    /**
     *
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column questionnaire_info.question_title
     *
     * @mbg.generated
     */
    private String questionTitle;

    /**
     *
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column questionnaire_info.context
     *
     * @mbg.generated
     */
    private String context;





    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column questionnaire_info.id
     *
     * @return the value of questionnaire_info.id
     *
     * @mbg.generated
     */
    public String getId() {
        return id;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column questionnaire_info.id
     *
     * @param id the value for questionnaire_info.id
     *
     * @mbg.generated
     */
    public void setId(String id) {
        this.id = id == null ? null : id.trim();
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column questionnaire_info.project_id
     *
     * @return the value of questionnaire_info.project_id
     *
     * @mbg.generated
     */
    public String getProjectId() {
        return projectId;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column questionnaire_info.project_id
     *
     * @param projectId the value for questionnaire_info.project_id
     *
     * @mbg.generated
     */
    public void setProjectId(String projectId) {
        this.projectId = projectId == null ? null : projectId.trim();
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column questionnaire_info.question_name
     *
     * @return the value of questionnaire_info.question_name
     *
     * @mbg.generated
     */
    public String getQuestionName() {
        return questionName;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column questionnaire_info.question_name
     *
     * @param questionName the value for questionnaire_info.question_name
     *
     * @mbg.generated
     */
    public void setQuestionName(String questionName) {
        this.questionName = questionName == null ? null : questionName.trim();
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column questionnaire_info.question_content
     *
     * @return the value of questionnaire_info.question_content
     *
     * @mbg.generated
     */
    public String getQuestionContent() {
        return questionContent;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column questionnaire_info.question_content
     *
     * @param questionContent the value for questionnaire_info.question_content
     *
     * @mbg.generated
     */
    public void setQuestionContent(String questionContent) {
        this.questionContent = questionContent == null ? null : questionContent.trim();
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column questionnaire_info.data_id
     *
     * @return the value of questionnaire_info.data_id
     *
     * @mbg.generated
     */
    public String getDataId() {
        return dataId;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column questionnaire_info.data_id
     *
     * @param dataId the value for questionnaire_info.data_id
     *
     * @mbg.generated
     */
    public void setDataId(String dataId) {
        this.dataId = dataId == null ? null : dataId.trim();
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column questionnaire_info.question_end_content
     *
     * @return the value of questionnaire_info.question_end_content
     *
     * @mbg.generated
     */
    public String getQuestionEndContent() {
        return questionEndContent;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column questionnaire_info.question_end_content
     *
     * @param questionEndContent the value for questionnaire_info.question_end_content
     *
     * @mbg.generated
     */
    public void setQuestionEndContent(String questionEndContent) {
        this.questionEndContent = questionEndContent == null ? null : questionEndContent.trim();
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column questionnaire_info.question_stop
     *
     * @return the value of questionnaire_info.question_stop
     *
     * @mbg.generated
     */
    public String getQuestionStop() {
        return questionStop;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column questionnaire_info.question_stop
     *
     * @param questionStop the value for questionnaire_info.question_stop
     *
     * @mbg.generated
     */
    public void setQuestionStop(String questionStop) {
        this.questionStop = questionStop == null ? null : questionStop.trim();
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column questionnaire_info.release_time
     *
     * @return the value of questionnaire_info.release_time
     *
     * @mbg.generated
     */
    public Date getReleaseTime() {
        return releaseTime;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column questionnaire_info.release_time
     *
     * @param releaseTime the value for questionnaire_info.release_time
     *
     * @mbg.generated
     */
    public void setReleaseTime(Date releaseTime) {
        this.releaseTime = releaseTime;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column questionnaire_info.start_time
     *
     * @return the value of questionnaire_info.start_time
     *
     * @mbg.generated
     */
    public Date getStartTime() {
        return startTime;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column questionnaire_info.start_time
     *
     * @param startTime the value for questionnaire_info.start_time
     *
     * @mbg.generated
     */
    public void setStartTime(Date startTime) {
        this.startTime = startTime;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column questionnaire_info.end_time
     *
     * @return the value of questionnaire_info.end_time
     *
     * @mbg.generated
     */
    public Date getEndTime() {
        return endTime;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column questionnaire_info.end_time
     *
     * @param endTime the value for questionnaire_info.end_time
     *
     * @mbg.generated
     */
    public void setEndTime(Date endTime) {
        this.endTime = endTime;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column questionnaire_info.answer_total
     *
     * @return the value of questionnaire_info.answer_total
     *
     * @mbg.generated
     */
    public String getAnswerTotal() {
        return answerTotal;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column questionnaire_info.answer_total
     *
     * @param answerTotal the value for questionnaire_info.answer_total
     *
     * @mbg.generated
     */
    public void setAnswerTotal(String answerTotal) {
        this.answerTotal = answerTotal == null ? null : answerTotal.trim();
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column questionnaire_info.created_by
     *
     * @return the value of questionnaire_info.created_by
     *
     * @mbg.generated
     */
    public String getCreatedBy() {
        return createdBy;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column questionnaire_info.created_by
     *
     * @param createdBy the value for questionnaire_info.created_by
     *
     * @mbg.generated
     */
    public void setCreatedBy(String createdBy) {
        this.createdBy = createdBy == null ? null : createdBy.trim();
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column questionnaire_info.creation_date
     *
     * @return the value of questionnaire_info.creation_date
     *
     * @mbg.generated
     */
    public Date getCreationDate() {
        return creationDate;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column questionnaire_info.creation_date
     *
     * @param creationDate the value for questionnaire_info.creation_date
     *
     * @mbg.generated
     */
    public void setCreationDate(Date creationDate) {
        this.creationDate = creationDate;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column questionnaire_info.last_updated_by
     *
     * @return the value of questionnaire_info.last_updated_by
     *
     * @mbg.generated
     */
    public String getLastUpdatedBy() {
        return lastUpdatedBy;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column questionnaire_info.last_updated_by
     *
     * @param lastUpdatedBy the value for questionnaire_info.last_updated_by
     *
     * @mbg.generated
     */
    public void setLastUpdatedBy(String lastUpdatedBy) {
        this.lastUpdatedBy = lastUpdatedBy == null ? null : lastUpdatedBy.trim();
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column questionnaire_info.last_update_date
     *
     * @return the value of questionnaire_info.last_update_date
     *
     * @mbg.generated
     */
    public Date getLastUpdateDate() {
        return lastUpdateDate;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column questionnaire_info.last_update_date
     *
     * @param lastUpdateDate the value for questionnaire_info.last_update_date
     *
     * @mbg.generated
     */
    public void setLastUpdateDate(Date lastUpdateDate) {
        this.lastUpdateDate = lastUpdateDate;
    }

    public String getQuestion() {
        return question;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column questionnaire_info.question
     *
     * @param question the value for questionnaire_info.question
     *
     * @mbg.generated
     */
    public void setQuestion(String question) {
        this.question = question == null ? null : question.trim();
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column questionnaire_info.question_title
     *
     * @return the value of questionnaire_info.question_title
     *
     * @mbg.generated
     */
    public String getQuestionTitle() {
        return questionTitle;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column questionnaire_info.question_title
     *
     * @param questionTitle the value for questionnaire_info.question_title
     *
     * @mbg.generated
     */
    public void setQuestionTitle(String questionTitle) {
        this.questionTitle = questionTitle == null ? null : questionTitle.trim();
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column questionnaire_info.context
     *
     * @return the value of questionnaire_info.context
     *
     * @mbg.generated
     */
    public String getContext() {
        return context;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column questionnaire_info.context
     *
     * @param context the value for questionnaire_info.context
     *
     * @mbg.generated
     */
    public void setContext(String context) {
        this.context = context == null ? null : context.trim();
    }

}