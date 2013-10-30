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
	
	public List<Room> searchRooms(double startLat, double startLng, 
			double endLat, double endLng, String startDateTime) throws Exception {
		
		//검색 로직 와야 하는 부분
		
		
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
					.setPathLocName("서울특별시 성북구 석관동 340-11")
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
					.setPathLocName("서울특별시 강남구 역삼동 824-20")
					.setPathLocLat(startLat)
					.setPathLocLng(startLng));
		pathList2.add (new PathLoc()
					.setRoomNo(2)
					.setPathLocRank(1)
					.setPathLocName("대학로")
					.setPathLocLat( 1955510.7090402246 )
					.setPathLocLng( 961050.3182397316 ));
		Room room2 = new Room()
					.setRoomNo(2)
					.setRoomStartTime( Timestamp.valueOf("2013-10-28 23:14:00"))
					.setRoomDistance(10000)
					.setRoomFare(30000)
					.setRoomRegDate( new Timestamp(System.currentTimeMillis()) )
					.setPathLocList(pathList2);
		searchRoomList.add(room2);
		
		ArrayList<PathLoc> pathList3 = new ArrayList<PathLoc>();
		pathList3.add( new PathLoc()
					.setRoomNo(3)
					.setPathLocRank(0)
					.setPathLocName("서울특별시 강남구 역삼동 824-20")
					.setPathLocLat(startLat)
					.setPathLocLng(startLng));
		pathList3.add (new PathLoc()
					.setRoomNo(3)
					.setPathLocRank(1)
					.setPathLocName("대학로")
					.setPathLocLat( 1942960.8693880793 )
					.setPathLocLng( 949578.9221358099 ));
		Room room3 = new Room()
					.setRoomNo(3)
					.setRoomStartTime( Timestamp.valueOf("2013-10-28 24:24:00"))
					.setRoomDistance(10000)
					.setRoomFare(30000)
					.setRoomRegDate( new Timestamp(System.currentTimeMillis()) )
					.setPathLocList(pathList3);
		searchRoomList.add(room3);
		
		ArrayList<PathLoc> pathList4 = new ArrayList<PathLoc>();
		pathList4.add( new PathLoc()
					.setRoomNo(4)
					.setPathLocRank(0)
					.setPathLocName("서울특별시 강남구 역삼동 824-20")
					.setPathLocLat(startLat)
					.setPathLocLng(startLng));
		pathList4.add (new PathLoc()
					.setRoomNo(4)
					.setPathLocRank(1)
					.setPathLocName("외대")
					.setPathLocLat( 1942960.8693880793 )
					.setPathLocLng( 949578.9221358099 ));
		Room room4 = new Room()
					.setRoomNo(4)
					.setRoomStartTime( Timestamp.valueOf("2013-10-29 01:14:00"))
					.setRoomDistance(10000)
					.setRoomFare(30000)
					.setRoomRegDate( new Timestamp(System.currentTimeMillis()) )
					.setPathLocList(pathList4);
		searchRoomList.add(room4);
		
		ArrayList<PathLoc> pathList5 = new ArrayList<PathLoc>();
		pathList5.add( new PathLoc()
					.setRoomNo(5)
					.setPathLocRank(0)
					.setPathLocName("강남역")
					.setPathLocLat(1942960.8693880793 )
					.setPathLocLng(949578.9221358099));
		pathList5.add (new PathLoc()
					.setRoomNo(5)
					.setPathLocRank(1)
					.setPathLocName("외대")
					.setPathLocLat( 1942960.8693880793 )
					.setPathLocLng( 949578.9221358099 ));
		Room room5 = new Room()
					.setRoomNo(5)
					.setRoomStartTime( Timestamp.valueOf("2013-10-29 02:50:00"))
					.setRoomDistance(10000)
					.setRoomFare(30000)
					.setRoomRegDate( new Timestamp(System.currentTimeMillis()) )
					.setPathLocList(pathList5);
		searchRoomList.add(room5);
		
		
		return searchRoomList;
	}

}
