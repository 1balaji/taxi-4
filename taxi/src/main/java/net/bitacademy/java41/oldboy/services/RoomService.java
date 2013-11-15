package net.bitacademy.java41.oldboy.services;

import java.util.List;

import net.bitacademy.java41.oldboy.vo.Room;
import net.bitacademy.java41.oldboy.vo.RoomMbr;
import net.bitacademy.java41.oldboy.vo.RoomPath;


public interface RoomService {

	List<Room> searchRooms(String mbrId, double startLat, double startLng, int startRange, double endLat, double endLng, int endRange) throws Exception;

	int addRoom(Room room, RoomPath startPath, RoomPath endPath, RoomMbr roomMbr) throws Exception;
	
	boolean isRoomMbr(String memberId) throws Exception;
	
	void joinRoom(RoomMbr roomMbr, String memberId) throws Exception; 
	
	Room getRoomInfo(int roomNo) throws Exception;

	

}
