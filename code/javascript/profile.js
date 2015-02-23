$(document).ready(function() {
	console.log("hello javascript");
	correctHeight();
	getProfilePicture();
});

var correctHeight = function() {
	console.log($(".wrapper"));
	var bodyHeight = $("body").height();
	$(".wrapper").height(bodyHeight);
}

var getProfilePicture = function() {
	var username = Cookie.get("username");
	console.log("username is " + username);

	var packet = {
		"username": username
	}

	$.ajax({
		type: "POST",
		url: "http://webdraw.csse.rose-hulman.edu/profile_picture.php",
		data: packet,
		dataType: "html",
		success: function(data) {
			console.log(data);
		},
		error: function(request, status, error) {
			console.log("failure");
		}
	});
}