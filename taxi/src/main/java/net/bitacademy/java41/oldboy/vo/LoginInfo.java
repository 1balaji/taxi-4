package net.bitacademy.java41.oldboy.vo;

import java.io.Serializable;

public class LoginInfo implements Serializable {
	private static final long serialVersionUID = 1L;

	protected int 		mbrId;
	protected String 	mbrName;
	protected String 	mbrPhoneNo;
	protected String 	mbrPhotoUrl;
	protected String 	mbrGender;
	
	public int getMbrId() {
		return mbrId;
	}
	public LoginInfo setMbrEmail(int mbrId) {
		this.mbrId = mbrId;
		return this;
	}
	public String getMbrName() {
		return mbrName;
	}
	public LoginInfo setMbrName(String mbrName) {
		this.mbrName = mbrName;
		return this;
	}
	public String getMbrPhoneNo() {
		return mbrPhoneNo;
	}
	public LoginInfo setMbrPhoneNo(String mbrPhoneNo) {
		this.mbrPhoneNo = mbrPhoneNo;
		return this;
	}
	public String getMbrPhotoUrl() {
		return mbrPhotoUrl;
	}
	public LoginInfo setMbrPhotoUrl(String mbrPhotoUrl) {
		this.mbrPhotoUrl = mbrPhotoUrl;
		return this;
	}
	public String getMbrGender() {
		return mbrGender;
	}
	public LoginInfo setMbrGender(String mbrGender) {
		this.mbrGender = mbrGender;
		return this;
	}
		
}
