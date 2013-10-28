package net.bitacademy.java41.oldboy.vo;

import java.io.Serializable;
import java.sql.Timestamp;
import java.util.List;

import net.bitacademy.java41.oldboy.util.CustomTimestampSerializer;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;

public class Room implements Serializable {
	private static final long serialVersionUID = 1L;

	protected int 			roomNo;
	protected Timestamp	roomStartTime;
	protected int 			roomDistance;
	protected long 			roomFare;
	protected Timestamp	roomRegDate;
	protected List<PathLoc> pathLocList;
	
	public int getRoomNo() {
		return roomNo;
	}
	public Room setRoomNo(int roomNo) {
		this.roomNo = roomNo;
		return this;
	}
	@JsonSerialize(using = CustomTimestampSerializer.class)
	public Timestamp getRoomStartTime() {
		return roomStartTime;
	}
	public Room setRoomStartTime(Timestamp roomStartTime) {
		this.roomStartTime = roomStartTime;
		return this;
	}
	public int getRoomDistance() {
		return roomDistance;
	}
	public Room setRoomDistance(int roomDistance) {
		this.roomDistance = roomDistance;
		return this;
	}
	public long getRoomFare() {
		return roomFare;
	}
	public Room setRoomFare(long roomFare) {
		this.roomFare = roomFare;
		return this;
	}
	@JsonSerialize(using = CustomTimestampSerializer.class)
	public Timestamp getRoomRegDate() {
		return roomRegDate;
	}
	public Room setRoomRegDate(Timestamp roomRegDate) {
		this.roomRegDate = roomRegDate;
		return this;
	}
	public List<PathLoc> getPathLocList() {
		return pathLocList;
	}
	public Room setPathLocList(List<PathLoc> pathLocList) {
		this.pathLocList = pathLocList;
		return this;
	}
	
	
}

