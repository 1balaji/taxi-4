package net.bitacademy.java41.oldboy.vo;

import java.io.Serializable;
import java.sql.Date;

public class FvrtLoc implements Serializable {
	private static final long serialVersionUID = 1L;

	protected int 		fvrtLocNo;
	protected String 	mbrEmail;
	protected String 	fvrtLocName;
	protected String 	fvrtLocLatitude;
	protected String 	fvrtLocLogitude;
	protected Date	 	fvrtLocRegDate;
	protected int 		fvrtLocRank;
	protected String		fvrtLocStatus;
	
	public int getFvrtLocNo() {
		return fvrtLocNo;
	}
	public FvrtLoc setFvrtLocNo(int fvrtLocNo) {
		this.fvrtLocNo = fvrtLocNo;
		return this;
	}
	public String getMbrEmail() {
		return mbrEmail;
	}
	public FvrtLoc setMbrEmail(String mbrEmail) {
		this.mbrEmail = mbrEmail;
		return this;
	}
	public String getFvrtLocName() {
		return fvrtLocName;
	}
	public FvrtLoc setFvrtLocName(String fvrtLocName) {
		this.fvrtLocName = fvrtLocName;
		return this;
	}
	public String getFvrtLocLatitude() {
		return fvrtLocLatitude;
	}
	public FvrtLoc setFvrtLocLatitude(String fvrtLocLatitude) {
		this.fvrtLocLatitude = fvrtLocLatitude;
		return this;
	}
	public String getFvrtLocLogitude() {
		return fvrtLocLogitude;
	}
	public FvrtLoc setFvrtLocLogitude(String fvrtLocLogitude) {
		this.fvrtLocLogitude = fvrtLocLogitude;
		return this;
	}
	public Date getFvrtLocRegDate() {
		return fvrtLocRegDate;
	}
	public FvrtLoc setFvrtLocRegDate(Date fvrtLocRegDate) {
		this.fvrtLocRegDate = fvrtLocRegDate;
		return this;
	}
	public int getFvrtLocRank() {
		return fvrtLocRank;
	}
	public FvrtLoc setFvrtLocRank(int fvrtLocRank) {
		this.fvrtLocRank = fvrtLocRank;
		return this;
	}
	public String getFvrtLocStatus() {
		return fvrtLocStatus;
	}
	public FvrtLoc setFvrtLocStatus(String fvrtLocStatus) {
		this.fvrtLocStatus = fvrtLocStatus;
		return this;
	}
	
	
}
