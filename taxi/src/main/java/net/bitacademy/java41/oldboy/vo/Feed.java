package net.bitacademy.java41.oldboy.vo;

import java.io.Serializable;
import java.util.Date;

import net.bitacademy.java41.oldboy.util.CustomDateSerializer;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;

public class Feed implements Serializable {
	private static final long serialVersionUID = 1L;

	protected int 			feedNo;
	protected String 		feedContent;
	protected String			feedWriterId;
	protected Date			feedRegDate;
	protected int 			feedRoomNo;
	
	public int getFeedNo() {
		return feedNo;
	}
	public Feed setFeedNo(int feedNo) {
		this.feedNo = feedNo;
		return this;
	}
	public String getFeedContent() {
		return feedContent;
	}
	public Feed setFeedContent(String feedContent) {
		this.feedContent = feedContent;
		return this;
	}
	public String getFeedWriterId() {
		return feedWriterId;
	}
	public Feed setFeedWriterId(String feedWriterId) {
		this.feedWriterId = feedWriterId;
		return this;
	}
	@JsonSerialize(using = CustomDateSerializer.class)
	public Date getFeedRegDate() {
		return feedRegDate;
	}
	public Feed setFeedRegDate(Date feedRegDate) {
		this.feedRegDate = feedRegDate;
		return this;
	}
	public int getFeedRoomNo() {
		return feedRoomNo;
	}
	public Feed setFeedRoomNo(int feedRoomNo) {
		this.feedRoomNo = feedRoomNo;
		return this;
	}
		
}
