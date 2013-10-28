package net.bitacademy.java41.oldboy.services;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;

import net.bitacademy.java41.oldboy.dao.RoomDao;
import net.bitacademy.java41.oldboy.vo.PathLoc;
import net.bitacademy.java41.oldboy.vo.Room;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.PlatformTransactionManager;

@Service
public class RoomServiceImpl implements RoomService {
	@Autowired RoomDao roomDao;
	@Autowired PlatformTransactionManager txManager;
	
	public List<Room> searchRooms(double startLat, double startLng, double endLat, double endLng) throws Exception {
		ArrayList<Room> searchRoomList = new ArrayList<Room>();
		ArrayList<PathLoc> pathList1 = new ArrayList<PathLoc>();
		pathList1.add( new PathLoc()
					.setRoomNo(1)
					.setPathLocRank(0)
					.setPathLocName("서울특별시 강남구 역삼동 824-20")
					.setPathLocLat(startLat)
					.setPathLocLng(startLng));
		pathList1.add (new PathLoc()
					.setRoomNo(1)
					.setPathLocRank(1)
					.setPathLocName("대학로")
					.setPathLocLat(endLat)
					.setPathLocLng(endLng));
		Room room1 = new Room()
					.setRoomNo(1)
					.setRoomStartTime( Timestamp.valueOf("2013-10-28 22:11:00"))
					.setRoomDistance(10000)
					.setRoomFare(30000)
					.setRoomRegDate( new Timestamp(System.currentTimeMillis()) )
					.setPathLocList(pathList1);
		searchRoomList.add(room1);
		
		ArrayList<PathLoc> pathList2 = new ArrayList<PathLoc>();
		pathList2.add( new PathLoc()
					.setRoomNo(2)
					.setPathLocRank(0)
					.setPathLocName("강남역")
					.setPathLocLat(startLat)
					.setPathLocLng(startLng));
		pathList2.add (new PathLoc()
					.setRoomNo(2)
					.setPathLocRank(1)
					.setPathLocName("대학로")
					.setPathLocLat(endLat)
					.setPathLocLng(endLng));
		Room room2 = new Room()
					.setRoomNo(2)
					.setRoomStartTime( Timestamp.valueOf("2013-10-28 23:14:00"))
					.setRoomDistance(10000)
					.setRoomFare(30000)
					.setRoomRegDate( new Timestamp(System.currentTimeMillis()) )
					.setPathLocList(pathList2);
		searchRoomList.add(room2);
		
		
		return searchRoomList;
	}

}
