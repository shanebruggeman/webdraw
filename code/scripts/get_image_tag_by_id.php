<?php 
	header("Access-Control-Allow-Origin: *");

	include 'setdb.php';

	$id = $_GET['id'];

	$path = 'pictures/picture' . $id . '.png';
	// Read path path, convert to base64 encoding
	$imageData = base64_encode(file_get_contents($path));

	// Format the path SRC:  data:{mime};base64,{data};
	$src = 'data: '.mime_content_type($path).';base64,'.$imageData;

	// Echo out a sample path
	$imageHTML = "<img src=\"$src\" alt=\"\" />";

	$returnData = array();

	$returnData["path"] = $path;
	$returnData["image"] = $imageHTML;

	echo json_encode($returnData);
 ?>