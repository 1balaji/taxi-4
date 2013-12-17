package net.bitacademy.java41.oldboy.services;

import java.io.EOFException;
import java.io.IOException;
import java.util.List;
import java.util.Map;

import net.bitacademy.java41.oldboy.vo.RoomMbr;


public abstract interface GcmService {

    abstract void performService() throws Exception;

    void asyncSend(List<RoomMbr> list, Class<?> clazz, Map<String, String> bundleMap) throws IOException, EOFException;

}