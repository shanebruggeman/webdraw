/**
login-wrapper
blackBackground
**/
var MENU;
window.onload = function(){
	
	console.log('hit');
	checkcookie();
}



var checkcookie = function(){
	var cookie = getCookie("username");
	if(cookie !=""){
		console.log('has cookie',cookie);
		//loggedin
	}
	else{
		console.log('doesnt have cookie');
		//log in
		MENU = document.getElementById('menu').innerHTML;
		document.getElementById('menu').innerHTML='<li><a id="login" href="#" onclick="login1()">Login</a></li>';
	}
}

var closelogin = function(){
	$("#blackBackground").hide();
	$('#login-wrapper').hide();
}

var login1 = function(){
	$("#blackBackground").show();
	$('#login-wrapper').show();
}

var login2 = function(){
	console.log('login');
	//do lots of stuff
	//check the database

	//fix nav bar

	document.getElementById('menu').innerHTML= MENU;
	//create cookie
	document.cookie="username=TEMP";//auto deletes on browser close
	closelogin();
}

//FROM W3
function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1);
        if (c.indexOf(name) == 0) return c.substring(name.length,c.length);
    }
    return "";
}
//FOR DEV testing, not for prod
var clearCookies = function(){
	console.log('killed the cookie');
		document.cookie = "username=DEAD; expires=Thu, 01 Jan 1970 00:00:00 UTC";
}
/**TODO:
1)alter nav bar depending on login state
2)login button triggers full layout
3)not logged in will re-direct to the blank homepage


**/
