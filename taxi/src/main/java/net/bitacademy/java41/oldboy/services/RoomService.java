package net.bitacademy.java41.oldboy.services;

import java.util.List;

import net.bitacademy.java41.oldboy.vo.Room;


public interface RoomService {

	List<Room> searchRooms(double startLat, double startLng, double endLat, double endLng, String startDateTime) throws Exception;

}
