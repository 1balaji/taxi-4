package net.bitacademy.java41.oldboy.services;

import java.io.EOFException;
import java.io.IOException;
import java.util.List;
import java.util.Map;


public interface GcmService {

    abstract void performService() throws Exception;

    void asyncSend(List<Map<String, String>> gcmTargetMapList, Class<?> clazz) throws IOException, EOFException;

}