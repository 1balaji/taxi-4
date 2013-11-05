package net.bitacademy.java41.oldboy.services;

import net.bitacademy.java41.oldboy.dao.SettingDao;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class SettingServiceImpl implements SettingService {
	@Autowired SettingDao settingDao; 
	

}
