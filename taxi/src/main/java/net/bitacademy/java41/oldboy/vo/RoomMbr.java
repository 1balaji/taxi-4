package net.bitacademy.java41.oldboy.vo;

import java.io.Serializable;

public class RoomMbr implements Serializable {
	private static final long serialVersionUID = 1L;

	protected int 		roomNo;
	protected String		mbrId;
	protected String		roomMbrId;
	protected String		frndRelId;
	
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
	public String getRoomMbrId() {
		return roomMbrId;
	}
	public RoomMbr setRoomMbrId(String roomMbrId) {
		this.roomMbrId = roomMbrId;
		return this;
	}
	public String getFrndRelId() {
		return frndRelId;
	}
	public RoomMbr setFrndRelId(String frndRelId) {
		this.frndRelId = frndRelId;
		return this;
	}

	
	
}
