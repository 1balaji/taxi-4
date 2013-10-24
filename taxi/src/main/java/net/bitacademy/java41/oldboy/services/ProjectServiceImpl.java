package net.bitacademy.java41.oldboy.services;

import java.util.HashMap;
import java.util.List;

import net.bitacademy.java41.oldboy.dao.FeedDao;
import net.bitacademy.java41.oldboy.dao.MemberDao;
import net.bitacademy.java41.oldboy.dao.ProjectDao;
import net.bitacademy.java41.oldboy.dao.ProjectMemberDao;
import net.bitacademy.java41.oldboy.vo.LoginInfo;
import net.bitacademy.java41.oldboy.vo.Project;
import net.bitacademy.java41.oldboy.vo.ProjectMember;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.PlatformTransactionManager;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

@Service
public class ProjectServiceImpl implements ProjectService {
	@Autowired TaskService taskService;
	@Autowired ProjectDao projectDao;
	@Autowired FeedDao feedDao;
	@Autowired ProjectMemberDao projectMemberDao;
	@Autowired MemberDao memberDao;
	@Autowired PlatformTransactionManager txManager;

	
	public List<Project> getMyProjectList(String email) throws Exception {
		return projectDao.getUserProjectList(email);
	}

	public List<Project> getTotalProjectList() throws Exception {
		return projectDao.getProjectList();
	}
	
	public Project getProjectInfo(int no) throws Exception {
		return projectDao.getProjectInfo(no);
	}
	
	public List<ProjectMember> getProjectMemberList(int no) throws Exception {
		return memberDao.getProjectMemberList(no);
	}
	
	@Transactional(propagation=Propagation.REQUIRED, rollbackFor=Throwable.class)
	public void resisterProject(Project project) throws Exception {
		try {
			projectDao.addProject(project);
			
			HashMap<String,Object> paramMap = new HashMap<String,Object>();
			paramMap.put("email", project.getPlEmail());
			paramMap.put("projectNo", project.getNo());
			paramMap.put("projectMemberLevel", 0);
			
			projectMemberDao.addProjectMember(paramMap);
			
		} catch (Exception e) {
			throw e;
		}
		
	}
	
	@Transactional(propagation=Propagation.REQUIRED, rollbackFor=Throwable.class)
	public int deleteProject(int projectNo) throws Exception {
		try {
			taskService.deleteTask(projectNo, 0);
			
			this.deleteProjectMember(projectNo, 0, null);
			
			int count = projectDao.deleteProject(projectNo);
			
			return count;
			
		} catch (Exception e) {
			throw e;
		}
	}
	
	@Transactional(propagation=Propagation.REQUIRED, rollbackFor=Throwable.class)
	public int deleteProjectMember(int projectNo, int feedNo, String email) throws Exception {
		
		try {
			HashMap<String, Object> paramMap = new HashMap<String, Object>();
			paramMap.put("projectNo", projectNo);
			paramMap.put("feedNo", feedNo);
			paramMap.put("email", email);
			
			feedDao.deleteFeed(paramMap);
			
			int count = projectMemberDao.deleteProjectMember(paramMap);
			return count;
		} catch (Exception e) {
			throw e;
		}
	}
	
	@Transactional(propagation=Propagation.REQUIRED, rollbackFor=Throwable.class)
	public int projectUpdate(Project project) throws Exception {
		return projectDao.update(project);
	}

	@Override
	public boolean isProjectMember(int projectNo, LoginInfo loginInfo)
			throws Exception {
		List<ProjectMember> projectMemberList = this.getProjectMemberList(projectNo);
		for( ProjectMember projectMember : projectMemberList ) {
			if ( projectMember.getEmail().equals(loginInfo.getEmail()) ) {
				return true;
			}
		}
		return false;
	}

	

}
