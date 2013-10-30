package net.bitacademy.java41.oldboy.controls.room;

import java.io.PrintWriter;
import java.io.StringWriter;

import javax.servlet.ServletContext;

import net.bitacademy.java41.oldboy.services.RoomService;
import net.bitacademy.java41.oldboy.vo.JsonResult;

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
	public JsonResult view(double startLat, double startLng, 
			double endLat, double endLng, String startDateTime) throws Exception {
		JsonResult jsonResult = new JsonResult();
		try {
			jsonResult.setData( roomService.searchRooms(startLat, startLng, endLat, endLng, startDateTime) );
			
			jsonResult.setStatus("success");
			
		} catch (Throwable e) {
			StringWriter out =  new StringWriter();
			e.printStackTrace(new PrintWriter(out));
			
			jsonResult.setStatus("fail");
			jsonResult.setData(out.toString());
		}
		
		return jsonResult;
	}
}













