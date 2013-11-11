package net.bitacademy.java41.oldboy.dao;

import net.bitacademy.java41.oldboy.vo.Setting;



public interface SettingDao {
	
	int deleteSetting(String mbrId) throws Exception;

	void addSetting(Setting setting) throws Exception;
}
