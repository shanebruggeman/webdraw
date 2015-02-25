var onStart = function() {
	if (!Cookie.exists("username")) {
		beforeLoggedInBar();
		redirect("index.php");
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

var clearCookies = function() {
	var date = new Date();
	Cookie.remove("username");
}
/**-----------------------------For Gallery and profile------------------------------------**/
var magnifyImage = function(e, ownership) {
	document.getElementById("viewer-picture").innerHTML = e.innerHTML;
	pictureViewer(ownership);
	$("#viewer-header h2").html($(e.innerHTML).attr("alt"));
	if ($('#forkbutton').length) {
		document.getElementById("forkbutton").setAttribute("imgurl", "http://webdraw.csse.rose-hulman.edu/pictures/picture" + e.children[0].getAttribute("data") + ".png");
	}
	if($('#unfriend').length){
		document.getElementById('unfriend').setAttribute("userid", e.children[0].getAttribute("data"));
	}
	if($('#addfriend').length){
		document.getElementById('addfriend').setAttribute("userid", e.children[0].getAttribute("data"));
	}
	if ($('#deleteButton').length) {
		document.getElementById("deleteButton").setAttribute("id", e.children[0].getAttribute("data"));
	}
	if($('#acceptFriend').length){
		document.getElementById('acceptFriend').setAttribute("userid", e.children[0].getAttribute("data"));
	}
	if ($('#rejectFriend').length) {
		document.getElementById("rejectFriend").setAttribute("userid", e.children[0].getAttribute("data"));
	}
}
var pictureViewer = function(ownership) {
	$("#blackBackground").show();
	$("#viewer-wrapper").show();
	$("#deleteError").hide();
	if (ownership) {
		$("#makeProfilePic").show();
		$("#deleteButton").show();
	} else {
		$("#makeProfilePic").hide();
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
	
	var id = e.getAttribute("id");
	console.log("id",id);
	
	$.ajax({
		type: 'POST',
		url: 'http://webdraw.csse.rose-hulman.edu/delete.php',
		data: {id: id},
		success: function (resp) {
			console.log("resp",resp);
		}
  });
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

var getUserID = function(username) {
	var id = -1;
	var packet = {
		"username": username
	}
	 $.ajax({
		type: "GET",
		url: 'http://webdraw.csse.rose-hulman.edu/get_id_from_username.php',
		dataType: "text",
		data: packet,
		async:false,
		success: function(data) {
			id= data;
		},
		error: function(request, status, error) {
			console.log("Failed to retrieve a userID");
		}
	});
	 return id;
}

var viewProfile =  function(){
	var redirectString = "profile.php?username="+$('#viewer-header h2').html();
	redirect(redirectString);
}