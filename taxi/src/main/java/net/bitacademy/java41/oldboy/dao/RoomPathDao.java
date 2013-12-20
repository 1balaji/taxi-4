package net.bitacademy.java41.oldboy.dao;

import java.util.List;
import java.util.Map;

import net.bitacademy.java41.oldboy.vo.RoomPath;



public interface RoomPathDao {

	void addRoomPathList(List<RoomPath> roomPathList) throws Exception;

	List<RoomPath> getRoomPathList(int roomNo) throws Exception;

	void deleteRoomPath(Map<String, Object> paramMap) throws Exception;
	
}
