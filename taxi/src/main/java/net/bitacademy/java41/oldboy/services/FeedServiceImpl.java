package net.bitacademy.java41.oldboy.services;

import net.bitacademy.java41.oldboy.dao.FeedDao;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.PlatformTransactionManager;

@Service
public class FeedServiceImpl implements FeedService {
	@Autowired FeedDao feedDao;
	@Autowired PlatformTransactionManager txManager;

}
