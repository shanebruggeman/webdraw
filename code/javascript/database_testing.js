$(document).ready(function() {
	correctHeight();
	getProfilePicture();

	$("#uploadimage").submit(function(e){
		uploadImage(e);
	});
});

var correctHeight = function() {
	var bodyHeight = $("body").height();
	$(".wrapper").height(bodyHeight);
}

var uploadImage = function(e) {
	e.preventDefault();

	var data = new FormData();
	data.append("file", $("#file").get(0).files[0]);

	$.ajax({
		url: "http://webdraw.csse.rose-hulman.edu/upload_image.php", // Url to which the request is send
		type: "POST",             // Type of request to be send, called as method
		data: data, // Data sent to server, a set of key/value pairs (i.e. form fields and values)
		contentType: false,       // The content type used when sending data to the server.
		cache: false,             // To unable request pages to be cached
		processData:false,        // To send DOMDocument or non processed data file it is set to false
		success: function(data)   // A function to be called if request succeeds
		{
			console.log("success: " + data);
		}
	});
}

var getProfilePicture = function() {
	var username = Cookie.get("username");

	var packet = {
		"username": username
	}

	console.log("Packet sent is " + JSON.stringify(packet));

	$.ajax({
		type: "GET",
		url: "http://webdraw.csse.rose-hulman.edu/user_information.php",
		dataType: "text",
		data: packet,
		success: function(data) {
			console.log("successful query");
			// console.log(data);
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