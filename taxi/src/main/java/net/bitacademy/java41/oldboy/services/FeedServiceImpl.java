package net.bitacademy.java41.oldboy.services;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import net.bitacademy.java41.oldboy.dao.FeedDao;
import net.bitacademy.java41.oldboy.dao.RoomMbrDao;
import net.bitacademy.java41.oldboy.vo.Feed;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.PlatformTransactionManager;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

@Service
public class FeedServiceImpl implements FeedService {
	
	@Autowired GcmService gcmService;
	@Autowired FeedDao feedDao;
	@Autowired RoomMbrDao roomMbrDao;
	@Autowired PlatformTransactionManager txManager;

	public List<Feed> getFeedList(int roomNo) throws Exception {
		return feedDao.getFeedList(roomNo);
	}

	@Transactional(
			propagation=Propagation.REQUIRED, rollbackFor=Throwable.class)
	public int addFeed(Feed feed) throws Exception {
		int feeNo = feedDao.addFeed(feed);

		if(feeNo > 0){
			Map <String, Object> paramMap = new HashMap<String, Object>();
			paramMap.put("roomNo", feed.getRoomNo());
			paramMap.put("mbrId", feed.getMbrId());
			
			List<Map<String, String>> gcmTargetMapList =  roomMbrDao.getGcmTargetMapList(paramMap);
			for (Map<String, String> map : gcmTargetMapList) {
				map.put("feedAction", "addFeed" );
				map.put("roomNo", feed.getRoomNo()+"" );
				map.put("mbrId", feed.getMbrId() );
				map.put("feedContent", feed.getFeedContent() );
			}
			
			gcmService.asyncSend(gcmTargetMapList, GcmServiceImpl.FeedRunnable.class);
		}
		return feeNo;
		
	}

	@Transactional(
			propagation=Propagation.REQUIRED, rollbackFor=Throwable.class)
	public void deleteFeed(Feed feed) throws Exception {
		
		Map<String, Object> paramMap = new HashMap<String, Object>();
		paramMap.put("feedNo", feed.getFeedNo());
		paramMap.put("mbrId", feed.getMbrId());
		
		feed = feedDao.getFeedInfo(feed);
		int count = feedDao.deleteFeed(paramMap);
		
		if(count > 0){
			paramMap.put("roomNo", feed.getRoomNo());
			paramMap.put("mbrId", feed.getMbrId());
			
			List<Map<String, String>> gcmTargetMapList =  roomMbrDao.getGcmTargetMapList(paramMap);
			for (Map<String, String> map : gcmTargetMapList) {
				map.put("feedAction", "deleteFeed" );
				map.put("roomNo", feed.getRoomNo()+"" );
				map.put("mbrId", feed.getMbrId() );
				map.put("feedContent", feed.getFeedContent() );
			}
			
			gcmService.asyncSend(gcmTargetMapList, GcmServiceImpl.FeedRunnable.class);
		}
	}

}
