package net.bitacademy.java41.oldboy.util.gcm;

import net.bitacademy.java41.oldboy.services.GcmServiceImpl;

import org.quartz.JobExecutionContext;
import org.quartz.JobExecutionException;
import org.springframework.scheduling.annotation.Async;
import org.springframework.scheduling.quartz.QuartzJobBean;

public class JobQuartz extends QuartzJobBean {

    private GcmServiceImpl gcmService;

	  public JobQuartz(){}

	  @Async
	  protected void executeInternal(JobExecutionContext ctx)
			  									throws JobExecutionException {
		    try {
			  gcmService = (GcmServiceImpl)ctx.getJobDetail()
					  						  	.getJobDataMap()
					  						  		.get("gcmService");
			  gcmService.performService();

			} catch (Exception e) {
				e.printStackTrace();
			}
	  }
}