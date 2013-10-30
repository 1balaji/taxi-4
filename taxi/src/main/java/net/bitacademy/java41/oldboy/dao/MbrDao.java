package net.bitacademy.java41.oldboy.dao;

import net.bitacademy.java41.oldboy.vo.LoginInfo;
import net.bitacademy.java41.oldboy.vo.Mbr;


public interface MbrDao {

	int sample(String sampleValue) throws Exception;

	LoginInfo getLoginInfo(int mbrId) throws Exception;

	int signUp(Mbr mbr) throws Exception;

}
