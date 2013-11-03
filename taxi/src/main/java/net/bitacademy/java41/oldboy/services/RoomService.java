package net.bitacademy.java41.oldboy.services;

import java.util.List;

import net.bitacademy.java41.oldboy.vo.Room;


public interface RoomService {

	List<Room> searchRooms(String mbrId, String startTime, double startLat, double startLng, int startRange, double endLat, double endLng, int endRange) throws Exception;

}
