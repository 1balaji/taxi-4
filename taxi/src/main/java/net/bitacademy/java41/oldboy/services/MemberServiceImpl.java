package net.bitacademy.java41.oldboy.services;

import java.util.HashMap;
import java.util.List;

import net.bitacademy.java41.oldboy.dao.MemberDao;
import net.bitacademy.java41.oldboy.dao.MemberImageDao;
import net.bitacademy.java41.oldboy.dao.ProjectDao;
import net.bitacademy.java41.oldboy.dao.ProjectMemberDao;
import net.bitacademy.java41.oldboy.vo.LoginInfo;
import net.bitacademy.java41.oldboy.vo.Member;
import net.bitacademy.java41.oldboy.vo.Photo;
import net.bitacademy.java41.oldboy.vo.Project;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.PlatformTransactionManager;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

@Service
public class MemberServiceImpl implements MemberService {
	@Autowired ProjectService projectService;
	@Autowired MemberDao memberDao;
	@Autowired MemberImageDao memberImageDao;
	@Autowired ProjectDao projectDao;
	@Autowired ProjectMemberDao projectMemberDao;
	@Autowired PlatformTransactionManager txManager;


	@Transactional(propagation=Propagation.REQUIRED, rollbackFor=Throwable.class)
	public LoginInfo signUp(Member member) throws Exception {
		int count = memberDao.addMember(member);
		LoginInfo loginInfo = null;
		if (count > 0) {
			loginInfo = new LoginInfo()
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
		}
			
		return loginInfo;
	}

	@Transactional(propagation=Propagation.REQUIRED, rollbackFor=Throwable.class)
	public int addMember(Member member) throws Exception {
		try {
			int count = memberDao.addMember(member);
			String[] photos = member.getPhotos();
			if (photos != null) {
				addPhotos(member, photos);
			}
			
			return count;
			
		} catch (Exception e) {
			throw e;
			
		}
	}

	public List<Member> getTotalMemberList() throws Exception {
		return memberDao.getMemberList();
	}

	public Member getMemberInfo(String email) throws Exception {
		HashMap<String, String> paramMap = new HashMap<String, String>();
		paramMap.put("email", email);
		paramMap.put("password", null);
		
		Member member = memberDao.getMember(paramMap);
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
		
		return member;
	}

	public List<Project> getUserProjectList(String email) throws Exception {
		return projectDao.getUserProjectList(email);
	}
	
	@Transactional(propagation=Propagation.REQUIRED, rollbackFor=Throwable.class)
	public int isChangePassword(String email, String oldPassword, String newPassword) throws Exception {
		HashMap<String, String> paramMap = new HashMap<String, String>();
		paramMap.put("email", email);
		paramMap.put("oldPassword", oldPassword);
		paramMap.put("newPassword", newPassword);	
		
		return memberDao.changePassword(paramMap);
	}
	
	@Transactional(propagation=Propagation.REQUIRED, rollbackFor=Throwable.class)
	public int updateMemberInfo(Member member) throws Exception {
		try {
			int count = memberDao.updateMember(member);
			String[] photos = member.getPhotos();
			if (photos != null && photos.length > 0) {
				memberImageDao.deletePhoto(member.getEmail());
				addPhotos(member, photos);
			}
			
			return count;
			
		} catch (Exception e) {
			throw e;
		}
	}
	
	public LoginInfo updateMyInfo(Member member) throws Exception {
		int count = this.updateMemberInfo(member);
		LoginInfo loginInfo = null;
		if (count > 0) {
			loginInfo = new LoginInfo()
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
		}
		
		return loginInfo;
	}
	
	
	@Transactional(propagation=Propagation.REQUIRED, rollbackFor=Throwable.class)
	public int deleteMember(String email) throws Exception {
		try {
			memberImageDao.deletePhoto(email);
			
			projectService.deleteProjectMember(0, 0, email);
			
			int count = memberDao.deleteMember(email);
			
			return count;
			
		} catch (Exception e) {
			throw e;
			
		}
	}
	
	private void addPhotos(Member member, String[] photos) throws Exception {
		HashMap<String,String> paramMap = new HashMap<String,String>();
		paramMap.put("email", member.getEmail());
		if (photos != null) {
			for( String path : photos ) {
				paramMap.put("path", path);
				memberImageDao.addPhoto(paramMap);
			}
		}
	}


}
