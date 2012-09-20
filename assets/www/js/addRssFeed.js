//Stores entries
var rssTitle = '';
var rssIcon = '';
function addRssFeed(){
	//window.localStorage.clear();
	var rssFeedUrl = document.getElementById("rssFeedUrl").value;
	getTitle(rssFeedUrl);	
}

function getTitle(rssFeedUrl){
	$.ajax({
		url:rssFeedUrl,
		success:function(res,code) {//请求成功
			var xml = $(res);
			var channel = xml.find("channel");
			var title = channel.find("title:first").text();
			var icon = channel.find("link:first").text();
			if(icon === '')
				icon = 'css/images/icon.png';
			else	
				icon += icon.substr(-1) === "/"?"favicon.ico":"/favicon.ico";
			rssTitle = title;
			rssIcon = icon;
			var feedUrlKey = "<icon>" +rssIcon+"<icon><title>"+ rssTitle +"<title>";
			
			if(rssTitle!='' && rssIcon!=''){
				kset(feedUrlKey, rssFeedUrl);
				alert(rssTitle  + "添加成功！");
			}
			else{
				alert("不是RSS源地址！");
			}
		},
		error:function(jqXHR,status,error) {//请求失败
			alert("地址不可达！");
		}
	}).complete(function(){
		//添加完成后的处理
	});
}

function importFromOpml(){
	
}
//parse OPML
function getListOfFeeds(oDoc) {
	//get the list title
	var allText = oDoc.getElementsByTagName('title')[0];
	document.title = ( allText && allText.firstChild ) ? ( 'Feed collection: ' + getUnNestedTextNodes( allText ) ) : 'Untitled feed collection';
	allText = '<h2>' + prepHTMLCode(document.title) + '<\/h2>';
	//get the feed list - and try to cope with different formats - no promises
	var oOutline = oDoc.getElementsByTagName('outline'), oAllLinks = '';
	for( var i = 0, j; i < oOutline.length; i++ ) {
		j = oOutline[i];
		var xmlUrl = j.getAttribute('xmlUrl');
		if( !xmlUrl ) { continue; }
		var oTitle = j.getAttribute('title');
		if( !oTitle ) { oTitle = j.getAttribute('text'); }
		if( !oTitle ) { oTitle = xmlUrl; }
		oTitle = prepHTMLCode(oTitle);
		xmlUrl = prepHTMLCode(xmlUrl);
		oAllLinks += '<li><a onclick="return fromOPML(this.href,'+((j.getAttribute('fix091')=='yes')?true:false)+');" href="'+prepHTMLCode(xmlUrl)+'" target="_self">'+prepHTMLCode(oTitle)+'<\/a><\/li>';
	}
	allText += oAllLinks ? ('<ul>'+oAllLinks+'<\/ul>') : '<p>No feeds found<\/p>';
	//output
	document.getElementById('feedcontainer').innerHTML = allText;
}


function kset(key, value){
    console.log("key"+key+"value"+value);
    window.localStorage.setItem(key, value);
}
 
function kget(key){
    console.log(key);
    return window.localStorage.getItem(key);
}
 
function kremove(key){
    window.localStorage.removeItem(key);
}
 
function kclear(){
    window.localStorage.clear();
}
 
//测试更新方法
function kupdate(key,value){
    window.localStorage.removeItem(key);
    window.localStorage.setItem(key, value);
}
