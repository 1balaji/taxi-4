package net.bitacademy.java41.oldboy.dao;

import java.util.List;
import java.util.Map;

import net.bitacademy.java41.oldboy.vo.Member;
import net.bitacademy.java41.oldboy.vo.ProjectMember;

public interface MemberDao {
	Member getMember(Map<String, String> paramMap) throws Exception;

	int addMember(Member member) throws Exception;
	
	List<ProjectMember> getProjectMemberList(int no) throws Exception;
	
	List<Member> getMemberList() throws Exception;
	
	int updateMember(Member member) throws Exception;
	
	int deleteMember(String email) throws Exception;
	
	int changePassword(Map<String, String> paramMap) throws Exception;

	String getCurPassword(String email) throws Exception;

}
