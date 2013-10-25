package net.bitacademy.java41.oldboy.controls.feed;

import javax.servlet.ServletContext;

import net.bitacademy.java41.oldboy.services.FeedService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/feed")
public class FeedControl {
	@Autowired ServletContext sc;
	@Autowired FeedService feedService;
				
	
}
