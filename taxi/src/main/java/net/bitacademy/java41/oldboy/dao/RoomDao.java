package net.bitacademy.java41.oldboy.dao;

import java.util.List;
import java.util.Map;

import net.bitacademy.java41.oldboy.vo.Room;

public interface RoomDao {
	List<Room> getRoomList(Map<String, Object> paramMap) throws Exception;

}
