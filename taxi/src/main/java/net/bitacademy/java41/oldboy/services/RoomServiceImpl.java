package net.bitacademy.java41.oldboy.services;

import net.bitacademy.java41.oldboy.dao.RoomDao;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.PlatformTransactionManager;

@Service
public class RoomServiceImpl implements RoomService {
	@Autowired RoomDao roomDao;
	@Autowired PlatformTransactionManager txManager;

}
