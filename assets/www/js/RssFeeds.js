

function onLoad(){

	//now draw the list
	var themeStr = window.localStorage.getItem("themeStr")||'b';
	var s = '';
	
	//添加默认源地址--新闻中心（搜狐）
	window.localStorage.setItem('<icon>http://www.sohu.com/favicon.ico<icon><title>新闻中心<title>','http://news.sohu.com/rss/scroll.xml');
//	s = '<li data-theme="' 
//		   + themeStr + '" ><img src="'+ 'http://www.sohu.com/favicon.ico' 
//		   +'" class="ui-li-icon" height=20px width=20px><a href="#contentPage" align=middle class="contentLink" data-url="'
//		   +'http://news.sohu.com/rss/scroll.xml'+'">' 
//		   + '新闻中心' + '</a><a href="#" data-theme="' +themeStr + '"  data-key="'
//		   +'<icon>http://www.sohu.com/favicon.ico<icon><title>新闻中心<title>'+ '">Delete Feed</a></li>';
	
	for (var i = 0; i < window.localStorage.length; i++) {
		storedFeedUrlKey = window.localStorage.key(i);
		var reg = /^<icon>(.+?)<icon><title>(.+?)<title>$/;
		var group = storedFeedUrlKey.match(reg);
		
		var titleicon = '';
		var titletext = '';
		
		if(null != group){
			   titleicon = group[1];
			   titletext = group[2];

			   s += '<li data-theme="' 
				   + themeStr + '" ><img src="'+ titleicon 
				   +'" class="ui-li-icon" height=20px width=20px><a href="#" align=middle class="contentLink" data-url="'
				   +window.localStorage.getItem(storedFeedUrlKey)+'">' 
				   + titletext + '</a><a href="#" data-theme="' +themeStr + '"  data-key="'
				   +storedFeedUrlKey+ '">Delete Feed</a></li>';
			}	
	};
	$("#feedsList").html(s);
	$("#feedsList").listview("refresh");
}

//$("#mainPage").live("pageaftershow", function() {
//	
//});

$(document).ready( function(){
	// Does this browser support geolocation?
	$('#edit_Buttons').slideUp();
	
	//设置自动旋转
//    var supportsOrientationChange = "onorientationchange" in window;
//    var orientationEvent = supportsOrientationChange ? "orientationchange" : "resize"; 
//    //
//    $(window).bind(orientationEvent, function(){
//	    var orientation = window.orientation;
//	    var new_orientation = (orientation) ? 0 : 180 + orientation;
//	    alert('orientation:'+orientation+',new_orientation:'+new_orientation);
//	    new_orientation = -orientation;
//	    $('body').css({
//	        "-webkit-transform": "rotate(" + new_orientation + "deg)"
//	    });
//    });
    //
//  window.addEventListener(orientationEvent, function() {
//	var orientation = window.orientation;
//    var new_orientation = (orientation) ? 0 : 180 + orientation;
//    
//    alert('orientation:'+orientation+',new_orientation:'+new_orientation);
//    $('body').css({
//        "-webkit-transform": "rotate(" + new_orientation + "deg)"
//    });
//}, true);
});

//listen for Edit button
$("#button_Edit").live("click", function() {
	$('#edit_Buttons').slideToggle();
});
//listen for delete button
$("#delete_button").live("click", function() {
	alert('delete?');
	
	$("#feedsList li  .ui-btn-active").each(function(){
		//删除种子
		$(this).parent("li").remove();
		var FeedUrlKey = $(this).data("key");
		alert(FeedUrlKey);
		removeRssFeed(FeedUrlKey);
	});
});
//listen for download button
$("#download_button").live("click", function() {
//	alert('download');
	
	$("#feedsList li .ui-btn-active").each(function(){
		//下载种子内新闻

		var FeedUrlKey = $(this).data("key");
//		alert(FeedUrlKey);
		var rssFeedUrl = window.localStorage.getItem(FeedUrlKey);
		downloadNewsandFullContent(rssFeedUrl);
//		alert(rssFeedUrl);
	});
});

$("#feedsList li .ui-li-link-alt").live("click", function() {
	//显示操作列表
	//$('#edit_Buttons').slideToggle();
	

	
	//转换check button样式
	
	$(this).toggleClass("ui-btn-active");
	
//	var selectedRssFeedUrl = $(this).parent("li").children(".contentLink").data('url');
//	var selectedRssFeedUrl = $(this).closest("li").children(".contentLink").data('url');
//	var selectedRssFeedUrl = $(this).closest(".contentLink").data("url");
//	var selectedRssFeedUrl = $(this).prev().data('url');
//	alert(selectedRssFeedUrl);
//	var a = $(this).parent().siblings(".contentLink");
//	alert(a);
//	alert(a.text());
//	$(this).parent("li").addClass("active");
//	$("#feedsList").listview("refresh");
	
//	$(this).addClass("ui-btn-active");

});

//listen for detail links
$(".contentLink").live("click", function() {
	sessionStorage.rssFeedUrl = $(this).data("url");
	window.location = "Contents.html"; 
});

//listen for detail weather
//$("#showDetailWea").live("click", function() {
//	window.location = "detailWea.html"; 
//});

//下载rssFeedUrl源内的所有新闻
//存储在localStorage中，key为rssFeedUrl
var newsList = [];

//读取源信息，及其全文内容
function downloadNewsandFullContent(rssFeedUrl){
	var title = '';
	$.ajax({
		url:rssFeedUrl,
		success:function(res,code) {
			newsList = [];
			var xml = $(res);
			var channel = xml.find("channel");
			title = channel.find("title:first").text();
			
			var items = xml.find("item");
			$.each(items, function(i, v) {
				news = { 
					title:$(v).find("title").text(), 
					link:$(v).find("link").text(), 
					description:$.trim($(v).find("description").text()),
					pubDate:$(v).find("pubDate").text(),
					fullContent:getFullContentByUrl($(v).find("link").text())
				};
//				alert(news.fullContent);
				newsList.push(news);
			});
			//store entries
			window.localStorage[rssFeedUrl] = JSON.stringify(newsList);
			alert(title + '---下载完成！');
//			renderEntries(entries);
		},
		error:function(jqXHR,status,error) {
			//error
			alert('download news error');
		}
	}).complete(function(){
		//添加下载完成后的处理
		
	});
}
//抽取网页全文内容
function getFullContentByUrl(url){
	var fullContent = '';
	$.ajax({
		url:url,
		async:false,
		success:function(res,code) {//请求成功
			//抽取网页内容（适用于：包含网页有效内容的元素id为contentText的情况，如：sohu）
			fullContent = $(res).find("#contentText").html();	
		},
		error:function(jqXHR,status,error) {//请求失败
			alert("get full content error");
		}
	}).complete(function(){
		//添加完成后的处理
	});
	return fullContent;
}

//在localStorage中删除RssFeed
function removeRssFeed(FeedUrlKey) {
	window.localStorage.removeItem(FeedUrlKey);
}

function getRootPath(feedUrl){ 
    var strFullPath=feedUrl; 
    var strPath=st.pathname; 
    var pos=strFullPath.indexOf(strPath); 
    var prePath=strFullPath.substring(0,pos); 
    var postPath=strPath.substring(0,strPath.substr(1).indexOf('/')+1); 
    return(prePath+postPath); 
}

function ruleexpression(){
	var title = "<icon>http.con<icon><title>dsf<title>";
	var reg = /^<icon>(.+?)<icon><title>(.+?)<title>$/;
	var group = title.match(reg);
	
	alert(group);
	if(null != group){
		   alert(group[0]);
		   alert(group[1]);
		   alert(group[2]);
	}
}