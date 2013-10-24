package net.bitacademy.java41.oldboy.dao;

import java.util.List;

import net.bitacademy.java41.oldboy.vo.Project;

public interface ProjectDao {
	
	List<Project> getProjectList() throws Exception;
	
	List<Project> getUserProjectList(String email) throws Exception;
	
	Project getProjectInfo(int no) throws Exception;
	
	int addProject(Project project) throws Exception;

	int update(Project project) throws Exception;

	int deleteProject(int projectNo) throws Exception;	
}
