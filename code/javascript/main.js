

var onStart = function(){
	console.log("testing username: " + Cookie.get("username"));
	if(Cookie.exists("username")) {
		console.log("success");
	} else {
		beforeLoggedInBar();
		//redirect to index page
		redirect("index.php");
		//window.location.href = "index.php"
		//$("body").innerText ='If you are not redirected automatically, follow the <a href="index.php">link</a>';
		console.log("must default");
	}
}

var beforeLoggedInBar = function() {
	MENU = document.getElementById('menu').innerHTML;
	document.getElementById('menu').innerHTML='<li><a id="login" href="#" onclick="openlogin()">Login</a></li>';
}

var redirect = function(location){
	window.location.href = location;
	$("body").innerText ='If you are not redirected automatically, follow the <a href="'+ location +'">link</a>';
}

//FOR DEV testing, not for prod USED ROF LOG OUT
var clearCookies = function(){
	var date = new Date();
	console.log("here");
	Cookie.remove("username");
	//Cookie.remove("password");
}

var magnifyImage = function(e,ownership){
	document.getElementById("viewer-picture").innerHTML = e.innerHTML;
	pictureViewer(ownership);
	$("#viewer-header h2").html($(e.innerHTML).attr("alt"));
	console.log(e.children[0].src);
	console.log($("#forkbutton"));
	document.getElementById("forkbutton").setAttribute("imgurl", e.children[0].src);
	//$("#forkbutton").setAttribute("imgurl", e.children[0].src);

}

/**-----------------------------For Gallery and profile------------------------------------**/
var pictureViewer = function(ownership){
	$("#blackBackground").show();
	$("#viewer-wrapper").show();
	if(ownership){
		$("#deleteButton").show();
	}else{
		$("#deleteButton").hide();
	}
}

var closeViewer = function(){
	$("#blackBackground").hide();
	$("#viewer-wrapper").hide();	
}

//sends image url to draw page to use as starting image
var forkpic = function(e){
	//console.log("fsork",e);
	//console.log(e.getAttribute("imgurl"));
	redirect("draw.php?imgurl="+e.getAttribute("imgurl"));
}

var deletepic = function(e){
	console.log("delete",e);
}