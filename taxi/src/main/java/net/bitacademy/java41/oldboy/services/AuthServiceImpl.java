package net.bitacademy.java41.oldboy.services;

import net.bitacademy.java41.oldboy.dao.MbrDao;
import net.bitacademy.java41.oldboy.vo.LoginInfo;

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


	public LoginInfo getLoginInfo(int mbrId) throws Exception {
		
		LoginInfo loginInfo = mbrDao.getLoginInfo(mbrId);
		return loginInfo;
	}

}
