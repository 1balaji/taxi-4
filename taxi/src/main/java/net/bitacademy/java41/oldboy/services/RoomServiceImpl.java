package net.bitacademy.java41.oldboy.services;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import net.bitacademy.java41.oldboy.dao.PathLocDao;
import net.bitacademy.java41.oldboy.dao.RoomDao;
import net.bitacademy.java41.oldboy.dao.RoomMbrDao;
import net.bitacademy.java41.oldboy.vo.Room;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.PlatformTransactionManager;

@Service
public class RoomServiceImpl implements RoomService {
	@Autowired RoomDao roomDao;
	@Autowired PathLocDao pathLocDao;
	@Autowired RoomMbrDao roomMbrDao;
	@Autowired PlatformTransactionManager txManager;
	
	public List<Room> searchRooms(String mbrId, String startTime,
			double startLat, double startLng, int startRange,
			double endLat, double endLng, int endRange
			) throws Exception {
		
		Map<String, Object> paramMap  = new HashMap<String, Object>();
		paramMap.put("mbrId", mbrId);
		paramMap.put("startTime", startTime);
		paramMap.put("startLat", startLat);
		paramMap.put("startLng", startLng);
		paramMap.put("startRange", startRange);
		paramMap.put("endLat", endLat);
		paramMap.put("endLng", endLng);
		paramMap.put("endRange", endRange);
		List<Room> searchRoomList = roomDao.getRoomList(paramMap);
		
		for( int i = 0; i < searchRoomList.size(); i++ ) {
			searchRoomList.get(i).setPathLocList( 
					pathLocDao.getPathLocList(searchRoomList.get(i).getRoomNo()) );
			searchRoomList.get(i).setRoomMbrList( 
					roomMbrDao.getRoomMbrList(searchRoomList.get(i).getRoomNo()) );
		}
		
		return searchRoomList;
	}

}
