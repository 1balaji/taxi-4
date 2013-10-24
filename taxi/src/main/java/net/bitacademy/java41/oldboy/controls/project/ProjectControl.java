package net.bitacademy.java41.oldboy.controls.project;

import java.io.PrintWriter;
import java.io.StringWriter;
import java.util.HashMap;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpSession;

import net.bitacademy.java41.oldboy.services.ProjectService;
import net.bitacademy.java41.oldboy.vo.JsonResult;
import net.bitacademy.java41.oldboy.vo.LoginInfo;
import net.bitacademy.java41.oldboy.vo.Project;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping("/project")
public class ProjectControl {
	@Autowired ServletContext sc;
	@Autowired ProjectService projectService;
	
	
	@RequestMapping("/myProjectList")
	@ResponseBody
	public Object list(HttpSession session) throws Exception {
		JsonResult jsonResult = new JsonResult();
		try {
			LoginInfo loginInfo = (LoginInfo) session.getAttribute("loginInfo");
			
			jsonResult.setData(projectService.getMyProjectList(loginInfo.getEmail()));
			jsonResult.setStatus("success");
		} catch (Throwable e) {
			StringWriter out = new StringWriter();
			e.printStackTrace(new PrintWriter(out));
			
			jsonResult.setData(out.toString());
			jsonResult.setStatus("fail");
		}
		
		return jsonResult;
	}

	@RequestMapping("/list")
	@ResponseBody
	public Object list() throws Exception {
		JsonResult jsonResult = new JsonResult();
		try {
			jsonResult.setData( projectService.getTotalProjectList() );
			jsonResult.setStatus("success");
			
		} catch (Throwable e) {
			StringWriter out = new StringWriter();
			e.printStackTrace(new PrintWriter(out));
			
			jsonResult.setData(out.toString());
			jsonResult.setStatus("fail");
		}
		
		return jsonResult;
	}
	
//	@RequestMapping(value="/add", method=RequestMethod.GET)
//	public String addForm() throws Exception {
//		return "project/projectAddForm";
//	}
	
	@RequestMapping(value="/add", method=RequestMethod.POST)
	@ResponseBody
	public Object add( Project project, HttpSession session ) throws Exception {
		JsonResult jsonResult = new JsonResult();
		try {
			LoginInfo loginInfo = (LoginInfo) session.getAttribute("loginInfo");
			project.setPlEmail(loginInfo.getEmail())
					.setPlName(loginInfo.getName())
					.setPlTel(loginInfo.getTel());
			projectService.resisterProject(project);
			
			jsonResult.setStatus("success");
			
		} catch (Throwable e) {
			StringWriter out = new StringWriter();
			e.printStackTrace(new PrintWriter(out));
			
			jsonResult.setData(out.toString());
			jsonResult.setStatus("fail");
		}
		
		return jsonResult;
	}

	@RequestMapping("/view")
	@ResponseBody
	public Object view( int projectNo ) throws Exception {
		HashMap<String, Object> jsonResultMap = new HashMap<String, Object>();
		try {
			jsonResultMap.put("project", projectService.getProjectInfo(projectNo) );
			jsonResultMap.put("projectMemberList", projectService.getProjectMemberList(projectNo) );
			jsonResultMap.put("status", "success");
			
		} catch (Throwable e) {
			StringWriter out = new StringWriter();
			e.printStackTrace(new PrintWriter(out));
			
			jsonResultMap.put("data", out.toString());
			jsonResultMap.put("status", "fail");
		}
		
		return jsonResultMap;
	}
	
//	@RequestMapping(value="/update", method=RequestMethod.GET)
//	public String updateForm(
//			@RequestParam("no") int projectNo,
//			Model model ) throws Exception {
//		Project project = projectService.getProjectInfo(projectNo);
//		model.addAttribute("project", project);
//		
//		return "project/projectUpdateForm";
//	}
	
	@RequestMapping(value="/update", method=RequestMethod.POST)
	@ResponseBody
	public Object update( Project project ) throws Exception {
		JsonResult jsonResult = new JsonResult();
		try {
			if ( projectService.projectUpdate(project) > 0 ) {
				jsonResult.setStatus("success");
			} else {
				jsonResult.setStatus("fail");
			}
			
		} catch (Throwable e) {
			StringWriter out = new StringWriter();
			e.printStackTrace(new PrintWriter(out));
			
			jsonResult.setData(out.toString());
			jsonResult.setStatus("fail");
		}
		
		return jsonResult;
	}
	
	
	@RequestMapping("/delete")
	@ResponseBody
	public Object delete(  int projectNo ) throws Exception {
		JsonResult jsonResult = new JsonResult();
		try {
			if ( projectService.deleteProject(projectNo) > 0 ) {
				jsonResult.setStatus("success");
			} else {
				jsonResult.setStatus("fail");
			}
			
		} catch (Throwable e) {
			StringWriter out = new StringWriter();
			e.printStackTrace(new PrintWriter(out));
			
			jsonResult.setData(out.toString());
			jsonResult.setStatus("fail");
		}
		
		return jsonResult;
	}
}