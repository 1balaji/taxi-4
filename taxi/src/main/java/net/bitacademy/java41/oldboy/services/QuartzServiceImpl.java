package net.bitacademy.java41.oldboy.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public  class QuartzServiceImpl implements QuartzService {

	@Autowired GcmService gcmService;
	@Autowired RoomService roomService;

	public QuartzServiceImpl(){}

	public void performService() throws Exception {
		gcmService.performService();
	}

	public void roomCheckService() throws Exception {
		roomService.removeRoom();
	}

}
