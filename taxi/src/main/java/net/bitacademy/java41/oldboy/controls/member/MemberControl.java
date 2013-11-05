package net.bitacademy.java41.oldboy.controls.member;

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
	
	@RequestMapping("/addFvrtLoc")
    @ResponseBody
    public Object addFvrtLoc( HttpSession session,
                                    LoginInfo loginInfo, 
                                    FvrtLoc fvrtLoc ) throws Exception {
                 
        JsonResult jsonResult = new JsonResult();
         
        try {
             
            loginInfo = (LoginInfo) session.getAttribute("loginInfo");
             
            // Test Data
            fvrtLoc.setMbrId(loginInfo.getMbrId());
            fvrtLoc.setFvrtLocLat(949582.341290335);
            fvrtLoc.setFvrtLocLng(1942926.89863232);
            fvrtLoc.setFvrtLocName("산울림 극장 서울시 종로구 혜화동 0328번지");
            fvrtLoc.setFvrtLocRank(1);
             
            memberService.addFvrtLoc(fvrtLoc);
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
             
    @RequestMapping("/getFvrtLoc")
    @ResponseBody
    public Object getFvrtLoc( HttpSession session,
                                    LoginInfo loginInfo ) throws Exception {
         
        JsonResult jsonResult = new JsonResult();
 
        try {
             
            loginInfo = (LoginInfo) session.getAttribute("loginInfo");
            System.out.println("loginInfo :" + loginInfo.getMbrId());
             
                jsonResult.setStatus("success");
                jsonResult.setData(memberService.getFvrtLoc(loginInfo.getMbrId()));
                 
            } catch (Throwable e) {
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













