package net.bitacademy.java41.oldboy.vo;

import java.io.Serializable;

public class PathLoc implements Serializable {
	private static final long serialVersionUID = 1L;

	protected int 		pathLocNo;
	protected String 	pathLocName;
	protected String 	pathLocLat;
	protected String 	pathLocLog;
	protected int			pathLocSearchRange;
	protected String 	pathLocStatus;
	
	public int getPathLocNo() {
		return pathLocNo;
	}
	public PathLoc setPathLocNo(int pathLocNo) {
		this.pathLocNo = pathLocNo;
		return this;
	}
	public String getPathLocName() {
		return pathLocName;
	}
	public PathLoc setPathLocName(String pathLocName) {
		this.pathLocName = pathLocName;
		return this;
	}
	public String getPathLocLat() {
		return pathLocLat;
	}
	public PathLoc setPathLocLat(String pathLocLat) {
		this.pathLocLat = pathLocLat;
		return this;
	}
	public String getPathLocLog() {
		return pathLocLog;
	}
	public PathLoc setPathLocLog(String pathLocLog) {
		this.pathLocLog = pathLocLog;
		return this;
	}
	public int getPathLocSearchRange() {
		return pathLocSearchRange;
	}
	public PathLoc setPathLocSearchRange(int pathLocSearchRange) {
		this.pathLocSearchRange = pathLocSearchRange;
		return this;
	}
	public String getPathLocStatus() {
		return pathLocStatus;
	}
	public PathLoc setPathLocStatus(String pathLocStatus) {
		this.pathLocStatus = pathLocStatus;
		return this;
	}

	
}
