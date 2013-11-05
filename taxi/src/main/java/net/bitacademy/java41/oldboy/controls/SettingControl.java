package net.bitacademy.java41.oldboy.controls;

import javax.servlet.ServletContext;

import net.bitacademy.java41.oldboy.services.SettingService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/setting")
public class SettingControl {
	@Autowired ServletContext sc;
	@Autowired SettingService settingService;
	
	
}













