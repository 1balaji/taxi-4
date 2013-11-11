package net.bitacademy.java41.oldboy.services;

import java.util.HashMap;
import java.util.List;

import net.bitacademy.java41.oldboy.dao.FeedDao;
import net.bitacademy.java41.oldboy.dao.FrndDao;
import net.bitacademy.java41.oldboy.dao.FvrtLocDao;
import net.bitacademy.java41.oldboy.dao.MbrDao;
import net.bitacademy.java41.oldboy.dao.RoomMbrDao;
import net.bitacademy.java41.oldboy.dao.SettingDao;
import net.bitacademy.java41.oldboy.vo.FvrtLoc;
import net.bitacademy.java41.oldboy.vo.Mbr;
import net.bitacademy.java41.oldboy.vo.Setting;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.PlatformTransactionManager;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

@Service
public class MemberServiceImpl implements MemberService {
	@Autowired FrndDao frndDao;  
    @Autowired FvrtLocDao fvrtLocDao;  
    @Autowired FeedDao feedDao; 
    @Autowired RoomMbrDao roomMbrDao; 
    @Autowired SettingDao settingDao; 
    @Autowired MbrDao mbrDao; 
    @Autowired PlatformTransactionManager txManager; 
	
	@Transactional(
			propagation=Propagation.REQUIRED, rollbackFor=Throwable.class)
	public void signUp(Mbr mbr) throws Exception {
		try {
			mbrDao.signUp(mbr);
			frndDao.addFrndList(mbr.getFrndList());
			Setting setting = new Setting()
										.setMbrId( mbr.getMbrId() )
										.setStartRange( 1000 )
										.setEndRange( 1000 );
			settingDao.addSetting(setting);
			
		} catch (Exception e) {
			throw e;
		}
	}
	
	@Transactional(propagation=Propagation.REQUIRED,rollbackFor=Throwable.class) 
	public void leaveMember(String mbrId) throws Exception{ 
	    try { 
	    	HashMap <String, Object> paramMap = new HashMap<String, Object>();
	    	paramMap.put("mbrId", mbrId);
	    	paramMap.put("feedNo", null);
	    	
	    	feedDao.deleteFeed(paramMap);  
	        roomMbrDao.deleteRoomMbr(mbrId); 
	        frndDao.deleteFrnd(mbrId);
	        fvrtLocDao.deleteFvrtLoc(mbrId); 
	        settingDao.deleteSetting(mbrId);
	        mbrDao.deleteMbr(mbrId); 
	        
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
