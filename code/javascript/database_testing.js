$(document).ready(function() {
	correctHeight();
	getProfilePicture();
});

var correctHeight = function() {
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
		type: "GET",
		url: "http://webdraw.csse.rose-hulman.edu/all_user_pictures.php",
		data: packet,
		dataType: "json",
		success: function(data) {
			console.log(data["bear.png"]);
			$("#dump_spot").append(data["bear.png"][0]);
		},
		error: function(request, status, error) {
			console.log("Failure");
		}
	});
}