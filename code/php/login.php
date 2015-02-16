<?php 
	session_start();
	if (isset($_SESSION)){
		session_unset();
		session_destroy();
	}

	include 'setdb.php';

	$returns = array();

	$username = $_POST['username'];
	$password = $_POST['password'];

	$query = $db->prepare('select * from users where users.username =:username and users.password=:password');
	$query->bindValue(':username', $username, PDO::PARAM_STR);
	$query->bindValue(':password', $password, PDO::PARAM_STR);
	$query->execute();

	$rowCount = $query->rowCount();

	if($rowCount == 0) {
		http_response_code(404); //causes the request to fail when no users are found
	}

	$returns["username"] = $username;
	$returns["password"] = $password;

	$_SESSION["username"] = $username;
	$_SESSION["password"] = $password;

	echo json_encode($returns);
 ?>