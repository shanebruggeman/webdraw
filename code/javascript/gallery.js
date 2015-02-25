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
			for(var id in data){
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

var searchPublic = function() {
	console.log("searching");
	var searchQuery = $("#search > input[name=searchterm]").val();
	var packet =
	{
		"name" : searchQuery
	}

	console.log("packet is " + packet);

	$.ajax({
		typ: "GET",
		url: "http://webdraw.csse.rose-hulman.edu/search_public_pictures_by_name.php",
		dataType: "json",
		data: packet,
		success: function(data) {
			console.log(data);
			var picList = $(".gallery > ul");
			$(picList).empty();

			for(var id in data){
				console.log(id);
				var item = $('<li>\n \n</li>');
				var pic = $(data[id]["image"]);
				pic.attr("alt", data[id]["name"]);
				pic.attr("data", id);
				item.append(pic);
				item.click(function() {
					magnifyImage(this, false);
				});
				$(picList).append(item);
			}
		},
		error: function(request, status, error) {
			console.log("failed to search public pictures by the given term");
		}
	});
}