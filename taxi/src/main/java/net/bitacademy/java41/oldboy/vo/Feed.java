package net.bitacademy.java41.oldboy.vo;

import java.io.Serializable;
import java.sql.Date;

/**
 * @author 상헌
 * FNO	int(11)	NO	PRI
 * CONTENT	text	NO	
 * REG_DATE	datetime	NO	
 * EMAIL	varchar(50)	NO	MUL
 * PNO	int(11)	NO	
 */
public class Feed implements Serializable {
	private static final long serialVersionUID = 1L;

	protected int 		feedNo;
	protected String 	content;
	protected Date 		regDate;
	protected String 	email;
	protected int 		projectNo;
	protected String 	name;
	protected int 		prjMembLevel;
	protected String 	photoUrl;
	
	public String getPhotoUrl() {
		return photoUrl;
	}
	public Feed setPhotoUrl(String photoUrl) {
		this.photoUrl = photoUrl;
		return this;
	}
	public int getFeedNo() {
		return feedNo;
	}
	public Feed setFeedNo(int feedNo) {
		this.feedNo = feedNo;
		return this;
	}
	public String getContent() {
		return content;
	}
	public Feed setContent(String content) {
		this.content = content;
		return this;
	}
	public Date getRegDate() {
		return regDate;
	}
	public Feed setRegDate(Date regDate) {
		this.regDate = regDate;
		return this;
	}
	public String getEmail() {
		return email;
	}
	public Feed setEmail(String email) {
		this.email = email;
		return this;
	}
	public int getProjectNo() {
		return projectNo;
	}
	public Feed setProjectNo(int projectNo) {
		this.projectNo = projectNo;
		return this;
	}
	public String getName() {
		return name;
	}
	public Feed setName(String name) {
		this.name = name;
		return this;
	}
	public int getPrjMembLevel() {
		return prjMembLevel;
	}
	public Feed setPrjMembLevel(int prjMembLevel) {
		this.prjMembLevel = prjMembLevel;
		return this;
	}
	
	

	
}
