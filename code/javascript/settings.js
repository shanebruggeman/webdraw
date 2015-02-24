
window.onload = function(){
	onStart();
	//FIll most recent 10
	fillFriends();
	fillFields();
	//pictureViewer(false);
}

var fillFields = function(){
	$("#firstName").attr("value","FirstName");
	$("#lastName").attr("value","Last");
	$("#emailInput").attr("value","emailAddress@email.com");
}

var fillFriends = function(){
	var picList = $("#friendspics ul");
	for(var i = 0; i<10; i++){
		var item = document.createElement('li');
		item.innerHTML =  '\n <img alt="FriendName" src="../../resources/images/placeholder.png"> \n'; 
		item.onclick = function() {
			magnifyImage(this,true);
		}
		picList.append(item);
	}
}



