package net.bitacademy.java41.oldboy.services;

import java.util.List;

import net.bitacademy.java41.oldboy.vo.LoginInfo;
import net.bitacademy.java41.oldboy.vo.Mbr;
import net.bitacademy.java41.oldboy.vo.Project;

public interface MemberService {

	LoginInfo signUp(Mbr member) throws Exception;

	int addMember(Mbr member) throws Exception;
	
	List<Mbr> getTotalMemberList() throws Exception;

	Mbr getMemberInfo(String email) throws Exception;

	List<Project> getUserProjectList(String email) throws Exception;
	
	int isChangePassword(String email, String oldPassword, String newPassword) throws Exception;
	
	int updateMemberInfo(Mbr member) throws Exception;
	
	LoginInfo updateMyInfo(Mbr member) throws Exception;
	
	int deleteMember(String email) throws Exception;


}
