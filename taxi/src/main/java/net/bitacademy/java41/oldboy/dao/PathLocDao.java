package net.bitacademy.java41.oldboy.dao;

import java.util.List;

import net.bitacademy.java41.oldboy.vo.PathLoc;

public interface PathLocDao {

	List<PathLoc> getPathLocList(int roomNo) throws Exception;

	int addPathLocList(List<PathLoc> listPath) throws Exception;
}
