package net.bitacademy.java41.oldboy.services;

import java.util.List;

import net.bitacademy.java41.oldboy.vo.Feed;


public interface FeedService {

	List<Feed> getFeedList(int projectNo) throws Exception;
	
	int addFeed(Feed feed) throws Exception;
	
	int deleteFeed(int projectNo, int feedNo) throws Exception;

}
