$(document).ready(function() {
//	initMap();
	initializeTData();
	
	$("#ulTimeList a").click(function() {
		$("#divSearchPanel").panel("open");
	});
	
	
	
	// 방등록 조건 팝업 관련
	$("#divAddRoomCondition_popup a[data-icon=delete]").click(function() {
		$("#divAddRoomCondition_popup").popup("close");
	});
	
	
	// 방리스트 패널 관련 
	$("#ulSearchRoomList a").click(function() {
		$("#formRoomInfo_popup").popup("open");
	});
	
	$("#btn1").click(function() {
		loadGetAddressFromLonLat();
	});
	
	$("#btn2").click(function() {
		onCompleteLoadGetAddressFromLonLat();
	});	
	
});



var map = null;
var marker = null;
var popup = null;

initMap = function() {
	var lng = 14135893.887852;
	var lat = 4518348.1852606;
	map = new Tmap.Map({div:'divMap', width:'100%', height:'100%'});
	map.setCenter(new Tmap.LonLat(lng, lat), 14);
	map.addControl(new Tmap.Control.KeyboardDefaults());
	map.addControl(new Tmap.Control.MousePosition());
	map.addControl(new Tmap.Control. OverviewMap());
	
	// 마커
	var markerLayer = new Tmap.Layer.Markers();
	map.addLayer(markerLayer);
	 
	var lonlat = new Tmap.LonLat(14135893.887852, 4518348.1852606);
	 
	var size = new Tmap.Size(40,40);
	var offset = new Tmap.Pixel(-(size.w/2), -(size.h/2));
//	var icon = new Tmap.Icon('http://map.nate.com/img/contents/ico_spot.png', size, offset);
	var icon = new Tmap.IconHtml("<img src= 'images/photo/jimin.jpg'></img>", size, offset);
	     
	marker = new Tmap.Marker(lonlat, icon);
	markerLayer.addMarker(marker);
	
	
	// 마커 이벤트
	marker.events.register("mouseover", marker, function(evt) {
		console.log(evt);
	});
	
//	marker.events.register("click", marker, function (evt){
//	    this.destroy();
//	});
	
//	marker.events.register("click", map, function (evt){
//	    this.destroy();
//	});
	
	
	// 마커이벤트 발생시 팝업 생성
	popup = new Tmap.Popup("p1",
	                        new Tmap.LonLat(14135893.887852, 4518348.1852606),
	                        new Tmap.Size(300, 300),
	                        $("#formRoomInfo_popup").html() //팝업 화면
	                        ); 
	map.addPopup(popup);
	popup.hide();
	
	marker.events.register("mouseover", popup, function(evt) {
	    this.show();
	});
	marker.events.register("mouseout", popup, function(evt) {
	    this.hide();
	});
	
	
	 
	
	// 벡터 레이어
	var vector_layer = new Tmap.Layer.Vector('Tmap Vector Layer',{
		renderers: ["SVG", "Canvas", "VML"]
	});
	map.addLayers(vector_layer);
	
	
	var vector_layer = new Tmap.Layer.Vector('Tmap Vector Layer');
	map.addLayers([vector_layer]); 
	var point = new Tmap.Geometry.Point(14135893.887852, 4518348.1852606);
	var vector_feature = new Tmap.Feature.Vector(point);
	var vector_feature2 = new Tmap.Feature.Vector(new Tmap.Geometry.Point(14145894.887852, 4518344.1852606));
	var vector_feature3 = new Tmap.Feature.Vector(new Tmap.Geometry.Point(14155895.887852, 4518342.1852606));
	var featureArr4 = [vector_feature, vector_feature2, vector_feature3];
	vector_layer.addFeatures(featureArr4);
	
	removeFeature = function() {
//		for(var i=0; i<featureArr4.length; i++){
//	    	vector_layer.removeFeatures(featureArr4[i]);
//		}
	
		vector_layer.removeFeatures([vector_feature]);		
	};
	
	
	// 폴리라인
	var pointList = [];
	pointList.push(new Tmap.Geometry.Point(14132077.76641, 4520441.6071475));
	pointList.push(new Tmap.Geometry.Point(14133147.884806, 4519180.3961808));
	pointList.push(new Tmap.Geometry.Point(14134982.373485, 4519132.6230381));
	pointList.push(new Tmap.Geometry.Point(14136644.87885, 4519209.0600664));
	pointList.push(new Tmap.Geometry.Point(14136797.752907, 4517603.8824724));
	pointList.push(new Tmap.Geometry.Point(14134533.305944, 4516906.3945893));
	pointList.push(new Tmap.Geometry.Point(14134370.877259, 4515377.6540236));
	pointList.push(new Tmap.Geometry.Point(14134370.877259, 4514919.0318539));
	pointList.push(new Tmap.Geometry.Point(14132498.170066, 4513476.282945));
	
	var lineString = new Tmap.Geometry.LineString(pointList);
	var style_bold = {strokeWidth: 6};
	var mLineFeature = new Tmap.Feature.Vector(lineString, null, style_bold);
	var vectorLayer = new Tmap.Layer.Vector("vectorLayerID");
	map.addLayer(vectorLayer);
	vectorLayer.addFeatures([mLineFeature]);
	
	
//	var linearRing = new Tmap.Geometry.LinearRing(pointList);
//	var polygonCollection = new Tmap.Geometry.Polygon(linearRing);
//	var style_bold = {strokeWidth: 6}; 
//	var mLineFeature = new Tmap.Feature.Vector(polygonCollection, null, style_bold);
//	var vectorLayer = new Tmap.Layer.Vector("vectorLayerID");
//	map.addLayer(vectorLayer);
//	vectorLayer.addFeatures([mLineFeature]);
	
	
	
	// 원
	var circle = new Tmap.Geometry.Circle(14134074.680985, 4517814.0870894, 500);
	var vLayerDrag = new Tmap.Layer.Vector();
	map.addLayer(vLayerDrag);
//	var circleFeature = new Tmap.Feature.Vector(circle, null);
//	vLayerDrag.addFeatures([circleFeature]);
	
	// 스타일
	var style_bold = {strokeWidth: 6};
	var style_red = {
	           fillColor:"#FF0000",
	           fillOpacity:0.2,
	           strokeColor: "#FF0000",
	           strokeWidth: 1,
	           strokeDashstyle: "solid",
	           label:"500m",
	           labelAlign: "lm",
	           fontColor: "black",
	               fontSize: "9px",
	               fontFamily: "Courier New, monospace",
	               fontWeight: "bold",
	               labelOutlineColor: "white",
	               labelOutlineWidth: 3 
	};
	var circleFeature = new Tmap.Feature.Vector(circle, null, style_red);
	vLayerDrag.addFeatures([circleFeature]);
	
};



div = function() {
	alert(map.div.id);
};

function minExtent(){
    alert(map.minExtent);
}
function maxExtent(){
    alert(map.maxExtent);
}

function getExtent(){
    alert(map.getExtent());
}
function zoomToMaxExtent(){
	map.zoomToMaxExtent();
}

// 좌표변환
function LonLatFromPixel(){
    alert(map.getLonLatFromPixel(
            new Tmap.Pixel("660", "200")));
}
function PixelFromLonLat(){
	alert(map.getPixelFromLonLat(new Tmap.LonLat("660", "200"))
	     );
}

// 줌
function zoomToExtent(){
	map.zoomToExtent(new Tmap.LonLat("660", "200"));
}

function zoomTo(){
	map.zoomTo("5");
}



//TData
function initializeTData(){
	map = new Tmap.Map({div:'divMap', width:'100%', height:'100%'});
    map.setCenter(new Tmap.LonLat(14135911, 4518361),15);
    var c_ll = map.getCenter();
    loadGetAddressFromLonLat(c_ll);
}

function loadGetAddressFromLonLat(ll){
    var tdata = new Tmap.TData();
    tdata.events.register("onComplete", tdata, onCompleteLoadGetAddressFromLonLat);    
    tdata.getAddressFromLonLat("279ad0d3-5c1f-37da-93a0-7a7fab94f824","xml","1",ll);
}
function onCompleteLoadGetAddressFromLonLat(){
    console.log(this.responseXML);
}

