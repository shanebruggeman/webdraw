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

	var packet = {
		"username": username
	}

	console.log("Packet sent is " + JSON.stringify(packet));

	$.ajax({
		type: "GET",
		url: "http://webdraw.csse.rose-hulman.edu/all_user_picture_ids.php",
		dataType: "json",
		data: packet,
		success: function(data) {
			console.log("successful query");
			console.log(data);
			// for(var pictureName in data) {
			// 	for(var i = 0; i < data[pictureName].length; i++) {
			// 		$("#dump_spot").append(data[pictureName][i]);
			// 	}
			// }
		},
		error: function(request, status, error) {
			console.log("Failure");
		}
	});
}