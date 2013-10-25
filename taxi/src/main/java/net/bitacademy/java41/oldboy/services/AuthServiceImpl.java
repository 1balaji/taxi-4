package net.bitacademy.java41.oldboy.services;

import net.bitacademy.java41.oldboy.dao.MbrDao;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AuthServiceImpl implements AuthService {
	@Autowired MbrDao mbrDao;
	@Autowired MemberService memberService;
	


	public int sample(String sampleValue) throws Exception {
		
		int count = mbrDao.sample("sampleValue");
		
		return count;
	}

}
