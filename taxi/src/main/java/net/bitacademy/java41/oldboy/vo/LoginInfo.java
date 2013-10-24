package net.bitacademy.java41.oldboy.vo;

import java.io.Serializable;
import java.sql.Date;

public class LoginInfo implements Serializable {
	private static final long serialVersionUID = 1L;

	protected String email;
	protected String name;
	protected String tel;
	protected String blog;
	protected Date regDate;
	protected Date updateDate;
	protected int postNo;
	protected String detailAddress;
	protected String tag;
	protected int level;
	protected String photo;
	
	
	public String getEmail() {
		return email;
	}
	public LoginInfo setEmail(String email) {
		this.email = email;
		return this;
	}
	public String getName() {
		return name;
	}
	public LoginInfo setName(String name) {
		this.name = name;
		return this;
	}
	public String getTel() {
		return tel;
	}
	public LoginInfo setTel(String tel) {
		this.tel = tel;
		return this;
	}
	public String getBlog() {
		return blog;
	}
	public LoginInfo setBlog(String blog) {
		this.blog = blog;
		return this;
	}
	public Date getRegDate() {
		return regDate;
	}
	public LoginInfo setRegDate(Date regDate) {
		this.regDate = regDate;
		return this;
	}
	public Date getUpdateDate() {
		return updateDate;
	}
	public LoginInfo setUpdateDate(Date updateDate) {
		this.updateDate = updateDate;
		return this;
	}
	public int getPostNo() {
		return postNo;
	}
	public LoginInfo setPostNo(int postNo) {
		this.postNo = postNo;
		return this;
	}
	public String getDetailAddress() {
		return detailAddress;
	}
	public LoginInfo setDetailAddress(String detailAddress) {
		this.detailAddress = detailAddress;
		return this;
	}
	public String getTag() {
		return tag;
	}
	public LoginInfo setTag(String tag) {
		this.tag = tag;
		return this;
	}
	public int getLevel() {
		return level;
	}
	public LoginInfo setLevel(int level) {
		this.level = level;
		return this;
	}
	public String getPhoto() {
		return photo;
	}
	public LoginInfo setPhoto(String photo) {
		this.photo = photo;
		return this;
	}

	


}
