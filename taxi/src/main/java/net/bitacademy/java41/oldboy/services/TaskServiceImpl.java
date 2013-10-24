package net.bitacademy.java41.oldboy.services;

import java.util.HashMap;
import java.util.List;

import net.bitacademy.java41.oldboy.dao.TaskDao;
import net.bitacademy.java41.oldboy.vo.Task;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

@Service
public class TaskServiceImpl implements TaskService {
	@Autowired TaskDao taskDao;
	

	public List<Task> getTaskList(int no) throws Exception {
		return taskDao.getTaskList(no);
	}
	
	public Task getTask(int projectNo, int taskNo)throws Exception{
		HashMap<String,Object> paramMap = new HashMap<String,Object>();
		paramMap.put("projectNo", projectNo);
		paramMap.put("taskNo", taskNo);
		
		return taskDao.getTask(paramMap);
	}
	
	@Transactional(propagation=Propagation.REQUIRED, rollbackFor=Throwable.class)
	public int updateTask(Task task) throws Exception {
		try {
			return taskDao.updateTask(task);
			
		} catch (Exception e) {
			throw e;
		}
	}
	
	@Transactional(propagation=Propagation.REQUIRED, rollbackFor=Throwable.class)
	public int addTask(Task task) throws Exception {
		try {
			return taskDao.addTask(task);
			
		} catch (Exception e) {
			throw e;
		}
		
	}
	
	@Transactional(propagation=Propagation.REQUIRED, rollbackFor=Throwable.class)
	public int deleteTask(int projectNo, int taskNo) throws Exception {
		try {
			HashMap<String,Object> paramMap = new HashMap<String,Object>();
			paramMap.put("projectNo", projectNo);
			paramMap.put("taskNo", taskNo);
			
			return taskDao.deleteTask(paramMap);
			
		} catch (Exception e) {
			throw e;
		}
	}

}
