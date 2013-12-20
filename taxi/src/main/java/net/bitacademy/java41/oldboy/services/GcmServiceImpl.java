package net.bitacademy.java41.oldboy.services;

import java.io.EOFException;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.concurrent.Executor;
import java.util.concurrent.Executors;
import java.util.logging.Level;

import net.bitacademy.java41.oldboy.dao.RoomDao;
import net.bitacademy.java41.oldboy.dao.RoomMbrDao;
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

	@Autowired RoomDao roomDao;
	@Autowired RoomMbrDao roomMbrDao;

	public static final String TAG = "sendManager";
	private static final Executor threadPool = Executors.newFixedThreadPool(5);
	protected static Logger logger = Logger.getLogger("service");
	public static final String APT_KEY = "AIzaSyBHxl2tGP3w99WhLk6UpC3F4x6L79ZdkXM";
	

	public GcmServiceImpl(){}


	public void performService() throws Exception {
		System.out.println("performService()");
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy.MM.dd HH:mm:ss");
		
		String criteriaTime = "0:10:0";
		
		List<Room> alramGcmTargetRoomList = roomDao.getAlramGcmTargetRoomList(criteriaTime);
		
		for( Room room : alramGcmTargetRoomList ) {
			List<String> regList = new ArrayList<String>();
			
			for( RoomMbr roomMbr : room.getRoomMbrList() ) {
				regList.add( roomMbr.getGcmRegId() );
			}
			
			Builder msgBuilder = new Message.Builder();
			msgBuilder.addData("className", GcmServiceImpl.StartAlramRunnable.class.getSimpleName());
			msgBuilder.addData("roomMbr", room.getRoomNo()+"");
			msgBuilder.addData("roomStartTime", sdf.format(room.getRoomStartTime()) );
			msgBuilder.addData("differenceTime", room.getDifferenceTime()+"");
			
			threadPool.execute( new FeedRunnable(regList, msgBuilder.build()) );
		}
		
	}


	public void asyncSend(List<Map<String, String>> gcmTargetMapList, Class<?> clazz)
			throws IOException, EOFException {
		final List<String> regList = new ArrayList<String>();
		
		for(int i = 0; i < gcmTargetMapList.size(); i++){
			regList.add( (String)gcmTargetMapList.get(i).get("gcmRegId") );
		}
		
		if ( regList.size() > 0 ) {
		 	if ( GcmServiceImpl.FeedRunnable.class == clazz ) {
		 		System.out.println("FeedRunnable Request()...............");
		 		
		 		Builder msgBuilder = new Message.Builder();
		    	
		    	for( java.util.Map.Entry<String, String> entry : gcmTargetMapList.get(0).entrySet() ) {
		    		if ( !"gcmRegId".equals(entry.getKey()) ) {
		    			msgBuilder.addData(entry.getKey(), entry.getValue());
		    		}
		    	}
		    	msgBuilder.addData("className", clazz.getSimpleName());
		    	
		    	Message message = msgBuilder.build();
	
			    threadPool.execute( new FeedRunnable(regList, message) );
			    
		 	} else if ( GcmServiceImpl.RoomRunnable.class == clazz ) {
		 		System.out.println("RoomRunnable Request()...............");
		 		
		 		Builder msgBuilder = new Message.Builder();
		    	
		    	for( java.util.Map.Entry<String, String> entry : gcmTargetMapList.get(0).entrySet() ) {
		    		if ( !"gcmRegId".equals(entry.getKey()) ) {
		    			msgBuilder.addData(entry.getKey(), entry.getValue());
		    		}
		    	}
		    	msgBuilder.addData("className", clazz.getSimpleName());
		    	
		    	Message message = msgBuilder.build(); 

			    threadPool.execute( new RoomRunnable(regList, message) );
			    
		 	} else if ( GcmServiceImpl.StartAlramRunnable.class == clazz ) {
		 		System.out.println("StartAlramRunnable Alarm Request()...............");

//			    threadPool.execute( new StartAlramRunnable(regList, bundleMap) );
	
		 	}
		}

	}

	/**
	 * 피드 등록시 푸쉬 실행부분 
	 * @author Buru
	 *
	 */
	public class FeedRunnable implements  Runnable {
		
		Sender sender = null;
		List<String> regList = null;
	    Message message = null;
	    
	    public FeedRunnable( List<String> regList, Message message ) {
	    	this.sender = new Sender(APT_KEY);
	    	this.regList = regList;
	    	this.message = message;
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
	 * 새로운 멤버참여시 푸쉬 실행부분 
	 * @author Buru
	 *
	 */
	public class RoomRunnable implements  Runnable {
		
		Sender sender = null;
		List<String> regList = null;
	    Message message = null;
	    
	    public RoomRunnable( List<String> regList, Message message ) {
	    	this.sender = new Sender(APT_KEY);
	    	this.regList = regList;
	    	this.message = message; 
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
	 * 출발시간 알람 푸쉬 실행부분 
	 * @author Buru
	 *
	 */
	public class StartAlramRunnable implements  Runnable {
		
		Sender sender = null;
		List<String> regList = null;
	    Message message = null;
	    
	    public StartAlramRunnable( List<String> regList, Map<String, String> bundleMap ) {
	    	this.sender = new Sender(APT_KEY);
	    	this.regList = regList;
	    	
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
