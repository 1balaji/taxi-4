package net.bitacademy.java41.oldboy.controls;

import java.io.PrintWriter;
import java.io.StringWriter;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpSession;

import net.bitacademy.java41.oldboy.services.RoomService;
import net.bitacademy.java41.oldboy.vo.JsonResult;
import net.bitacademy.java41.oldboy.vo.LoginInfo;
import net.bitacademy.java41.oldboy.vo.PathLoc;
import net.bitacademy.java41.oldboy.vo.Room;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping("/room")
public class RoomControl {
	@Autowired ServletContext sc;
	@Autowired RoomService roomService;
	
	@RequestMapping("/searchRooms")
	@ResponseBody
	public JsonResult view(String startTime,
			String startLat, String startLng, int startRange,
			String endLat, String endLng, int endRange,
			HttpSession session ) throws Exception {
		JsonResult jsonResult = new JsonResult();
		try {
//			SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
			System.out.println("start: " + startLat + ", " + startLng + " | " + startRange 
					+ "\nend : " + endLat + ", " + endLng + " | " + endRange);
//			Date startTimeDate = new Date( Long.parseLong(startTime) );
//			System.out.println(sdf.format(startTimeDate));
			
			LoginInfo loginInfo = (LoginInfo) session.getAttribute("loginInfo");
			jsonResult.setData( roomService.searchRooms( loginInfo.getMbrId(),  
					Double.parseDouble(startLat), Double.parseDouble(startLng), startRange, 
					Double.parseDouble(endLat), Double.parseDouble(endLng), endRange) );
			
			jsonResult.setStatus("success");
			
		} catch (Throwable e) {
			e.printStackTrace();
			StringWriter out =  new StringWriter();
			e.printStackTrace(new PrintWriter(out));
			
			jsonResult.setStatus("fail");
			jsonResult.setData(out.toString());
		}
		
		return jsonResult;
	}
	
	
    @RequestMapping("/addRoom")
    @ResponseBody
    public JsonResult addRoom(Room room, PathLoc startPathLoc, int endLocRank, String endLocName,
            double endLocLat, double endLocLng, HttpSession session) throws Exception {
        JsonResult jsonResult= new JsonResult();
        try {
				List<PathLoc> listPathLoc = new ArrayList<PathLoc>();
				PathLoc endPathLoc = new PathLoc();
				LoginInfo loginInfo = (LoginInfo) session.getAttribute("loginInfo");
				  
				String memberId = loginInfo.getMbrId();
				  
				endPathLoc.setPathLocRank(endLocRank);
				endPathLoc.setPathLocName(endLocName);
				endPathLoc.setPathLocLat(endLocLat);
				endPathLoc.setPathLocLng(endLocLng);
				 
				listPathLoc.add(startPathLoc);
				listPathLoc.add(endPathLoc);
				room.setPathLocList(listPathLoc);
				int roomNo = roomService.addRoom(room, memberId);
				
				jsonResult.setData(roomNo);
				jsonResult.setStatus("success");
            
        } catch (Throwable e) {
            e.printStackTrace();
            StringWriter out =  new StringWriter();
            e.printStackTrace(new PrintWriter(out));
             
            jsonResult.setStatus("fail");
            jsonResult.setData(out.toString());
        }
         
        return jsonResult;
    }
    
    
    @RequestMapping("/isRoomMbr")
    @ResponseBody
    public JsonResult isRoomMbr(HttpSession session) throws Exception {
    	
    	JsonResult jsonResult = new JsonResult();
    	try {
	    	LoginInfo loginInfo = (LoginInfo)session.getAttribute("loginInfo");
	    	
	    	
	    	boolean result = roomService.isRoomMbr(loginInfo.getMbrId());
	    	System.out.println(result);
	    	if(result) {
	    		jsonResult.setStatus("success");
	    		jsonResult.setData(true);
	    	} else {
	    		jsonResult.setStatus("success");
	    		jsonResult.setData(false);
	    	}
	    	
    	} catch (Throwable e) {
    		e.printStackTrace();
    		StringWriter out = new StringWriter();
    		e.printStackTrace(new PrintWriter(out));
    		
    		jsonResult.setStatus("fail");
    		jsonResult.setData(out.toString());
    	}
    	return jsonResult;
    }
    
    
    @RequestMapping("/joinRoom")
    @ResponseBody
    public JsonResult joinRoom(HttpSession session, int roomNo) throws Exception {
        JsonResult jsonResult = new JsonResult();
        try {
        	LoginInfo loginInfo = (LoginInfo)session.getAttribute("loginInfo");
            roomService.joinRoom(roomNo, loginInfo.getMbrId());
            jsonResult.setStatus("success");
            
        } catch (Throwable e) {
            e.printStackTrace();
            StringWriter out = new StringWriter();
            e.printStackTrace(new PrintWriter(out));
             
            jsonResult.setStatus("fail");
            jsonResult.setData(out.toString());
        }
        return jsonResult;
    }
    
    
    @RequestMapping("/getRoomInfo")
    @ResponseBody
    public Object getRoomMbr( int roomNo ) throws Exception {
         
    	System.out.println("컨트롤 : " + roomNo);
        JsonResult jsonResult = new JsonResult();
 
        try {
                jsonResult.setStatus("success");
                jsonResult.setData(roomService.getRoomInfo(roomNo));
                 
            } catch (Throwable e) {
            	e.printStackTrace();
                StringWriter out = new StringWriter();
                e.printStackTrace(new PrintWriter(out));
                 
                jsonResult.setStatus("fail");
                jsonResult.setData(out.toString());
            }
            return jsonResult;          
    }
    
}













