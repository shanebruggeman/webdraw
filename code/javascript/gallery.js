window.onload = function(){
	onStart();
	fillPics();
}
var fillPics = function(){
	var picList = $("#myPics ul");
	$.ajax({
		type: "GET",
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
	var searchQuery = $("#search > input[name=searchterm]").val();
	var packet =
	{
		"name" : searchQuery
	}

	$.ajax({
		typ: "GET",
		url: "http://webdraw.csse.rose-hulman.edu/search_public_pictures_by_name.php",
		dataType: "json",
		data: packet,
		success: function(data) {
			var picList = $(".gallery > ul");
			$(picList).empty();

			for(var id in data){
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