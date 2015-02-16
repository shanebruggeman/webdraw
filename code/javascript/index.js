/**
login-wrapper
blackBackground
**/
var MENU;

window.onload = function(){
	console.log("testing username: " + Cookie.get("username"));

	if(Cookie.exists("username")) {
		console.log("success");
	} else {
		beforeLoggedInBar();
		console.log("must default");
	}
}

var beforeLoggedInBar = function() {
	MENU = document.getElementById('menu').innerHTML;
	document.getElementById('menu').innerHTML='<li><a id="login" href="#" onclick="openlogin()">Login</a></li>';
}

var closelogin = function(){
	$("#blackBackground").hide();
	$('#login-wrapper').hide();
}

var openlogin = function(){
	$("#blackBackground").show();
	$('#login-wrapper').show();
}

/**
 * This is the data passed to the server when login happens
 */
var getLoginCredentials = function() {
	var username = $("input[name=username]").val();
	var password = $("input[name=password").val();
	return {username: username, password: password};
}

/**
 * Attempts to login, via database queries with the login credentials
 */
var login = function(){
	document.getElementById('menu').innerHTML= MENU;
	var credentials = getLoginCredentials();

	var packet = {
		"username": credentials["username"],
		"password": credentials["password"]
	};

	console.log("Sending off data: " + packet);

	$.ajax({
		type: "POST",
		url: "../php/login.php",
		datatype: "html",
		data: packet,
		async: false,
		success: function(data) {
			console.log("login data: " + data);
			//document.cookie=("username=" + data["username"]); ; //auto deletes on browser close
			//document.cookie=("password=" + data["password"]); //auto deletes on browser close
			Cookie.set("username", data["username"]);
			Cookie.set("password", data["password"]);
			Cookie.set("login-success", true);
		},
		error: function() {
			console.log("invalid parameters passed");
			beforeLoggedInBar();
		},
		complete: function() {
			closelogin();
		}
	}).done(function() {
		$.ajax({
			type: "POST",
			url: "../php/redirect.php",
			data: {url:"index.html"},
			success: function() {
				console.log("successful redirect");
			},
			error: function() {
				console.log("utter, miserable failure")
			}
		});	
	});
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
	var date = new Date();
	console.log("here");
	Cookie.remove("username");
	Cookie.remove("password");
	// resetPage();
	//document.cookie = "username=DEAD; expires=Thu, 01 Jan 1970 00:00:00 UTC";
}

/**TODO:
1)alter nav bar depending on login state (shrinkage)
2)login button triggers full layout
3)not logged in will re-direct to the blank homepage
**/
