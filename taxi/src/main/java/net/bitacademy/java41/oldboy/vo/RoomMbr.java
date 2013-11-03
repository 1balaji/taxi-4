package net.bitacademy.java41.oldboy.vo;

import java.io.Serializable;

public class RoomMbr implements Serializable {
	private static final long serialVersionUID = 1L;

	protected int 		roomNo;
	protected String		mbrId;
	protected String		relFrndId;
	protected String		relFrnd2Id;
	
	public int getRoomNo() {
		return roomNo;
	}
	public RoomMbr setRoomNo(int roomNo) {
		this.roomNo = roomNo;
		return this;
	}
	public String getMbrId() {
		return mbrId;
	}
	public RoomMbr setMbrId(String mbrId) {
		this.mbrId = mbrId;
		return this;
	}
	public String getRelFrndId() {
		return relFrndId;
	}
	public RoomMbr setRelFrndId(String relFrndId) {
		this.relFrndId = relFrndId;
		return this;
	}
	public String getRelFrnd2Id() {
		return relFrnd2Id;
	}
	public RoomMbr setRelFrnd2Id(String relFrnd2Id) {
		this.relFrnd2Id = relFrnd2Id;
		return this;
	}

	
	
}
