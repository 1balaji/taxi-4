package net.bitacademy.java41.oldboy.vo;

import java.sql.Date;


public class ProjectMember extends Member {
	private static final long serialVersionUID = 1L;
	
	public static final int PRJ_LVL_LEADER = 0;
	public static final int PRJ_LVL_GENERAL = 1;
	public static final int PRJ_LVL_GUEST = 9;
	
	protected int projectNo; 
	protected String projectTitle;
	protected int projectLevel;
	
	
	public ProjectMember setEmail(String email) {
		this.email = email;
		return this;
	}
	public ProjectMember setName(String name) {
		this.name = name;
		return this;
	}
	public ProjectMember setPassword(String password) {
		this.password = password;
		return this;
	}
	public ProjectMember setTel(String tel) {
		this.tel = tel;
		return this;
	}
	public ProjectMember setBlog(String blog) {
		this.blog = blog;
		return this;
	}
	public ProjectMember setRegDate(Date regDate) {
		this.regDate = regDate;
		return this;
	}
	public ProjectMember setUpdateDate(Date updateDate) {
		this.updateDate = updateDate;
		return this;
	}
	public ProjectMember setPostNo(int addressNo) {
		this.postNo = addressNo;
		return this;
	}
	public ProjectMember setDetailAddress(String detailAddress) {
		this.detailAddress = detailAddress;
		return this;
	}
	public ProjectMember setTag(String tag) {
		this.tag = tag;
		return this;
	}
	public ProjectMember setLevel(int level) {
		this.level = level;
		return this;
	}
	public int getProjectNo() {
		return projectNo;
	}
	public ProjectMember setProjectNo(int projectNo) {
		this.projectNo = projectNo;
		return this;
	}
	public String getProjectTitle() {
		return projectTitle;
	}
	public ProjectMember setProjectTitle(String projectTitle) {
		this.projectTitle = projectTitle;
		return this;
	}
	public int getProjectLevel() {
		return projectLevel;
	}
	public ProjectMember setProjectLevel(int projectLevel) {
		this.projectLevel = projectLevel;
		return this;
	}
	

}
