package net.bitacademy.java41.oldboy.services;

import java.io.EOFException;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
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
    	 boolean request = true;

    	 List<Room> startTimeList = roomDao.getStartTimeList(criteriaTime);
    	 List<RoomMbr> roomMbrList = null;
    	 List<RoomMbr> gcmList = new ArrayList<RoomMbr>();

    	 for(int i = 0; i < startTimeList.size(); i++){
    		 System.out.println(":::+: roomNo =>" + startTimeList.get(i).getRoomNo());
    		 System.out.println(":::+: roomStartTime =>" + startTimeList.get(i).getRoomStartTime());
    		 System.out.println(":::+: differencetTime =>" + startTimeList.get(i).getDifferenceTime());
    		 roomMbrList = startTimeList.get(i).getRoomMbrList();

	    	 for(int j = 0; j < roomMbrList.size(); j++){
	    		 gcmList.add(startTimeList.get(i).getRoomMbrList().get(j));
//	    		 System.out.println(":::+: gcmRegId =>" + roomMbrList.get(j).getGcmRegId());
	    	 }
    	 }
    	 if(gcmList.size() > 0 && gcmList.get(0).getGcmRegId() != null){
    		 asyncSend(gcmList, request);
    	 }
     }



	 public void asyncSend(List<RoomMbr> list, boolean request)
			 							throws IOException, EOFException {

	 	if (!request) {
	 		System.out.println("Feed Request()...............");
		    final List<String> regList = new ArrayList<String>();
		    for(int i = 0; i < list.size(); i++){
		    	regList.add(list.get(i).getGcmRegId());
//		    	System.out.println("GCM_REG_ID(" + i + ") : " + regList.get(i).toString());
		    }

		    threadPool.execute(new Runnable() {
		    Sender sender = new Sender(APT_KEY);
		 	String contents = "참여중인 방에 댓글이 추가되었습니다.";
		    Message message = new Message.Builder().addData("message", contents).build();

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
		  }});


	 	} else {
	 		System.out.println("roomStartTime Alarm Request()...............");

	 		final List<String> regList = new ArrayList<String>();
		    for(int i = 0; i < list.size(); i++){
		    	regList.add(list.get(i).getGcmRegId());
//		    	System.out.println("GCM_REG_ID(" + i + ") : " + regList.get(i).toString());
		    }

		    threadPool.execute(new Runnable() {
		    Sender sender = new Sender(APT_KEY);
		 	String contents = "출발 15분 전입니다.";
		    Message message = new Message.Builder().addData("message", contents).build();

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
		  }});


	 	}



	}
}
