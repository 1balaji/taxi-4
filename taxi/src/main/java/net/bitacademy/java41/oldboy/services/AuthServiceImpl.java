package net.bitacademy.java41.oldboy.services;

import java.util.HashMap;
import java.util.List;

import net.bitacademy.java41.oldboy.dao.MemberDao;
import net.bitacademy.java41.oldboy.dao.MemberImageDao;
import net.bitacademy.java41.oldboy.vo.LoginInfo;
import net.bitacademy.java41.oldboy.vo.Member;
import net.bitacademy.java41.oldboy.vo.Photo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AuthServiceImpl implements AuthService {
	@Autowired MemberService memberService;
	@Autowired MemberDao memberDao;
	@Autowired MemberImageDao memberImageDao; 


	public Member getUserInfo(String email, String password) throws Exception {
		HashMap<String, String> paramMap = new HashMap<String, String>();
		paramMap.put("email", email);
		paramMap.put("password", password);
		
		Member member = memberDao.getMember(paramMap);
		
		if (member != null) {
	 		List<Photo> list = memberImageDao.listPhoto(email);
			String[] photos = null;
			if (list.size() > 0) {
				photos = new String[list.size()];
				int index = 0;
				for( Photo photo : list ) {
					photos[index++] = photo.getFilename();
				}
			}
			member.setPhotos(photos);
		}
		return member;
	}

	public LoginInfo getLoginInfo(String email, String password) throws Exception {
		Member member = this.getUserInfo(email, password);
		LoginInfo loginInfo = new LoginInfo()
											.setEmail(member.getEmail())
											.setName(member.getName())
											.setTel(member.getTel())
											.setBlog(member.getBlog())
											.setRegDate(member.getRegDate())
											.setUpdateDate(member.getUpdateDate())
											.setPostNo(member.getPostNo())
											.setDetailAddress(member.getDetailAddress())
											.setTag(member.getTag())
											.setLevel(member.getLevel());
		String[] photos = member.getPhotos();
		if (photos != null && photos.length > 0) {
			loginInfo.setPhoto(photos[0]);
		}
		
		return loginInfo;
	}
	
	public LoginInfo getLoginInfo(String email) throws Exception {
		Member member = memberService.getMemberInfo(email);
		LoginInfo loginInfo = new LoginInfo()
											.setEmail(member.getEmail())
											.setName(member.getName())
											.setTel(member.getTel())
											.setBlog(member.getBlog())
											.setRegDate(member.getRegDate())
											.setUpdateDate(member.getUpdateDate())
											.setPostNo(member.getPostNo())
											.setDetailAddress(member.getDetailAddress())
											.setTag(member.getTag())
											.setLevel(member.getLevel());
		String[] photos = member.getPhotos();
		if (photos != null && photos.length > 0) {
			loginInfo.setPhoto(photos[0]);
		}
		
		return loginInfo;
	}

	public String getCurPassword(String email) throws Exception {
		return memberDao.getCurPassword(email);
	}

}
