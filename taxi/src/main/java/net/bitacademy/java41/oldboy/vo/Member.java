package net.bitacademy.java41.oldboy.vo;

import java.io.Serializable;
import java.sql.Date;

/**
 * @author 상헌
 * 
 */
public class Member implements Serializable {
	private static final long serialVersionUID = 1L;

	protected String email;
	protected String name;
	protected String password;
	protected String tel;
	protected String blog;
	protected Date regDate;
	protected Date updateDate;
	protected int postNo;
	protected String detailAddress;
	protected String tag;
	protected int level;
	protected String[] photos;

	public String getEmail() {
		return email;
	}

	public Member setEmail(String email) {
		this.email = email;
		return this;
	}

	public String getName() {
		return name;
	}

	public Member setName(String name) {
		this.name = name;
		return this;
	}

	public String getPassword() {
		return password;
	}

	public Member setPassword(String password) {
		this.password = password;
		return this;
	}

	public String getTel() {
		return tel;
	}

	public Member setTel(String tel) {
		this.tel = tel;
		return this;
	}

	public String getBlog() {
		return blog;
	}

	public Member setBlog(String blog) {
		this.blog = blog;
		return this;
	}

	public Date getRegDate() {
		return regDate;
	}

	public Member setRegDate(Date regDate) {
		this.regDate = regDate;
		return this;
	}

	public Date getUpdateDate() {
		return updateDate;
	}

	public Member setUpdateDate(Date updateDate) {
		this.updateDate = updateDate;
		return this;
	}

	public int getPostNo() {
		return postNo;
	}

	public Member setPostNo(int postNo) {
		this.postNo = postNo;
		return this;
	}

	public String getDetailAddress() {
		return detailAddress;
	}

	public Member setDetailAddress(String detailAddress) {
		this.detailAddress = detailAddress;
		return this;
	}

	public String getTag() {
		return tag;
	}

	public Member setTag(String tag) {
		this.tag = tag;
		return this;
	}

	public int getLevel() {
		return level;
	}

	public Member setLevel(int level) {
		this.level = level;
		return this;
	}

	public String[] getPhotos() {
		return photos;
	}

	public Member setPhotos(String[] photos) {
		this.photos = photos;
		return this;
	}

	public Member clone() {
		Member obj = new Member();

		obj.email = this.email;
		obj.name = this.name;
		obj.password = this.password;
		obj.tel = this.tel;
		obj.blog = this.blog;
		obj.regDate = this.regDate;
		obj.updateDate = this.updateDate;
		obj.postNo = this.postNo;
		obj.detailAddress = this.detailAddress;
		obj.tag = this.tag;
		obj.level = this.level;
		obj.photos = this.photos;

		return obj;
	}

}
