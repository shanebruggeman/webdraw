var onStart = function() {
	console.log("testing username: " + Cookie.get("username"));
	if (Cookie.exists("username")) {
		console.log("success");
	} else {
		beforeLoggedInBar();
		redirect("index.php");
		console.log("must default");
	}
}

var beforeLoggedInBar = function() {
	MENU = document.getElementById('menu').innerHTML;
	document.getElementById('menu').innerHTML = '<li><a id="login" href="#" onclick="openlogin()">Login</a></li>';
}

var redirect = function(location) {
	window.location.href = location;
	$("body").innerText = 'If you are not redirected automatically, follow the <a href="' + location + '">link</a>';
}

//FOR DEV testing, not for prod USED ROF LOG OUT
var clearCookies = function() {
	var date = new Date();
	console.log("here");
	Cookie.remove("username");
}

var magnifyImage = function(e, ownership) {
	document.getElementById("viewer-picture").innerHTML = e.innerHTML;
	pictureViewer(ownership);
	$("#viewer-header h2").html($(e.innerHTML).attr("alt"));
	document.getElementById("forkbutton").setAttribute("imgurl", e.children[0].src);
}

/**-----------------------------For Gallery and profile------------------------------------**/
var pictureViewer = function(ownership) {
	$("#blackBackground").show();
	$("#viewer-wrapper").show();
	if (ownership) {
		$("#deleteButton").show();
	} else {
		$("#deleteButton").hide();
	}
}

var closeViewer = function() {
	$("#blackBackground").hide();
	$("#viewer-wrapper").hide();
}

//sends image url to draw page to use as starting image
var forkpic = function(e) {
	redirect("draw.php?imgurl=" + e.getAttribute("imgurl"));
}

var deletepic = function(e) {
	console.log("delete", e);
}

var updateProfilePicture = function(username) {
	var packet = {
		"username": username
	}
	$.ajax({
		type: "GET",
		url: "http://webdraw.csse.rose-hulman.edu/profile_picture.php",
		dataType: "html",
		data: packet,
		success: function(data) {
			var newSource = $(data).attr("src");
			if ($(data).attr("src") != "data: ;base64,") {
				$("#profilepic").attr("src", newSource);
			}
		},
		error: function(request, status, error) {
			console.log("Failed to retrieve a picture");
		}
	});
}