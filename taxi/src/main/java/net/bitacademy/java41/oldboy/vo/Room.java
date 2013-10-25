package net.bitacademy.java41.oldboy.vo;

import java.io.Serializable;
import java.sql.Date;

public class Room implements Serializable {
	private static final long serialVersionUID = 1L;

	protected int 		roomNo;
	protected Date 		roomStartTime;
	protected int		 	startPathLocNo;
	protected int 		endPathLocNo;
	protected int 		roomDistance;
	protected int 		roomFare;
	protected Date 		roomRegDate;
	
	public int getRoomNo() {
		return roomNo;
	}
	public Room setRoomNo(int roomNo) {
		this.roomNo = roomNo;
		return this;
	}
	public Date getRoomStartTime() {
		return roomStartTime;
	}
	public Room setRoomStartTime(Date roomStartTime) {
		this.roomStartTime = roomStartTime;
		return this;
	}
	public int getStartPathLocNo() {
		return startPathLocNo;
	}
	public Room setStartPathLocNo(int startPathLocNo) {
		this.startPathLocNo = startPathLocNo;
		return this;
	}
	public int getEndPathLocNo() {
		return endPathLocNo;
	}
	public Room setEndPathLocNo(int endPathLocNo) {
		this.endPathLocNo = endPathLocNo;
		return this;
	}
	public int getRoomDistance() {
		return roomDistance;
	}
	public Room setRoomDistance(int roomDistance) {
		this.roomDistance = roomDistance;
		return this;
	}
	public int getRoomFare() {
		return roomFare;
	}
	public Room setRoomFare(int roomFare) {
		this.roomFare = roomFare;
		return this;
	}
	public Date getRoomRegDate() {
		return roomRegDate;
	}
	public Room setRoomRegDate(Date roomRegDate) {
		this.roomRegDate = roomRegDate;
		return this;
	}
	
	
}

