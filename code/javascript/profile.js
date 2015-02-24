
window.onload = function(){
	onStart();
	var username = Cookie.get("username");
	//FIll most recent 10
	fillmyPics(username);
	fillFriendsPics(username);
	updateProfilePicture(username);
	fillinfo(username);
	
}

var updateProfilePicture = function(username) {
	var packet = {
		"username": username
	}

	//console.log("Packet sent is " + JSON.stringify(packet));

	$.ajax({
		type: "GET",
		url: "http://webdraw.csse.rose-hulman.edu/profile_picture.php",
		dataType: "html",
		data: packet,
		success: function(data) {			
			var noProfilePic = $("#profilepic");
			var newSource = $(data).attr("src");
			console.log(newSource);
			$(noProfilePic).attr("src", newSource);
		},
		error: function(request, status, error) {
			console.log("Failed to retrieve a picture");
		}
	});
}

var fillinfo = function(username){
	$('#username').html(username);
	var firstName ="FirstName: Greatest";
	var lastName = "LastName: Ever";
	var email = "emailAddress@email.com";

	$('#name').html(firstName + " " + lastName);
	$('#email').html(email);
	//console.log(username);
}

var fillmyPics = function(username){
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
var fillFriendsPics = function(username){
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


