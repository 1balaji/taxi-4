package net.bitacademy.java41.oldboy.util.quartz;

import net.bitacademy.java41.oldboy.services.QuartzServiceImpl;

import org.quartz.JobExecutionContext;
import org.quartz.JobExecutionException;
import org.springframework.scheduling.annotation.Async;
import org.springframework.scheduling.quartz.QuartzJobBean;

public class JobQuartz extends QuartzJobBean {

    private QuartzServiceImpl quartzService;

	  public JobQuartz(){}

	  @Async
	  protected void executeInternal(JobExecutionContext ctx)
			  									throws JobExecutionException {

		  quartzService = (QuartzServiceImpl)ctx.getJobDetail()
				  										.getJobDataMap()
				  												.get("quartzService");

		  try {
			  if (ctx.getTrigger().getClass().getCanonicalName()
					  	.equals("org.quartz.impl.triggers.SimpleTriggerImpl")){

				  quartzService.performService();

			  } else {
				  quartzService.roomCheckService();
			  }
		  } catch (Exception e) {
				e.printStackTrace();
		  }
	 }
}