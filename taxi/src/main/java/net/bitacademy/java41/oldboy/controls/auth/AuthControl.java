package net.bitacademy.java41.oldboy.controls.auth;

import javax.servlet.ServletContext;

import net.bitacademy.java41.oldboy.services.AuthService;
import net.bitacademy.java41.oldboy.vo.JsonResult;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;


@Controller
@RequestMapping("/auth")
public class AuthControl {
	@Autowired ServletContext sc;
	@Autowired AuthService authService;

	@RequestMapping(value="/sample")
	@ResponseBody
	public Object login( String sampleValue ) throws Exception {
		int count = authService.sample("sample");
		
		JsonResult jsonResult = null;
		if (count > 0) {
			jsonResult =  new JsonResult().setStatus("success");
		} else {
			jsonResult =  new JsonResult().setStatus("fail");
		}
		
		return jsonResult;
	}

}
