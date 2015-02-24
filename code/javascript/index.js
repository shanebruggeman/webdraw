/**
login-wrapper
blackBackground
**/
var MENU;

window.onload = function(){
	console.log("testing username: " + Cookie.get("username"));

	var usernameField = $("input[name=username]");
	var passwordField = $("input[name=password]");

	textInputImprove(usernameField);
	textInputImprove(passwordField);


	if(Cookie.exists("username")) {
		console.log("success");
	} else {
		beforeLoggedInBar();
		console.log("must default");
	}
}

var textInputImprove = function(elementDOM) {
	elementDOM.keypress(function(event) {
        if (event.keyCode == 13) {
            login();
        }
    });
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
	var credentials = getLoginCredentials();

	var packet = {
		"username": credentials["username"],
		"password": credentials["password"]
	};

	//console.log("Sending off data: " + packet);

	$.ajax({
		type: "POST",
		url: "http://webdraw.csse.rose-hulman.edu/login.php",
		datatype: "html",
		data: packet,
		async: false,
		success: function(data) {
			console.log("login data: " + data);
			Cookie.set("username", packet.username);
			Cookie.set("login-success", true);
			document.getElementById('menu').innerHTML= MENU;
			closelogin();
			window.location.href = "profile.php"
		$("body").innerText ='If you are not redirected automatically, follow the <a href="profile.php">link</a>';
		},
		error: function() {
			//console.log("invalid parameters passed");
			//WRITE TO SCREEN INVALID USERNAME OR PASSWORD
			$("#loginError").show();
		},
		complete: function() {
			
		}
	}).done(function() {
		console.log("done");	
	});
}

//FOR DEV testing, not for prod USED ROF LOG OUT
var clearCookies = function(){
	var date = new Date();
	console.log("here");
	Cookie.remove("username");
	//Cookie.remove("password");
}