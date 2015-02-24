
window.onload = function(){
	onStart();
	//FIll most recent 10
	fillmyPics();
	fillFriendsPics();
	//pictureViewer(false);
	updateProfilePicture();
}

var updateProfilePicture = function() {
	var username = Cookie.get("username");

	var packet = {
		"username": username
	}

	console.log("Packet sent is " + JSON.stringify(packet));

	$.ajax({
		type: "GET",
		url: "http://webdraw.csse.rose-hulman.edu/profile_picture.php",
		dataType: "html",
		data: packet,
		success: function(data) {
			var noProfilePic = $("#profilepic");
			var newSource = $(data).attr("src");
			$(noProfilePic).attr("src", newSource);
		},
		error: function(request, status, error) {
			console.log("Failed to retrieve a password");
		}
	});
}

var fillmyPics = function(){
	var picList = $("#myPics ul");
	for(var i = 0; i<10; i++){
		var item = document.createElement('li');
		item.innerHTML =  '\n <img alt="picname" src="../../resources/images/placeholder.png"> \n'; 
		item.onclick = function() {
			magnifyImage(this,true);
		}
		picList.append(item);
		//console.log(i);
	}
}
var fillFriendsPics = function(){
	var picList = $("#friendsPics ul");
	for(var i = 0; i<10; i++){
		var item = document.createElement('li');
		item.innerHTML =  '\n <img alt ="friend" src="../../resources/images/placeholder.png"> \n'; 
		item.onclick = function() {
			magnifyImage(this,false);
		}
		picList.append(item);
	}
}
