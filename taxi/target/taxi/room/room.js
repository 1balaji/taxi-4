$(document).ready(function() {
	initMap();
	drawRelationMap();
});

initMap = function() {
	var map = null;
	var lng = 14135893.887852;
	var lat = 4518348.1852606;
	map = new Tmap.Map({div:'divMap', width:'100%', height:'100%'}); 
	map.setCenter(new Tmap.LonLat(lng, lat), 14);
};


$(document).on('keypress', '#reply', function(evt){ 
    var keyPressed = evt.which || evt.keyCode;
    if (keyPressed == 13) {
    	$("#reply").val("");
    	add();
    }     
});    

add = function() {
	var ul = $("#listviewul").attr("data-role", "listview")
							 .attr("data-inset", "true");;
		$("<li>")
			.append( $("<img>").attr("style", "width:80px; height:80px;")
							   .attr("src", "images/test4.png")
							    )
			.append( $("<h2>").text("오아름") )
			.append( $("<p>")
							 .append( $("<strong>").text("강남역 4번출구에서 만나요!") ) )
			 
			.append( $("<p>").attr("class","ui-li-aside").text("PM")
							 .append( $("<strong>").text("8:10") ) )
			.appendTo(ul);
		$('ul').listview('refresh');
		
};











//관계도 그리기
drawRelationMap = function() {

	var c=document.getElementById("myCanvas");
	var ctx=c.getContext("2d");
	//가로1,2
	ctx.moveTo(0,123);
	ctx.lineTo(369,123);
	ctx.lineWidth=1;
	
	ctx.moveTo(0,246);
	ctx.lineTo(369,246);
	ctx.lineWidth=1;
	//세로1,2
	ctx.moveTo(123,0);
	ctx.lineTo(123,370);
	ctx.lineWidth=1;
	
	ctx.moveTo(246,0);
	ctx.lineTo(246,385);
	ctx.lineWidth=1;
	
	ctx.moveTo(0,123);
	ctx.lineTo(369,123);
	ctx.strokeStyle="#fde58b";
	ctx.lineWidth=1;
	
	ctx.stroke();
	
	
	ctx.beginPath();
	//내부 선
	ctx.moveTo(61,61);
	ctx.lineTo(308,61);
	ctx.lineWidth=4;
	
	ctx.moveTo(61,61);
	ctx.lineTo(61,308);
	ctx.lineWidth=4;
	
	ctx.moveTo(61,308);
	ctx.lineTo(308,308);
	ctx.lineWidth=4;
	
	ctx.moveTo(308,61);
	ctx.lineTo(308,308);
	ctx.lineWidth=4;
	
	ctx.moveTo(61,184);
	ctx.lineTo(308,184);
	
	ctx.lineWidth=4;
	
	ctx.moveTo(184,61);
	ctx.lineTo(184,308);
	ctx.strokeStyle="#B0C4DE";
	ctx.lineWidth=4;
	
	ctx.stroke();
	
	
	ctx.beginPath();
	//각 점
	ctx.arc(61,61,5,0,2*Math.PI);
	ctx.arc(61,308,5,0,2*Math.PI);
	ctx.arc(308,61,5,0,2*Math.PI);
	ctx.arc(308,308,5,0,2*Math.PI);
	ctx.arc(184,184,5,0,2*Math.PI);
	ctx.fillStyle="#bf9000";
	ctx.fill();
	
	
	ctx.beginPath();
	ctx.fillStyle="black";
	
	var img=document.getElementById("member01");
	ctx.drawImage(img,280,160);
	ctx.font="20px Arial";
	ctx.fillText("이지우",280,250);
	
	var img=document.getElementById("member02");
	ctx.drawImage(img,160,40);
	ctx.font="20px Arial";
	ctx.fillText("유지민",160,30);
	
	
	var img=document.getElementById("member03");
	ctx.drawImage(img,160,280);
	ctx.font="20px Arial";
	ctx.fillText("송미영",160,360);
	
	var img=document.getElementById("member04");
	ctx.drawImage(img,40,160);
	ctx.font="20px Arial";
	ctx.fillText("김상헌",40,250);
	
	
	ctx.font="12px Arial";
	ctx.fillText("이영균",280,330);
	
	ctx.font="12px Arial";
	ctx.fillText("안성헌",40,330);
	
	ctx.font="12px Arial";
	ctx.fillText("공경식",40,50);
};