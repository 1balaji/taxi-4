package net.bitacademy.java41.oldboy.vo;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

import net.bitacademy.java41.oldboy.util.CustomDateSerializer;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;

public class Room implements Serializable {
	private static final long serialVersionUID = 1L;

	protected int 				roomNo;
	protected Date				roomStartTime;
	protected int 				roomDistance;
	protected long 				roomFare;
	protected Date				roomRegDate;
	protected List<PathLoc> 	pathLocList;
	protected List<RoomMbr>	roomMbrList;
	
	public int getRoomNo() {
		return roomNo;
	}
	public Room setRoomNo(int roomNo) {
		this.roomNo = roomNo;
		return this;
	}
	@JsonSerialize(using = CustomDateSerializer.class)
	public Date getRoomStartTime() {
		return roomStartTime;
	}
	public Room setRoomStartTime(Date roomStartTime) {
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
	@JsonSerialize(using = CustomDateSerializer.class)
	public Date getRoomRegDate() {
		return roomRegDate;
	}
	public Room setRoomRegDate(Date roomRegDate) {
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
	public List<RoomMbr> getRoomMbrList() {
		return roomMbrList;
	}
	public Room setRoomMbrList(List<RoomMbr> roomMbrList) {
		this.roomMbrList = roomMbrList;
		return this;
	}
	
	
}

