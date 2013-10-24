package net.bitacademy.java41.oldboy.services;

import java.util.HashMap;
import java.util.List;

import net.bitacademy.java41.oldboy.dao.FeedDao;
import net.bitacademy.java41.oldboy.vo.Feed;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

@Service
public class FeedServiceImpl implements FeedService {
	@Autowired FeedDao feedDao;
	
	public List<Feed> getFeedList(int projectNo) throws Exception {
		return feedDao.getFeedList(projectNo);
	}
	
	@Transactional(propagation=Propagation.REQUIRED, rollbackFor=Throwable.class)
	public int addFeed(Feed feed) throws Exception {
		try {
			return feedDao.addFeed(feed);
			
		} catch (Exception e) {
			throw e;
		}
		
	}
	
	@Transactional(propagation=Propagation.REQUIRED, rollbackFor=Throwable.class)
	public int deleteFeed(int projectNo, int feedNo) throws Exception {
		try {
			HashMap<String, Object> paramMap = new HashMap<String, Object>();
			paramMap.put("projectNo", projectNo);
			paramMap.put("feedNo", feedNo);
			paramMap.put("email", null);
			
			return feedDao.deleteFeed(paramMap);
			
		} catch (Exception e) {
			throw e;
		}
	}

}

	

