package net.bitacademy.java41.oldboy.dao;

import java.util.List;

import net.bitacademy.java41.oldboy.vo.RoomMbr;

public interface RoomMbrDao {

	List<RoomMbr> getRoomMbrList(int roomNo) throws Exception;

	int addRoomMbr(RoomMbr roomMbr) throws Exception;
	
	int deleteRoomMbr(String mbrId) throws Exception;
	
	List<RoomMbr> getRoomMbrInfo(int roomNo) throws Exception ;
}
