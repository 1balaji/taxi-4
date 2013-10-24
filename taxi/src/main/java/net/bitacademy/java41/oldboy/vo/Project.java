package net.bitacademy.java41.oldboy.vo;

import java.io.Serializable;
import java.sql.Date;

public class Project implements Serializable {
	private static final long serialVersionUID = 1L;
	
	protected int 		no;
	protected String 	title;
	protected String 	content;
	protected Date 		startDate;
	protected Date 		endDate;
	protected String		tag;
	protected String 	plEmail;
	protected String 	plName;
	protected String 	plTel;
	protected int		 	level;
	
	
	public int getNo() {
		return no;
	}
	public Project setNo(int no) {
		this.no = no;
		return this;
	}
	public String getTitle() {
		return title;
	}
	public Project setTitle(String title) {
		this.title = title;
		return this;
	}
	public String getContent() {
		return content;
	}
	public Project setContent(String content) {
		this.content = content;
		return this;
	}
	public Date getStartDate() {
		return startDate;
	}
	public Project setStartDate(Date startDate) {
		this.startDate = startDate;
		return this;
	}
	public Date getEndDate() {
		return endDate;
	}
	public Project setEndDate(Date endDate) {
		this.endDate = endDate;
		return this;
	}
	public String getTag() {
		return tag;
	}
	public Project setTag(String tag) {
		this.tag = tag;
		return this;
	}
	public String getPlEmail() {
		return plEmail;
	}
	public Project setPlEmail(String plEmail) {
		this.plEmail = plEmail;
		return this;
	}
	public String getPlName() {
		return plName;
	}
	public Project setPlName(String plName) {
		this.plName = plName;
		return this;
	}
	public String getPlTel() {
		return plTel;
	}
	public Project setPlTel(String plTel) {
		this.plTel = plTel;
		return this;
	}
	
	public int getLevel() {
		return level;
	}
	public Project setLevel(int level) {
		this.level = level;
		return this;
	}
	
	
	public Project clone() {
		Project obj = new Project();
		obj.no = this.no;
		obj.title = this.title;
		obj.content = this.content;
		obj.startDate = this.startDate;
		obj.endDate = this.endDate;
		obj.tag = this.tag;
		obj.plEmail = this.plEmail;
		obj.plName = this.plName;
		obj.plTel = this.plTel;
		obj.level = this.level;
		
		return obj;
	}
	
}
