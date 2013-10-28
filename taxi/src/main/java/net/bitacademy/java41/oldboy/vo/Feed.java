package net.bitacademy.java41.oldboy.vo;

import java.io.Serializable;
import java.sql.Timestamp;

import net.bitacademy.java41.oldboy.util.CustomTimestampSerializer;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;

public class Feed implements Serializable {
	private static final long serialVersionUID = 1L;

	protected int 			feedNo;
	protected String 		feedContent;
	protected int		 		feedWriterEmail;
	protected Timestamp	feedRegDate;
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
	public int getFeedWriterEmail() {
		return feedWriterEmail;
	}
	public Feed setFeedWriterEmail(int feedWriterEmail) {
		this.feedWriterEmail = feedWriterEmail;
		return this;
	}
	@JsonSerialize(using = CustomTimestampSerializer.class)
	public Timestamp getFeedRegDate() {
		return feedRegDate;
	}
	public Feed setFeedRegDate(Timestamp feedRegDate) {
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
