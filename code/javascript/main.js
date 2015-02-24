

var onStart = function(){
	console.log("testing username: " + Cookie.get("username"));
	if(Cookie.exists("username")) {
		console.log("success");
	} else {
		beforeLoggedInBar();
		//redirect to index page
		window.location.href = "index.php"
		$("body").innerText ='If you are not redirected automatically, follow the <a href="index.php">link</a>';
		console.log("must default");
	}
}

var beforeLoggedInBar = function() {
	MENU = document.getElementById('menu').innerHTML;
	document.getElementById('menu').innerHTML='<li><a id="login" href="#" onclick="openlogin()">Login</a></li>';
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