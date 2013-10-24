package net.bitacademy.java41.oldboy.controls.task;

import java.io.File;
import java.io.PrintWriter;
import java.io.StringWriter;
import java.util.List;

import javax.servlet.ServletContext;

import net.bitacademy.java41.oldboy.services.ProjectService;
import net.bitacademy.java41.oldboy.services.TaskService;
import net.bitacademy.java41.oldboy.vo.JsonResult;
import net.bitacademy.java41.oldboy.vo.Project;
import net.bitacademy.java41.oldboy.vo.ProjectMember;
import net.bitacademy.java41.oldboy.vo.Task;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

@Controller
@RequestMapping("/task")
public class TaskControl {
	@Autowired ServletContext sc;
	@Autowired TaskService taskService;
	@Autowired ProjectService projectService;
	
	long curTime = 0;
	int count = 0;
	
	@RequestMapping("/list")
	@ResponseBody
	public Object list(
			int projectNo) throws Exception {
		
		JsonResult jsonResult = new JsonResult();
		try {
			
			projectService.getProjectInfo(projectNo);
			projectService.getProjectMemberList(projectNo);
			taskService.getTaskList(projectNo);
			
			jsonResult.setStatus("success");
		} catch (Throwable e) {
			StringWriter out = new StringWriter();
			e.printStackTrace(new PrintWriter(out));
			
			jsonResult.setStatus("fail");
			jsonResult.setData(out.toString());
		}
		return jsonResult;
	}
	
	@RequestMapping(value="/add", method=RequestMethod.GET)
	public String addForm(
			int projectNo, 
			Model model ) throws Exception {
		Project project = projectService.getProjectInfo(projectNo);
		model.addAttribute("project", project);
		
		return "task/taskAddForm";
	}
	
	@RequestMapping(value="/add", method=RequestMethod.POST)
	public String add(
			Task task, 
			@RequestParam("uiProto") MultipartFile fileItem ) throws Exception {
		String filename = null;
		if (fileItem.getSize() > 0) {
			filename = getNewFileName();
			String path = sc.getAttribute("rootRealPath") + "res/ui/" + filename;
			fileItem.transferTo( new File(path) );
		}
		task.setUiProtoUrl(filename);
		taskService.addTask(task);
			
		return "redirect:../task/list.do?projectNo=" + task.getProjectNo();
	}
	
	@RequestMapping("/view")
	public String view(
			int projectNo, 
			int taskNo, 
			Model model) throws Exception {
		Project project = projectService.getProjectInfo(projectNo);
		List<ProjectMember> projectMemberList = projectService.getProjectMemberList(projectNo);
		Task task = taskService.getTask(projectNo, taskNo);
		
		model.addAttribute("project", project);
		model.addAttribute("projectMemberList", projectMemberList);
		model.addAttribute("task", task);
		
		return "task/taskView";
	}
	
	@RequestMapping(value="/update", method=RequestMethod.GET)
	public String updateFrom(
			int projectNo, 
			int taskNo, 
			Model model ) throws Exception {
		Project project = projectService.getProjectInfo(projectNo);
		Task task = taskService.getTask(projectNo, taskNo);

		model.addAttribute("project", project);
		model.addAttribute("task", task);
		
		return "task/taskUpdateForm";
	}
	
	@RequestMapping(value="/update", method=RequestMethod.POST)
	public String update(
			Task task, 
			@RequestParam("uiProto") MultipartFile fileItem, 
			String tmpFilename, 
			Model model) throws Exception {
		String filename = null;
		if (fileItem.getSize() > 0) {
			filename = getNewFileName();
			String path = sc.getAttribute("rootRealPath") + "res/ui/" + filename;
			fileItem.transferTo( new File(path) );
		}
		if (filename != null) {
			task.setUiProtoUrl(filename);
		} else {
			task.setUiProtoUrl(tmpFilename);
		}
		
		String returnUrl = sc.getAttribute("rootPath") + "/main.do";
		String resutlStatus = "";
		int result = taskService.updateTask(task); 
		if (result > 0) {
			returnUrl = sc.getAttribute("rootPath") + "/task/view.do?projectNo=" + task.getProjectNo() + "&taskNo=" + task.getTaskNo();
			resutlStatus = "UPDATE_SUCCESS";
		} else {
			returnUrl = sc.getAttribute("rootPath") + "/task/update.do?projectNo=" + task.getProjectNo() + "&taskNo=" + task.getTaskNo();
			resutlStatus = "UPDATE_FAIL";
		}
		
		model.addAttribute("returnUrl", returnUrl);
		model.addAttribute("resultStatus", resutlStatus);
		
		return "task/taskResult";
	}
	
	@RequestMapping("/delete")
	public String delete(
			int projectNo, 
			int taskNo, 
			Model model ) throws Exception {
		String returnUrl = sc.getAttribute("rootPath") + "/main.do";
		String resutlStatus = "";
		if (taskService.deleteTask(projectNo, taskNo) > 0) {
			returnUrl = sc.getAttribute("rootPath") + "/task/list.do?projectNo=" + projectNo;
			resutlStatus = "DELETE_SUCCESS";
		} else {
			returnUrl = sc.getAttribute("rootPath") + "/task/view.do?projectNo=" + projectNo + "&taskNo=" + taskNo;
			resutlStatus = "DELETE_FAIL";
		}
		
		model.addAttribute("returnUrl", returnUrl);
		model.addAttribute("resultStatus", resutlStatus);
		return "task/taskResult";
	}
	

	synchronized
	private String getNewFileName() {
		long millis = System.currentTimeMillis();
		if (curTime != millis) {
			curTime = millis;
			count = 0;
		}
		return "uiproto_" + millis + "_" + (++count);
	}
		
}
