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
			for(var id in data){
				console.log(data[id]);
				var item = $('<li>\n \n</li>');
				var pic = $(data[id]["image"]);
				pic.attr("alt", data[id]["name"]);
				pic.attr("data", id);
				item.append(pic);
				item.click(function() {
					magnifyImage(this, false);
				});
				picList.append(item);
			}
		},
		error: function(request, status, error) {
			console.log("Failure");
		}
	});
}