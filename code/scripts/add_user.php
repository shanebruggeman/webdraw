<?php 
	header("Access-Control-Allow-Origin: *");

	include 'setdb.php';

	$first_name = $_GET['firstname'];
	$last_name = $_GET['lastname'];
	$email = $_GET['email'];
	$username = $_GET['username'];
	$password = $_GET['password'];

	$profileQuery = $db->prepare('insert into user(first_name,last_name,email,username,password) values(:firstname,:lastname,:email,:username,:password)');
	$profileQuery->bindValue(':firstname', $first_name, PDO::PARAM_STR);
	$profileQuery->bindValue(':lastname', $last_name, PDO::PARAM_STR);
	$profileQuery->bindValue(':email', $email, PDO::PARAM_STR);
	$profileQuery->bindValue(':username', $username, PDO::PARAM_STR);
	$profileQuery->bindValue(':password', $username, PDO::PARAM_STR);

	
?>