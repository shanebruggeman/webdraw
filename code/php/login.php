<?php
	// note to add session stuff later

	// necessary for allowing cross-origin requests
	header("Access-Control-Allow-Origin: *");

	include 'setdb.php';

	// fail if no username / password is provided
	if(!isset($_POST['username']) || !isset($_POST['password'])) {
		http_response_code(400);
	}

	$username = $_POST['username'];
	$password = $_POST['password'];

	$query = $db->prepare('select * from user where username = :username and password = :password');
	$query->bindValue(':username', $username, PDO::PARAM_STR);
	$query->bindValue(':password', $password, PDO::PARAM_STR);
	$query->execute();

	$count = $query->rowCount();

	// fail and signal that the user was not found
	if($count == 0) {
		http_response_code(418);
	}

	// echo json_encode($returns);
 ?>