$(document).ready(function() {
	initializeTData();
	
	$("#btn1").click(function() {
		loadGetAddressFromLonLat();
	});
	
	$("#btn2").click(function() {
		onCompleteLoadGetAddressFromLonLat();
	});	
	
});

var map = null;
var tData = null;

function initializeTData() {
	map = new Tmap.Map({div:'divMap', width:'100%', height:'100%'});
	map.setCenter(new Tmap.LonLat(14135893.887852, 4518348.1852606), 14);
	getRouteData();
}

function getRouteData(){
    var startLon = "14135893.887852";
    var startLat = "4518348.1852606";
    var endLon = "14141601.385663";
    var endLat = "4506857.513336";  
   
	var startLonLat = new Tmap.LonLat(startLon, startLat);
	var endLonLat = new Tmap.LonLat(endLon, endLat);
	tData = new Tmap.TData();
	var option = {
			version:"1",
			format:'xml',
			appkey:'279ad0d3-5c1f-37da-93a0-7a7fab94f824'
	};
	//getPOIDataFromSearch : function(search, {options})
//	tData.getRoutePlan(startLonLat, endLonLat, option);
//	tData.getPOIDataFromSearch(function(){ '강남' });
	tData.getPOIDataFromSearch( '강남');
	tData.events.register("onComplete", tData, onLoadSuccess);
	tData.events.register("onProgress", tData, onProgressLoadData);
	tData.events.register("on_error", tData, on_errorLoadData);                          
 }

function onLoadSuccess(){
//	var kmlForm = new Tmap.Format.KML().read(this.responseXML);
	console.log(this.responseXML);
//	var lineString = new Tmap.Geometry.LineString(pointList);
//	var style_bold = {strokeWidth: 6};
//	var mLineFeature = new Tmap.Feature.Vector(lineString, null, style_bold);
	var vectorLayer = new Tmap.Layer.Vector("vectorLayerID");
	map.addLayer(vectorLayer);
	vectorLayer.addFeatures(kmlForm);
	
}

function onProgressLoadData() {
	console.log("onPress");
}

function on_errorLoadData() {
	console.log("err");
}

