package net.bitacademy.java41.oldboy.vo;

import java.io.Serializable;
import java.sql.Date;

public class Mbr implements Serializable {
	private static final long serialVersionUID = 1L;

	protected int 		mbrId;
	protected String 	mbrName;
	protected String 	mbrPhoneNo;
	protected String 	mbrPhotoUrl;
	protected String 	mbrGender;
	protected Date 		mbrRegDate;
	
	public int getMbrId() {
		return mbrId;
	}
	public Mbr setMbrId(int mbrId) {
		this.mbrId = mbrId;
		return this;
	}
	public String getMbrName() {
		return mbrName;
	}
	public Mbr setMbrName(String mbrName) {
		this.mbrName = mbrName;
		return this;
	}
	public String getMbrPhoneNo() {
		return mbrPhoneNo;
	}
	public Mbr setMbrPhoneNo(String mbrPhoneNo) {
		this.mbrPhoneNo = mbrPhoneNo;
		return this;
	}
	public String getMbrPhotoUrl() {
		return mbrPhotoUrl;
	}
	public Mbr setMbrPhotoUrl(String mbrPhotoUrl) {
		this.mbrPhotoUrl = mbrPhotoUrl;
		return this;
	}
	public String getMbrGender() {
		return mbrGender;
	}
	public Mbr setMbrGender(String mbrGender) {
		this.mbrGender = mbrGender;
		return this;
	}
	public Date getMbrRegDate() {
		return mbrRegDate;
	}
	public Mbr setMbrRegDate(Date mbrRegDate) {
		this.mbrRegDate = mbrRegDate;
		return this;
	}
		
}
