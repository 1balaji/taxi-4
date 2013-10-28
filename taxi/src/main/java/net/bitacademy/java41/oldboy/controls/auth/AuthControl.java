package net.bitacademy.java41.oldboy.controls.auth;

import java.util.List;

import javax.servlet.ServletContext;

import net.bitacademy.java41.oldboy.services.AuthService;
import net.bitacademy.java41.oldboy.vo.Frnd;
import net.bitacademy.java41.oldboy.vo.Mbr;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import com.google.gson.reflect.TypeToken;



@Controller
@RequestMapping("/auth")
public class AuthControl {
	@Autowired ServletContext sc;
	@Autowired AuthService authService;

	@RequestMapping(value="/login", method=RequestMethod.POST)
	@ResponseBody
//	public Object login(String id, String name, String photo, Model model, String[] friendsList) throws Exception {
	public <T> Object login(@RequestBody String json) throws Exception {
		System.out.println(json);
		Gson gson = new Gson();
		JsonParser parser = new JsonParser();
		JsonObject jsonObject = (JsonObject) parser.parse(json);
		Mbr mbr = gson.fromJson(jsonObject, new TypeToken<Mbr>() {}.getType());
		
		JsonElement jsonElement = jsonObject.get("friendList");
		JsonArray jsonArray = jsonElement.getAsJsonArray();
		List<Frnd> frndList = gson.fromJson(jsonArray, new TypeToken<List<Frnd>>() {}.getType());
		mbr.setFrndList(frndList);
		
		
		return null;
	}
	

}
