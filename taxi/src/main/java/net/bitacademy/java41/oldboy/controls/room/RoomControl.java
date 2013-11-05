package net.bitacademy.java41.oldboy.controls.room;

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
			System.out.println("startTime : " + startTime 
					+ "\nstart: " + startLat + ", " + startLng + " | " + startRange 
					+ "\nend : " + endLat + ", " + endLng + " | " + endRange);
//			Date startTimeDate = new Date( Long.parseLong(startTime) );
//			System.out.println(sdf.format(startTimeDate));
			
			LoginInfo loginInfo = (LoginInfo) session.getAttribute("loginInfo");
			jsonResult.setData( roomService.searchRooms( loginInfo.getMbrId(), startTime, 
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
        List<PathLoc> listPathLoc = new ArrayList<PathLoc>();
        PathLoc endPathLoc = new PathLoc();
        LoginInfo loginInfo = (LoginInfo) session.getAttribute("loginInfo");
         
        String memberId = loginInfo.getMbrId();
         
        endPathLoc.setPathLocRank(endLocRank);
        endPathLoc.setPathLocName(endLocName);
        endPathLoc.setPathLocLat(endLocLat);
        endPathLoc.setPathLocLng(endLocLng);
//      System.out.println(EndPathLoc.getPathLocLng());
         
        listPathLoc.add(startPathLoc);
        listPathLoc.add(endPathLoc);
        room.setPathLocList(listPathLoc);
//      room.setRoomMbrList(roomMbrList);
        JsonResult jsonResult= new JsonResult();
        try {
            roomService.addRoom(room, memberId);
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
}













