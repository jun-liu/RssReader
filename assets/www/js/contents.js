//Title of the blog
var TITLE = "RSS Reader";

var RSS = sessionStorage.rssFeedUrl;

//Stores entries
var entries = [];
var selectedEntry = "";
var outSiteUrl = "";

//-----------------------------------------
var myScroll,
	pullDownEl, pullDownOffset,
	pullUpEl, pullUpOffset,
	
	generatedCount = 0;
	interval = 5;
	end_index = 0;

function pullDownAction () {

	//remove all li
	$("#linksList li").remove();
	//reload
	refreshlinks();
	myScroll.refresh();		// Remember to refresh when contents are loaded (ie: on ajax completion)

}

function pullUpAction () {
	var themeStr = window.localStorage.getItem("themeStr")||'b';
	setTimeout(function () {	// <-- Simulate network congestion, remove setTimeout from production!
		var el, li, i, liDivider;
		el = document.getElementById('linksList');
		
		var count = 0;
		var index = end_index;
		var newlis = '';
		if(end_index === entries.length){
			alert("没有更多新闻了");
			myScroll.refresh();
			return;
		}
		var s = '';
		for (i=index; i<entries.length; i++) {
					
			s += '<li data-role="list-divider" >'+ entries[i].pubDate
	    	+ '</li><li class="li_news_items" data-entryid="'
	    	+i+'"  data-theme="'
	    	+ themeStr + '"><span class="news_title" >'
	        + entries[i].title 
	        + '</span><p></p><span class="news_description"  >'
	        + parseDescriprion(entries[i].description) + '</span>'
	        +'</li>';
			
			// append divider
//			liDivider = document.createElement('li');
//			liDivider.setAttribute('data-role', 'list-divider');
//			liDivider.innerText = entries[i].pubDate;
//			el.appendChild(liDivider, el.childNodes[0]);
//			// append 
//			li = document.createElement('li');
//			li.setAttribute('data-theme', themeStr);
//			li.setAttribute('data-entryid', i);
//			li.addClass('li_news_items');
//			li.innerHTML += '<div class="div_news_title"  >'
//		        + entries[i].title 
//		        + '</div><p></p><div class="div_news_description" >'
//		        + parseDescriprion(entries[i].description) + '</div>';
//			el.appendChild(li, el.childNodes[0]);
//			
			end_index++;
			count++;
			if(count === interval)
				break;
		}
		$("#linksList").append(s);
		$("#linksList").listview("refresh");
		setDividerTheme();
		myScroll.refresh();		// Remember to refresh when contents are loaded (ie: on ajax completion)
	}, 1000);	// <-- Simulate network congestion, remove setTimeout from production!
}

function loaded() {
	pullDownEl = document.getElementById('pullDown');
	pullDownOffset = pullDownEl.offsetHeight;
	pullUpEl = document.getElementById('pullUp');	
	pullUpOffset = pullUpEl.offsetHeight;
	
	myScroll = new iScroll('wrapper', {
		useTransition: true,
		topOffset: pullDownOffset,
		onRefresh: function () {
			if (pullDownEl.className.match('loading')) {
				pullDownEl.className = '';
				pullDownEl.querySelector('.pullDownLabel').innerHTML = 'Pull down to refresh...';
			} else if (pullUpEl.className.match('loading')) {
				pullUpEl.className = '';
				pullUpEl.querySelector('.pullUpLabel').innerHTML = 'Pull up to load more...';
			}
		},
		onScrollMove: function () {
			var offset = 5;
			if (this.y > offset && !pullDownEl.className.match('flip')) {
				pullDownEl.className = 'flip';
				pullDownEl.querySelector('.pullDownLabel').innerHTML = 'Release to refresh...';
				this.minScrollY = 0;
			} else if (this.y < offset && pullDownEl.className.match('flip')) {
				pullDownEl.className = '';
				pullDownEl.querySelector('.pullDownLabel').innerHTML = 'Pull down to refresh...';
				this.minScrollY = -pullDownOffset;
			} else if (this.y < (this.maxScrollY - offset) && !pullUpEl.className.match('flip')) {
				pullUpEl.className = 'flip';
				pullUpEl.querySelector('.pullUpLabel').innerHTML = 'Release to refresh...';
				this.maxScrollY = this.maxScrollY;
			} else if (this.y > (this.maxScrollY + offset) && pullUpEl.className.match('flip')) {
				pullUpEl.className = '';
				pullUpEl.querySelector('.pullUpLabel').innerHTML = 'Pull up to load more...';
				this.maxScrollY = pullUpOffset;
			}
		},
		onScrollEnd: function () {
			if (pullDownEl.className.match('flip')) {
				pullDownEl.className = 'loading';
				pullDownEl.querySelector('.pullDownLabel').innerHTML = 'Loading...';				
				pullDownAction();	// Execute custom function (ajax call?)
			} else if (pullUpEl.className.match('flip')) {
				pullUpEl.className = 'loading';
				pullUpEl.querySelector('.pullUpLabel').innerHTML = 'Loading...';				
				pullUpAction();	// Execute custom function (ajax call?)
			}
		}
	});
	
	setTimeout(function () { document.getElementById('wrapper').style.left = '0'; }, 800);
}

document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);

document.addEventListener('DOMContentLoaded', function () { setTimeout(loaded, 200); }, false);

//-------------------------------------------------------------

//EDIT THESE LINES

function renderEntries(entries) {
    var s = '';
    var themeStr = window.localStorage.getItem("themeStr")||'b';
//    $("#linksList").data("dividertheme",themeStr);
    
    for (var i=0;i<=interval-1 && i<entries.length;i++) { 
    	
    	
    	
    	s += '<li data-role="list-divider" >'+ entries[i].pubDate
    	+ '</li><li class="li_news_items" data-entryid="'
    	+i+'"  data-theme="'
    	+ themeStr + '"><span class="news_title" >'
        + entries[i].title 
        + '</span><p></p><span class="news_description"  >'
        + parseDescriprion(entries[i].description) + '</span>'
        +'</li>';

    	
    	end_index++;
    } 
     
    $("#linksList").html(s);
    $("#linksList").listview("refresh");
    setDividerTheme();
}

function setDividerTheme(){
	var selectedTheme = window.localStorage.getItem("themeStr")||'b';
//	var themeId = atoi(selectedTheme);
	//divider主题+1
//	var dividerTheme = itoa(themeId+1);
	
	//默认divider主题
	var dividerTheme = 'b';
	if(selectedTheme == 'a' || selectedTheme == 'e')
		dividerTheme = 'd';
	if(selectedTheme == 'c' || selectedTheme == 'd' )
		dividerTheme = 'e';
//	if(selectedTheme == 'e')
//		dividerTheme = 'd';
	
	$('.ui-li-divider').removeClass('ui-bar-a ui-bar-b ui-bar-c ui-bar-d ui-bar-e')
	               .addClass('ui-bar-' + dividerTheme)
	               .attr('data-theme', dividerTheme);
}
//parse description
function parseDescriprion(description){
	//如果有多段，只取第一段
	var des = '';
	var regP = /<p>([\s\S]+?)<\/p>/;
	var group = description.match(regP);
	if(null != group){
		des = group[1];
	}
	else{
		des = description;
	}
	//删除图片
//	var regImg = /<img ([\s\S]+?) \/>/;
	var regImg=/<a[\s\S]+?><\/a>/g;
	des = des.replace(regImg,'');
	des = $.trim(des);
	if(des.length>70){
		des = des.substring(0, 69);
		des += '...';
	}
	return des;
}

//Listen for main page
$("#linksPage").live("pageinit", function() {
	
	readEntries();	
	
});

function readEntries(){
	$.ajax({
		url:RSS,
		success:function(res,code) {
			entries = [];
			var xml = $(res);
			
			var channel = xml.find("channel");
			TITLE = channel.find("title:first").text();
			//Set the title
			$("#rssTitle").text(TITLE);
			
			var items = xml.find("item");
			$.each(items, function(i, v) {
				entry = { 
					title:$(v).find("title").text(), 
					link:$(v).find("link").text(), 
					description:$.trim($(v).find("description").text()),
					pubDate:$(v).find("pubDate").text()
				};
				entries.push(entry);
			});
			//store entries
			window.localStorage["entries"] = JSON.stringify(entries);
			renderEntries(entries);
		},
		error:function(jqXHR,status,error) {
			//try to use cache
			if(window.localStorage[RSS]) {
				$("#status").html("Using cached version...");
				entries = JSON.parse(window.localStorage[RSS]);
				renderEntries(entries);				
			} else {
				$("#status").html("Sorry, we are unable to get the RSS and there is no cache.");
			}
		}
	});
}

$("#linksPage").live("pagebeforeshow", function(event,data) {
	if(data.prevPage.length) {
		$("h1", data.prevPage).text("");
		$("#entryText", data.prevPage).html("");
	};
	
});

//listen for out-site links
//$(".outSiteLink").live("click", function() {
//	selectedEntry = $(this).data("entryid");
//
////	sessionStorage.outSiteEntry = entries[selectedEntry];
//	sessionStorage.setItem('outSiteEntry', JSON.stringify(entries[selectedEntry]));
//
//	window.location = "outSitePage.html"; 
//});


//listen for li_news_items
$(".li_news_items").live("click", function() {
//	var div_outSiteLind = $(this).find(".outSiteLink");
//	selectedEntry = div_outSiteLind.data("entryid");
	
	selectedEntry = $(this).data("entryid");
	sessionStorage.setItem('outSiteEntry', JSON.stringify(entries[selectedEntry]));

	window.location = "outSitePage.html"; 
});






//listen for refreshButton
$("#refreshButton").live("click", function() {
	//remove all li
	$("#linksList li").remove();
	//reload
	refreshlinks();
	
});

function refreshlinks(){
	entries = [];
	readEntries();
	renderEntries(entries);
}
//Converts an integer (unicode value) to a char
function itoa(i)
{ 
   return String.fromCharCode(i);
}
// Converts a char into to an integer (unicode value)
function atoi(a)
{ 
   return a.charCodeAt();
}