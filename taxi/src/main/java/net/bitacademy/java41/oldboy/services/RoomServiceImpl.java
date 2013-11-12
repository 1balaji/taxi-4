package net.bitacademy.java41.oldboy.services;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import net.bitacademy.java41.oldboy.dao.PathLocDao;
import net.bitacademy.java41.oldboy.dao.RoomDao;
import net.bitacademy.java41.oldboy.dao.RoomMbrDao;
import net.bitacademy.java41.oldboy.vo.PathLoc;
import net.bitacademy.java41.oldboy.vo.Room;
import net.bitacademy.java41.oldboy.vo.RoomMbr;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.PlatformTransactionManager;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

@Service
public class RoomServiceImpl implements RoomService {
	@Autowired RoomDao roomDao;
	@Autowired PathLocDao pathLocDao;
	@Autowired RoomMbrDao roomMbrDao;
	@Autowired PlatformTransactionManager txManager;
	
	public List<Room> searchRooms(String mbrId,
			double startLat, double startLng, int startRange,
			double endLat, double endLng, int endRange
			) throws Exception {
		
		Map<String, Object> paramMap  = new HashMap<String, Object>();
		paramMap.put("mbrId", mbrId);
		paramMap.put("startLat", startLat);
		paramMap.put("startLng", startLng);
		paramMap.put("startRange", startRange);
		paramMap.put("endLat", endLat);
		paramMap.put("endLng", endLng);
		paramMap.put("endRange", endRange);
		
		List<Room> searchRoomList = roomDao.getRoomList(paramMap);
		
//		for( int i = 0; i < searchRoomList.size(); i++ ) {
//			searchRoomList.get(i).setPathLocList( 
//					pathLocDao.getPathLocList(searchRoomList.get(i).getRoomNo()) );
//			searchRoomList.get(i).setRoomMbrList( 
//					roomMbrDao.getRoomMbrList(searchRoomList.get(i).getRoomNo()) );
//		}

		return searchRoomList;
	}
	
	
	@Transactional( 
            propagation=Propagation.REQUIRED, 
            rollbackFor=Throwable.class) 
    public int addRoom(Room room, String memberId) throws Exception { 
        try { 
            //Room 생성 
            roomDao.addRoom(room); 
            int roomNo = room.getRoomNo(); 
            System.out.println(roomNo); 
              
              
            //RoomMember 생성 
            RoomMbr roomMbr = new RoomMbr(); 
            roomMbr.setMbrId(memberId); 
            roomMbr.setRoomNo(roomNo); 
            roomMbrDao.addRoomMbr(roomMbr); 
              
              
            //PathLoc 생성 
            List<PathLoc> listPath = room.getPathLocList(); 
            listPath.get(0).setRoomNo(roomNo); 
            listPath.get(1).setRoomNo(roomNo); 
            pathLocDao.addPathLocList(listPath); 
              
            return roomNo;
            
        } catch (Exception e) { 
            throw e; 
        } 
    } 
	
	
	public boolean isRoomMbr(String memberId) throws Exception {
		try {
			int count = roomMbrDao.isRoomMbr(memberId);
			System.out.println("현재 이사람이 개설된 방의 갯수 : " + count);
			if (count > 0) {
				return true;
			} else {
				return false;
			}
			
		} catch (Exception e) {
			throw e;
		}
	}
	
	
	public void joinRoom(int roomNo, String memberId) throws Exception { 
        try { 
            // 방멤버 중에서 나와일치하는 친구ID를 가져왔다고 가정 
            // ID : 10000008 
            String roomMbrId = "10000008"; 
            // 연결친구ID 
            String frndRelId = null; 
              
            RoomMbr roomMbr = new RoomMbr(); 
            roomMbr.setRoomNo(roomNo).setMbrId(memberId).setRoomMbrId(roomMbrId).setFrndRelId(frndRelId); 
            roomMbrDao.addRoomMbr(roomMbr); 
              
        } catch (Exception e) { 
            throw e; 
        }  
    }
	
	
	public Room getRoomInfo(int roomNo) throws Exception {
//		System.out.println("컨트롤 : " + roomNo);
		Room roomInfo = roomDao.getRoomInfo(roomNo);

		List<RoomMbr> roomMbrInfo = roomMbrDao.getRoomMbrInfo(roomInfo.getRoomNo());
		List<PathLoc> roomPathInfo = pathLocDao.getPathLocList(roomInfo.getRoomNo());
		
		roomInfo.setRoomMbrList(roomMbrInfo)
					.setPathLocList(roomPathInfo);
		
		return roomInfo;
		
	}

}
