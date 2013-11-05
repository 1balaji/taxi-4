package net.bitacademy.java41.oldboy.controls;

import java.io.PrintWriter;
import java.io.StringWriter;
import java.net.URLDecoder;
import java.net.URLEncoder;

import javax.servlet.ServletContext;

import net.bitacademy.java41.oldboy.services.AuthService;
import net.bitacademy.java41.oldboy.services.MemberService;
import net.bitacademy.java41.oldboy.vo.JsonResult;

import org.apache.http.HttpEntity;
import org.apache.http.HttpResponse;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.impl.client.DefaultHttpClient;
import org.apache.http.util.EntityUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;



@Controller
@RequestMapping("/map")
public class MapControl {
	@Autowired ServletContext sc;
	@Autowired AuthService authService;
	@Autowired MemberService memberService;
	
	
	// LOGIN - SELECT 
	@RequestMapping(value="/localSearch")
	@ResponseBody
	public <T> Object localSearch( String url, String params ) throws Exception {
		System.out.println("localSearch");
		
		System.out.println("url :: " + url + "\nparams :: " + params);
		HttpResponse responseGet = null;
		HttpEntity resEntity = null;
//		String url = "http://openapi.kt.com/maps/search/localSearch";
		JsonResult jsonResult = new JsonResult();
		try {
//			StringBuffer paramBuf = new StringBuffer();
//			if ( timestamp != null && timestamp.length() > 0 ) {
//				paramBuf.append("timestamp=").append( timestamp );
//			} else {
//				paramBuf.append("timestamp=").append("1317949634794");
//			}
//			if ( query != null && query.length() > 0 ) {
//				paramBuf.append("&query=").append( query );
//			} else {
//				throw new Exception("검색어가 없습니다.");
//			}
//			if ( sr != null && sr.length() > 0 ) {
//				paramBuf.append("&sr=").append( sr );
//			}
//			if ( places != null && places.length() > 0 ) {
//				paramBuf.append("&places=").append( places );
//			}
//			if ( addrs != null && addrs.length() > 0 ) {
//				paramBuf.append("&addrs=").append( addrs );
//			}
//			paramBuf.append("&p=").append( p );
//			
//			String params = paramBuf.toString();
			System.out.println("params :: " + params);
			System.out.println("params :: " + URLEncoder.encode(params, "UTF-8"));
			
			url += "?params=" + URLEncoder.encode(params, "UTF-8");
			System.out.println(url);
			System.out.println(URLDecoder.decode("params=%7B%22query%22%3A%22%25EA%25B0%2595%25EB%2582%25A8%22%2C%22timestamp%22%3A%221383563161781%22%7D","UTF-8"));
			System.out.println(URLDecoder.decode("%EA%B0%95%EB%82%A8","UTF-8"));
			
			
//			String url = "http://openapi.kt.com/maps/search/localSearch?params=%7B%22query%22%3A%22%25EA%25B0%2595%25EB%2582%25A8%22%2C%22timestamp%22%3A%221383563161781%22%7D";
			HttpGet get = new HttpGet(url);
			get.setHeader("authorization", "Basic ODEwMEQ4QzA6VEJGRkMwMzQzOUQ4NA==");
			
			responseGet = new DefaultHttpClient().execute(get);
			resEntity = responseGet.getEntity();
			String result = EntityUtils.toString(resEntity);
			System.out.println("result :: " + result);
			result = URLDecoder.decode(result, "UTF-8").replace("\"{", "{").replace("}\"", "}");
			
			if (result != null && result.length() > 0) {
				jsonResult.setData(result);
				jsonResult.setStatus("success");
			} else {
				jsonResult.setStatus("fail");
			}
			
			
		} catch(Throwable e) {
			e.printStackTrace();
			StringWriter out = new StringWriter();
			e.printStackTrace(new PrintWriter(out));
			
			jsonResult = new JsonResult().setStatus("fail");
		}
		return jsonResult;
	}
	
	
}
