window.onload = function(){
	onStart();
	//FILL with most recent 20
	fillPics();
}
var fillPics = function(){
	var picList = $("#myPics ul");
	for(var i = 0; i<20; i++){
		var item = document.createElement('li');
		item.innerHTML =  '\n <img alt="picname" src="../../resources/images/placeholder.png"> \n'; 
		item.onclick = function() {
			magnifyImage(this,false);
		}
		picList.append(item);
		//console.log(i);
	}
}
