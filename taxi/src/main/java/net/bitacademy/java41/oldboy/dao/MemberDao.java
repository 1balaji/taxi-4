package net.bitacademy.java41.oldboy.dao;

import java.util.List;
import java.util.Map;

import net.bitacademy.java41.oldboy.vo.Mbr;
import net.bitacademy.java41.oldboy.vo.ProjectMember;

public interface MemberDao {
	Mbr getMember(Map<String, String> paramMap) throws Exception;

	int addMember(Mbr member) throws Exception;
	
	List<ProjectMember> getProjectMemberList(int no) throws Exception;
	
	List<Mbr> getMemberList() throws Exception;
	
	int updateMember(Mbr member) throws Exception;
	
	int deleteMember(String email) throws Exception;
	
	int changePassword(Map<String, String> paramMap) throws Exception;

	String getCurPassword(String email) throws Exception;

}
