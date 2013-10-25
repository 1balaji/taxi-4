package net.bitacademy.java41.oldboy.controls.member;

import javax.servlet.ServletContext;

import net.bitacademy.java41.oldboy.services.MemberService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/member")
public class MemberControl {
	@Autowired ServletContext sc;
	@Autowired MemberService memberService;
	
}













