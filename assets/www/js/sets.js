// Converts an integer (unicode value) to a char
function itoa(i)
{ 
   return String.fromCharCode(i);
}
// Converts a char into to an integer (unicode value)
function atoi(a)
{ 
   return a.charCodeAt();
}

$('#setThemePage').live('pageshow', function () {	
	
	var orientationSwitch = $('#slider_orientation');
	var loadImagesSwitch = $('#slider_loadImages');
	//orientation默认设为开
//	orientationSwitch[0].selectedIndex = 1;//on
	var orientationSwitch_value = window.localStorage.getItem("auto_orientation")||'on';
	var loadImagesSwitch_value = window.localStorage.getItem("auto_load_images")||'off';
	orientationSwitch[0].selectedIndex = orientationSwitch_value=='on'?1:0;
	loadImagesSwitch[0].selectedIndex = loadImagesSwitch_value=='on'?1:0;

	orientationSwitch.slider('refresh');
	loadImagesSwitch.slider('refresh');
	
	var myselect = $("#select-theme");
	var selectedTheme = window.localStorage.getItem("themeStr")||'b';
	myselect[0].selectedIndex = atoi(selectedTheme)-atoi('a');
	myselect.selectmenu('refresh');
	
	//reset all the buttons widgets
	$(this).find('.ui-btn')
    		.removeClass('ui-btn-up-a ui-btn-up-b ui-btn-up-c ui-btn-up-d ui-btn-up-e ui-btn-hover-a ui-btn-hover-b ui-btn-hover-c ui-btn-hover-d ui-btn-hover-e')
		    .addClass('ui-btn-up-' + selectedTheme)
		    .attr('data-theme', selectedTheme);
	
	 //reset the header/footer widgets				
	$(this).find('.ui-header, .ui-footer, .ui-listview')
		   .removeClass('ui-bar-a ui-bar-b ui-bar-c ui-bar-d ui-bar-e')
		   .addClass('ui-bar-' + selectedTheme)
		   .attr('data-theme', selectedTheme);
	
	//reset the page widget
	$(this).removeClass('ui-body-a ui-body-b ui-body-c ui-body-d ui-body-e')
			.addClass('ui-body-' + selectedTheme)
			.attr('data-theme', selectedTheme);
});

$("#select-theme").live("change", function(event) {
	var themeStr = $('#select-theme option:selected').val();
	window.localStorage.setItem("themeStr", themeStr);
	alert(themeStr+"主题设置成功！");
	$('#setThemePage').trigger("pageshow");
});
  

$("#slider_loadImages").live("change", function(event) {
	var b_val = $('#slider_loadImages option:selected').val();
	window.localStorage.setItem("auto_load_images", b_val);
//	alert(b_val);
});

$("#slider_orientation").live("change", function(event) {
	var b_val = $('#slider_orientation option:selected').val();
	window.localStorage.setItem("auto_orientation", b_val);
//	alert(b_val);
});


$('[data-role=page]').live('pageshow', function () {
    //code for each page load

	
	
	//设置页面主题
	var selectedTheme = window.localStorage.getItem("themeStr")||'b';
	
	//divider主题
	//设置listview的divider主题
	var themeId = atoi(selectedTheme);
	var dividerTheme = itoa(themeId+1);
	//the only difference between this block of code and the same code above is that it doesn't target list-dividers by calling: `.not('.ui-li-divider')`
	$.mobile.activePage.find('.ui-btn').not('.ui-li-divider')
	                   .removeClass('ui-btn-up-a ui-btn-up-b ui-btn-up-c ui-btn-up-d ui-btn-up-e ui-btn-hover-a ui-btn-hover-b ui-btn-hover-c ui-btn-hover-d ui-btn-hover-e')
	                   .addClass('ui-btn-up-' + selectedTheme)
	                   .attr('data-theme', selectedTheme);
	//
	//target the list divider elements, then iterate through them to check if they have a theme set, if a theme is set then do nothing, otherwise change its theme to `b` (this is the jQuery Mobile default for list-dividers)
	$.mobile.activePage.find('.ui-li-divider').each(function (index, obj) {
	    if ($(this).parent().attr('data-divider-theme') == 'undefined') {
	        $(this).removeClass('ui-bar-a ui-bar-b ui-bar-c ui-bar-d ui-bar-e')
	               .addClass('ui-bar-' + dividerTheme)
	               .attr('data-theme', dividerTheme);
	    }
	});
	
	
    //reset all the buttons widgets
	$(this).find('.ui-btn')
    		.removeClass('ui-btn-up-a ui-btn-up-b ui-btn-up-c ui-btn-up-d ui-btn-up-e ui-btn-hover-a ui-btn-hover-b ui-btn-hover-c ui-btn-hover-d ui-btn-hover-e')
		    .addClass('ui-btn-up-' + selectedTheme)
		    .attr('data-theme', selectedTheme);
	
	 //reset the header/footer widgets				
	$(this).find('.ui-header, .ui-footer, .ui-listview')
		   .removeClass('ui-bar-a ui-bar-b ui-bar-c ui-bar-d ui-bar-e')
		   .addClass('ui-bar-' + selectedTheme)
		   .attr('data-theme', selectedTheme);
	
	//reset the page widget
	$(this).removeClass('ui-body-a ui-body-b ui-body-c ui-body-d ui-body-e')
			.addClass('ui-body-' + selectedTheme)
			.attr('data-theme', selectedTheme);
	
	

});



function setTheme(themeStr){
	window.localStorage.setItem("themeStr", themeStr);
	alert(themeStr+"主题设置成功！");
	$(this).removeAttr('data-icon');
	$('#setThemePage').trigger("pageshow");
}


function loadTheme(){
	alert("load theme");
//	var selectedTheme = window.localStorage.getItem("themeStr");
	$('[data-class=themeButton]').each(function(){
		alert($(this).data('icon'));
		$(this).removeAttr('data-icon');
		alert($(this).data('icon'));
	});
}