package net.bitacademy.java41.oldboy.controls.member;

import java.io.File;
import java.io.PrintWriter;
import java.io.StringWriter;

import javax.servlet.ServletContext;

import net.bitacademy.java41.oldboy.services.MemberService;
import net.bitacademy.java41.oldboy.vo.JsonResult;
import net.bitacademy.java41.oldboy.vo.LoginInfo;
import net.bitacademy.java41.oldboy.vo.Member;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.SessionAttributes;
import org.springframework.web.multipart.MultipartFile;

/*
 * @SessionAttributes("member")
 * - DispatcherServlet이 요청에 해당하는 페이지 컨트롤러의 메서드를 호출할 때,
 * 	1) 파라미터 중에서 세션에 저장된 "member"와 같은 타입의 객체가 있다면 
 * 		새로 객체를 만들지 않고 기존 세션에 저장된 객체를 꼽아준다.
 */

@Controller
@SessionAttributes({"member","loginInfo"})
@RequestMapping("/member")
public class MemberControl {
	@Autowired ServletContext sc;
	@Autowired MemberService memberService;
	long currTime = 0;
	int count = 0;
	
	@RequestMapping(value="/signup", method=RequestMethod.GET)
	public String signupForm() {
		return "member/signupForm";
	}
	
	@RequestMapping(value="/signup", method=RequestMethod.POST)
	public String signup(
			Member member,
			MultipartFile photo,
			Model model) throws Exception {
		String filename = this.getNewFileName();
		String path = sc.getAttribute("rootRealPath") + "file/" + filename;
		photo.transferTo(new File(path));
		member.setPhotos(new String[]{filename});
		
		memberService.signUp(member);
		LoginInfo loginInfo = new LoginInfo()
							.setName(member.getName())
							.setEmail(member.getEmail())
							.setTel(member.getTel());
//							.setPhotoPath(member.getPhotos()[0]);
		model.addAttribute("loginInfo", loginInfo);
		
		return "redirect:../main.do";
	}
	
	@RequestMapping("/list")
	@ResponseBody
	public Object list() throws Exception {
		
		JsonResult jsonResult = new JsonResult();
		
		try {
			jsonResult.setData( memberService.getTotalMemberList() );
			jsonResult.setStatus("success");
		} catch (Throwable e) {
			StringWriter out = new StringWriter();
			e.printStackTrace(new PrintWriter(out));
			
			jsonResult.setStatus("fail");
			jsonResult.setData(out.toString());
		}
		
		return jsonResult;
	}
	
	
	@RequestMapping(value="/add", method=RequestMethod.POST)
	@ResponseBody
	public Object add(
			Member member/*, MultipartFile photo*/) throws Exception {
	/*	String filename = this.getNewFileName();
		String path = sc.getAttribute("rootRealPath") + "file/" + filename;
		photo.transferTo(new File(path));
		member.setPhotos(new String[]{filename});*/
	
		JsonResult jsonResult = new JsonResult();
		
		try {
			memberService.signUp(member);
			jsonResult.setStatus("success");
		} catch (Throwable e) {
			StringWriter out = new StringWriter();
			e.printStackTrace(new PrintWriter(out));
			
			jsonResult.setStatus("fail");
			jsonResult.setData(out.toString());
		}
		
		return jsonResult;
		
	}
	
	@RequestMapping("/view")
	@ResponseBody
	public Object view(String email) throws Exception {

		JsonResult jsonResult = new JsonResult();
		
		try {
			jsonResult.setData( memberService.getMemberInfo(email) );
			jsonResult.setStatus("success");
		} catch (Throwable e) {
			StringWriter out = new StringWriter();
			e.printStackTrace(new PrintWriter(out));
			
			jsonResult.setStatus("fail");
			jsonResult.setData(out.toString());
		}
		
		return jsonResult;
	}
	
/*	@RequestMapping(value="/passwordChange", method=RequestMethod.POST)
	@ResponseBody
	public Object changePassword(
			String email, 
			@RequestParam("password") String currPassword, 
			String newPassword, String newPassword2,
			Model model)
					throws Exception {
		if (newPassword.equals(newPassword2)) {
			if (memberService.changePassword(email, currPassword, newPassword)) {
				model.addAttribute("status", "SUCCESS");
			} else {
				model.addAttribute("status", "OLD_PASSWORD_ERROR");
			}
		} else {
			model.addAttribute("status", "NEW_PASSWORD_ERROR");
		}
		
		return "member/passwordChangeResult";
	}
	*/
	
	@RequestMapping(value="/update",method=RequestMethod.POST)
	@ResponseBody
	public Object update(Member member) throws Exception {
		/*MultiPartFile photo
		 * String filename = this.getNewFileName();
		String path = sc.getAttribute("rootRealPath") + "file/" + filename;
		photo.transferTo(new File(path));
		member.setPhotos(new String[]{filename});*/
		
		JsonResult jsonResult = new JsonResult();
		
		try {
			memberService.updateMemberInfo(member);
			jsonResult.setStatus("success");
		} catch (Throwable e) {
			StringWriter out = new StringWriter();
			e.printStackTrace(new PrintWriter(out));
			
			jsonResult.setStatus("fail");
			jsonResult.setData(out.toString());
		}
		
		return jsonResult;
	}
	
	@RequestMapping("/delete")
	@ResponseBody
	public Object delete(String email) throws Exception {
		
		JsonResult jsonResult = new JsonResult();
		
		try {
			memberService.deleteMember(email);
			jsonResult.setStatus("success");
		} catch (Throwable e) {
			StringWriter out = new StringWriter();
			e.printStackTrace(new PrintWriter(out));
			
			jsonResult.setStatus("fail");
			jsonResult.setData(out.toString());
		}
		
		return jsonResult;
	}
	
	synchronized private String getNewFileName() {
		long millis = System.currentTimeMillis(); //1000
		if (currTime != millis) {
			currTime = millis;
			count = 0;
		}
		return "member_" + millis + "_" + (++count);
	}
}













