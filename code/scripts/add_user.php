<?php 
	header("Access-Control-Allow-Origin: *");

	include 'setdb.php';

	$first_name = $_POST['firstname'];
	$last_name = $_POST['lastname'];
	$email = $_POST['email'];
	$username = $_POST['username'];
	$password = $_POST['password'];

	$profileQuery = $db->prepare('insert into user(first_name,last_name,email,username,password) values(:firstname,:lastname,:email,:username,:password)');
	$profileQuery->bindValue(':firstname', $first_name, PDO::PARAM_STR);
	$profileQuery->bindValue(':lastname', $last_name, PDO::PARAM_STR);
	$profileQuery->bindValue(':email', $email, PDO::PARAM_STR);
	$profileQuery->bindValue(':username', $username, PDO::PARAM_STR);
	$profileQuery->bindValue(':password', $password, PDO::PARAM_STR);
	$profileQuery->execute();
?>