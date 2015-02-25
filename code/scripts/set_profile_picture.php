<?php 
	header("Access-Control-Allow-Origin: *");
	include 'setdb.php';

	$pictureid = $_POST['pictureid'];

	if(isset($_POST['userid'])){
		$userid = $_POST['userid'];
		$query = $db->prepare('update user set user.profile_pic_id = :pictureid where user.userid = :userid');
		$query->bindValue(':userid', $username, PDO::PARAM_STR);
		$query->bindValue(':pictureid', $pictureid, PDO::PARAM_STR);
		$query->execute();
	} else {
		$username = $_POST['username'];
		$query = $db->prepare('update user set user.profile_pic_id = :pictureid where user.username = :username');
		$query->bindValue(':username', $username, PDO::PARAM_STR);
		$query->bindValue(':pictureid', $pictureid, PDO::PARAM_STR);
		$query->execute();
	}
 ?>