package net.bitacademy.java41.oldboy.vo;

import java.io.Serializable;

public class RoomMbr implements Serializable {
	private static final long serialVersionUID = 1L;

	protected int 	roomNo;
	protected int 	mbrId;
	protected int		relFrndId;
	protected int 	relFrnd2Id;
	
	public int getRoomNo() {
		return roomNo;
	}
	public RoomMbr setRoomNo(int roomNo) {
		this.roomNo = roomNo;
		return this;
	}
	public int getMbrId() {
		return mbrId;
	}
	public RoomMbr setMbrId(int mbrId) {
		this.mbrId = mbrId;
		return this;
	}
	public int getRelFrndId() {
		return relFrndId;
	}
	public RoomMbr setRelFrndId(int relFrndId) {
		this.relFrndId = relFrndId;
		return this;
	}
	public int getRelFrnd2Id() {
		return relFrnd2Id;
	}
	public RoomMbr setRelFrnd2Id(int relFrnd2Id) {
		this.relFrnd2Id = relFrnd2Id;
		return this;
	}

	
	
}
