package net.bitacademy.java41.oldboy.services;

import net.bitacademy.java41.oldboy.dao.MbrDao;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.PlatformTransactionManager;

@Service
public class MemberServiceImpl implements MemberService {
	@Autowired MbrDao mbrDao;
	@Autowired PlatformTransactionManager txManager;

}
