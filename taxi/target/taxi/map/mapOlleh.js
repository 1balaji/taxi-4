$(document).ready(function() {
	init();
	
	$("#btn1").click(function() {
		loadGetAddressFromLonLat();
	});
	
	$("#btn2").click(function() {
		onCompleteLoadGetAddressFromLonLat();
	});	
	
});




function init() {
	var myCoord = new olleh.maps.Coord(965913.7, 1928949.522);
	var myOptions = {
		zoom: 4,
		center: myCoord,
		mapTypeId : olleh.maps.MapTypeId.BASEMAP
  	}
  	var map = new olleh.maps.Map(document.getElementById("canvas_map"), myOptions);
  	var marker = new olleh.maps.Marker({
      	position: myCoord,
      	map: map,
      	title:"Hello World!"
	});
}















function initialize() {
	var mapOptions = {
		center : new olleh.maps.Coord(953755.70, 1949715.52),
		zoom : 8,
		mapTypeId : olleh.maps.MapTypeId.BASEMAP,
	};
	var map = new olleh.maps.Map(document.getElementById("divMap"),
			mapOptions);
}



//var map = null;
//var tData = null;
//
//function initializeTData() {
//	map = new Tmap.Map({div:'divMap', width:'100%', height:'100%'});
//	map.setCenter(new Tmap.LonLat(14135893.887852, 4518348.1852606), 14);
//	getRouteData();
//}
//
//function getRouteData(){
//    var startLon = "14135893.887852";
//    var startLat = "4518348.1852606";
//    var endLon = "14141601.385663";
//    var endLat = "4506857.513336";  
//   
//	var startLonLat = new Tmap.LonLat(startLon, startLat);
//	var endLonLat = new Tmap.LonLat(endLon, endLat);
//	tData = new Tmap.TData();
//	var option = {
//			version:"1",
//			format:'xml'                                                 
//	};
//	tData.getRoutePlan(startLonLat, endLonLat, option);
//	tData.events.register("onComplete", tData, onLoadSuccess);
//	tData.events.register("onProgress", tData, onProgressLoadData);
//	tData.events.register("on_error", tData, on_errorLoadData);                          
// }
//
//function onLoadSuccess(){
//	var kmlForm = new Tmap.Format.KML().read(this.responseXML);
//	
//	
////	var lineString = new Tmap.Geometry.LineString(pointList);
////	var style_bold = {strokeWidth: 6};
////	var mLineFeature = new Tmap.Feature.Vector(lineString, null, style_bold);
//	var vectorLayer = new Tmap.Layer.Vector("vectorLayerID");
//	map.addLayer(vectorLayer);
//	vectorLayer.addFeatures(kmlForm);
//	
//}
//
//function onProgressLoadData() {
//	console.log("onPress");
//}
//
//function on_errorLoadData() {
//	console.log("err");
//}
//
