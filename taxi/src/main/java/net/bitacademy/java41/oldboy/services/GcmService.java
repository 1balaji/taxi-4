package net.bitacademy.java41.oldboy.services;

import java.io.EOFException;
import java.io.IOException;
import java.util.List;

import net.bitacademy.java41.oldboy.vo.RoomMbr;


public abstract interface GcmService {

    abstract void performService() throws Exception;

    void asyncSend(List<RoomMbr> list, boolean request) throws IOException, EOFException;

}