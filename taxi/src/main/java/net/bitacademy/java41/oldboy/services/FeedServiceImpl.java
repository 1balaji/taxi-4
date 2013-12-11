package net.bitacademy.java41.oldboy.services;

import java.util.HashMap;
import java.util.List;

import net.bitacademy.java41.oldboy.dao.FeedDao;
import net.bitacademy.java41.oldboy.vo.Feed;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.PlatformTransactionManager;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

@Service
public class FeedServiceImpl implements FeedService {
	
	@Autowired FeedDao feedDao;
	@Autowired PlatformTransactionManager txManager;
	
	public List<Feed> getFeedList(int roomNo) throws Exception {
		try{
			return feedDao.getFeedList(roomNo);
			
		} catch(Exception e ) {
			throw e;
		}
	}
	
	
	@Transactional(
			propagation=Propagation.REQUIRED, rollbackFor=Throwable.class)
	public int addFeed(Feed feed) throws Exception {
		int feedNo = 0;
		try{
			feedDao.addFeed(feed);
			feedNo = feed.getFeedNo();
			
//			System.out.println("리턴 피드넘버 : " + feedNo);
			
		} catch(Exception e ) {
			throw e;
		}
		return feedNo;
	}

	@Transactional(
			propagation=Propagation.REQUIRED, rollbackFor=Throwable.class)
	public void deleteFeed(String mbrId, int feedNo) throws Exception {
		try{
			System.out.println("delete Service : " + mbrId + feedNo);
			HashMap <String, Object> paramMap = new HashMap<String, Object>();
			paramMap.put("mbrId", mbrId);
			paramMap.put("feedNo", feedNo);
			
			feedDao.deleteFeed(paramMap);
			
		} catch(Exception e ) {
			throw e;
		}
	}
}
