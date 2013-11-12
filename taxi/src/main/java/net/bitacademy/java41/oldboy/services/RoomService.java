package net.bitacademy.java41.oldboy.services;

import java.util.List;

import net.bitacademy.java41.oldboy.vo.Room;


public interface RoomService {

	List<Room> searchRooms(String mbrId, double startLat, double startLng, int startRange, double endLat, double endLng, int endRange) throws Exception;

	int addRoom(Room room, String memberId) throws Exception;
	
	boolean isRoomMbr(String memberId) throws Exception;
	
	void joinRoom(int roomNo, String memberId) throws Exception; 
	
	Room getRoomInfo(int roomNo) throws Exception;
}
