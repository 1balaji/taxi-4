package net.bitacademy.java41.oldboy.services;

import java.util.List;

import net.bitacademy.java41.oldboy.vo.FvrtLoc;
import net.bitacademy.java41.oldboy.vo.Mbr;


public interface MemberService {

	void signUp(Mbr mbr) throws Exception ;
	
	List<FvrtLoc> getFvrtLoc(String mbrId) throws Exception; 
	  
    void addFvrtLoc(FvrtLoc fvrtLoc) throws Exception; 
	
}
