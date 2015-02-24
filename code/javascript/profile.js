
window.onload = function(){
	onStart();
	//FIll most recent 10
	fillmyPics();
	fillFriendsPics();
	//pictureViewer(false);
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
