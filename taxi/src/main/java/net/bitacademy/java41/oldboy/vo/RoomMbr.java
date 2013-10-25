package net.bitacademy.java41.oldboy.vo;

import java.io.Serializable;

public class RoomMbr implements Serializable {
	private static final long serialVersionUID = 1L;

	protected int 		roomNo;
	protected String 	mbrEmail;
	protected String 	frndEmail;
	protected String 	frnd2Email;
	
	public int getRoomNo() {
		return roomNo;
	}
	public RoomMbr setRoomNo(int roomNo) {
		this.roomNo = roomNo;
		return this;
	}
	public String getMbrEmail() {
		return mbrEmail;
	}
	public RoomMbr setMbrEmail(String mbrEmail) {
		this.mbrEmail = mbrEmail;
		return this;
	}
	public String getFrndEmail() {
		return frndEmail;
	}
	public RoomMbr setFrndEmail(String frndEmail) {
		this.frndEmail = frndEmail;
		return this;
	}
	public String getFrnd2Email() {
		return frnd2Email;
	}
	public RoomMbr setFrnd2Email(String frnd2Email) {
		this.frnd2Email = frnd2Email;
		return this;
	}
	
	
}
