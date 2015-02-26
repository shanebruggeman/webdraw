var MENU;

window.onload = function(){

	var usernameField = $("input[name=username]");
	var passwordField = $("input[name=password]");

	textInputImprove(usernameField);
	textInputImprove(passwordField);


	if(Cookie.exists("username")) {
		console.log("success");
	} else {
		beforeLoggedInBar();
	}
	fillPics();
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

var closeblack = function(){
	$("#blackBackground").hide();
	$('#login-wrapper').hide();
	$("#viewer-wrapper").hide();
	$("#register-wrapper").hide();
	$("#success").hide();
}

var openlogin = function(){
	$("#blackBackground").show();
	$('#login-wrapper').show();
	$("#loginError").hide();
}

var openregister = function(){
	$('#login-wrapper').hide();
	$("#blackBackground").show();
	$("#register-wrapper").show();
}

/**
 * This is the data passed to the server when login happens
 */
var getLoginCredentials = function() {
	var username = $("input[name=username]").val();
	var password = $("input[name=password]").val();
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


	$.ajax({
		type: "POST",
		url: "http://webdraw.csse.rose-hulman.edu/login.php",
		datatype: "html",
		data: packet,
		async: false,
		success: function(data) {
			Cookie.set("username", packet.username);
			Cookie.set("login-success", true);
			document.getElementById('menu').innerHTML= MENU;
			closeblack();
			window.location.href = "profile.php"
		$("body").innerText ='If you are not redirected automatically, follow the <a href="profile.php">link</a>';
		},
		error: function() {
			$("#loginError").show();
		},
		complete: function() {
			
		}
	});
}

var getRegisterFields = function() {
	var username = $("input[name=user]").val();
	var password = $("input[name=pass]").val();
	var confirm = $("input[name=confirm]").val();
	var email = $("input[name=email]").val();
	var firstName = $("input[name=first-name]").val();
	var lastName = $("input[name=last-name]").val();
	return {username: username, password: password, confirm: confirm, email: email, firstName: firstName, lastName: lastName};
}

var register = function() {
	$("#usernameTaken").hide();
	$("#passwordError").hide();
	$("success").hide();
	var fields = getRegisterFields();
	var packet = {
		"username": fields["username"],
		"password": fields["password"],
		"confirm": fields["confirm"],
		"email": fields["email"],
		"firstname": fields["firstName"],
		"lastname": fields["lastName"]
	};
	if(packet["confirm"] != packet["password"]){
		$("#passwordError").show();
		return;
	}

	$.ajax({
		type: "POST",
		url: "http://webdraw.csse.rose-hulman.edu/check_if_user_exists.php",
		datatype: "text",
		data: packet,
		success: function(data) {
			if(data === "taken"){
				$("#usernameTaken").show();
			}
		}
	});
	if($("#usernameTaken").is(":visible")){
		return;
	}

	$.ajax({
		type: "POST",
		url: "http://webdraw.csse.rose-hulman.edu/add_user.php",
		data: packet,
		success: function() {
			$("#register-wrapper").hide();
			$('#login-wrapper').show();
			$("#success").show();
		}
	})
}


//FOR DEV testing, not for prod USED ROF LOG OUT
var clearCookies = function(){
	var date = new Date();
	console.log("here");
	Cookie.remove("username");
}