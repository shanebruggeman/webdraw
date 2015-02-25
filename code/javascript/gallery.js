window.onload = function(){
	onStart();
	//FILL with most recent 20
	fillPics();
}
var fillPics = function(){
	var picList = $("#myPics ul");
	$.ajax({
		type: "GET",
		//url: "http://webdraw.csse.rose-hulman.edu/all_public_pictures.php",
		url: "http://webdraw.csse.rose-hulman.edu/all_public_pictures.php",
		dataType: "json",
		success: function(data) {
			//console.log("successful query");
			console.log("data",data);
			var i=0;
			
			for(key in data) {
				if(i<20) {
					console.log(key);
					var img = document.createElement("img");
					img.src = "webdraw.csse.rose-hulman.edu/pictures/picture"+key+".png";
					var item = document.createElement('li');
					item.innerHTML =  '\n <img alt="picname" src="'+img.src+'"> \n'; 
					item.onclick = function() {
						magnifyImage(this,false);
					}
					picList.append(item);
					i++;
				} else {
					break;
				}
			}
		},
		error: function(request, status, error) {
			console.log("Failure");
		}
	});
}