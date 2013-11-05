package net.bitacademy.java41.oldboy.services;

import java.util.List;

import net.bitacademy.java41.oldboy.dao.FrndDao;
import net.bitacademy.java41.oldboy.dao.FvrtLocDao;
import net.bitacademy.java41.oldboy.dao.MbrDao;
import net.bitacademy.java41.oldboy.vo.FvrtLoc;
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
    @Autowired FvrtLocDao fvrtLocDao; 
	@Autowired PlatformTransactionManager txManager;
	
	@Transactional(
			propagation=Propagation.REQUIRED, rollbackFor=Throwable.class)
	public void signUp(Mbr mbr) throws Exception {
		try {
			mbrDao.signUp(mbr);
			frndDao.addFrndList(mbr.getFrndList());
			
		} catch (Exception e) {
			throw e;
		}
	}
	
	
	public List<FvrtLoc> getFvrtLoc(String mbrId) throws Exception { 
        try{ 
            List<FvrtLoc> i = fvrtLocDao.getFvrtLoc(mbrId); 
            System.out.println("자주가는 목적지 List"); 
            for(FvrtLoc f: i){ 
                System.out.println(f.getFvrtLocName()); 
            } 
              
            return fvrtLocDao.getFvrtLoc(mbrId); 
  
        } catch(Exception e ) { 
            throw e; 
        } 
    } 
  
    @Transactional( 
            propagation=Propagation.REQUIRED, rollbackFor=Throwable.class) 
    @Override
    public void addFvrtLoc(FvrtLoc fvrtLoc) throws Exception { 
          
        try { 
//           System.out.println((fvrtLoc.getMbrId())); 
              
             fvrtLoc.setFvrtLocStatus("F"); 
             fvrtLocDao.addFvrtLoc(fvrtLoc); 
              
        } catch (Throwable e) { 
            throw e; 
        } 
          
    } 

}
