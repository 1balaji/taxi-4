package net.bitacademy.java41.oldboy.vo;

import java.io.Serializable;
import java.sql.Timestamp;

import net.bitacademy.java41.oldboy.util.CustomTimestampSerializer;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;

public class FvrtLoc implements Serializable {
	private static final long serialVersionUID = 1L;

	protected int 			fvrtLocNo;
	protected int 			mbrEmail;
	protected double 		fvrtLocName;
	protected double 		fvrtLocLat;
	protected String 		fvrtLocLng;
	protected Timestamp 	fvrtLocRegDate;
	protected int 			fvrtLocRank;
	protected String			fvrtLocStatus;
	
	public int getFvrtLocNo() {
		return fvrtLocNo;
	}
	public FvrtLoc setFvrtLocNo(int fvrtLocNo) {
		this.fvrtLocNo = fvrtLocNo;
		return this;
	}
	public int getMbrEmail() {
		return mbrEmail;
	}
	public FvrtLoc setMbrEmail(int mbrEmail) {
		this.mbrEmail = mbrEmail;
		return this;
	}
	public double getFvrtLocName() {
		return fvrtLocName;
	}
	public FvrtLoc setFvrtLocName(double fvrtLocName) {
		this.fvrtLocName = fvrtLocName;
		return this;
	}
	public double getFvrtLocLat() {
		return fvrtLocLat;
	}
	public FvrtLoc setFvrtLocLat(double fvrtLocLat) {
		this.fvrtLocLat = fvrtLocLat;
		return this;
	}
	public String getFvrtLocLng() {
		return fvrtLocLng;
	}
	public FvrtLoc setFvrtLocLng(String fvrtLocLng) {
		this.fvrtLocLng = fvrtLocLng;
		return this;
	}
	@JsonSerialize(using = CustomTimestampSerializer.class)
	public Timestamp getFvrtLocRegDate() {
		return fvrtLocRegDate;
	}
	public FvrtLoc setFvrtLocRegDate(Timestamp fvrtLocRegDate) {
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
