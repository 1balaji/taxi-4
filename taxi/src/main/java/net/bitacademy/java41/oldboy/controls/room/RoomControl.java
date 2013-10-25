package net.bitacademy.java41.oldboy.controls.room;

import javax.servlet.ServletContext;

import net.bitacademy.java41.oldboy.services.RoomService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/room")
public class RoomControl {
	@Autowired ServletContext sc;
	@Autowired RoomService roomService;
	
}













