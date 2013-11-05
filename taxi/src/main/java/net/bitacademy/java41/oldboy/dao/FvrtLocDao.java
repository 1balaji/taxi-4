package net.bitacademy.java41.oldboy.dao;

import java.util.List;

import net.bitacademy.java41.oldboy.vo.FvrtLoc;

public interface FvrtLocDao {

	List<FvrtLoc> getFvrtLoc(String mbrId) throws Exception;
	 
    int addFvrtLoc(FvrtLoc fvrtLoc);

}
