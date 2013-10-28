package net.bitacademy.java41.oldboy.vo;

import java.io.Serializable;

public class PathLoc implements Serializable {
	private static final long serialVersionUID = 1L;

	protected int 		roomNo;
	protected int			pathLocRank;
	protected String 	pathLocName;
	protected double 	pathLocLat;
	protected double 	pathLocLng;
	
	public int getRoomNo() {
		return roomNo;
	}
	public PathLoc setRoomNo(int roomNo) {
		this.roomNo = roomNo;
		return this;
	}
	public int getPathLocRank() {
		return pathLocRank;
	}
	public PathLoc setPathLocRank(int pathLocRank) {
		this.pathLocRank = pathLocRank;
		return this;
	}
	public String getPathLocName() {
		return pathLocName;
	}
	public PathLoc setPathLocName(String pathLocName) {
		this.pathLocName = pathLocName;
		return this;
	}
	public double getPathLocLat() {
		return pathLocLat;
	}
	public PathLoc setPathLocLat(double pathLocLat) {
		this.pathLocLat = pathLocLat;
		return this;
	}
	public double getPathLocLng() {
		return pathLocLng;
	}
	public PathLoc setPathLocLng(double pathLocLng) {
		this.pathLocLng = pathLocLng;
		return this;
	}
	
}
