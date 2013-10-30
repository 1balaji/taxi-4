package net.bitacademy.java41.oldboy.services;

import net.bitacademy.java41.oldboy.vo.LoginInfo;


public interface AuthService {
	
	int sample(String sampleValue) throws Exception;
	
	LoginInfo getLoginInfo(int mbrId) throws Exception ;;

}
