package net.bitacademy.java41.oldboy.dao;

import java.util.List;
import java.util.Map;

import net.bitacademy.java41.oldboy.vo.Feed;


public interface FeedDao {

	List<Feed> getFeedList(int projectNo) throws Exception;

	int addFeed(Feed feed) throws Exception;
	
	int deleteFeed(Map<String, Object> paramMap) throws Exception;

	
}
