package net.bitacademy.java41.oldboy.dao;

import java.util.List;

import net.bitacademy.java41.oldboy.vo.RoomMbr;

public interface RoomMbrDao {

	List<RoomMbr> getRoomDtlList(int roomNo) throws Exception;

	int addRoomMbr(RoomMbr roomDtl) throws Exception;
	
	int deleteRoomMbr(String mbrId) throws Exception;
	
	List<RoomMbr> getRoomMbrInfo(int roomNo) throws Exception ;
	
	int isRoomMbr(String mbrrId) throws Exception;

	RoomMbr getVirtualRoomMbr(RoomMbr roomMbr) throws Exception;
}
