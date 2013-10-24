package net.bitacademy.java41.oldboy.controls.auth;

import java.util.HashMap;

import javax.servlet.ServletContext;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import net.bitacademy.java41.oldboy.services.AuthService;
import net.bitacademy.java41.oldboy.vo.JsonResult;
import net.bitacademy.java41.oldboy.vo.LoginInfo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.support.SessionStatus;


@Controller
@RequestMapping("/auth")
public class AuthControl {
	@Autowired ServletContext sc;
	@Autowired AuthService authService;

//	@RequestMapping(value="/login", method=RequestMethod.GET)
//	public String loginForm(
//			boolean isSaveId,
//			@CookieValue(value="email", required=false) String email,
//			Model model ) {
//		
//		if (email != null) {
//			isSaveId = true;
//		}
//		
//		model.addAttribute("email", email);
//		model.addAttribute("isSaveId", isSaveId);
//		return "auth/loginForm";
//	}
	
	@RequestMapping("/loginInfo")
	@ResponseBody
	public Object loginInfo(HttpSession session, SessionStatus status) throws Exception {
		LoginInfo loginInfo = (LoginInfo) session.getAttribute("loginInfo");

		HashMap<String, Object> jsonResultMap = new HashMap<String, Object>();
		HashMap<String, Object> sessionMap = new HashMap<String, Object>();
		sessionMap.put("rootPath", sc.getAttribute("rootPath"));
		sessionMap.put("rootRealPath", sc.getAttribute("rootRealPath"));
		if (loginInfo != null) {
			sessionMap.put("isLogin", true);
			sessionMap.put("email", loginInfo.getEmail());
			sessionMap.put("name", loginInfo.getName());
			sessionMap.put("tel", loginInfo.getTel());
			sessionMap.put("blog", loginInfo.getBlog());
			sessionMap.put("regDate", loginInfo.getRegDate());
			sessionMap.put("postNo", loginInfo.getPostNo());
			sessionMap.put("level", loginInfo.getLevel());
			sessionMap.put("photo", loginInfo.getPhoto());
			
			jsonResultMap.put("status", "success");
		} else {
			status.setComplete();
			sessionMap.put("isLogin", false);
			
			jsonResultMap.put("status", "fail");
		}
		
		jsonResultMap.put("session", sessionMap);
		
		return jsonResultMap;
		
	}
	
	@RequestMapping(value="/login", method=RequestMethod.POST)
	@ResponseBody
	public Object login(
				String email,
				String password,
				String saveId, 
				HttpServletResponse response, 
				HttpSession session, 
				SessionStatus status ) throws Exception {
		LoginInfo loginInfo = authService.getLoginInfo(email, password);
		
		if(saveId != null) {
			Cookie cookie = new Cookie("email", email);
			cookie.setMaxAge(60 * 60 * 24); // 하루
			response.addCookie(cookie);
		} else {
			Cookie cookie = new Cookie("email", null);
			cookie.setMaxAge(0); 
			response.addCookie(cookie);
		}

		JsonResult jsonResult = null;
		if (loginInfo != null) {
			session.setAttribute("loginInfo", loginInfo);
			jsonResult =  new JsonResult().setStatus("success");
		} else {
			status.setComplete();
			jsonResult =  new JsonResult().setStatus("fail");
		}
		
		return jsonResult;
	}
	
	@RequestMapping("/logout")
	@ResponseBody
	public Object logout(SessionStatus status) throws Exception {
		status.setComplete();
		JsonResult jsonResult = new JsonResult().setStatus("success");
		
		return jsonResult;
	}

}
