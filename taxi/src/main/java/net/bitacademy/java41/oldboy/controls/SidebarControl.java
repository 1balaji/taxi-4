package net.bitacademy.java41.oldboy.controls;

import javax.servlet.http.HttpSession;

import net.bitacademy.java41.oldboy.services.ProjectService;
import net.bitacademy.java41.oldboy.vo.LoginInfo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class SidebarControl {
	@Autowired ProjectService projectService;
	
	@RequestMapping("/sidebar")
	public String execute(
			HttpSession session, Model model) throws Exception {
		LoginInfo loginInfo = (LoginInfo) session.getAttribute("loginInfo");
		model.addAttribute("projectList", projectService.getMyProjectList(loginInfo.getEmail()));
		
		return "sidebar";
	}
}







