package net.bitacademy.java41.oldboy.dao;

import net.bitacademy.java41.oldboy.vo.Mbr;

public interface FeedDao {

	int sample(Mbr member) throws Exception;

	int deleteFeed(String mbrId) throws Exception;
}
