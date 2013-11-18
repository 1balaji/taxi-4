package net.bitacademy.java41.oldboy.controls;

import java.io.PrintWriter;
import java.io.StringWriter;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpSession;

import net.bitacademy.java41.oldboy.services.MemberService;
import net.bitacademy.java41.oldboy.vo.FvrtLoc;
import net.bitacademy.java41.oldboy.vo.JsonResult;
import net.bitacademy.java41.oldboy.vo.LoginInfo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping("/member")
public class MemberControl {
	@Autowired ServletContext sc;
	@Autowired MemberService memberService;
	
	@RequestMapping("/leaveMember")
    @ResponseBody
    public Object leaveMember(HttpSession session) throws Exception {
        JsonResult jsonResult = new JsonResult();
         
        try {
            LoginInfo loginInfo = (LoginInfo)session.getAttribute("loginInfo");
            String mbrId = loginInfo.getMbrId();
            jsonResult.setData(mbrId);
            memberService.leaveMember(mbrId);
            jsonResult.setStatus("success");
             
             
        } catch (Throwable e) {
            e.printStackTrace();
            StringWriter out = new StringWriter();
            e.printStackTrace(new PrintWriter(out));
             
            jsonResult.setStatus("fail");
            jsonResult.setData(out.toString());
        }
         
        return jsonResult;
    }
	
	@RequestMapping("/addFavoritePlace")
    @ResponseBody
    public Object addFavoritePlace( HttpSession session,
                                    LoginInfo loginInfo, 
                                    FvrtLoc fvrtLoc ) throws Exception {
                 
	       JsonResult jsonResult = new JsonResult();
	         
	        try {
	            loginInfo = (LoginInfo) session.getAttribute("loginInfo");
	            fvrtLoc.setMbrId(loginInfo.getMbrId());
	            
	            memberService.addFavoritePlace(fvrtLoc);
	            
	            jsonResult.setStatus("success");
	            System.out.println("Add Control success");
	             
	        } catch (Throwable e) {
	            StringWriter out = new StringWriter();
	            e.printStackTrace(new PrintWriter(out));
	             
	            jsonResult.setStatus("fail");
	            jsonResult.setData(out.toString());
	        }
	         
	        return jsonResult;
    }
             
    @RequestMapping("/getFavoritePlaces")
    @ResponseBody
    public Object getFavoritePlaces( HttpSession session ) throws Exception {
         
        JsonResult jsonResult = new JsonResult();
 
        try {
             
            LoginInfo loginInfo = (LoginInfo) session.getAttribute("loginInfo");
            System.out.println("loginInfo :" + loginInfo.getMbrId());
             
                jsonResult.setStatus("success");
                jsonResult.setData(memberService.getFavoritePlaces(loginInfo.getMbrId()));
                 
            } catch (Throwable e) {
            	e.printStackTrace();
                StringWriter out = new StringWriter();
                e.printStackTrace(new PrintWriter(out));
                 
                jsonResult.setStatus("fail");
                jsonResult.setData(out.toString());
            }
            return jsonResult;          
    }
    
    
    @RequestMapping("/deleteFavoritePlace")
    @ResponseBody
    public Object deleteFavoritePlace ( int fvrtLocNo ) throws Exception{
        JsonResult jsonResult = new JsonResult();
        try {
            memberService.removeFvrtLoc(fvrtLocNo);
            jsonResult.setStatus("success");
 
 
        } catch (Throwable e) {
        	e.printStackTrace();
            StringWriter out = new StringWriter();
            e.printStackTrace(new PrintWriter(out));
 
            jsonResult.setStatus("fail");
            jsonResult.setData(out.toString());
        }
        return jsonResult;
    }
    
    
    @RequestMapping("/getRecentDestination")
    @ResponseBody
    public Object getRecentDestination( HttpSession session ) throws Exception {
        JsonResult jsonResult = new JsonResult();
        try {
	        LoginInfo loginInfo = (LoginInfo) session.getAttribute("loginInfo");
	        System.out.println("loginInfo :" + loginInfo.getMbrId());
         
            jsonResult.setStatus("success");
            jsonResult.setData( memberService.getRecentDestination(loginInfo.getMbrId()) );
             
        } catch (Throwable e) {
        	e.printStackTrace();
            StringWriter out = new StringWriter();
            e.printStackTrace(new PrintWriter(out));
             
            jsonResult.setStatus("fail");
            jsonResult.setData(out.toString());
        }
        return jsonResult;          
    }
     
    /*
    @RequestMapping("/delFvrtLoc")
    @ResponseBody
    public Object delFvrtLoc(int no) throws Exception {
        JsonResult jsonResult = new JsonResult();
         
        try {
            memberService.removeProject(no);
            jsonResult.setStatus("success");
             
        } catch (Throwable e) {
            StringWriter out = new StringWriter();
            e.printStackTrace(new PrintWriter(out));
             
            jsonResult.setStatus("fail");
            jsonResult.setData(out.toString());
        }
         
        return jsonResult;
    }*/
	
}













