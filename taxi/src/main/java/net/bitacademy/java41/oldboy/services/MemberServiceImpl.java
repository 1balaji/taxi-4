package net.bitacademy.java41.oldboy.services;

import java.util.HashMap;

import net.bitacademy.java41.oldboy.dao.FrndDao;
import net.bitacademy.java41.oldboy.dao.MbrDao;
import net.bitacademy.java41.oldboy.vo.Mbr;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.PlatformTransactionManager;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

@Service
public class MemberServiceImpl implements MemberService {
	@Autowired MbrDao mbrDao;
	@Autowired FrndDao frndDao;
	@Autowired PlatformTransactionManager txManager;
	
	@Transactional(
			propagation=Propagation.REQUIRED, rollbackFor=Throwable.class)
	public void signUp(Mbr mbr) throws Exception {
		try {
			mbrDao.signUp(mbr);
			
//			HashMap<String, Object> paramMap = new HashMap<String, Object>();
//				paramMap.put("mbrId", mbr.getFrndList().get(0).getMbrId());
//				paramMap.put("frndId", mbr.getFrndList().get(1).getFrndId());
//				paramMap.put("frndName", mbr.getFrndList().get(2).getFrndName());
//				paramMap.put("frndPhotoUrl", mbr.getFrndList().get(3).getFrndPhotoUrl());
//			frndDao.addFrndList(paramMap);
			
			frndDao.addFrndList(mbr.getFrndList());
			
		} catch (Exception e) {
			throw e;
		}
	}

}
