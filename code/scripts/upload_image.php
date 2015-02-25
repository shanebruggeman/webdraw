<?php 
	header("Access-Control-Allow-Origin: *");
	include 'setdb.php';

	$nextid = count(glob("pictures/picture*.png")) + 1;

	// $postFile = fopen("pictures/picture" . $nextid .".png","wr");

	// print_r($_FILES);

	$filename = $_FILES['file']['name'];
	$filetype = $_FILES['file']['type'];
	$tmp_name = $_FILES['file']['tmp_name'];
	$error = $_FILES['file']['error'];
	$size = $_FILES['file']['size'];

	move_uploaded_file($tmp_name, "./pictures/picture" . $nextid . $filetype);

	// echo 'Name: ' . $filename . ', Type: ' . $filetype . ', Tmp: ' . $tmp_name . ', Error: ' . $error . ', Size: ' . $size ' Uploaded: ' . is_uploaded_file($_FILES['file']['tmp_name']);
 ?>