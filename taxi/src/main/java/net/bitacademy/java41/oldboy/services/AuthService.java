package net.bitacademy.java41.oldboy.services;

import net.bitacademy.java41.oldboy.vo.LoginInfo;
import net.bitacademy.java41.oldboy.vo.Member;

public interface AuthService {

	Member getUserInfo(String email, String password) throws Exception;

	LoginInfo getLoginInfo(String email, String password) throws Exception;
	
	LoginInfo getLoginInfo(String email) throws Exception;

	String getCurPassword(String email) throws Exception;

	

}
