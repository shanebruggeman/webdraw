<?php
	header("Access-Control-Allow-Origin: *");
	ini_set('display_errors', 'On');
	include 'setdb.php';
	
	$id = $_GET['id'];
	
	//echo "delete";
	unlink('pictures/picture'.$id.'.png');
	
	if(isset($_GET['id'])) {
		//$imgurl = $_GET['imgurl'];
		//echo "delete GET";
	}

	//echo '{"img": pictures/$id}';
?>