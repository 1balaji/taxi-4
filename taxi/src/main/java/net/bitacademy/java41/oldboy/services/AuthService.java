package net.bitacademy.java41.oldboy.services;

import net.bitacademy.java41.oldboy.vo.Mbr;

public interface AuthService {

	Mbr getUserInfo(String email, String password) throws Exception;

	LoginInfo getLoginInfo(String email, String password) throws Exception;
	
	LoginInfo getLoginInfo(String email) throws Exception;

	String getCurPassword(String email) throws Exception;

	

}
