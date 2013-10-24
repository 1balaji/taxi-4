package net.bitacademy.java41.oldboy.controls;

import java.util.List;

import javax.servlet.http.HttpSession;

import net.bitacademy.java41.oldboy.services.ProjectService;
import net.bitacademy.java41.oldboy.vo.LoginInfo;
import net.bitacademy.java41.oldboy.vo.Project;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class HeaderControl {
	@Autowired ProjectService projectService;
	
	@RequestMapping("/header")
	public String header (
				HttpSession session,
				Model model ) throws Exception {
		LoginInfo loginInfo = (LoginInfo) session.getAttribute("loginInfo");
		List<Project> myProjectList = projectService.getMyProjectList(loginInfo.getEmail());
		
		model.addAttribute("myProjectList", myProjectList);
		
		return "header";
	}

}
