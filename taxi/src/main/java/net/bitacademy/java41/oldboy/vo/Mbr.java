package net.bitacademy.java41.oldboy.vo;

import java.io.Serializable;
import java.sql.Timestamp;
import java.util.List;

import net.bitacademy.java41.oldboy.util.CustomTimestampSerializer;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;

public class Mbr implements Serializable {
	private static final long serialVersionUID = 1L;

	protected int 			mbrId;
	protected String 		mbrName;
	protected String 		mbrPhoneNo;
	protected String 		mbrPhotoUrl;
	protected String 		mbrGender;
	protected Timestamp 	mbrRegDate;
	protected List<Frnd>	frndList;
	
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
	@JsonSerialize(using = CustomTimestampSerializer.class)
	public Timestamp getMbrRegDate() {
		return mbrRegDate;
	}
	public Mbr setMbrRegDate(Timestamp mbrRegDate) {
		this.mbrRegDate = mbrRegDate;
		return this;
	}
	public List<Frnd> getFrndList() {
		return frndList;
	}
	public Mbr setFrndList(List<Frnd> frndList) {
		this.frndList = frndList;
		return this;
	}
	
		
}
