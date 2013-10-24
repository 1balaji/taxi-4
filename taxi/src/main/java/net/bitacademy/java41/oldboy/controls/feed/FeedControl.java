package net.bitacademy.java41.oldboy.controls.feed;

import java.util.List;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpSession;

import net.bitacademy.java41.oldboy.services.FeedService;
import net.bitacademy.java41.oldboy.services.ProjectService;
import net.bitacademy.java41.oldboy.vo.Feed;
import net.bitacademy.java41.oldboy.vo.LoginInfo;
import net.bitacademy.java41.oldboy.vo.Project;
import net.bitacademy.java41.oldboy.vo.ProjectMember;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/feed")
public class FeedControl {
	@Autowired ServletContext sc;
	@Autowired FeedService feedService;
	@Autowired ProjectService projectService;
	
	long curTime = 0;
	int count = 0;
	
	@RequestMapping("/list")
	public String list(
			int projectNo,
			HttpSession session, 
			Model model) throws Exception {
		Project project = projectService.getProjectInfo(projectNo);
		List<ProjectMember> projectMemberList = projectService.getProjectMemberList(projectNo);
		boolean isProjectMember = projectService.isProjectMember(projectNo, (LoginInfo) session.getAttribute("loginInfo"));
		List<Feed> feedList =  feedService.getFeedList(projectNo);
		String tmpContent = null;
		for( Feed feed : feedList ) {
			tmpContent = feed.getContent().replace("%nl&%", "<br>");
			feed.setContent(tmpContent);
		}
		model.addAttribute("project", project);
		model.addAttribute("projectMemberList", projectMemberList);
		model.addAttribute("isProjectMember", isProjectMember);
		model.addAttribute("feedList", feedList);
		
		return "feed/feedForm";
	}
	
	@RequestMapping("/add")
	public String add(Feed feed) throws Exception {
		String content = feed.getContent().replace("\n", "%nl&%");
		System.out.println(content);
		feed.setContent(content);
		feedService.addFeed(feed);
		
		return "redirect:../feed/list.do?projectNo=" + feed.getProjectNo();
	}
	
	@RequestMapping("/delete")
	public String delete(int projectNo, int feedNo) throws Exception {
		
		feedService.deleteFeed(projectNo, feedNo);

		return "redirect:../feed/list.do?projectNo=" + projectNo;
	}
			
	
}
