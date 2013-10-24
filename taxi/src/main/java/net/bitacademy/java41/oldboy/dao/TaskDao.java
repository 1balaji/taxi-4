package net.bitacademy.java41.oldboy.dao;

import java.util.List;
import java.util.Map;

import net.bitacademy.java41.oldboy.vo.Task;

public interface TaskDao {
	
	Task getTask(Map<String, Object> paramMap) throws Exception;
	
	List<Task> getTaskList(int no) throws Exception;

	int updateTask(Task task) throws Exception;
	
	int addTask(Task task) throws Exception;

	int deleteTask(Map<String, Object> paramMap) throws Exception;
	
	
}
