var query;

var markerImgArr = [
					"../images/common/marker/free-map-marker-icon-red.png",
					"../images/common/marker/free-map-marker-icon-pink.png",
					"../images/common/marker/free-map-marker-icon-orange.png",
					"../images/common/marker/free-map-marker-icon-green-darker.png",
					"../images/common/marker/free-map-marker-icon-green.png",
					"../images/common/marker/free-map-marker-icon-dark.png",
					"../images/common/marker/free-map-marker-icon-blue-darker.png",
					"../images/common/marker/free-map-marker-icon-blue.png"];
var locations = [];

var map;

$(document).ready(function() {
	var params = getParams(window.location.href);
	query = params.query;
//	query = "신사동";
	
	searchLocation(query, 0);
	
});

var searchLocation = function(query, page) {
	console.log("searchLocation(query, page)");
	
	var params = {
			query : encodeURI(query),
			places : 8,
			addrs : 8,
			sr : "MATCH",	//DIS:거리순, RANK:정확도순, MATCH:일치
			p : page,
			timestamp : 1317949634794
		};
	
	$.getJSON("../map/ollehMapApi.do", 
			{
				url : "http://openapi.kt.com/maps/search/localSearch",
				params : JSON.stringify( params )
			}, 
			function(result) {
				if ( result.status == "success" ) {
					var resultData =  JSON.parse(result.data);
//					var resultData = {"sequenceno":"9999","errordescription":null,"returncode":"1","transactionid":"86a981be-7f23-3ac7-adf9-0814f30a4fb0","payload":{"RESULTDATA":{"QueryResult":{"Querystr":"신사동","Kmwords":"신사동+","PoiQuery":"신사동","selectedaddr":{"address_code":"009000001020000","index":0,"dong_code":"1168010700","address":"서울특별시+강남구+신사동","poi_dic":"0","range_code":"0","y":"1947274","x":"958402"},"arrPQuery":[{"index":0,"address_code":"009000001020000","dong_code":"1168010700","address":"서울특별시+강남구+신사동","poi_dic":"0","range_code":"0","y":"1947274","x":"958402"},{"index":1,"address_code":"009000005014000","dong_code":"1162068500","address":"서울특별시+관악구+신사동","poi_dic":"0","range_code":"0","y":"1943066","x":"948557"},{"index":2,"address_code":"009000022012000","dong_code":"1138063200","address":"서울특별시+은평구+신사2동","poi_dic":"0","range_code":"0","y":"1954903","x":"948150"},{"index":3,"address_code":"009000022011000","dong_code":"1138063100","address":"서울특별시+은평구+신사1동","poi_dic":"0","range_code":"0","y":"1955572","x":"948110"},{"index":4,"address_code":"009000022013000","dong_code":"1138010900","address":"서울특별시+은평구+신사동","poi_dic":"0","range_code":"0","y":"1955341","x":"947766"}]},"addr":{"Data":[{"index":0,"address_code":"009000001020000","dong_code":"1168010700","address":"서울특별시+강남구+신사동","poi_dic":"0","range_code":"0","y":"1947274","x":"958402"},{"index":1,"address_code":"009000005014000","dong_code":"1162068500","address":"서울특별시+관악구+신사동","poi_dic":"0","range_code":"0","y":"1943066","x":"948557"},{"index":2,"address_code":"009000022012000","dong_code":"1138063200","address":"서울특별시+은평구+신사2동","poi_dic":"0","range_code":"0","y":"1954903","x":"948150"},{"index":3,"address_code":"009000022011000","dong_code":"1138063100","address":"서울특별시+은평구+신사1동","poi_dic":"0","range_code":"0","y":"1955572","x":"948110"},{"index":4,"address_code":"009000022013000","dong_code":"1138010900","address":"서울특별시+은평구+신사동","poi_dic":"0","range_code":"0","y":"1955341","x":"947766"}],"Count":5,"TotalCount":5},"searchType":"A","place":{"Data":[{"Rank":"222359","DATASRC":"","DID_CODE":"MPADM1168010700","ORG_DB_ID":"MPADM1168010700","STHEME_CODE":"","THEME_CODE":"","KWORD":",강남신사,신사,서울강남신사,서울신사,ㅅㅅㄷ","TEL":"","REF_TEL":"","IDX_NM":"신사동","IMGURL":"","B_CODE":"1168010700","ADDR":"서울특별시+강남구+신사동+600-15","Y":"1947274","URL":"","X":"958402","UJ_KWORD":"동,법정동,행정동","THEME_NAME":"","H_ADDR":"서울특별시+강남구+압구정동","NAME":"신사동","UJ_CODES":"100000000+102300000+102303000","ORG_DB_TYPE":"MP","B_ADDR":"서울특별시+강남구+신사동","POI_KWORD":"","ADDR_CODE":"009000000000000+009000001000000+009000001021000+009000001020000","UJ_NAME":"자연/지명/단지>읍면동>동","IDX_ADDR":"서울특별시+서울+강남구+신사+압구정+신사동+강남+600-15+압구정동+서울시","STHEME_INFO":"","POI_YN":"0","DOCID":"MPADM1168010700","UJ_CODE":"102303000","H_CODE":"1168054500","ADDR_HIST":"","Uid":"2793907"},{"Rank":"211137","DATASRC":"","DID_CODE":"MP1211P00740033","ORG_DB_ID":"337","STHEME_CODE":"PG1111000000004+PG1210GNR000001","THEME_CODE":"0400+0406+0455+0456","KWORD":",3호선,3호선신사역,신사역3호선,신사역,ㅅㅅㅇ","TEL":"","REF_TEL":"","IDX_NM":"신사역","IMGURL":"","B_CODE":"1168010700","ADDR":"서울특별시+강남구+신사동+501","Y":"1946471","URL":"","X":"957634","UJ_KWORD":"지하철,전철역,서울지하철3호선,서울3호선,전철,지하철역,서울지하철,서울전철역,서울전철,3호선,서울지하철역","THEME_NAME":"11-13레벨+8-10레벨+대중교통+지하철역","H_ADDR":"서울특별시+강남구+신사동","NAME":"신사역+(3호선)","UJ_CODES":"400000000+403100000+403101080","ORG_DB_TYPE":"TR","B_ADDR":"서울특별시+강남구+신사동","POI_KWORD":"","ADDR_CODE":"009000000000000+009000001000000+009000001020000","UJ_NAME":"도로시설/교통시설>지하철>서울3호선","IDX_ADDR":"서울특별시+서울+강남구+신사+신사동+강남+서울시+501","STHEME_INFO":"통상명:ST:MP1211P00740033,통상명(좌표용POI):ST:MP1211P00740033","POI_YN":"1","DOCID":"MP1211P00740033","UJ_CODE":"403101080","H_CODE":"1168051000","ADDR_HIST":"","Uid":"2794227"},{"Rank":"211087","DATASRC":"","DID_CODE":"MPADM1138010900","ORG_DB_ID":"MPADM1138010900","STHEME_CODE":"","THEME_CODE":"","KWORD":",은평신사,신사,은평구신사동,서울신사,서울은평신사,ㅅㅅㄷ","TEL":"","REF_TEL":"","IDX_NM":"신사동","IMGURL":"","B_CODE":"1138010900","ADDR":"서울특별시+은평구+신사동+226-4","Y":"1955341","URL":"","X":"947766","UJ_KWORD":"동,법정동,행정동","THEME_NAME":"","H_ADDR":"서울특별시+은평구+신사2동","NAME":"신사동","UJ_CODES":"100000000+102300000+102303000","ORG_DB_TYPE":"MP","B_ADDR":"서울특별시+은평구+신사동","POI_KWORD":"","ADDR_CODE":"009000000000000+009000022000000+009000022012000+009000022013000","UJ_NAME":"자연/지명/단지>읍면동>동","IDX_ADDR":"서울특별시+서울+은평+신사+은평구+신사동+226-4+서울시+신사2동","STHEME_INFO":"","POI_YN":"0","DOCID":"MPADM1138010900","UJ_CODE":"102303000","H_CODE":"1138063200","ADDR_HIST":"","Uid":"1836906"},{"Rank":"211011","DATASRC":"KTO","DID_CODE":"MP1336011387677","ORG_DB_ID":"MP1336011387677","STHEME_CODE":"PG1111000000004+PG1210GNR000002+THEMETAG_OM5300","THEME_CODE":"4100+4103+5300","KWORD":",선샤인관광호탤,강남구호텔선샤인,강남선샤인관광호텔,호텔선샤인,호텔,썬샤인호텔,호탤,서울선샤인관광호텔,선샤인관광호텔,호텔썬샤인,sunshine,호텔선샤인강남구,sunshine관광호탤,hotel,서울선샤인호텔,강남호텔선샤인,선샤인관광호텔강남구,관광호텔선샤인,sunshine관광호텔,강남구선샤인관광호텔,선샤인관광hotel,선샤인,선샤인호텔,sunshine관광hotel,ㅅㅅㅇㄱㄱㅎㅌ","TEL":"02-541-1818","REF_TEL":"080-0541-1818,02-541-1818","IDX_NM":"선샤인관광호텔","IMGURL":"http://korean.visitkorea.or.kr/cms/resource/84/148384_image2_1.jpg?pname=1","B_CODE":"1168010700","ADDR":"서울특별시+강남구+신사동+587-1","Y":"1946913","URL":"http://korean.visitkorea.or.kr/kor/ut/smart/smart_list.jsp?cid=142712","X":"958359","UJ_KWORD":"호텔,hotel,1등급호텔,1급호텔","THEME_NAME":"문화/레저+숙박+숙박","H_ADDR":"서울특별시+강남구+압구정동","NAME":"선샤인관광호텔","UJ_CODES":"500000000+501000000+501003100","ORG_DB_TYPE":"MP","B_ADDR":"서울특별시+강남구+신사동","POI_KWORD":"선샤인관광호텔,선샤인호텔,호텔썬샤인,선샤인관광호텔,썬샤인호텔","ADDR_CODE":"009000000000000+009000001000000+009000001021000+009000001020000","UJ_NAME":"관광/숙박>숙박>1급호텔","IDX_ADDR":"서울특별시+서울+강남구+신사+압구정+신사동+강남+압구정동+서울시+587-1","STHEME_INFO":"통상명:ST:MP1336011387677,통상명(최상위POI):ST:MP1336011387677,숙박:ST:MP1336011387677","POI_YN":"1","DOCID":"MP1336011387677","UJ_CODE":"501003100","H_CODE":"1168054500","ADDR_HIST":"","Uid":"2800644"},{"Rank":"210897","DATASRC":"","DID_CODE":"MP1108711655521","ORG_DB_ID":"MP1108711655521","STHEME_CODE":"PG1111000000004+PG1210GNR000002+PG1210GNR000003","THEME_CODE":"4100+4105","KWORD":",은행나무공원,ㅅㅅㅇㅎㄴㅁㄱㅇ","TEL":"","REF_TEL":"","IDX_NM":"신사은행나무공원","IMGURL":"","B_CODE":"1168010700","ADDR":"서울특별시+강남구+신사동+558","Y":"1946912","URL":"","X":"958118","UJ_KWORD":"근린공원(소형),공원,소형근린공원,근린공원","THEME_NAME":"국립공원+문화/레저","H_ADDR":"서울특별시+강남구+신사동","NAME":"신사은행나무공원","UJ_CODES":"520000000+522100000+522101364","ORG_DB_TYPE":"MP","B_ADDR":"서울특별시+강남구+신사동","POI_KWORD":"","ADDR_CODE":"009000000000000+009000001000000+009000001020000","UJ_NAME":"레저/스포츠>야외시설>근린공원(소형)","IDX_ADDR":"서울특별시+558+서울+강남구+신사+신사동+강남+서울시","STHEME_INFO":"통상명:ST:MP1108711655521,통상명(최상위POI):ST:MP1108711655521,통상명(명소POI):ST:MP1108711655521","POI_YN":"1","DOCID":"MP1108711655521","UJ_CODE":"522101364","H_CODE":"1168051000","ADDR_HIST":"","Uid":"2997839"},{"Rank":"210806","DATASRC":"","DID_CODE":"MP1108710716337","ORG_DB_ID":"MP1108710716337","STHEME_CODE":"PG1111000000004+PG1204000000016+PG1204000000017+PG","THEME_CODE":"4100+4105","KWORD":",ㄷㅅㄱㅇ","TEL":"","REF_TEL":"","IDX_NM":"도산공원","IMGURL":"http://korean.visitkorea.or.kr/cms/resource/36/203736_image2_1.jpg?pname=1","B_CODE":"1168010700","ADDR":"서울특별시+강남구+신사동+649-9","Y":"1947332","URL":"http://korean.visitkorea.or.kr/kor/ut/smart/smart_list.jsp?cid=126486","X":"958923","UJ_KWORD":"공원,근린공원(중소형),중소형근린공원,근린공원","THEME_NAME":"국립공원+문화/레저","H_ADDR":"서울특별시+강남구+압구정동","NAME":"도산공원","UJ_CODES":"520000000+522100000+522101363","ORG_DB_TYPE":"MP","B_ADDR":"서울특별시+강남구+신사동","POI_KWORD":"","ADDR_CODE":"009000000000000+009000001000000+009000001021000+009000001020000","UJ_NAME":"레저/스포츠>야외시설>근린공원(중소형)","IDX_ADDR":"서울특별시+649-9+서울+강남구+신사+압구정+신사동+강남+압구정동+서울시","STHEME_INFO":"통상명:ST:MP1108710716337,교차로명칭:ST:MP1108710716337,버스정류장명칭:ST:MP1108710716337,공원(13레벨표출):ST:MP1108710716337,서울시관광명소:ST:MP1108710716337,서울시테마관광명소:ST:MP1108710716337,통상명(좌표용POI):ST:MP1108710716337,통상명(명소POI):ST:MP1108710716337","POI_YN":"1","DOCID":"MP1108710716337","UJ_CODE":"522101363","H_CODE":"1168054500","ADDR_HIST":"","Uid":"2796056"},{"Rank":"210784","DATASRC":"","DID_CODE":"MP1109E00012165","ORG_DB_ID":"MP1109E00012165","STHEME_CODE":"PG1111000000004+PG1205000000093+PG1206000000002+PG","THEME_CODE":"","KWORD":",garosugil,강남신사동가로수길,신사동가로수길,신사가로수길,ㄱㄹㅅㄱ","TEL":"","REF_TEL":"","IDX_NM":"가로수길","IMGURL":"","B_CODE":"1168010700","ADDR":"서울특별시+강남구+신사동+667-13","Y":"1946901","URL":"","X":"957847","UJ_KWORD":"공연거리,종합공연장,야외공연장,테마거리,공연장,대형예술센터,거리,문화의거리","THEME_NAME":"","H_ADDR":"서울특별시+강남구+신사동","NAME":"가로수길","UJ_CODES":"500000000+501200000+501201060","ORG_DB_TYPE":"MP","B_ADDR":"서울특별시+강남구+신사동","POI_KWORD":"신사동가로수길,garosugil","ADDR_CODE":"009000000000000+009000001000000+009000001020000","UJ_NAME":"관광/숙박>테마-보호구역>테마거리","IDX_ADDR":"서울특별시+서울+강남구+신사+신사동+강남+667-13+서울시","STHEME_INFO":"통상명:ST:MP1109E00012165,서울시관광명소:ST:MP1109E00012165,서울시테마관광명소:ST:MP1109E00012165,통상명(좌표용POI):ST:MP1109E00012165,통상명(명소POI):ST:MP1109E00012165","POI_YN":"1","DOCID":"MP1109E00012165","UJ_CODE":"501201060","H_CODE":"1168051000","ADDR_HIST":"","Uid":"2797912"},{"Rank":"210705","DATASRC":"","DID_CODE":"MP1336011577162","ORG_DB_ID":"MP1336011577162","STHEME_CODE":"PG1111000000004+PG1210GNR000002+PG1210GNR000003","THEME_CODE":"","KWORD":",한국해외기술공사,ㅎㄱㅎㅇㄱㅅㄱㅅ","TEL":"","REF_TEL":"","IDX_NM":"한국해외기술공사","IMGURL":"","B_CODE":"1168010700","ADDR":"서울특별시+강남구+신사동+649-8","Y":"1947444","URL":"","X":"958971","UJ_KWORD":"일반기업","THEME_NAME":"","H_ADDR":"서울특별시+강남구+압구정동","NAME":"한국해외기술공사","UJ_CODES":"210000000+211000000+211003000","ORG_DB_TYPE":"MP","B_ADDR":"서울특별시+강남구+신사동","POI_KWORD":"","ADDR_CODE":"009000000000000+009000001000000+009000001021000+009000001020000","UJ_NAME":"기업>일반기업>일반기업","IDX_ADDR":"서울특별시+서울+649-8+강남구+신사+압구정+신사동+강남+압구정동+서울시","STHEME_INFO":"통상명:ST:MP1336011577162,통상명(최상위POI):ST:MP1336011577162,통상명(명소POI):ST:MP1336011577162","POI_YN":"1","DOCID":"MP1336011577162","UJ_CODE":"211003000","H_CODE":"1168054500","ADDR_HIST":"","Uid":"2798797"}],"Count":"8","TotalCount":"10932"}},"ERRMSG":"","ERRCODE":"0","APIID":"901"},"errorcode":null,"returndescription":"SUCCESS"};
//					var resultData = {"sequenceno":"9999","errordescription":null,"returncode":"1","transactionid":"efd7e265-0026-34d6-b413-ab7238334101","payload":{"RESULTDATA":{"QueryResult":{"Querystr":"강남구+신사동","Kmwords":"강남구+강남+구+신사동+","PoiQuery":"서울특별시+강남구+신사동","selectedaddr":{"address_code":"009000001020000","index":0,"dong_code":"1168010700","address":"서울특별시+강남구+신사동","poi_dic":"0","range_code":"0","y":"1947274","x":"958402"},"arrPQuery":[{"index":0,"address_code":"009000001020000","dong_code":"1168010700","address":"서울특별시+강남구+신사동","poi_dic":"0","range_code":"0","y":"1947274","x":"958402"}]},"addr":{"Data":[{"index":0,"address_code":"009000001020000","dong_code":"1168010700","address":"서울특별시+강남구+신사동","poi_dic":"0","range_code":"0","y":"1947274","x":"958402"}],"Count":1,"TotalCount":1},"searchType":"A","place":{"Data":[{"Rank":"211137","DATASRC":"","DID_CODE":"MP1211P00740033","ORG_DB_ID":"337","STHEME_CODE":"PG1111000000004+PG1210GNR000001","THEME_CODE":"0400+0406+0455+0456","KWORD":",3호선,3호선신사역,신사역3호선,신사역,ㅅㅅㅇ","TEL":"","REF_TEL":"","IDX_NM":"신사역","IMGURL":"","B_CODE":"1168010700","ADDR":"서울특별시+강남구+신사동+501","Y":"1946471","URL":"","X":"957634","UJ_KWORD":"지하철,전철역,서울지하철3호선,서울3호선,전철,지하철역,서울지하철,서울전철역,서울전철,3호선,서울지하철역","THEME_NAME":"11-13레벨+8-10레벨+대중교통+지하철역","H_ADDR":"서울특별시+강남구+신사동","NAME":"신사역+(3호선)","UJ_CODES":"400000000+403100000+403101080","ORG_DB_TYPE":"TR","B_ADDR":"서울특별시+강남구+신사동","POI_KWORD":"","ADDR_CODE":"009000000000000+009000001000000+009000001020000","UJ_NAME":"도로시설/교통시설>지하철>서울3호선","IDX_ADDR":"서울특별시+서울+강남구+신사+신사동+강남+서울시+501","STHEME_INFO":"통상명:ST:MP1211P00740033,통상명(좌표용POI):ST:MP1211P00740033","POI_YN":"1","DOCID":"MP1211P00740033","UJ_CODE":"403101080","H_CODE":"1168051000","ADDR_HIST":"","Uid":"2794227"},{"Rank":"211011","DATASRC":"KTO","DID_CODE":"MP1336011387677","ORG_DB_ID":"MP1336011387677","STHEME_CODE":"PG1111000000004+PG1210GNR000002+THEMETAG_OM5300","THEME_CODE":"4100+4103+5300","KWORD":",선샤인관광호탤,강남구호텔선샤인,강남선샤인관광호텔,호텔선샤인,호텔,썬샤인호텔,호탤,서울선샤인관광호텔,선샤인관광호텔,호텔썬샤인,sunshine,호텔선샤인강남구,sunshine관광호탤,hotel,서울선샤인호텔,강남호텔선샤인,선샤인관광호텔강남구,관광호텔선샤인,sunshine관광호텔,강남구선샤인관광호텔,선샤인관광hotel,선샤인,선샤인호텔,sunshine관광hotel,ㅅㅅㅇㄱㄱㅎㅌ","TEL":"02-541-1818","REF_TEL":"080-0541-1818,02-541-1818","IDX_NM":"선샤인관광호텔","IMGURL":"http://korean.visitkorea.or.kr/cms/resource/84/148384_image2_1.jpg?pname=1","B_CODE":"1168010700","ADDR":"서울특별시+강남구+신사동+587-1","Y":"1946913","URL":"http://korean.visitkorea.or.kr/kor/ut/smart/smart_list.jsp?cid=142712","X":"958359","UJ_KWORD":"호텔,hotel,1등급호텔,1급호텔","THEME_NAME":"문화/레저+숙박+숙박","H_ADDR":"서울특별시+강남구+압구정동","NAME":"선샤인관광호텔","UJ_CODES":"500000000+501000000+501003100","ORG_DB_TYPE":"MP","B_ADDR":"서울특별시+강남구+신사동","POI_KWORD":"선샤인관광호텔,선샤인호텔,호텔썬샤인,선샤인관광호텔,썬샤인호텔","ADDR_CODE":"009000000000000+009000001000000+009000001021000+009000001020000","UJ_NAME":"관광/숙박>숙박>1급호텔","IDX_ADDR":"서울특별시+서울+강남구+신사+압구정+신사동+강남+압구정동+서울시+587-1","STHEME_INFO":"통상명:ST:MP1336011387677,통상명(최상위POI):ST:MP1336011387677,숙박:ST:MP1336011387677","POI_YN":"1","DOCID":"MP1336011387677","UJ_CODE":"501003100","H_CODE":"1168054500","ADDR_HIST":"","Uid":"2800644"},{"Rank":"210897","DATASRC":"","DID_CODE":"MP1108711655521","ORG_DB_ID":"MP1108711655521","STHEME_CODE":"PG1111000000004+PG1210GNR000002+PG1210GNR000003","THEME_CODE":"4100+4105","KWORD":",은행나무공원,ㅅㅅㅇㅎㄴㅁㄱㅇ","TEL":"","REF_TEL":"","IDX_NM":"신사은행나무공원","IMGURL":"","B_CODE":"1168010700","ADDR":"서울특별시+강남구+신사동+558","Y":"1946912","URL":"","X":"958118","UJ_KWORD":"근린공원(소형),공원,소형근린공원,근린공원","THEME_NAME":"국립공원+문화/레저","H_ADDR":"서울특별시+강남구+신사동","NAME":"신사은행나무공원","UJ_CODES":"520000000+522100000+522101364","ORG_DB_TYPE":"MP","B_ADDR":"서울특별시+강남구+신사동","POI_KWORD":"","ADDR_CODE":"009000000000000+009000001000000+009000001020000","UJ_NAME":"레저/스포츠>야외시설>근린공원(소형)","IDX_ADDR":"서울특별시+558+서울+강남구+신사+신사동+강남+서울시","STHEME_INFO":"통상명:ST:MP1108711655521,통상명(최상위POI):ST:MP1108711655521,통상명(명소POI):ST:MP1108711655521","POI_YN":"1","DOCID":"MP1108711655521","UJ_CODE":"522101364","H_CODE":"1168051000","ADDR_HIST":"","Uid":"2997839"},{"Rank":"210806","DATASRC":"","DID_CODE":"MP1108710716337","ORG_DB_ID":"MP1108710716337","STHEME_CODE":"PG1111000000004+PG1204000000016+PG1204000000017+PG","THEME_CODE":"4100+4105","KWORD":",ㄷㅅㄱㅇ","TEL":"","REF_TEL":"","IDX_NM":"도산공원","IMGURL":"http://korean.visitkorea.or.kr/cms/resource/36/203736_image2_1.jpg?pname=1","B_CODE":"1168010700","ADDR":"서울특별시+강남구+신사동+649-9","Y":"1947332","URL":"http://korean.visitkorea.or.kr/kor/ut/smart/smart_list.jsp?cid=126486","X":"958923","UJ_KWORD":"공원,근린공원(중소형),중소형근린공원,근린공원","THEME_NAME":"국립공원+문화/레저","H_ADDR":"서울특별시+강남구+압구정동","NAME":"도산공원","UJ_CODES":"520000000+522100000+522101363","ORG_DB_TYPE":"MP","B_ADDR":"서울특별시+강남구+신사동","POI_KWORD":"","ADDR_CODE":"009000000000000+009000001000000+009000001021000+009000001020000","UJ_NAME":"레저/스포츠>야외시설>근린공원(중소형)","IDX_ADDR":"서울특별시+649-9+서울+강남구+신사+압구정+신사동+강남+압구정동+서울시","STHEME_INFO":"통상명:ST:MP1108710716337,교차로명칭:ST:MP1108710716337,버스정류장명칭:ST:MP1108710716337,공원(13레벨표출):ST:MP1108710716337,서울시관광명소:ST:MP1108710716337,서울시테마관광명소:ST:MP1108710716337,통상명(좌표용POI):ST:MP1108710716337,통상명(명소POI):ST:MP1108710716337","POI_YN":"1","DOCID":"MP1108710716337","UJ_CODE":"522101363","H_CODE":"1168054500","ADDR_HIST":"","Uid":"2796056"},{"Rank":"210784","DATASRC":"","DID_CODE":"MP1109E00012165","ORG_DB_ID":"MP1109E00012165","STHEME_CODE":"PG1111000000004+PG1205000000093+PG1206000000002+PG","THEME_CODE":"","KWORD":",garosugil,강남신사동가로수길,신사동가로수길,신사가로수길,ㄱㄹㅅㄱ","TEL":"","REF_TEL":"","IDX_NM":"가로수길","IMGURL":"","B_CODE":"1168010700","ADDR":"서울특별시+강남구+신사동+667-13","Y":"1946901","URL":"","X":"957847","UJ_KWORD":"공연거리,종합공연장,야외공연장,테마거리,공연장,대형예술센터,거리,문화의거리","THEME_NAME":"","H_ADDR":"서울특별시+강남구+신사동","NAME":"가로수길","UJ_CODES":"500000000+501200000+501201060","ORG_DB_TYPE":"MP","B_ADDR":"서울특별시+강남구+신사동","POI_KWORD":"신사동가로수길,garosugil","ADDR_CODE":"009000000000000+009000001000000+009000001020000","UJ_NAME":"관광/숙박>테마-보호구역>테마거리","IDX_ADDR":"서울특별시+서울+강남구+신사+신사동+강남+667-13+서울시","STHEME_INFO":"통상명:ST:MP1109E00012165,서울시관광명소:ST:MP1109E00012165,서울시테마관광명소:ST:MP1109E00012165,통상명(좌표용POI):ST:MP1109E00012165,통상명(명소POI):ST:MP1109E00012165","POI_YN":"1","DOCID":"MP1109E00012165","UJ_CODE":"501201060","H_CODE":"1168051000","ADDR_HIST":"","Uid":"2797912"},{"Rank":"210705","DATASRC":"","DID_CODE":"MP1336011577162","ORG_DB_ID":"MP1336011577162","STHEME_CODE":"PG1111000000004+PG1210GNR000002+PG1210GNR000003","THEME_CODE":"","KWORD":",한국해외기술공사,ㅎㄱㅎㅇㄱㅅㄱㅅ","TEL":"","REF_TEL":"","IDX_NM":"한국해외기술공사","IMGURL":"","B_CODE":"1168010700","ADDR":"서울특별시+강남구+신사동+649-8","Y":"1947444","URL":"","X":"958971","UJ_KWORD":"일반기업","THEME_NAME":"","H_ADDR":"서울특별시+강남구+압구정동","NAME":"한국해외기술공사","UJ_CODES":"210000000+211000000+211003000","ORG_DB_TYPE":"MP","B_ADDR":"서울특별시+강남구+신사동","POI_KWORD":"","ADDR_CODE":"009000000000000+009000001000000+009000001021000+009000001020000","UJ_NAME":"기업>일반기업>일반기업","IDX_ADDR":"서울특별시+서울+649-8+강남구+신사+압구정+신사동+강남+압구정동+서울시","STHEME_INFO":"통상명:ST:MP1336011577162,통상명(최상위POI):ST:MP1336011577162,통상명(명소POI):ST:MP1336011577162","POI_YN":"1","DOCID":"MP1336011577162","UJ_CODE":"211003000","H_CODE":"1168054500","ADDR_HIST":"","Uid":"2798797"},{"Rank":"210694","DATASRC":"","DID_CODE":"MP1108711655631","ORG_DB_ID":"MP1108711655631","STHEME_CODE":"PG1111000000004+PG1210GNR000002","THEME_CODE":"4100+4105","KWORD":",ㅅㅅㄲㅊㄱㅇ","TEL":"","REF_TEL":"","IDX_NM":"신사까치공원","IMGURL":"","B_CODE":"1168010700","ADDR":"서울특별시+강남구+신사동+597","Y":"1947237","URL":"","X":"958402","UJ_KWORD":"체육공원,공원,녹지단지,근린공원","THEME_NAME":"국립공원+문화/레저","H_ADDR":"서울특별시+강남구+압구정동","NAME":"신사까치공원","UJ_CODES":"520000000+522100000+522101350","ORG_DB_TYPE":"MP","B_ADDR":"서울특별시+강남구+신사동","POI_KWORD":"","ADDR_CODE":"009000000000000+009000001000000+009000001021000+009000001020000","UJ_NAME":"레저/스포츠>야외시설>근린공원","IDX_ADDR":"서울특별시+597+서울+강남구+신사+압구정+신사동+강남+압구정동+서울시","STHEME_INFO":"통상명:ST:MP1108711655631,통상명(최상위POI):ST:MP1108711655631","POI_YN":"1","DOCID":"MP1108711655631","UJ_CODE":"522101350","H_CODE":"1168054500","ADDR_HIST":"","Uid":"2795128"},{"Rank":"210627","DATASRC":"","DID_CODE":"MP1108711655509","ORG_DB_ID":"MP1108711655509","STHEME_CODE":"PG1111000000004+PG1210GNR000002","THEME_CODE":"4100+4105","KWORD":",ㅅㅅㅁㄹㄱㅇ","TEL":"","REF_TEL":"","IDX_NM":"신사목련공원","IMGURL":"","B_CODE":"1168010700","ADDR":"서울특별시+강남구+신사동+567-37","Y":"1947171","URL":"","X":"958098","UJ_KWORD":"체육공원,공원,녹지단지,근린공원","THEME_NAME":"국립공원+문화/레저","H_ADDR":"서울특별시+강남구+신사동","NAME":"신사목련공원","UJ_CODES":"520000000+522100000+522101350","ORG_DB_TYPE":"MP","B_ADDR":"서울특별시+강남구+신사동","POI_KWORD":"","ADDR_CODE":"009000000000000+009000001000000+009000001020000","UJ_NAME":"레저/스포츠>야외시설>근린공원","IDX_ADDR":"서울특별시+서울+567-37+강남구+신사+신사동+강남+서울시","STHEME_INFO":"통상명:ST:MP1108711655509,통상명(최상위POI):ST:MP1108711655509","POI_YN":"1","DOCID":"MP1108711655509","UJ_CODE":"522101350","H_CODE":"1168051000","ADDR_HIST":"","Uid":"2946904"}],"Count":"8","TotalCount":"8092"}},"ERRMSG":"","ERRCODE":"0","APIID":"901"},"errorcode":null,"returndescription":"SUCCESS"};
					console.log(resultData);
					
					$(".locationItem").remove();
					locations = [];
					locations = resultData.payload.RESULTDATA.place.Data;
//					var locationsCount = resultData.payload.RESULTDATA.place.TotalCount;
//					console.log(locationsCount);
					
					createLocationList(locations);
					
					initMap();
					
				} else {
					alert("검색결과 없음.");
				}
				
			});
};

var createLocationList = function(locations) {
	console.log(locations);
	for( var i in locations ){
		$("<li>").addClass("liLocationList")
				.attr("id","liLocationList" + i)
				.append( $("<div>").addClass("divLocationList")
						.append($("<div>").addClass("imgMarker")
										.append($("<img>").attr( "src", markerImgArr[i] )))
						.append($("<div>").addClass("btnBackforward")
								.append($("<a>").addClass("back").attr("data-idx",(eval(i) - 1)).attr("href","#")
										.append($("<span>").html("&lt;"))
										.on("click",function(e) {
											var idx= $(this).attr("data-idx");
											if (idx != -1){
												$('#ulLocationList').animate({left:"-" + (480 * idx) + "px"},500);
											}
										})
										.click(function() {
											map.moveTo( locations[$(this).attr("data-idx")].coord, 10 );
										})
								)
								.append($("<a>").addClass("forward").attr("data-idx",(eval(i) + 1)).attr("href","#")
										.append($("<span>").html("&gt;"))
										.on("click",function(e) {
											var idx= $(this).attr("data-idx");
											if (idx != locations.length){
												$('#ulLocationList').animate({left:"-" + (480 * idx) + "px"},500);
											}
										})
										.click(function() {
											map.moveTo( locations[$(this).attr("data-idx")].coord, 10 );
										})
								)      
						)
						
						.append($("<div>").addClass("locationInfo")
											.css("margin-left","70px")
								.append($("<div>").addClass("divFavoriteIcon").append($("<a>").attr("href","#").attr("data-idx",i).attr("data-status","false")
										.click(function() {
											var idx = $(this).attr("data-idx");
											addAndDelFavoriteLocation(idx, locations);
										})
										)
								)
								.append($("<div>").addClass("locationNameAndAddress")
										.append($("<span>").addClass("locationName ui-li-heading").text( locations[i].NAME ))
										.append($("<span>").addClass("locationAddress ui-li-desc").html( locations[i].ADDR + "<br>" + locations[i].THEME_NAME ))
								)
								.append($("<div>").addClass("locationStartAndEnd").attr("data-idx",i)
										.append($("<span>").addClass("spanLocationStart")
												.append($("<a>").addClass("locationStart").attr("href","#")
														.append( $("<strong>").text("출발") )
														.click(function() {
															var idx =  $(this).parents(".locationStartAndEnd").attr("data-idx");
															setStartSession(
																	locations[idx].coord.getX(), 
																	locations[idx].coord.getY(), 
																	locations[idx].locationName, 
																	"",
																	function() {
																		window.location.href =  "../home/home.html";
																	} );
														})
												)
										)
										.append($("<span>").addClass("spanLocationEnd")
												.append($("<a>").addClass("locationEnd").attr("href","#")
														.append($("<strong>").text("도착"))
														.click(function() {
															var idx =  $(this).parents(".locationStartAndEnd").attr("data-idx");
															setEndSession(
																	locations[idx].coord.getX(), 
																	locations[idx].coord.getY(), 
																	locations[idx].locationName, 
																	"",
																	function() {
																		window.location.href =  "../home/home.html";
																	} );
														})
												)
										)
								)
						)
				)
		.appendTo( $("#ulLocationList") );
		
		$.extend(true, locations[i], { 
			image : markerImgArr[i],
			coord : new olleh.maps.Coord(locations[i].X, locations[i].Y),
			locationName : locations[i].NAME
		});
	}
	
	// 즐겨찾기 초기설정
	getFavoriteLocation(function(favoriteLocationList) {
		console.log(favoriteLocationList);
		console.log(locations[0].X);
		for(var i in favoriteLocationList) {
//			console.log("i = " + i);
			for(var j in locations ) {
				if (favoriteLocationList[i].fvrtLocLat == locations[j].X & 
						favoriteLocationList[i].fvrtLocLng == locations[j].Y & 
						favoriteLocationList[i].fvrtLocName == locations[j].NAME) {
					$(".divFavoriteIcon a[data-idx=" + j + "]").css(
							'background-image','url(' + '../images/common/favorite-icon.png' + ')');
					$(".divFavoriteIcon a[data-idx=" + j + "]").attr("data-status","true");
				}
				
			}
		}
	});
	$(".back[data-idx=-1]").css("visibility", "hidden");
	$(".forward[data-idx="+ locations.length +"]").css("visibility", "hidden");
	
};

var getFavoriteLocation = function(execute) {
	console.log("getFavoriteLocation()");
	
	var url = "../member/getFavoritePlaces.do";
	$.getJSON(url
			, function(result) {
				if (result.status == "success") {
					var favoriteLocationList = result.data;
					if (favoriteLocationList.length > 0) {
						execute(favoriteLocationList);
					}
				} else {
					alert(result.data);
				}
	});
	
};

var addAndDelFavoriteLocation = function(idx, locations) {
	console.log("favoriteLocation()" + idx + locations);
	
	getFavoriteLocation(function(favoriteLocationList) {
		
		if($(".divFavoriteIcon a[data-idx=" + idx + "]").attr("data-status") =="false") {
			$(".divFavoriteIcon a[data-idx=" + idx + "]").attr("data-status","true");
			$(".divFavoriteIcon a[data-idx=" + idx + "]").css(
					'background-image','url(' + '../images/common/favorite-icon.png' + ')');
			
			var isFavoriteLocation = false;
			for ( var i in favoriteLocationList) {
				if ((favoriteLocationList[i].fvrtLocLat == locations[idx].X & 
						favoriteLocationList[i].fvrtLocLng == locations[idx].Y & 
						favoriteLocationList[i].fvrtLocName == locations[idx].NAME)) {
					isFavoriteLocation = true;
				} else {
					
				} 
			}
			
			if (isFavoriteLocation == false) {
				$.post("../member/addFavoritePlace.do"
						,{
							fvrtLocName : locations[idx].locationName,
							fvrtLocLat 	: locations[idx].coord.getX(),
							fvrtLocLng  : locations[idx].coord.getY(),
						}, function(result) {
							if (result.status == "success") {
								console.log("addFvrtLoc 성공");
							} else {
								alert(result.data);
							}
						}, "json");
			}
			
		} else {
			$(".divFavoriteIcon a[data-idx=" + idx + "]").attr("data-status","false");
			$(".divFavoriteIcon a[data-idx=" + idx + "]").css(
					'background-image','url(' + '../images/common/favorite-non-icon.png' + ')');
			for (var i in favoriteLocationList){
				if (favoriteLocationList[i].fvrtLocLat == locations[idx].X & 
						favoriteLocationList[i].fvrtLocLng == locations[idx].Y & 
						favoriteLocationList[i].fvrtLocName == locations[idx].NAME) {
					var url = "../member/deleteFavoritePlace.do";
					$.post(url
							,{
								fvrtLocNo : favoriteLocationList[i].fvrtLocNo
							}, function(result) {
								if (result.status == "success") {
									console.log("deleteFvrtLoc 성공");
								} else {
									alert(result.data);
								}
							}, "json");
				}
			}
		}
	});
};

var initMap = function() {
	console.log("initMap()");
	
	if ( locations && locations.length > 0) {
		loadMap( locations[0].coord, 10 );
		setMarkers();
		
	} else {
		// 현재위치 가져오기
		navigator.geolocation.getCurrentPosition(function(position) {
			var curPoint = new olleh.maps.Point( position.coords.longitude, position.coords.latitude );
			var srcproj = new olleh.maps.Projection('WGS84');
			var destproj = new olleh.maps.Projection('UTM_K');
			olleh.maps.Projection.transform(curPoint, srcproj, destproj);
			
			loadMap( new olleh.maps.Coord(curPoint.getX(), curPoint.getY()), 10 );
		});
	}
	
};

var loadMap = function (coord, zoom) {
	console.log("loadMap(coord, zoom)");
	
  	var mapOptions = {  	
     	center : coord,
     	zoom : zoom,
     	mapTypeId : olleh.maps.MapTypeId.BASEMAP
  	}; 
  	map = new olleh.maps.Map(document.getElementById("canvas_map"), mapOptions);
};

var setMarkers = function() {
	console.log("setMarkers()");
	
	var markers = [];
	
	for (var i in locations) {
		markers[i] = new olleh.maps.Marker({
				position : locations[i].coord,  
				map : map,  
//				shadow : shadow,
				icon : new olleh.maps.MarkerImage(
						locations[i].image, 
						new olleh.maps.Size(40, 40),
						new olleh.maps.Pixel(0, 0),
						new olleh.maps.Pixel(20, 40)
				),
				title : locations[i].NAME,
				zIndex : i
		});
	}
};

