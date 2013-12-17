package net.bitacademy.java41.oldboy.services;

import java.io.EOFException;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.Executor;
import java.util.concurrent.Executors;
import java.util.logging.Level;

import net.bitacademy.java41.oldboy.dao.RoomDao;
import net.bitacademy.java41.oldboy.vo.Room;
import net.bitacademy.java41.oldboy.vo.RoomMbr;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.google.android.gcm.server.Constants;
import com.google.android.gcm.server.Message;
import com.google.android.gcm.server.Message.Builder;
import com.google.android.gcm.server.MulticastResult;
import com.google.android.gcm.server.Result;
import com.google.android.gcm.server.Sender;


@Service
public class GcmServiceImpl implements GcmService {

	public static final String TAG = "sendManager";
	private static final Executor threadPool = Executors.newFixedThreadPool(5);
	protected static Logger logger = Logger.getLogger("service");
	public static final String APT_KEY = "AIzaSyBHxl2tGP3w99WhLk6UpC3F4x6L79ZdkXM";
	

	public GcmServiceImpl(){}

	@Autowired RoomDao roomDao;

     public void performService() throws Exception {

    	 String criteriaTime = "0:15:0";

    	 List<Room> startTimeList = roomDao.getStartTimeList(criteriaTime);
    	 List<RoomMbr> roomMbrList = null;
    	 List<RoomMbr> gcmList = new ArrayList<RoomMbr>();

    	 for(int i = 0; i < startTimeList.size(); i++){
    		 roomMbrList = startTimeList.get(i).getRoomMbrList();

	    	 for(int j = 0; j < roomMbrList.size(); j++){
	    		 gcmList.add(startTimeList.get(i).getRoomMbrList().get(j));
	    	 }
    	 }
    	 if(gcmList.size() > 0 && gcmList.get(0).getGcmRegId() != null){
    		 Map<String, String> bundleMap = new HashMap<String, String>();
    		 bundleMap.put("message", "출발 15분 전 입니다.");
    		 asyncSend(gcmList, GcmServiceImpl.StartTimeCheckRunnable.class, bundleMap);
    	 }
     }


	 public void asyncSend(List<RoomMbr> list, Class<?> clazz, Map<String, String> bundleMap)
				throws IOException, EOFException {
		final List<String> regList = new ArrayList<String>();
		for(int i = 0; i < list.size(); i++){
			regList.add(list.get(i).getGcmRegId());
		}
		
//		regList.add("APA91bGt-hNV0vJYGio0GNaL468OuxQHKrp8BYtITiB7vZwn_jaI_R5_GVch2mVTRVwTW9pyu6WBgzyw5m2Yh7h85PfxorOVYQTVYgjg91HPFZgrH6JFPU-st6OlokXoLFBWVidcsIwB8BxYo6dMxISrAixTyZDBd6OvPtBXkBQBGX2qrOglKos");
		
		if ( regList.size() > 0 ) {
		 	if ( GcmServiceImpl.FeedRunnable.class == clazz ) {
		 		System.out.println("Feed Request()...............");
	
			    threadPool.execute( new FeedRunnable(regList, bundleMap) );
	
		 	} else if ( GcmServiceImpl.StartTimeCheckRunnable.class == clazz ) {
		 		System.out.println("roomStartTime Alarm Request()...............");
	
			    threadPool.execute( new StartTimeCheckRunnable(regList, bundleMap) );
	
		 	}
		}

	}

	/**
	 * 피드 등록시 푸쉬 실행부분 
	 * @author Buru
	 *
	 */
	public class FeedRunnable implements  Runnable {
		
		List<String> regList = null;
	    Sender sender = null;
	    Message message = null;
	    
	    public FeedRunnable( List<String> regList, Map<String, String> bundleMap ) {
	    	this.regList = regList;
	    	this.sender = new Sender(APT_KEY);
	    	
	    	Builder msgBuilder = new Message.Builder();
	    	msgBuilder.addData("className", this.getClass().getSimpleName());
	    	for( java.util.Map.Entry<String, String> entry : bundleMap.entrySet() ) {
	    		msgBuilder.addData(entry.getKey(), entry.getValue());
	    	}
	    	this.message = msgBuilder.build(); 
		}
	
	    public void run() {
	
			MulticastResult multicastResult;
	        try {
	        	multicastResult = sender.send(message, regList, 5);
	
		        List<Result> results = multicastResult.getResults();
				for (int i = 0; i < regList.size(); i++) {
			        String regId = regList.get(i);
			        Result result = results.get(i);
			        String messageId = result.getMessageId();
			        if (messageId != null) {
			        	System.out.println("Succesfully sent message to device:" + regId + messageId);
			        	logger.info("Succesfully sent message to device: " + regId +
			                    "; messageId = " + messageId);
			        } else {
			        	String error = result.getErrorCodeName();
		        		if (error.equals(Constants.ERROR_NOT_REGISTERED)) {
		        			logger.info("Unregistered device: " + regId);
		        		} else {
		        			logger.debug("Error sending message to " + regId + ": " + error);
		        		}
			        }
			   }
	      } catch (IOException e) {
		      logger.debug(Level.SEVERE, e);
		      return;
		  }
	  }
	}
	
	
	/**
	 * 출발시간 테크 시 푸쉬 실행부분 
	 * @author Buru
	 *
	 */
	public class StartTimeCheckRunnable implements  Runnable {
		
		List<String> regList = null;
	    Sender sender = null;
	    Message message = null;
	    
	    public StartTimeCheckRunnable( List<String> regList, Map<String, String> bundleMap ) {
	    	this.regList = regList;
	    	this.sender = new Sender(APT_KEY);
	    	
	    	Builder msgBuilder = new Message.Builder();
	    	msgBuilder.addData("className", this.getClass().getSimpleName());
	    	for( java.util.Map.Entry<String, String> entry : bundleMap.entrySet() ) {
	    		msgBuilder.addData(entry.getKey(), entry.getValue());
	    	}
	    	this.message = msgBuilder.build(); 
		}

	    public void run() {

			MulticastResult multicastResult;
	        try {
	        	multicastResult = sender.send(message, regList, 5);

		        List<Result> results = multicastResult.getResults();
				for (int i = 0; i < regList.size(); i++) {
			        String regId = regList.get(i);
			        Result result = results.get(i);
			        String messageId = result.getMessageId();
			        if (messageId != null) {
			        	System.out.println("Succesfully sent message to device:" + regId + messageId);
			        	logger.info("Succesfully sent message to device: " + regId +
			                    "; messageId = " + messageId);
			        } else {
			        	String error = result.getErrorCodeName();
		        		if (error.equals(Constants.ERROR_NOT_REGISTERED)) {
		        			logger.info("Unregistered device: " + regId);
		        		} else {
		        			logger.debug("Error sending message to " + regId + ": " + error);
		        		}
			        }
			   }
	      } catch (IOException e) {
		      logger.debug(Level.SEVERE, e);
		      return;
		  }
	  }
	}
 	
 	
}
