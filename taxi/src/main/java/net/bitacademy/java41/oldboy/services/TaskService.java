package net.bitacademy.java41.oldboy.services;

import java.util.List;

import net.bitacademy.java41.oldboy.vo.Task;

public interface TaskService {

	List<Task> getTaskList(int no) throws Exception;
	
	Task getTask(int projectNo, int taskNo)throws Exception;
	
	int updateTask(Task task) throws Exception;
	
	int addTask(Task task) throws Exception;
	
	int deleteTask(int projectNo, int taskNo) throws Exception;
	
}
