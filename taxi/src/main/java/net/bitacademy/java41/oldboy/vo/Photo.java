package net.bitacademy.java41.oldboy.vo;

public class Photo {
	protected int			no;
	protected String 	email;
	protected String		filename;
	
	public int getNo() {
		return no;
	}
	public Photo setNo(int no) {
		this.no = no;
		return this;
	}
	public String getEmail() {
		return email;
	}
	public Photo setEmail(String email) {
		this.email = email;
		return this;
	}
	public String getFilename() {
		return filename;
	}
	public Photo setFilename(String filename) {
		this.filename = filename;
		return this;
	}
	
	
}
