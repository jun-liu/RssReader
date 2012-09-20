var newsTitle = sessionStorage.newsTitle;
var newsLink = sessionStorage.newsLink;

//使用oauth1获取短地址
function getShortURL_Oauth1(long_url){
	var app_key = '2126684334';
	var shortUrl = '';
	$.ajax({
//	    type: 'GET',
	    async:false,
		url:'http://api.t.sina.com.cn/short_url/shorten.xml',
		data:'url_long=' + encodeURIComponent(long_url)+ '&source='+app_key,
//	    datatype: "json",
	    success:function(data,code){
 
            var xml = $(data);
            shortUrl = xml.find('url_short').text();
//            alert(shortUrl);
//            var jsonData = JSON.parse(data);
            },
        error:function(code,data){
//        	alert('get short URL error');
        	shortUrl = long_url;
        }
	});
	return shortUrl;
}

//长连接转短链接
function getShortURL(long_Url){
	var app_key = '2126684334';
	var shortUrl = '';
	$.ajax({
//	    type: 'GET',
	    async:false,
		url:'https://api.weibo.com/2/short_url/shorten.json',
		data:'url_long=' + encodeURIComponent(long_Url)+ '&access_token='+window.localStorage.getItem('access_token'), //+ '&source='+app_key,
	    datatype: "jsonp",
	    success:function(data,code){
            alert('data:'+data+',code:'+code); 
//            var jsonData = JSON.parse(data);
            
            shortUrl = '|short url...|';
            
        },
        error:function(code,data){
        	alert('code:'+code+',data:'+data);
        	Oauth();
        }
	}).complete(function(){
		//添加完成后的处理
//		$("#tweettextarea").val('#MindHacks# '+newsTitle + ' ' + shortUrl +' ');
	});
	
	return shortUrl;
}


var onDeviceReady = function() {
    // ready to use PhoneGap APIs and plugins now!
	var shortUrl = '';
//	shortUrl = getShortURL(newsLink);
	shortUrl = getShortURL_Oauth1(newsLink);
	$("#tweettextarea").val('#MindHacks# '+newsTitle + ' ' + shortUrl +' ');
};

function init() {
    document.addEventListener("deviceready", onDeviceReady, false);
}

function readArgs(loc){
	var arr_args = loc.split('#');
	var args = arr_args[1];//#号后面的参数
	arr_args = args.split('&');
//	存储access_token、 remind_in、 expires_in、 uid
	for(var index=0;index<arr_args.length;index++){
		var key_value = arr_args[index].split('=');
		window.localStorage.setItem(key_value[0],key_value[1]);
		
		}
	}

function Oauth() {    
    // Set childBrowser callback to detect our oauth_callback_url
    if (typeof window.plugins.childBrowser.onLocationChange !== "function") {        	
    	window.plugins.childBrowser.onLocationChange = function(loc){
//    		alert(loc);
    		if(loc === 'https://api.weibo.com/oauth2/authorize'){
    		}
    		if(loc.indexOf('https://api.weibo.com/oauth2/authorize?') >= 0 ){
    		}
    		if(loc.indexOf('error=access_denied') >=0 ){
    			window.plugins.childBrowser.close();
    			return;
    		}
    		if(loc.indexOf('access_token') >=0 ){
    			readArgs(loc);
    			alert("Authorize Success!");
    			window.plugins.childBrowser.close();
    			return;
    		}
        }; 
    } // end if
   
    window.plugins.childBrowser.onClose = function(){
//    	alert('ChileBrowser Closed'); 
    };
    window.plugins.childBrowser.onOpenExternal = function(){
    	alert('onOpenExternal'); 
    };
//    oauth = OAuth(options);
    var oauth_url = 'https://api.weibo.com/oauth2/authorize?client_id=2126684334&response_type=token&redirect_uri=http://mindhacks.sinaapp.com&display=mobile';

    window.plugins.childBrowser.showWebPage(oauth_url, { showLocationBar : false }); 
}



$('#page-home').live('pageinit', function() {
//	var cb = window.plugins.childBrowser;
    var oauth;
    var requestParams;
    var options = {    		
    		//weibo acount:   
    		client_id: '2126684334',
    		response_type : 'token',
    		display : 'mobile',
    		redirect_uri: 'http://mindhacks.sinaapp.com'
    		};
 
});

//$('#oauth').live("click", function() {
//	Oauth();
//});

//发微博事件
$('#tweet').live("click", function() {
	var status_text = $("#tweettextarea").val();
	if(status_text !== ''){
		$.ajax({
    	    type: 'POST',
    		url:'https://api.weibo.com/2/statuses/update.json',
//    		data:'status=Test#MindHacks#&access_token=2.00_2I1BCOk2v_C926814b55dtZKv4B',
    		data:'status=' + status_text+ '&access_token='+window.localStorage.getItem('access_token'),
    	    datatype: "json",
    	    success:function(data){
                alert('update success');
                window.location = "Contents.html"; 
    	    },
            error:function(code,data){
//            	alert('error:' + code);
            	Oauth();
            	
            }
    	});
	}    	
});  
