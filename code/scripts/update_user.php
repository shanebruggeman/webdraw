<?php 
	header("Access-Control-Allow-Origin: *");
	include 'setdb.php';

	$userid = $_POST['userid'];
	$firstname;
	$lastname;
	$email;
	$password;

	if(isset($_POST['firstname'])) {
		$firstname = $_POST['firstname'];
		// echo $firstname;
		$query = $db->prepare('update user set user.first_name = :firstname where user.id = :userid');
		$query->bindValue(':firstname', $firstname, PDO::PARAM_STR);
		$query->bindValue(':userid', $userid, PDO::PARAM_STR);
		$query->execute();
	}

	if(isset($_POST['lastname'])) {
		$lastname = $_POST['lastname'];
		// echo $lastname;
		$query = $db->prepare('update user set user.last_name = :lastname where user.id = :userid');
		$query->bindValue(':lastname', $lastname, PDO::PARAM_STR);
		$query->bindValue(':userid', $userid, PDO::PARAM_STR);
		$query->execute();
	}

	if(isset($_POST['email'])) {
		$email = $_POST['email'];
		// echo $email;
		$query = $db->prepare('update user set user.email = :email where user.id = :userid');
		$query->bindValue(':email', $email, PDO::PARAM_STR);
		$query->bindValue(':userid', $userid, PDO::PARAM_STR);
		$query->execute();
	}

	if(isset($_POST['password'])) {
		$password = $_POST['password'];
		// echo $password;
		$query = $db->prepare('update user set user.password = :password where user.id = :userid');
		$query->bindValue(':password', $password, PDO::PARAM_STR);
		$query->bindValue(':userid', $userid, PDO::PARAM_STR);
		$query->execute();
	}
 ?>