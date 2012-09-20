var forecastInformation;
var currentConditions;
var arr_forecastConditions;

var weather_City = '';
//Wait for Cordova to load
//
//document.addEventListener("deviceready", onDeviceReady, false);
//
//// Cordova is ready
////
//function onDeviceReady() {
//	
//}


//主页显示天气
//$("#mainPage").live("pagebeforeshow", function() {
//	
//	if (navigator.geolocation) {
//        navigator.geolocation.getCurrentPosition(locationSuccess_mainPage, locationError, {enableHighAccuracy: false});
//    }
//    else{
//        alert("Your browser does not support Geolocation!");
//    }
//});

//function locationSuccess_mainPage(position) {
//    var lat = position.coords.latitude;
//    var lon = position.coords.longitude;
//    var city = getCity(lat,lon);
//
//    getCurrentWeathers(city);
//
//}




// Get user's location, and use Yahoo's PlaceFinder API
// to get the location name, woeid and weather forecast

function locationSuccess(position) {
//	alert('success');
    var lat = position.coords.latitude;
    var lon = position.coords.longitude;
    weather_City = getCity(lat,lon);
//    alert(weather_City);
    getWeathers(weather_City);

	//显示所有天气信息
//    showDetailWeathers();
}

function showDetailWeathers(){
	//显示当前天气信息
	currentConditions.show();
	//预报第一天
	var imgSrc = 'http://www.google.com' + arr_forecastConditions[0].icon;
	var forecast_weather = '<p><span style="float:center">'+arr_forecastConditions[0].day_of_week +'</span></p>'+
							'<img style="float:center" src="'+imgSrc+'"></img>'+
							'<p><span style="float:center">'+arr_forecastConditions[0].low+'~'+arr_forecastConditions[0].high+'℃'+'</span></p>'+
							'<p><span style="float:center">'+arr_forecastConditions[0].condition+'</span></p>';
	$('#forecast1').html(forecast_weather);
	$('#forecast1').slideDown();
	
	//预报第二天
	imgSrc = 'http://www.google.com' + arr_forecastConditions[1].icon;
	forecast_weather = '<p><span style="float:center">'+arr_forecastConditions[1].day_of_week +'</span></p>'+
						'<img style="float:center" src="'+imgSrc+'"></img>'+
						'<p><span style="float:center">'+arr_forecastConditions[1].low+'~'+arr_forecastConditions[1].high+'℃'+'</span></p>'+
						'<p><span style="float:center">'+arr_forecastConditions[1].condition+'</span></p>';
	$('#forecast2').html(forecast_weather);
	$('#forecast2').slideDown();

	//预报第三天
	imgSrc = 'http://www.google.com' + arr_forecastConditions[2].icon;
	forecast_weather = '<p><span style="float:center">'+arr_forecastConditions[2].day_of_week +'</span></p>'+
							'<img style="float:center" src="'+imgSrc+'"></img>'+
							'<p><span style="float:center">'+arr_forecastConditions[2].low+'~'+arr_forecastConditions[2].high+'℃'+'</span></p>'+
							'<p><span style="float:center">'+arr_forecastConditions[2].condition+'</span></p>';
	$('#forecast3').html(forecast_weather);
	$('#forecast3').slideDown();

	//预报第四天
	imgSrc = 'http://www.google.com' + arr_forecastConditions[3].icon;
	forecast_weather = '<p><span style="float:center">'+arr_forecastConditions[3].day_of_week +'</span></p>'+
							'<img style="float:center" src="'+imgSrc+'"></img>'+
							'<p><span style="float:center">'+arr_forecastConditions[3].low+'~'+arr_forecastConditions[3].high+'℃'+'</span></p>'+
							'<p><span style="float:center">'+arr_forecastConditions[3].condition+'</span></p>';
	$('#forecast4').html(forecast_weather);
	$('#forecast4').slideDown();
}

//根据经纬度取得城市名
function getCity(lat,lon){
	var google_api_url = 	'http://maps.googleapis.com/maps/api/geocode/xml?language=en&sensor=true&latlng='
							+lat+','+lon;
	var city = '';
	$.ajax({
		url:google_api_url,
		async:false,
		success:function(res,code) {//请求成功
			var xml = $(res);
			xml.find("result").each(function(){
				//详细地名
//				if($(this).find('type:first').text() === 'sublocality'){
//					city = $(this).find('formatted_address').text();
				//城市名-英文
				if($(this).find('type:first').text() === 'locality'){
					city = $(this).find('long_name:first').text();
				}
			});
		},
		error:function(jqXHR,status,error) {//请求失败
			alert("get city error");
		}
	}).complete(function(){
		//添加完成后的处理
		
	});
	return city;
}

/* Error handling functions */

function locationError(error){
	
    switch(error.code) {
        case error.TIMEOUT:
            alert("TIMEOUT");
            break;
        case error.POSITION_UNAVAILABLE:
            alert("POSITION_UNAVAILABLE");
            break;
        case error.PERMISSION_DENIED:
            alert("PERMISSION_DENIED");
            break;
        case error.UNKNOWN_ERROR:
            alert("UNKNOWN_ERROR");
            break;
        default:
        	alert("default");
            break;
    }
    weather_City = 'chongqing';
    alert('use default city: chongqing.');
    getWeathers(weather_City);
}

//预报信息
function ForecastInformation() {
    this.city = '';
    this.postal_code = '';
    this.latitude_e6 = '';
    this.longitude_e6 = '';
    this.forecast_date = '';
    this.current_date_time = '';
    this.unit_system = '';
    this.show = function(){
    };
}
//当前天气
function CurrentConditions() {
    this.condition  = '';
    this.temp_f  = '';
    this.temp_c  = '';
    this.humidity  = '';
    this.icon  = '';
    this.wind_condition  = '';
    this.show = function(){
    	var cur_weather = 	
					    	'<p>' + forecastInformation.city +'</p>' +
							'<p>' + this.condition +'</p>'+ 
							'<p>' + this.humidity +'</p>'+ 
							'<p>' + this.wind_condition +'</p>';
		$('#currentWea1').html(cur_weather);
		$('#currentWea1').slideDown();
    	
		var date_temp = '<p><span style="float: right">'+forecastInformation.forecast_date +'</span></p>'+
						'<p><span style="float:right;font-size:50px;color:yellow;" >'+ this.temp_c+'℃</span></p>';
		$('#currentWea2').html(date_temp);
		$('#currentWea2').slideDown();
    };
}
//预报天气
function ForecastConditions() {
    this.day_of_week  = '';
    this.low  = '';
    this.high  = '';
    this.icon  = '';
    this.condition  = '';
    this.day_id = 1;
    this.show = function(){
    	
//    	var div_id = '#forecast' + this.day_id;
//    	var imgSrc = 'http://www.google.com' + this.icon;
//    	var fore_weather = 	'<p><span style="float:center">'+this.day_of_week +'</span></p>'+
//							'<img style="float:center" src="'+imgSrc+'"></img>'+
//							'<p><span style="float:center">'+this.low+'~'+this.high+'</span></p>'+
//							'<p><span style="float:center">'+this.condition+'</span></p>';
//		$(div_id).html(fore_weather);
//		$(div_id).slideDown();
		
    };
}

function getCurrentWeathers(weather_city){
	if(weather_city === ''){
//		alert('city name can not be null');
//		return;
		alert('use default city: chongqing.');
		weather_city = 'chongqing';
	}
	var url_weather = 'http://www.google.com/ig/api?weather='+weather_city;
	$.ajax({
		url:url_weather,
		success:function(res,code) {//请求成功
//			alert('get weather success');
			forecastInformation = new ForecastInformation();
			currentConditions = new CurrentConditions();
			arr_forecastConditions = new Array(	new ForecastConditions(),
													new ForecastConditions(),
													new ForecastConditions(),
													new ForecastConditions());
			var xml = $(res);
			var weather = xml.find("weather");
			var forecast_information = xml.find("forecast_information");
			var current_conditions = xml.find("current_conditions");
			
			//获取地点、时间等信息
			forecastInformation.city = forecast_information.find('city').attr('data');
			forecastInformation.postal_code = forecast_information.find('postal_code').attr('data');
			forecastInformation.latitude_e6  = forecast_information.find('latitude_e6').attr('data');
			forecastInformation.longitude_e6  = forecast_information.find('longitude_e6').attr('data');
			forecastInformation.forecast_date  = forecast_information.find('forecast_date').attr('data');
			forecastInformation.current_date_time = forecast_information.find('current_date_time').attr('data');
			forecastInformation.unit_system  = forecast_information.find('unit_system').attr('data');
			//显示地点、时间等信息
			//forecastInformation.show();
			//获取当前天气信息
			currentConditions.condition = current_conditions.find('condition').attr('data');
			currentConditions.temp_f = current_conditions.find('temp_f').attr('data');
			currentConditions.temp_c  = current_conditions.find('temp_c').attr('data');
			currentConditions.humidity  = current_conditions.find('humidity').attr('data');
			currentConditions.icon  = current_conditions.find('icon ').attr('data');
			currentConditions.wind_condition  = current_conditions.find('wind_condition').attr('data');
			
			
			//获取预报天气信息
			var index=0;
			xml.find("forecast_conditions").each(function(){
				arr_forecastConditions[index].day_of_week = $(this).find('day_of_week').attr('data');
				arr_forecastConditions[index].low = $(this).find('low').attr('data');
				arr_forecastConditions[index].high  = $(this).find('high').attr('data');
				arr_forecastConditions[index].icon  = $(this).find('icon').attr('data');
				arr_forecastConditions[index].condition  = $(this).find('condition').attr('data');
				arr_forecastConditions[index].day_id = index+1;
				//显示
//				arr_forecastConditions[index].show();
				index++;
			});
			
		},
		error:function(jqXHR,status,error) {//请求失败
			alert("get weather error"+jqXHR+status+error);
		}
	}).complete(function(){
		//添加完成后的处理
		//alert('complete');
		//主页上显示当前天气信息
//		currentConditions.show();
//		alert(currentConditions.condition+','+
//				currentConditions.temp_c+'℃');
//		$('#showDetailWea').text(	currentConditions.condition+','+
//									currentConditions.temp_c+'℃');
		var weatherImgSrc = 'http://www.google.com' + currentConditions.icon;
		var weather_Img = 	'<a id="showDetailWea" href="detailWea.html"><img src="'+
							weatherImgSrc+'"></a>';
		var weather_Text =	'<p>'+forecastInformation.city.split(',')[0] +'</p><p>'+
							currentConditions.condition + '</p><p>'+
							currentConditions.temp_c +'℃</p>';
		
    	$('#div_WeaImg').html(weather_Img);
    	$('#div_WeaText').html(weather_Text);
    	//显示
    	$('#div_WeaImg').slideDown();
    	$('#div_WeaText').slideDown();
	});
}


function getWeathers(weather_city){
	if(weather_city === ''){
//		alert('city name can not be null');
//		return;
		alert('use default city: chongqing.');
		weather_city = 'chongqing';
	}
//	alert(weather_city);
	var url_weather = 'http://www.google.com/ig/api?weather='+ encodeURIComponent(weather_city);

//	url_weather = 'http://www.google.com/ig/api?weather=chongqing';
	$.ajax({
		url:url_weather,
		success:function(res,code) {//请求成功
//			alert('get weather success');
			forecastInformation = new ForecastInformation();
			currentConditions = new CurrentConditions();
			arr_forecastConditions = new Array(	new ForecastConditions(),
													new ForecastConditions(),
													new ForecastConditions(),
													new ForecastConditions());
			var xml = $(res);
			var weather = xml.find("weather");
			var forecast_information = xml.find("forecast_information");
			var current_conditions = xml.find("current_conditions");
			
			//获取地点、时间等信息
			forecastInformation.city = forecast_information.find('city').attr('data');
			forecastInformation.postal_code = forecast_information.find('postal_code').attr('data');
			forecastInformation.latitude_e6  = forecast_information.find('latitude_e6').attr('data');
			forecastInformation.longitude_e6  = forecast_information.find('longitude_e6').attr('data');
			forecastInformation.forecast_date  = forecast_information.find('forecast_date').attr('data');
			forecastInformation.current_date_time = forecast_information.find('current_date_time').attr('data');
			forecastInformation.unit_system  = forecast_information.find('unit_system').attr('data');
			//显示地点、时间等信息
			//forecastInformation.show();
			//获取当前天气信息
			currentConditions.condition = current_conditions.find('condition').attr('data');
			currentConditions.temp_f = current_conditions.find('temp_f').attr('data');
			currentConditions.temp_c  = current_conditions.find('temp_c').attr('data');
			currentConditions.humidity  = current_conditions.find('humidity').attr('data');
			currentConditions.icon  = current_conditions.find('icon ').attr('data');
			currentConditions.wind_condition  = current_conditions.find('wind_condition').attr('data');
			
			
			//获取预报天气信息
			var index=0;
			xml.find("forecast_conditions").each(function(){
				arr_forecastConditions[index].day_of_week = $(this).find('day_of_week').attr('data');
				arr_forecastConditions[index].low = $(this).find('low').attr('data');
				arr_forecastConditions[index].high  = $(this).find('high').attr('data');
				arr_forecastConditions[index].icon  = $(this).find('icon').attr('data');
				arr_forecastConditions[index].condition  = $(this).find('condition').attr('data');
				arr_forecastConditions[index].day_id = index+1;
				//显示
//				arr_forecastConditions[index].show();
				index++;
			});
			
		},
		error:function(jqXHR,status,error) {//请求失败
			alert("get weather error");
		}
	}).complete(function(){
		//添加完成后的处理
		//alert('complete');
		//显示当前天气信息
		currentConditions.show();
		//预报第一天
		var imgSrc = 'http://www.google.com' + arr_forecastConditions[0].icon;
		var forecast_weather = '<p><span style="float:center">'+arr_forecastConditions[0].day_of_week +'</span></p>'+
								'<img style="float:center" src="'+imgSrc+'"></img>'+
								'<p><span style="float:center">'+arr_forecastConditions[0].low+'~'+arr_forecastConditions[0].high+'℃'+'</span></p>'+
								'<p><span style="float:center">'+arr_forecastConditions[0].condition+'</span></p>';
		$('#forecast1').html(forecast_weather);
		$('#forecast1').slideDown();
		
		//预报第二天
		imgSrc = 'http://www.google.com' + arr_forecastConditions[1].icon;
		forecast_weather = '<p><span style="float:center">'+arr_forecastConditions[1].day_of_week +'</span></p>'+
							'<img style="float:center" src="'+imgSrc+'"></img>'+
							'<p><span style="float:center">'+arr_forecastConditions[1].low+'~'+arr_forecastConditions[1].high+'℃'+'</span></p>'+
							'<p><span style="float:center">'+arr_forecastConditions[1].condition+'</span></p>';
		$('#forecast2').html(forecast_weather);
		$('#forecast2').slideDown();

		//预报第三天
		imgSrc = 'http://www.google.com' + arr_forecastConditions[2].icon;
		forecast_weather = '<p><span style="float:center">'+arr_forecastConditions[2].day_of_week +'</span></p>'+
								'<img style="float:center" src="'+imgSrc+'"></img>'+
								'<p><span style="float:center">'+arr_forecastConditions[2].low+'~'+arr_forecastConditions[2].high+'℃'+'</span></p>'+
								'<p><span style="float:center">'+arr_forecastConditions[2].condition+'</span></p>';
		$('#forecast3').html(forecast_weather);
		$('#forecast3').slideDown();

		//预报第四天
		imgSrc = 'http://www.google.com' + arr_forecastConditions[3].icon;
		forecast_weather = '<p><span style="float:center">'+arr_forecastConditions[3].day_of_week +'</span></p>'+
								'<img style="float:center" src="'+imgSrc+'"></img>'+
								'<p><span style="float:center">'+arr_forecastConditions[3].low+'~'+arr_forecastConditions[3].high+'℃'+'</span></p>'+
								'<p><span style="float:center">'+arr_forecastConditions[3].condition+'</span></p>';
		$('#forecast4').html(forecast_weather);
		$('#forecast4').slideDown();
	});
}

function initWeathers(){
	

	
}

$("#detailWeatherPage").live("pagebeforeshow", function() {
	
//	getWeathers('chongqing');
//	alert('before show');
	if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(	locationSuccess,
								        		locationError,
								        		{	maximumAge: 30000,
    												enableHighAccuracy: false,
    												timeout:5000});
	}
	else{
	    alert("Your browser does not support Geolocation!");
	}
	
});

